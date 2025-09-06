import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAnswersQuery } from '../../../../../store/api/useAnswersApi';
import moment from 'moment';
import { APP_PREFIX_PATH } from 'configs/AppConfig';


const AnswerList = () => {
  const navigate = useNavigate();
  const { data: answers = [], isLoading } = useGetAnswersQuery();

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            navigate(`${APP_PREFIX_PATH}/dashboards/default/questionnaire/answers/${record._id}`);
          }}        >
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Answer List</h2>
      <Table
        rowKey="_id"
        dataSource={answers}
        columns={columns}
        loading={isLoading}
      />
    </div>
  );
};

export default AnswerList;
