import { ReactElement } from "react";

import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { LineInput, StyledText } from "./styled";
import { Col, Radio, Row, Space } from "antd";

const BuilderQuizSingleChoice = ({
  item,
  submitQ,
  deleteQ,
}: any): ReactElement => {
  const data = { ...item };

  return (
    <Radio.Group
      defaultValue={data.resource.answer}
      onChange={(e) => {
        data.resource.answer = e.target.value;
        submitQ(data);
      }}
      className="question"
    >
      <Row justify="start" style={{ marginBottom: 15 }}>
        <Col flex={1} style={{ justifyContent: "center", paddingRight: 35 }}>
          <LineInput
            value={data.title}
            placeholder="Single Choice Title"
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col flex={23} style={{ justifyContent: "center" }}>
          <LineInput
            defaultValue={data.description}
            placeholder="Single Choice Description"
            onChange={(e) => {
              data.description = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col span={3}>
          <Row justify="end">
            <StyledText fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </StyledText>
          </Row>
        </Col>
      </Row>
      {data.resource.choices.map((x, i) => (
        <Row justify="start">
          <Col style={{ width: 50 }}>
            <Radio value={x} />
          </Col>
          <Col flex={1} style={{ justifyContent: "center", height: 35 }}>
            <LineInput
              value={x}
              placeholder={`Answer #${i + 1}`}
              onChange={(e) => {
                data.resource.choices[i] = e.target.value;
                submitQ(data);
              }}
            />
          </Col>
          <Col span={3} />
        </Row>
      ))}
      <Space size={0} style={{ margin: "10px 0 50px 50px" }}>
        <StyledText fS={30}>
          <PlusCircleFilled
            onClick={() => {
              data.resource.choices.push("");
              submitQ(data);
            }}
          />
          <MinusCircleFilled
            onClick={() => {
              if (data.resource.choices.length <= 1) return;
              data.resource.choices.pop();
              submitQ(data);
            }}
          />
        </StyledText>
        <StyledText fS={18}>ANSWER</StyledText>
      </Space>
    </Radio.Group>
  );
};

export default BuilderQuizSingleChoice;
