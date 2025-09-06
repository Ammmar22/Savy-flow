import React, { useEffect } from 'react';
import { Card, Spin, Button, List, Popconfirm, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { useGetFlowsQuery, useDeleteFlowMutation } from '../../../../../store/api/useFlow'; 
import { injectReducer } from '../../../../../store';
import flowReducer from '../../../../../store/slices/flowSlice';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const FlowAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { data: flowData, error, isLoading, refetch } = useGetFlowsQuery(); 
  const [deleteFlow] = useDeleteFlowMutation(); 

  useEffect(() => {
    injectReducer('flows', flowReducer);

  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteFlow(id).unwrap();
      message.success('Flow deleted successfully');
      refetch(); 
    } catch (error) {
      message.error('Failed to delete flow');
      
    }
  };

  if (isLoading) {
    return <Spin tip="Loading data..." />;
  }

  if (error) {
    return <p>Error loading flows</p>;
  }
  
  return (
    <div className="admin-page">
      <Card title="Flow Management" style={{ marginBottom: '20px' }}>
        {/* Bouton d'ajout de flow */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/flow/create`)}
          style={{ marginBottom: '20px' }} 
        >
          Add Flow
        </Button>

        {/* Liste des flows */}
        <List
          itemLayout="horizontal"
          dataSource={flowData}
          renderItem={(flow) => (
            <List.Item
              actions={[
                 <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/preview/flow/${flow._id}`)}
                >
                  Preview
                </Button>,
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/flow/edit/${flow._id}`)}
                >
                  Edit
                </Button>,
                <Popconfirm
                  title="Are you sure to delete this flow?"
                  onConfirm={() => handleDelete(flow._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={flow.title}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default FlowAdmin;
