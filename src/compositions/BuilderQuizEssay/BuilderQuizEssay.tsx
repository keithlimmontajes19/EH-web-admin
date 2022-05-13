import { ReactElement } from "react";

import { LineInput, StyledText } from "./styled";
import { Col, Form, Row, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { theme } from "utils/colors";

const BuilderQuizEssay = ({ item, submitQ, deleteQ }: any): ReactElement => {
  const data = { ...item };

  return (
    <div className="question">
      <Row justify="start" style={{ height: 35, marginBottom: 0 }}>
        <Col flex={1} style={{ justifyContent: "center", paddingRight: 35 }}>
          <LineInput
            value={data.title}
            placeholder="Essay Title"
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col flex={23} />
        <Col span={3}>
          <Row justify="end">
            <StyledText fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </StyledText>
          </Row>
        </Col>
      </Row>
      <Row justify="start" style={{ height: 35, marginBottom: 50 }}>
        <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
          <LineInput
            defaultValue={data.description}
            placeholder="Essay Description"
            onChange={(e) => {
              data.description = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col span={3}>
          <Space
            align="baseline"
            size={4}
            style={{ fontWeight: 700, marginLeft: 10 }}
          >
            <Form.Item>
              <LineInput
                value={data.resource.points}
                placeholder="0"
                onChange={(e) => {
                  if (!/^\d{0,2}$/.test(e.target.value)) return;
                  data.resource = { points: e.target.value };
                  submitQ(data);
                }}
              />
            </Form.Item>
            points
            <EditOutlined style={{ fontSize: 20, color: theme.PRIMARY }} />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default BuilderQuizEssay;
