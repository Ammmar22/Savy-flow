import React, { useEffect } from 'react';
import { Card, Spin, Button, List, Popconfirm, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { useGetStartupsQuery, useDeleteStartupMutation } from '../../../../../store/api/useStartup'; 
import { injectReducer } from '../../../../../store';
import startupReducer from '../../../../../store/slices/startupSlice';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const StartupAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { data: startupData, error, isLoading, refetch } = useGetStartupsQuery(); 
  const [deleteStartup] = useDeleteStartupMutation(); 

  useEffect(() => {
    injectReducer('startups', startupReducer);
    
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteStartup(id).unwrap();
      message.success('Startup deleted successfully');
      refetch(); // Rafraîchir les données après la suppression
    } catch (error) {
      message.error('Failed to delete startup');
    }
  };

  if (isLoading) {
    return <Spin tip="Loading data..." />;
  }

  if (error) {
    return <p>Error loading startups</p>;
  }
  

  return (
    <div className="admin-page">
      <Card title="Startup Management" style={{ marginBottom: '20px' }}>
        {/* Bouton d'ajout de startup toujours visible */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/startup/create`)}
          style={{ marginBottom: '20px' }} 
        >
          Add Startup
        </Button>

        {/* Liste des startups */}
        <List
          itemLayout="horizontal"
          dataSource={startupData}
          renderItem={(startup) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/startup/edit/${startup.id}`)}
                >
                  Edit
                </Button>,
                <Popconfirm
                  title="Are you sure to delete this startup?"
                  onConfirm={() => handleDelete(startup.id)}
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
                title={startup.companyDetails.companyName}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default StartupAdmin;
