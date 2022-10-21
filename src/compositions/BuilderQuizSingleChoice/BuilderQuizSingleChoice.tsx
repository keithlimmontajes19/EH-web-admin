import { ReactElement, useEffect, useState } from 'react';

import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import Text from 'components/Text';
import Input from 'components/Input';
import { Col, Radio, Row, Space } from 'antd';

const BuilderQuizSingleChoice = ({
  item,
  submitQ,
  deleteQ,
}: any): ReactElement => {
  const data = { ...item };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(data?.choices);
  }, [data?.choices]);

  return (
    <>
      <Row justify="start" style={{ marginBottom: 15 }}>
        <Col span={24}>
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
          <Row justify="end">
            <Text fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </Text>
          </Row>
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
