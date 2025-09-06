import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetQuestionsByFlowQuery } from '../../../../../store/api/useQuestion';
import { message } from 'antd';
import CustomAlertModal from "./CustomAlertModal";
import InformationCircleIcon from '../../../../../assets/icons/img.png'; // Adjust the path if needed
import axios from 'axios'; // Ensure axios is installed
import { useCreateAnswerMutation } from '../../../../../store/api/useAnswersApi';
import SavingsModal from "./SavingsModal"; // adjust path if needed


// utils/xhrParamsBuilder.js



const QuestionsPage = () => {
  const { id: flowId } = useParams();
  const params = useParams();
  const [activeFlowId, setActiveFlowId] = useState(params.id);

  const navigate = useNavigate();
  const { data: questionsData, isLoading } = useGetQuestionsByFlowQuery(activeFlowId);
  const [showModal, setShowModal] = useState(false);
  const [createAnswer, { isLoading: isSubmitting }] = useCreateAnswerMutation();
  const token = localStorage.getItem('token'); // OR get from Redux if persisted
  const [step, setStep] = useState(1); // start at step 1
  const estimationId = localStorage.getItem('estimationId'); // or wherever you store the JWT
  const [localXhrParams, setLocalXhrParams] = useState({});
  const [annualSaving, setAnnualSaving] = useState(null);
  const [spendPerDay, setSpendPerDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextFlowId, setNextFlowId] = useState(null);
  const [isModalSavinglOpen, setIsModalSavinglOpen] = useState(false);

  const handleNavigateFlow = () => {
    if (nextFlowId) {
      setActiveFlowId(nextFlowId); // 👈 swap to new flow
      setStep(1);
      setCurrentQuestionId(null);
      setNextFlowId(null);
      setIsModalOpen(false);
      setIsModalSavinglOpen(false);

    }
  };
  const [answers, setAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      setCurrentQuestionId(questionsData[0]._id);
      const initialAnswers = {};
      questionsData.forEach((q) => {
        initialAnswers[q._id] = '';
      });
      setAnswers(initialAnswers);
    }
  }, [questionsData]);




  const handleChange = (questionId, option) => {
    setAnswers((prev) => {
      const currentAnswer = prev[questionId] || [];

      if (currentQuestion.type === "checkbox" || currentQuestion.type === "grid_checkboxv2") {
        // Toggle option (add/remove)
        if (currentAnswer.includes(option)) {
          return {
            ...prev,
            [questionId]: currentAnswer.filter((o) => o !== option),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswer, option],
          };
        }
      } else {
        // Radio: single value
        return {
          ...prev,
          [questionId]: option,
        };
      }
    });
  };


  const patchEstimation = async (estimationId, payload) => {
    const token = localStorage.getItem('token'); // your JWT
    try {
      const response = await axios.patch(
          `https://api.savyapp.dev/api/v1/estimations/${estimationId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log("Estimation updated:", response.data);
      return response.data;

    } catch (err) {
      console.error("Failed to update estimation:", err);
    }
  };



  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalSavinglOpen(false);
    // Optionally, go to the next question after closing

  };

  const handleNext = async () => {

    const currentQuestion = questionsData.find((q) => q._id === currentQuestionId);
    if (!currentQuestion) return;

    const userAnswer = answers[currentQuestion._id];

    // Get the value (like 1, 2, 3) from xhrParams based on the chosen label
    let matchedInput;

// For radio questions, find by label
    if (currentQuestion.type.startsWith('radio')) {
      matchedInput = currentQuestion.xhrParams?.inputs?.find(
          (i) => i.label === userAnswer
      );
    } else {
      // For numeric or free text, just take the first input
      matchedInput = currentQuestion.xhrParams?.inputs?.[0];
    }

    let computedValue;
    if (matchedInput?.value.includes('parseFloat')) {
      computedValue = parseFloat(userAnswer.replace(/,/g, ""));
    } else if (matchedInput?.value.includes('parseInt')) {
      computedValue = parseInt(userAnswer.replace(/,/g, ""),10);

    } else {
      computedValue = matchedInput?.value;
    }

    const answerValue = computedValue;


    const xhrPayload = {};
    const validationTarget = currentQuestion.xhrParams?.validation?.target; // e.g. "income"

// 1️⃣ Always store the main value based on validation target
    if (matchedInput) {
    //  xhrPayload['undefined'] = validationTarget;

      xhrPayload[validationTarget || 'value'] = computedValue;

    }


// 2️⃣ Check if this question has validation logic in handleNext
    const validationFromHandleNext = currentQuestion.handleNext?.find(h => h.action === 'validation');

    if (validationFromHandleNext?.validation) {
      // Save validation details into xhrPayload
      xhrPayload.validation = {
        type: validationFromHandleNext.validation.type || null,
        target: validationFromHandleNext.validation.target || null
      };
    }


// 3️⃣ If there is validation logic, check dynamic conditions
    if (validationFromHandleNext) {
      const dynNext = currentQuestion.dynamicHandleNext?.find((dyn) => {
        const {field, operator, target } = dyn.conditions || {};
        if (!operator || target === undefined) return false;
        const fieldValue = annualSaving;
        switch (operator) {
          case "==":
            return  answerValue == target;

          case "!=":
           return answerValue != target;
          case ">":
            return  Number(fieldValue) > Number(target);

          case "<":
            return  Number(fieldValue) < Number(target);

          case ">=":
            return  Number(fieldValue) >= Number(target);

          case "<=":
            return  Number(fieldValue) <= Number(target);

          default:
           return  false;
        }
      });

      // 4️⃣ If no dynamic condition matched, stop and show error
      if (dynNext) {
        const { field, operator, target } = dynNext.conditions;
      } else {
        message.error("❗ No matching dynamic condition found.");
        return;
      }

// 5️⃣ Submit the answer to API
    try {

      let finalAnswer = userAnswer;
      if (currentQuestion?.xhrParams?.validation?.type === "boolean") {
        if (typeof userAnswer === "string") {
          finalAnswer = userAnswer.toLowerCase() === "true";
        } else {
          finalAnswer = Boolean(userAnswer);
        }
      }
      await createAnswer({
        flowId: activeFlowId,
        userId: localStorage.getItem('userId') || undefined,
        answers: [
          {
            ref: currentQuestion.ref,
            title: currentQuestion.title,
            value: finalAnswer,
          },
        ],
        xhrParams: xhrPayload,
        status: 'in_progress',
      }).unwrap();

      if (estimationId) {
        let patchValue = computedValue;
        if (currentQuestion.ref === "5" && answers['689c6c7b64d03f7782f0a4e8']) {
          patchValue = parseFloat(answers['689c6c7b64d03f7782f0a4e8']);
        }
        // 🔥 If validation says it's a boolean, cast properly
        if (currentQuestion?.xhrParams?.validation?.type === "boolean") {

          let inputObj = currentQuestion?.xhrParams?.inputs?.find(
              i => i.label === userAnswer || i.value === userAnswer
          );

          let inputValue = inputObj?.value;

          // Update the outer patchValue
          patchValue = typeof inputValue === "string"
              ? inputValue.toLowerCase() === "true"
              : Boolean(inputValue);
        }

        if (currentQuestion?.xhrParams?.validation?.type === "listString") {
          // Normalize to array in case user selected only one answer
          const answersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

          // Map user selections to the "value" field
          patchValue = answersArray.map(ans => {
            let inputObj = currentQuestion?.xhrParams?.inputs?.find(
                i => i.label === ans || i.value === ans || i._id === ans
            );
            return inputObj ? inputObj.value : ans; // must be value, not label
          });


        }



        if (currentQuestion?.xhrParams?.validation?.type === "list") {

          // Normalize to array in case user selected only one answer
          const answersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

          // Map labels/values back to the integer values from inputs
          patchValue = answersArray.map(ans => {
            let inputObj = currentQuestion?.xhrParams?.inputs?.find(
                i => i.label === ans || i.value === ans || i._id === ans
            );
            return inputObj ? parseInt(inputObj.value, 10) : null; // cast to int
          }).filter(v => v !== null); // remove nulls if no match
        }

        let patchPayload = {
          [validationTarget]: patchValue
        };
        if (currentQuestion?.ref === "5") {
          // Example: map user answer into { mileageType, mileageRate }
          if (userAnswer === "No expenses") {
            patchPayload = { mileageType: 3, mileageRate: null };
          } else if (userAnswer === "Fuel card") {
            patchPayload = { mileageType: 2, mileageRate: 0 };
          } else {
            // Default: use API response values
            patchPayload = {
              mileageType: 1,
              mileageRate:
                  parseFloat(answers['689c6c7b64d03f7782f0a4e8']) / 100
            };
          }
        }

        if (currentQuestion?.type === "grid_checkboxv2") {
          // Ensure array
          const answersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

          // Map to actual "value" from inputs if needed
          patchValue = answersArray.map(ans => {
            let inputObj = currentQuestion?.xhrParams?.inputs?.find(
                i => i.label === ans || i.value === ans || i._id === ans
            );
            return inputObj ? inputObj.value : ans;
          });

          // ✅ Add length of selected choices
          patchPayload = {
            [validationTarget]: patchValue,
            selectedCount: patchValue.length, // <-- here’s the count
          };
        }


        const updatedEstimation = await patchEstimation(estimationId, patchPayload);

        // Update your local state from the PATCH response
        setAnnualSaving(updatedEstimation.annualSaving || 0);
        setSpendPerDay(updatedEstimation.spendPerDay || 0);

       // message.info(`Annual saving updated: ${updatedEstimation.annualSaving || 0}`);

      }



    } catch (error) {
      console.error('Failed to submit answer:', error);
      message.error('Failed to submit answer. Please try again.');
      return;
    }

    if (dynNext.action === "navigate"  ) {
      setNextFlowId(dynNext.nextQst);  // save the target flowId
      setIsModalOpen(true);

    } else if (dynNext.action === "open_question") {
        const nextQuestion = questionsData.find(q => q.ref === dynNext.nextQst);
        if (nextQuestion) {
          setStep(prev => prev + 1); // ✅ Increment here too

          setCurrentQuestionId(nextQuestion._id);
        } else {
          message.error("⚠️ Next question not found.");
        }
      }
      return;
    }

    // If no validation/dynamicHandleNext, fallback to original next handling
    const nextHandle = currentQuestion.handleNext?.[0];
    let nextQuestion = null;

    if (nextHandle?.action === 'open_question' ) {
      nextQuestion = questionsData.find(q => q.ref === nextHandle.nextQst);
    }
    if (matchedInput?.value === "1") xhrPayload.status = "Completed";
    if (matchedInput?.value === "2" || matchedInput?.value === "3") xhrPayload.status = "In progress";

    const isLastQuestion = !nextQuestion;

    const answerPayload = {
      flowId: activeFlowId,
      userId: localStorage.getItem('userId') || undefined,
      answers: [
        {
          ref: currentQuestion.ref,
          title: currentQuestion.title,
          value: userAnswer,
        },
      ],
      xhrParams: xhrPayload,
      status: isLastQuestion ? 'completed' : 'in_progress',
    };

    try {
      await createAnswer(answerPayload).unwrap();
      if (estimationId) {
        let patchValue = computedValue;
        if (currentQuestion.ref === "5" && answers['689c6c7b64d03f7782f0a4e8']) {
          patchValue = parseFloat(answers['689c6c7b64d03f7782f0a4e8']);
        }
        // 🔥 If validation says it's a boolean, cast properly
        if (currentQuestion?.xhrParams?.validation?.type === "boolean") {

          let inputObj = currentQuestion?.xhrParams?.inputs?.find(
              i => i.label === userAnswer || i.value === userAnswer
          );

          let inputValue = inputObj?.value;

          // Update the outer patchValue
          patchValue = typeof inputValue === "string"
              ? inputValue.toLowerCase() === "true"
              : Boolean(inputValue);
        }

        if (currentQuestion?.xhrParams?.validation?.type === "listString") {
          // Normalize to array in case user selected only one answer
          const answersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

          // Map user selections to the "value" field
          patchValue = answersArray.map(ans => {
            let inputObj = currentQuestion?.xhrParams?.inputs?.find(
                i => i.label === ans || i.value === ans || i._id === ans
            );
            return inputObj ? inputObj.value : ans; // must be value, not label
          });


        }


        if (currentQuestion?.xhrParams?.validation?.type === "list") {

          // Normalize to array in case user selected only one answer
          const answersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

          // Map labels/values back to the integer values from inputs
          patchValue = answersArray.map(ans => {
            let inputObj = currentQuestion?.xhrParams?.inputs?.find(
                i => i.label === ans || i.value === ans || i._id === ans
            );
            return inputObj ? parseInt(inputObj.value, 10) : null; // cast to int
          }).filter(v => v !== null); // remove nulls if no match
        }

        let patchPayload = {
          [validationTarget]: patchValue
        };
        if (currentQuestion?.ref === "5") {
          // Example: map user answer into { mileageType, mileageRate }
          if (userAnswer === "No expenses") {
            patchPayload = { mileageType: 3, mileageRate: null };
          } else if (userAnswer === "Fuel card") {
            patchPayload = { mileageType: 2, mileageRate: 0 };
          } else {
            // Default: use API response values
            patchPayload = {
              mileageType: 1,
              mileageRate:
                  parseFloat(answers['689c6c7b64d03f7782f0a4e8']) / 100
            };
          }
        }

        const updatedEstimation = await patchEstimation(estimationId, patchPayload);

        // Update your local state from the PATCH response
        setAnnualSaving(updatedEstimation.annualSaving || 0);
        setSpendPerDay(updatedEstimation.spendPerDay || 0);

      //  message.info(`Annual saving updated: ${updatedEstimation.annualSaving || 0}`);

      }
      if (nextQuestion) {
        setStep(prev => prev + 1); // ✅ Increment here too

        setCurrentQuestionId(nextQuestion._id);
      } else {
        message.success('All questions completed!');
        setIsModalSavinglOpen(true)
        setNextFlowId(nextHandle?.nextQst);  // save the target flowId

      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
      message.error('Failed to submit answer. Please try again.',error);
    }
  };



  if (isLoading || !currentQuestionId) {
    return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
  }
  const currentQuestion = questionsData.find((q) => q._id === currentQuestionId);

  const progressValues = questionsData.map((q) => q.progress);
  const totalSteps = Math.max(...progressValues) + 1;
  const stepIndex = currentQuestion?.progress ?? 0;
  const progressPercent = ((stepIndex + 1) / totalSteps) * 100;
  return (

      <div className="max-w-3xl mx-auto py-14 px-6">
        {currentQuestion && (
            <div className="bg-white shadow-xl rounded-xl pt-4 pb-10 px-10 mb-10 relative">
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-5">
                {/* Back Button */}
                <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => {
                      const current = questionsData.find(q => q._id === currentQuestionId);
                      if (!current) return;

                      const previousProgress = current.progress - 1;
                      const previousQuestion = questionsData.find(q => q.progress === previousProgress);
                      if (previousQuestion) {
                        setStep(prev => prev - 1); // ✅ Increment here too

                        setCurrentQuestionId(previousQuestion._id);
                      }
                    }}
                >
                  &larr; Back
                </button>

                {/* Title */}
                <h2 className="text-lg font-medium text-center flex-1">Savings calculator</h2>

                {/* Step */}
                <span className="text-sm text-gray-500 text-right whitespace-nowrap">
      Step {step}
    </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-gray-200 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <h3 className="text-xl font-normal mb-4">
                {currentQuestion.ref === "12"
                    ? currentQuestion.title.replace(/\$\{data\?.spendPerDay\}/g, spendPerDay || '0')
                    : currentQuestion.title
                }
              </h3>

              {(currentQuestion.type === 'radio' ||  currentQuestion.type === 'checkbox') && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center p-1 rounded-lg cursor-pointer space-x-3"
                        >
                          <input
                              type={currentQuestion.type}
                              className="hidden peer"
                              value={option}
                              checked={answers[currentQuestion._id] === option}
                              onChange={() => handleChange(currentQuestion._id, option)}
                          />
                          {/* Outer Circle becomes black when selected */}
                          <div className="w-5 h-5 border-2 rounded-full peer-checked:bg-black border-gray-400 transition-colors duration-200"></div>
                          <span>{option}</span>
                        </label>
                    ))}
                  </div>
              )}



              {(currentQuestion.type === 'radiov2' ||  currentQuestion.type === 'grid_checkboxv2')  && (
                  <div
                      className={`grid gap-4 ${
                          currentQuestion.options.length === 2
                              ? 'grid-cols-2'
                              : 'grid-cols-1 sm:grid-cols-3'
                      }`}
                  >
                    {currentQuestion.options.map((option) => {
                      const isSelected =
                          currentQuestion.type === "grid_checkboxv2"
                              ? answers[currentQuestion._id]?.includes(option)
                              : answers[currentQuestion._id] === option;                      return (
                          <div key={option} className="flex flex-col gap-2">
                            {/* Radio Option */}
                            <div
                                onClick={() => handleChange(currentQuestion._id, option)}
                                className={`relative cursor-pointer rounded-xl overflow-hidden transition ${
                                    isSelected ? '' : 'border border-gray-300'
                                }`}
                            >
                              {isSelected && <div className="absolute inset-0 custom-gradient" />}
                              <div
                                  className={`relative z-10 rounded-xl py-4 text-center bg-white text-black`}
                                  style={{
                                    border: isSelected ? '2px solid transparent' : '',
                                    backgroundClip: isSelected ? 'padding-box' : '',
                                  }}
                              >
                                {option}
                              </div>
                            </div>

                            {/* Extra Numeric Input for Mileage rate */}
                            {isSelected && option === 'Mileage rate' && (
                                <div className="relative w-full mt-6">
                                  <div className="relative">
                                    {/* Wrapper */}
                                    <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                                      <input
                                          type="number"
                                          id="input-689c6c7b64d03f7782f0a4e8"
                                          placeholder=" "
                                          className="peer flex-1 bg-white pl-6 pt-3 pb-1 text-gray-900 rounded-md focus:outline-none"
                                          value={answers['689c6c7b64d03f7782f0a4e8'] || ''}
                                          onChange={(e) =>
                                              handleChange('689c6c7b64d03f7782f0a4e8', e.target.value)
                                          }
                                      />
                                    </div>

                                    {/* Floating Label */}
                                    <label
                                        htmlFor="input-689c6c7b64d03f7782f0a4e8"
                                        className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm pointer-events-none"
                                    >
                                      Rate
                                    </label>


                                  </div>
                                </div>
                            )}
                          </div>
                      );
                    })}
                  </div>
              )}





              {['input', 'email', 'price', 'numeric', 'counter'].includes(currentQuestion.type) && (
                  <div className="relative w-full mt-6">
                    <div className="relative">
                      {/* Wrapper with flex if price */}
                      <div
                          className={`flex items-center w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition ${
                              currentQuestion.type === 'price' ? '' : 'block'
                          }`}
                      >
                        {/* Price Prefix if type is 'price' */}
                        {currentQuestion.type === 'price' && (
                            <span className="pl-3 pt-2 text-gray-700 text-base">£</span>
                        )}

                        <input
                            type={currentQuestion.type === 'email' ? 'email' : 'text'}
                            id={`input-${currentQuestion._id}`}
                            placeholder=" "
                            className={`peer flex-1 bg-white ${
                                currentQuestion.type === 'price' ? 'pl-2' : 'pl-3'
                            } pt-3 pb-1 text-gray-900 rounded-md focus:outline-none`}
                            value={answers[currentQuestion._id]}
                            onChange={(e) => handleChange(currentQuestion._id, e.target.value)}
                        />
                      </div>

                      {/* Floating Label */}
                      <label
                          htmlFor={`input-${currentQuestion._id}`}
                          className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm pointer-events-none"
                      >
                        {currentQuestion.name}
                      </label>

                      {/* Character Counter */}
                     
                    </div>
                  </div>
              )}


              {/* Info Banner */}
              {currentQuestion.info && (
                  <div
                      className="mt-4 bg-[#edf3fd] text-sm text-gray-700 rounded-lg p-3 flex items-start space-x-1 border-l border-blue-300"
                      style={{ borderLeftWidth: '12px' }}
                  >
                    <img
                        src={InformationCircleIcon}
                        alt="info icon"
                        className="w-5 h-5  flex-shrink-0"
                    />
                    <div>
                      <strong className="block mb-1 text-gray-900 font-medium" >{currentQuestion.infoTitle}</strong>
                      <span className="text-xs text-gray ">{currentQuestion.info}</span>
                    </div>
                  </div>

              )}


              <button
                  className="bg-[#002147] text-white py-2 px-64 rounded-lg font-semibold hover:bg-blue-800 transition mt-5 block mx-auto"
                  onClick={handleNext}
                  disabled={!answers[currentQuestion?._id]}
              >
                Next →
              </button>

            </div>
        )}

        <CustomAlertModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onNavigate={handleNavigateFlow}
        />

        <SavingsModal
            isOpen={isModalSavinglOpen}
            onClose={closeModal}
            amount={annualSaving} // 🔥 dynamic value
            onNavigate={handleNavigateFlow}

        />


      </div>
  );
};

export default QuestionsPage;
