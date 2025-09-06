import React from 'react';
import { Descriptions, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetAnswerByIdQuery } from '../../../../../store/api/useAnswersApi';

const AnswerDetail = () => {
  const { answerId } = useParams();
  const { data: answer, isLoading } = useGetAnswerByIdQuery(answerId);

  if (isLoading) return <Spin />;

  return (
    <div>
      <h2>Answer Details</h2>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Submitted At">{new Date(answer?.createdAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Answers">
          <ul style={{ paddingLeft: '1rem' }}>
            {answer?.answers?.map((item, index) => (
              <li key={index}>
                <strong>{item.ref}</strong>:{" "}
                {Array.isArray(item.value)
                  ? item.value.join(', ')
                  : item.value?.toString()}
              </li>
            ))}
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default AnswerDetail;
