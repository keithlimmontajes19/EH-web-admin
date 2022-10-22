import { ReactElement, useEffect, useState } from 'react';

import { Col, Radio, Row, Space } from 'antd';
import { PlusCircleFilled, EditOutlined } from '@ant-design/icons';

import Text from 'components/Text';
import Input from 'components/Input';

const BuilderQuizSingleChoice = ({ item, submitQ }: any): ReactElement => {
  const data = { ...item };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(data?.choices);
  }, [data?.choices]);

  return (
    <>
      <Row justify="start" style={{ marginBottom: 15 }} gutter={15}>
        <Col flex={1}>
          <Input
            isNaked={true}
            defaultValue={data?.title}
            placeholder="Single Choice Title"
            style={{ height: 48, borderRadius: 8 }}
            // onChange={(e) => {
            //   data.title = e.target.value;
            //   submitQ(data);
            // }}
          />
        </Col>

        <Col span={3}>
          <Input
            placeholder="0"
            isNumber={true}
            value={data?.points}
            onChange={(e) => {
              if (!/^\d{0,2}$/.test(e.target.value)) return;
              data.points = { points: e.target.value };
              submitQ(data);
            }}
            style={{
              height: 48,
              maxWidth: 255,
              borderRadius: 8,
              border: '1px solid #635FFA',
            }}
          />
        </Col>

        <Col>
          <p>
            <br />
            point
            <EditOutlined
              style={{ fontSize: 20, color: '#4C4B7B', marginLeft: 5 }}
            />
          </p>
        </Col>
      </Row>

      {(answers || []).map((x, i) => (
        <Row justify="start">
          <Col style={{ width: 30, marginTop: 2 }}>
            <Radio value={x} defaultChecked={x === data?.answer} />
          </Col>

          <Col flex={1} style={{ justifyContent: 'center', height: 40 }}>
            <Input
              isNaked={true}
              defaultValue={x}
              placeholder={`Answer #${i + 1}`}
              // onChange={(e) => {
              //   data.resource.choices[i] = e.target.value;
              //   submitQ(data);
              // }}
            />
          </Col>
          <Col span={3} />
        </Row>
      ))}

      <Space size={0} style={{ margin: '10px 0 50px 50px' }}>
        <Text fS={30}>
          <PlusCircleFilled
            onClick={() => {
              const newObject = Array.from(answers);

              newObject.push('');

              setAnswers(newObject);
            }}
          />
          {/* <MinusCircleFilled
          // onClick={() => {
          //   if (data.resource.choices.length <= 1) return;
          //   data.resource.choices.pop();
          //   submitQ(data);
          // }}
          /> */}
        </Text>
        <Text fS={18}>ANSWER</Text>
      </Space>
    </>
  );
};

export default BuilderQuizSingleChoice;
