import {ReactElement} from 'react';

import type {PropsType} from './types';
import { LineInput } from './styled';
import { Col, Form, Row, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { theme } from 'utils/colors';

const BuilderQuizEssay = (props: PropsType): ReactElement => {
  return <>
    <Row 
      justify='start' 
      style={{height: 35, marginBottom: 45}}>
      <Col flex={1} style={{justifyContent:'center', height: 35}}>
        <Form.Item>
          <LineInput />
        </Form.Item>
      </Col>
      <Col span={3} >
        <Space align='baseline' size={4} style={{fontWeight: 700, marginLeft: 10}}>
        <Form.Item>
          <LineInput />
        </Form.Item>
        points
        <EditOutlined style={{fontSize: 20, color: theme.PRIMARY}} />
        </Space>
      </Col>
    </Row>
  </>;
};

export default BuilderQuizEssay;
