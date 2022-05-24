import { ReactElement } from "react";

import { Col, Form, Row, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { theme } from "utils/colors";

import Text from 'components/Text'
import Input from 'components/Input'

const BuilderQuizEssay = ({ item, submitQ, deleteQ }: any): ReactElement => {
  const data = { ...item };

  return (
    <div className="question">
      <Row justify="start" style={{ height: 35, marginBottom: 0 }}>
        <Col flex={1} style={{ justifyContent: "center", paddingRight: 35 }}>
          <Input
            isNaked={true}
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
            <Text fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </Text>
          </Row>
        </Col>
      </Row>
      <Row justify="start" style={{ height: 35, marginBottom: 50 }}>
        <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
          <Input
            isNaked={true}
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
              <Input
                isNaked={true}
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
