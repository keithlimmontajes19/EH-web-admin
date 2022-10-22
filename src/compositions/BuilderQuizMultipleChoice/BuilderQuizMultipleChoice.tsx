import { ReactElement } from 'react';

import Text from 'components/Text';
import Input from 'components/Input';
import { PlusCircleFilled, EditOutlined } from '@ant-design/icons';
import { Checkbox, Col, Row, Space } from 'antd';

const BuilderQuizMultipleChoice = ({ item, submitQ }: any): ReactElement => {
  const data = { ...item };

  return (
    <>
      <Row justify="start" style={{ marginBottom: 15 }} gutter={15}>
        <Col flex={1}>
          <Input
            isNaked={true}
            value={data?.title}
            placeholder="Multiple Choice Title"
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

      {(data || []).choices.map((x, i) => (
        <Row justify="start">
          <Col style={{ width: 50 }}>
            <Checkbox value={x} />
          </Col>
          <Col flex={1} style={{ justifyContent: 'center', height: 35 }}>
            <Input
              value={x}
              isNaked={true}
              placeholder={`Answer #${i + 1}`}
              // onChange={(e) => {
              //   data.choices[i] = e.target.value;
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
          // onClick={() => {
          //   data.resource.choices.push("");
          //   submitQ(data);
          // }}
          />
        </Text>
        <Text fS={18}>ANSWER</Text>
      </Space>
    </>
  );
};

export default BuilderQuizMultipleChoice;
