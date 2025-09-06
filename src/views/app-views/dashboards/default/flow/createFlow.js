import React from 'react';
import { Form, Input, Button, Tabs, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateFlowMutation } from '../../../../../store/api/useFlow'; // Assurez-vous que ce hook existe
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const { TabPane } = Tabs;

const CreateFlow = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createFlow] = useCreateFlowMutation();

  const onFinish = async (values) => {
    try {
      const response = await createFlow(values).unwrap();
      console.log('API response:', response);
      navigate(`${APP_PREFIX_PATH}/dashboards/default`);
    } catch (error) {
      console.error('Failed to create flow:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Flow Details" key="1">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}> 
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Created At" name="createdAt" rules={[{ required: true, message: 'Please enter a date' }]}> 
            <Input type="date" />
          </Form.Item>
        </TabPane>

        <TabPane tab="Questions" key="2">
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                <Table
                  dataSource={fields.map((field) => ({ key: field.key, ...field }))}
                  columns={[
                    {
                      title: 'Question',
                      dataIndex: 'name',
                      key: 'name',
                      render: (text, record) => (
                        <Form.Item
                          name={[record.name, 'question']}
                          rules={[{ required: true, message: 'Enter a question' }]}
                        >
                          <Input placeholder="Enter a question" />
                        </Form.Item>
                      ),
                    },
                    {
                      title: 'Action',
                      key: 'action',
                      render: (_, record) => (
                        <Button type="dashed" onClick={() => remove(record.name)} danger>
                          Remove
                        </Button>
                      ),
                    },
                  ]}
                />
                <Button type="dashed" onClick={() => add()} block>
                  Add Question
                </Button>
              </>
            )}
          </Form.List>
        </TabPane>
      </Tabs>

      <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
        Create Flow
      </Button>
    </Form>
  );
};

export default CreateFlow;
