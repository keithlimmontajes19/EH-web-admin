import { ReactElement } from 'react';
import { Col, Form, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Input from 'components/Input';

const BuilderQuizEssay = ({ item, submitQ, setType }: any): ReactElement => {
  const data = { ...item };

  setType(item?.questionType);
  return (
    <div className="question">
      <Row justify="start" style={{ height: 35, marginBottom: 0 }}>
        <Col flex={23} />
      </Row>

      <Row justify="start" gutter={15}>
        <Col flex={1} style={{ justifyContent: 'center', height: 48 }}>
          <Input
            isNaked={true}
            defaultValue={data?.title}
            placeholder="Type essay question here.."
            style={{ height: 48, borderRadius: 8 }}
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>

        <Col span={5}>
          <Form.Item>
            <Input
              isNumber={true}
              value={data?.points}
              placeholder="0"
              onChange={(e) => {
                if (!/^\d{0,2}$/.test(e.target.value)) return;
                data.points = { points: e.target.value };
                submitQ(data);
              }}
              style={{
                height: 48,
                borderRadius: 8,
                border: '1px solid #635FFA',
              }}
            />
          </Form.Item>
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
    </div>
  );
};

export default BuilderQuizEssay;
