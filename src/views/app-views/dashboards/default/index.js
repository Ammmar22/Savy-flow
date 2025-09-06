import React from "react";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const DefaultIndex = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={16} style={{ marginTop: 50 }}>
      <Col span={8}>
        <Card
          title="Startup Management"
          bordered={false}
          hoverable
          onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/default/startup`)}
        />
      </Col>
      <Col span={8}>
        <Card
          title="Flow Management"
          bordered={false}
          hoverable
          onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/default/flow`)}
        />
      </Col>
      <Col span={8}>
        <Card
          title="Questionnaire"
          bordered={false}
          hoverable
          onClick={() => navigate(`${APP_PREFIX_PATH}/dashboards/default/questionnaire`)}
        />
      </Col>
    </Row>
  );
};

export default DefaultIndex;
