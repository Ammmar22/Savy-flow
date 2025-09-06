import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Tabs,
  Space,
  Divider,
  message,
  InputNumber,
  Typography
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
  useGetQuestionsByFlowQuery
} from '../../../../../store/api/useQuestion';
import { useGetFlowsQuery } from '../../../../../store/api/useFlow';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { QuestionType } from '../../../../../constants/createQuestion';

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const EditQuestion = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { flowId, questionId } = useParams();

  const { data: questionData, isLoading } = useGetQuestionByIdQuery(questionId);
  const { data: questionsData = [], isLoading: isQuestionsLoading } = useGetQuestionsByFlowQuery(flowId);
  const { data: flowsData = [], isLoading: isFlowsLoading } = useGetFlowsQuery();
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();

  const handleNextValues = Form.useWatch('handleNext', form) || [];

  useEffect(() => {
    if (questionData) {
      const mappedOptions = (questionData.options || []).map(opt => ({
        value: typeof opt === 'string' ? opt : opt.value
      }));

      const handleNextWithDynamic = (questionData.handleNext || []).map(hn => {
        if (hn.action === 'validation') {
          const relatedDynamic = (questionData.dynamicHandleNext || []).filter(
            dhn => dhn.label.includes(hn.label)
          );
          return {
            ...hn,
            dynamicHandleNext: relatedDynamic.map(dhn => ({
              ...dhn,
              conditions: dhn.conditions || { field: '', operator: '', target: '' }
            }))
          };
        }
        return {
          ...hn,
          nextQst: hn.nextQst || (hn.action === 'navigate' ? hn.nextFlow : undefined) // Migrer nextFlow vers nextQst si présent
        };
      });

      form.setFieldsValue({
        ...questionData,
        options: mappedOptions,
        handleNext: handleNextWithDynamic,
        xhrParams: questionData.xhrParams || {
          inputs: [],
          validation: { type: '', target: '' }
        },
        dynamicHandleNext: []
      });
    }
  }, [questionData, form]);

  const onFinish = async (values) => {
    try {
      console.log('Form values:', values); // Débogage des valeurs du formulaire
      const dynamicHandleNext = values.handleNext
        .filter(h => h.action === 'validation' && h.dynamicHandleNext)
        .flatMap(h => h.dynamicHandleNext);

      const formattedValues = {
        ...values,
        flow: flowId,
        options: values.options?.map(opt => opt.value) || [],
        dynamicHandleNext: dynamicHandleNext.length > 0 ? dynamicHandleNext : [],
        handleNext: values.handleNext.map(({ dynamicHandleNext, ...rest }) => ({
          ...rest
        }))
      };

      console.log('Formatted values sent to backend:', formattedValues); // Débogage des valeurs envoyées
      await updateQuestion({ id: questionId, updatedQuestion: formattedValues }).unwrap();
      message.success('Question updated successfully');
      navigate(`${APP_PREFIX_PATH}/dashboards/flow/edit/${flowId}`);
    } catch (error) {
      console.error('Failed to update question:', error);
      message.error('Failed to update question');
    }
  };

  if (isLoading || !questionData) return <div>Loading...</div>;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        required: false,
        xhrParams: {
          inputs: [],
          validation: { type: '', target: '' }
        },
        handleNext: []
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Information" key="1">
          <Form.Item name="ref" label="Reference" rules={[{ required: true, message: 'Reference is required' }]}>
            <Input placeholder="Enter reference" />
          </Form.Item>
          <Form.Item name="progress" label="Progress" rules={[{ required: true, message: 'Progress is required' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter progress" />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="type" label="Question Type" rules={[{ required: true, message: 'Question type is required' }]}>
            <Select placeholder="Select a type">
              {Object.values(QuestionType).map((type) => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="required" label="Required" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="infoTitle" label="Info Title">
            <Input placeholder="Enter info title" />
          </Form.Item>
          <Form.Item name="info" label="Information">
            <Input.TextArea placeholder="Enter information" />
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input placeholder="Enter value" />
          </Form.Item>
        </TabPane>

        <TabPane tab="Options" key="2">
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true, message: 'Option is required' }]}
                    >
                      <Input placeholder="Option value" />
                    </Form.Item>
                    <Button type="dashed" danger onClick={() => remove(name)}>
                      Delete
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Option
                </Button>
              </>
            )}
          </Form.List>
        </TabPane>

        <TabPane tab="Handle Next" key="3">
          <Form.List name="handleNext">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  const isValidation = handleNextValues[name]?.action === 'validation';
                  const isNavigate = handleNextValues[name]?.action === 'navigate';

                  return (
                    <div key={key} style={{ marginBottom: 16, padding: 16, border: '1px solid #f0f0f0' }}>
                      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'label']}
                          rules={[{ required: true, message: 'Label is required' }]}
                        >
                          <Input placeholder="Label" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'action']}
                          rules={[{ required: true, message: 'Action is required' }]}
                        >
                          <Select placeholder="Select an action">
                            {['open_question', 'navigate', 'saveandfinish', 'validation'].map(action => (
                              <Option key={action} value={action}>{action}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        {isNavigate ? (
                          <Form.Item
                            {...restField}
                            name={[name, 'nextQst']}
                            // rules={[{ required: true, message: 'Flow is required' }]}
                          >
                            <Select
                              placeholder="Select a flow"
                              loading={isFlowsLoading}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                              style={{ width: 300 }}
                            >
                              {flowsData.map((flow) => (
                                <Option key={flow._id} value={flow._id}>
                                  {flow.title || flow._id}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...restField}
                            name={[name, 'nextQst']}
                            // rules={[{ required: !isValidation, message: 'Next question is required' }]}
                          >
                            <Select
                              placeholder="Select next question"
                              loading={isQuestionsLoading}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                              disabled={isValidation}
                            >
                              {questionsData.map((qst) => (
                                <Option key={qst._id} value={qst.ref}>
                                  {qst.ref}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                        <Button type="dashed" danger onClick={() => remove(name)}>
                          Delete
                        </Button>
                      </Space>

                      {isValidation && (
                        <>
                          <Divider orientation="left">Dynamic Handle Next</Divider>
                          <Text type="secondary" style={{ marginBottom: 8, display: 'block' }}>
                            Note: Dynamic Handle Next overrides Handle Next navigation when defined.
                          </Text>
                          <Form.List name={[name, 'dynamicHandleNext']}>
                            {(dynamicFields, { add: addDynamic, remove: removeDynamic }) => (
                              <>
                                {dynamicFields.map(({ key: dynamicKey, name: dynamicName, ...dynamicRestField }) => {
                                  const isDynamicNavigate = handleNextValues[name]?.dynamicHandleNext?.[dynamicName]?.action === 'navigate';

                                  return (
                                    <div key={dynamicKey} style={{ marginBottom: 16, padding: 16, border: '1px solid #e8e8e8', marginLeft: 16 }}>
                                      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'label']}
                                          rules={[{ required: true, message: 'Label is required' }]}
                                        >
                                          <Input placeholder="Label" />
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'action']}
                                          rules={[{ required: true, message: 'Action is required' }]}
                                        >
                                          <Select placeholder="Select an action">
                                            {['open_question', 'navigate', 'saveandfinish', 'validation'].map(action => (
                                              <Option key={action} value={action}>{action}</Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                        {isDynamicNavigate ? (
                                          <Form.Item
                                            {...dynamicRestField}
                                            name={[dynamicName, 'nextQst']}
                                            rules={[{ required: true, message: 'Flow is required' }]}
                                          >
                                            <Select
                                              placeholder="Select a flow"
                                              loading={isFlowsLoading}
                                              allowClear
                                              showSearch
                                              optionFilterProp="children"
                                              style={{ width: 300 }}
                                            >
                                              {flowsData.map((flow) => (
                                                <Option key={flow._id} value={flow._id}>
                                                  {flow.title || flow._id}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                        ) : (
                                          <Form.Item
                                            {...dynamicRestField}
                                            name={[dynamicName, 'nextQst']}
                                            // rules={[{ required: true, message: 'Next question is required' }]}
                                          >
                                            <Select
                                              placeholder="Select next question"
                                              loading={isQuestionsLoading}
                                              allowClear
                                              showSearch
                                              optionFilterProp="children"
                                            >
                                              {questionsData.map((qst) => (
                                                <Option key={qst._id} value={qst.ref}>
                                                  {qst.ref}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                        )}
                                      </Space>

                                      <Divider orientation="left">Condition</Divider>
                                      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'conditions', 'field']}
                                          rules={[{ required: true, message: 'Field is required' }]}
                                        >
                                          <Input placeholder="Field" />
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'conditions', 'operator']}
                                          rules={[{ required: true, message: 'Operator is required' }]}
                                        >
                                          <Select placeholder="Operator">
                                            {['==', '!=', '>', '<', '>=', '<='].map(op => (
                                              <Option key={op} value={op}>{op}</Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'conditions', 'target']}
                                          rules={[{ required: true, message: 'Target is required' }]}
                                        >
                                          <Input placeholder="Target" />
                                        </Form.Item>
                                      </Space>

                                      <Button type="dashed" danger onClick={() => removeDynamic(dynamicName)} style={{ marginTop: 8 }}>
                                        Delete Dynamic Handle Next
                                      </Button>
                                    </div>
                                  );
                                })}
                                <Button
                                  type="dashed"
                                  onClick={() =>
                                    addDynamic({
                                      label: '',
                                      action: '',
                                      nextQst: undefined,
                                      conditions: { field: '', operator: '', target: '' }
                                    })
                                  }
                                  block
                                  style={{ marginLeft: 16 }}
                                >
                                  Add Dynamic Handle Next
                                </Button>
                              </>
                            )}
                          </Form.List>
                        </>
                      )}
                    </div>
                  );
                })}
                <Button type="dashed" onClick={() => add()} block>
                  Add Handle Next
                </Button>
              </>
            )}
          </Form.List>
        </TabPane>

        <TabPane tab="XHR Parameters" key="4">
          <Divider orientation="left">Inputs</Divider>
          <Form.List name={['xhrParams', 'inputs']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item name={[name, 'options']}>
                      <Input placeholder="Input options" />
                    </Form.Item>
                    <Form.Item name={[name, 'label']}>
                      <Input placeholder="Input label" />
                    </Form.Item>
                    <Form.Item name={[name, 'value']}>
                      <Input placeholder="Input value" />
                    </Form.Item>
                    <Button type="dashed" danger onClick={() => remove(name)}>
                      Delete
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Input
                </Button>
              </>
            )}
          </Form.List>

          <Divider orientation="left">Validation</Divider>
          <Form.Item name={['xhrParams', 'validation', 'type']}>
            <Input placeholder="Validation type" />
          </Form.Item>
          <Form.Item name={['xhrParams', 'validation', 'target']}>
            <Input placeholder="Validation target" />
          </Form.Item>
        </TabPane>
      </Tabs>

      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: 20 }}
        loading={isUpdating}
      >
        Update Question
      </Button>
    </Form>
  );
};

export default EditQuestion;