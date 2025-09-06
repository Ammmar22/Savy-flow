import React, { useState, useEffect } from 'react';
import { Card, Button, Radio, Checkbox, Typography, Select, message, Input, Alert, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useGetFlowsQuery } from '../../../../../store/api/useFlow';
import { useGetQuestionsByFlowQuery } from '../../../../../store/api/useQuestion';
import { useSubmitAnswersMutation } from '../../../../../store/api/useAnswersApi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const { Title } = Typography;
const { Option } = Select;

const QuestionFlow = () => {
  const [selectedFlowId, setSelectedFlowId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsMap, setQuestionsMap] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [multiSelectedOptions, setMultiSelectedOptions] = useState([]);
  const [answers, setAnswers] = useState({
    flowId: null,
    answers: [],
    xhrParams: {},
  });
  const [submitAnswers, { isLoading: isSubmitting }] = useSubmitAnswersMutation();
  const { data: flows = [] } = useGetFlowsQuery();
  const {
    data: questions = [],
    refetch,
    isLoading,
  } = useGetQuestionsByFlowQuery(selectedFlowId, { skip: !selectedFlowId });

  const navigate = useNavigate();

  useEffect(() => {
    if (questions?.length) {
      const map = {};
      questions.forEach((q) => {
        map[q.ref] = q;
      });
      setQuestionsMap(map);
      setCurrentQuestion(map['Q1']);
      setAnswers((prev) => ({ ...prev, flowId: selectedFlowId, answers: [], xhrParams: {} }));
    }
  }, [questions, selectedFlowId]);

  const handleFlowSelect = (value) => {
    setSelectedFlowId(value);
    setCurrentQuestion(null);
    setSelectedOption('');
    setMultiSelectedOptions([]);
    setQuestionsMap({});
    setAnswers((prev) => ({ ...prev, flowId: value, answers: [], xhrParams: {} }));
  };

  useEffect(() => {
    if (selectedFlowId) {
      refetch();
    }
  }, [selectedFlowId, refetch]);

  const calculateXhrParams = (question, value) => {
    const xhrParams = { ...answers.xhrParams };
    if (question?.xhrParams?.inputs?.length) {
      const input = question.xhrParams.inputs.find(i => i.label === value);
      if (input) {
        xhrParams[input.options] = input.value;
      }
    }
    return xhrParams; // Logique minimale, le backend gère le reste
  };

  const handleNext = async () => {
    if (
      currentQuestion?.type !== 'numeric' &&
      currentQuestion?.type !== 'price' &&
      currentQuestion?.type !== 'grid_checkboxv2' &&
      currentQuestion?.type !== 'counter' &&
      currentQuestion?.type !== 'text' &&
      currentQuestion?.type !== 'percentage' &&
      currentQuestion?.type !== 'radio' &&
      currentQuestion?.type !== 'date' &&
      !selectedOption
    ) {
      message.warning('Please select an option.');
      return;
    }

    if (currentQuestion.validator?.regex) {
      const regex = new RegExp(currentQuestion.validator.regex);
      if (!regex.test(selectedOption)) {
        message.warning(currentQuestion.validator.errorMessage || 'Invalid input');
        return;
      }
    }

    let value;
    if (currentQuestion.type === 'grid_checkboxv2') {
      value = multiSelectedOptions;
    } else if (currentQuestion.type === 'numeric' || currentQuestion.type === 'price') {
      if (!selectedOption) {
        message.warning('Please enter a value.');
        return;
      }
      value = selectedOption;
    } else if (currentQuestion.type === 'percentage') {
      if (!selectedOption) {
        message.warning('Please enter a percentage.');
        return;
      }
      value = selectedOption;
    } else if (currentQuestion.type === 'text') {
      if (!selectedOption.trim()) {
        message.warning('Please enter a response.');
        return;
      }
      value = selectedOption.trim();
    } else if (currentQuestion.type === 'date') {
      if (!selectedOption) {
        message.warning('Please select a date.');
        return;
      }
      value = selectedOption;
    } else {
      value = selectedOption;
    }

    const currentAnswer = {
      ref: currentQuestion.ref,
      title: currentQuestion.title,
      value,
    };

    const xhrParams = calculateXhrParams(currentQuestion, value);
    const payload = {
      flowId: selectedFlowId,
      userId: 'temp-user-id',
      answers: [...answers.answers, currentAnswer], // Envoie toutes les réponses cumulées
      xhrParams,
      status: 'in_progress',
    };

    try {
      const response = await submitAnswers(payload).unwrap();
      message.success('Answer saved successfully');
      const updatedAnswer = response;
      setAnswers({
        flowId: selectedFlowId,
        answers: [...answers.answers, currentAnswer].filter((a, index, self) =>
          index === self.findIndex((t) => t.ref === a.ref)
        ),
        xhrParams: { ...answers.xhrParams, ...(updatedAnswer.xhrParams || {}) },
      });
      console.log('Response from server:', response);
    } catch (error) {
      console.error('Error saving answer:', error);
      message.error('Failed to save answer: ' + (error.message || 'Unknown error'));
      return;
    }

    console.log('Current Question:', currentQuestion);
    let next = currentQuestion.handleNext?.find(h => h.label === selectedOption);
    console.log('Next from handleNext:', next);
    if (!next && (
      currentQuestion.type === 'numeric' ||
      currentQuestion.type === 'price' ||
      currentQuestion.type === 'counter' ||
      currentQuestion.type === 'text' ||
      currentQuestion.type === 'radio' ||
      currentQuestion.type === 'percentage' ||
      currentQuestion.type === 'date' ||
      currentQuestion.type === 'grid_checkboxv2'
    )) {
      next = currentQuestion.handleNext?.[0];
      console.log('Fallback next:', next);
    }
    let nextQuestionRef = next?.nextQst;
    console.log('Next Question Ref:', nextQuestionRef);

    if (!nextQuestionRef) {
      const fullPayload = {
        flowId: selectedFlowId,
        userId: 'temp-user-id',
        answers: [],
        xhrParams: answers.xhrParams,
        status: 'completed',
      };
      try {
        await submitAnswers(fullPayload).unwrap();
        message.success('Questionnaire completed and saved');
      } catch (error) {
        console.error('Error submitting answers:', error);
        message.error('Failed to submit answers: ' + (error.message || 'Unknown error'));
      }
      navigate(`${APP_PREFIX_PATH}/dashboards/default/questionnaire/answers`);
      return;
    }

    const nextQuestion = questionsMap[nextQuestionRef];
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption('');
      setMultiSelectedOptions([]);
    } else {
      message.error('Next question not found');
    }
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    const { type, options = [] } = currentQuestion;

    if (type === 'radiov2') {
      return (
        <div style={gridStyle}>
          {options.map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <div
                key={idx}
                onClick={() => setSelectedOption(option)}
                style={{
                  ...optionBoxStyle,
                  border: isSelected ? '2px solid #1890ff' : '1px solid #d9d9d9',
                  backgroundColor: isSelected ? '#e6f7ff' : '#fff',
                  boxShadow: isSelected
                    ? '0 0 10px rgba(24, 144, 255, 0.3)'
                    : '0 1px 3px rgba(0,0,0,0.1)',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      );
    }

    if (type === 'radio') {
      return (
        <Radio.Group
          onChange={(e) => setSelectedOption(e.target.value)}
          value={selectedOption}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginBottom: 24,
          }}
        >
          {options.map((option, idx) => (
            <Radio key={idx} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      );
    }

    if (type === 'numeric' || type === 'price') {
      return (
        <Input
          type="number"
          placeholder={type === 'price' ? 'Enter a price' : 'Enter a number'}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ width: 200, marginBottom: 24 }}
        />
      );
    }

    if (type === 'counter') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <Button
              key={num}
              shape="circle"
              type={selectedOption === num ? 'primary' : 'default'}
              onClick={() => setSelectedOption(num)}
            >
              {num}
            </Button>
          ))}
        </div>
      );
    }

    if (type === 'text' || type === 'percentage') {
      return (
        <Input
          type={type === 'percentage' ? 'number' : 'text'}
          placeholder={type === 'percentage' ? 'Enter a percentage' : 'Enter your response'}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ width: 300, marginBottom: 24 }}
          suffix={type === 'percentage' ? '%' : null}
          min={type === 'percentage' ? 0 : undefined}
          max={type === 'percentage' ? 100 : undefined}
        />
      );
    }

    if (type === 'grid_checkboxv2') {
      return (
        <div style={gridStyle}>
          {options.map((option, idx) => {
            const isChecked = multiSelectedOptions.includes(option);
            return (
              <div
                key={idx}
                onClick={() =>
                  setMultiSelectedOptions((prev) =>
                    isChecked ? prev.filter((o) => o !== option) : [...prev, option]
                  )
                }
                style={{
                  ...optionBoxStyle,
                  border: isChecked ? '2px solid #1890ff' : '1px solid #d9d9d9',
                  backgroundColor: isChecked ? '#e6f7ff' : '#fff',
                  boxShadow: isChecked
                    ? '0 0 10px rgba(24, 144, 255, 0.3)'
                    : '0 1px 3px rgba(0,0,0,0.1)',
                  fontWeight: isChecked ? 'bold' : 'normal',
                }}
              >
                <Checkbox checked={isChecked} style={{ pointerEvents: 'none' }}>
                  {option}
                </Checkbox>
              </div>
            );
          })}
        </div>
      );
    }

    if (type === 'date') {
      return (
        <DatePicker
          onChange={(date, dateString) => setSelectedOption(dateString)}
          style={{ width: 300, marginBottom: 24 }}
        />
      );
    }

    return (
      <Radio.Group
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 24,
        }}
      >
        {options.map((option, idx) => (
          <Radio key={idx} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 16,
    marginBottom: 24,
  };

  const optionBoxStyle = {
    borderRadius: 12,
    padding: 20,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        Questionnaire Flow
      </Title>

      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <Select
          placeholder="Select a flow"
          style={{ width: 300 }}
          onChange={handleFlowSelect}
          value={selectedFlowId}
        >
          {flows.map((flow) => (
            <Option key={flow._id} value={flow._id}>
              {flow.title}
            </Option>
          ))}
        </Select>
      </div>

      {isLoading && <p>Loading questions...</p>}

      {currentQuestion && (
        <Card
          title={<span style={{ fontSize: 18, fontWeight: 600 }}>{currentQuestion.title}</span>}
          bordered={false}
          style={{ backgroundColor: '#fafafa', borderRadius: 16 }}
        >
          <Alert
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            message={<strong>{currentQuestion.infoTitle}</strong>}
            description={currentQuestion.info}
            style={{ marginBottom: 24, borderRadius: 12 }}
          />

          {renderQuestionInput()}

          <div style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              size="large"
              onClick={handleNext}
              disabled={
                currentQuestion?.type === 'grid_checkboxv2'
                  ? multiSelectedOptions.length === 0
                  : !selectedOption && currentQuestion?.type !== 'numeric' && currentQuestion?.type !== 'price'
              }
              style={{ width: 200, borderRadius: 24 }}
              loading={isSubmitting}
            >
              Next →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuestionFlow;