import React, { useEffect } from 'react';
import { Form, Input, Button, Tabs, Table, message, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetFlowByIdQuery,
  useUpdateFlowMutation
} from '../../../../../store/api/useFlow';
import {
  useGetQuestionsByFlowQuery,
  useDeleteQuestionMutation
} from '../../../../../store/api/useQuestion';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const { TabPane } = Tabs;

const EditFlow = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: flowData, isLoading: flowLoading } = useGetFlowByIdQuery(id);
  const {
    data: questionsData,
    isLoading: questionsLoading,
    refetch,
  } = useGetQuestionsByFlowQuery(id);

  const [updateFlow] = useUpdateFlowMutation();
  const [deleteQuestion, { isLoading: deleting }] = useDeleteQuestionMutation();

  useEffect(() => {
    if (flowData) {
      form.setFieldsValue({
        title: flowData.title,
        description: flowData.description,
        createdAt: flowData.createdAt,
        questions: questionsData || [],
      });
    }
  }, [flowData, questionsData, form]);

  const onFinish = async (values) => {
    try {
      await updateFlow({ id, updatedFlow: values }).unwrap();
      message.success('Flow updated successfully');
      navigate(`${APP_PREFIX_PATH}/dashboards/default/question/createQuestion`);
    } catch (error) {
      console.error('Failed to update flow:', error);
      message.error('Failed to update flow');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId).unwrap();
      message.success('Question deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete question:', error);
      message.error('Failed to delete question');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Flow Details" key="1">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Created At"
            name="createdAt"
            rules={[{ required: true, message: 'Please enter a date' }]}
          >
            <Input type="date" />
          </Form.Item>
        </TabPane>

        <TabPane tab="Questions" key="2">
          <Table
            dataSource={questionsData || []}
            rowKey="_id"
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
              },
              {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                  <Popconfirm
                    title="Are you sure you want to delete this question?"
                    onConfirm={(e) => {
                      e.stopPropagation(); // évite le trigger du onRow
                      handleDeleteQuestion(record._id);
                    }}
                    okText="Yes"
                    cancelText="No"
                    onCancel={(e) => e.stopPropagation()}
                  >
                    <Button
                      type="link"
                      danger
                      loading={deleting}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Remove
                    </Button>
                  </Popconfirm>
                ),
              },
            ]}
            loading={questionsLoading}
            pagination={false}
            onRow={(record) => ({
              onClick: () => navigate(`${APP_PREFIX_PATH}/dashboards/question/edit/${id}/${record._id}`),
              style: { cursor: 'pointer' },
            })}
          />
          <Button
            type="dashed"
            onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/question/create/${id}`)}
            style={{ marginTop: 16 }}
            block
          >
            Add a new question
          </Button>
        </TabPane>
      </Tabs>

      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: 20 }}
        loading={flowLoading}
      >
        Update Flow
      </Button>
    </Form>
  );
};

export default EditFlow;
