import React from 'react';
import { Form, Input, Button, Select, Switch, Tabs, Space, Divider, message, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateQuestionMutation, useGetQuestionsByFlowQuery } from '../../../../../store/api/useQuestion';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { QuestionType } from '../../../../../constants/createQuestion';

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const CreateQuestion = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { flowId } = useParams();
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: questionsData = [], isLoading: isQuestionsLoading } = useGetQuestionsByFlowQuery(flowId);

  // Watch the entire handleNext array
  const handleNextValues = Form.useWatch('handleNext', form) || [];

  const onFinish = async (values) => {
    console.log('Form Values:', values);
    try {
      // Flatten dynamicHandleNext from all handleNext entries
      const dynamicHandleNext = values.handleNext
        .filter(h => h.action === 'validation' && h.dynamicHandleNext)
        .flatMap(h => h.dynamicHandleNext);
      
      const payload = {
        ...values,
        flow: flowId,
        dynamicHandleNext: dynamicHandleNext.length > 0 ? dynamicHandleNext : [],
        // Remove dynamicHandleNext from individual handleNext entries
        handleNext: values.handleNext.map(({ dynamicHandleNext, ...rest }) => rest),
      };
      const response = await createQuestion(payload).unwrap();
      console.log('API response:', response);
      messageApi.success('Question created successfully!');
      form.resetFields();
      navigate(`${APP_PREFIX_PATH}/dashboards/default/question/createQuestion`);
    } catch (error) {
      console.error('Failed to create question:', error);
      messageApi.error('Failed to create question. Please try again.');
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          required: false,
          xhrParams: {
            inputs: [],
            validation: {
              type: '',
              target: '',
            },
          },
          handleNext: [],
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic Info" key="1">
            <Form.Item name="ref" label="Reference" rules={[{ required: true, message: 'Reference is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="progress" label="Progress" rules={[{ required: true, message: 'Progress is required' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Question Type" rules={[{ required: true, message: 'Type is required' }]}>
              <Select placeholder="Select a type">
                {Object.values(QuestionType).map((type) => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="required" label="Required" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="infoTitle" label="Info Title">
              <Input />
            </Form.Item>
            <Form.Item name="info" label="Info">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="value" label="Value">
              <Input />
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
                        name={name}
                        // rules={[{ required: true, message: 'Option is required' }]}
                      >
                        <Input placeholder="Option value" />
                      </Form.Item>
                      <Button type="dashed" danger onClick={() => remove(name)}>
                        Remove
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

                    return (
                      <div key={key} style={{ marginBottom: 16, padding: 16, border: '1px solid #f0f0f0' }}>
                        <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'label']}
                            // rules={[{ required: true, message: 'Label is required' }]}
                          >
                            <Input placeholder="Label" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'action']}
                            // rules={[{ required: true, message: 'Action is required' }]}
                          >
                            <Select placeholder="Select action">
                              {['open_question', 'navigate', 'saveandfinish', 'validation'].map(action => (
                                <Option key={action} value={action}>{action}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'nextQst']}
                            // rules={isValidation ? [] : [{ required: true, message: 'Next question is required unless action is validation' }]}
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
                          <Button type="dashed" danger onClick={() => remove(name)}>
                            Remove
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
                                  {dynamicFields.map(({ key: dynamicKey, name: dynamicName, ...dynamicRestField }) => (
                                    <div key={dynamicKey} style={{ marginBottom: 16, padding: 16, border: '1px solid #e8e8e8', marginLeft: 16 }}>
                                      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'label']}
                                        //   rules={[{ required: true, message: 'Label is required' }]}
                                        >
                                          <Input placeholder="Label" />
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'action']}
                                        //   rules={[{ required: true, message: 'Action is required' }]}
                                        >
                                          <Select placeholder="Select action">
                                            {['open_question', 'navigate', 'saveandfinish', 'validation'].map(action => (
                                              <Option key={action} value={action}>{action}</Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'nextQst']}
                                        //   rules={[{ required: true, message: 'Next question is required' }]}
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
                                      </Space>

                                      <Divider orientation="left">Condition</Divider>
                                      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'conditions', 'field']}
                                        //   rules={[{ required: true, message: 'Field is required' }]}
                                        >
                                          <Input placeholder="Field" />
                                        </Form.Item>
                                        <Form.Item
                                          {...dynamicRestField}
                                          name={[dynamicName, 'conditions', 'operator']}
                                        //   rules={[{ required: true, message: 'Operator is required' }]}
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
                                        //   rules={[{ required: true, message: 'Target is required' }]}
                                        >
                                          <Input placeholder="Target" />
                                        </Form.Item>
                                      </Space>

                                      <Button type="dashed" danger onClick={() => removeDynamic(dynamicName)} style={{ marginTop: 8 }}>
                                        Remove Dynamic Handle Next
                                      </Button>
                                    </div>
                                  ))}
                                  <Button type="dashed" onClick={() => addDynamic()} block style={{ marginLeft: 16 }}>
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

          <TabPane tab="XHR Params" key="4">
            <Divider orientation="left">Inputs</Divider>
            <Form.List name={['xhrParams', 'inputs']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item name={[name, 'options']}>
                        <Input placeholder="Input Options" />
                      </Form.Item>
                      <Form.Item name={[name, 'label']}>
                        <Input placeholder="Input Label" />
                      </Form.Item>
                      <Form.Item name={[name, 'value']}>
                        <Input placeholder="Input Value" />
                      </Form.Item>
                      <Button type="dashed" danger onClick={() => remove(name)}>
                        Remove
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
              <Input placeholder="Validation Type" />
            </Form.Item>
            <Form.Item name={['xhrParams', 'validation', 'target']}>
              <Input placeholder="Validation Target" />
            </Form.Item>
          </TabPane>
        </Tabs>

        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 20 }}
          loading={isLoading}
        >
          Create Question
        </Button>
      </Form>
    </>
  );
};

export default CreateQuestion;