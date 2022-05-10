import {ReactElement} from 'react';

import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import type {PropsType} from './types';
import { LineInput, StyledText } from './styled';
import { Col, Form, Input, Radio, Row, Space } from 'antd';
import { theme } from 'utils/colors';

const BuilderQuizSingleChoice = (props: PropsType): ReactElement => {
  return <>
    <Radio.Group 
      defaultValue={1} 
      onChange={(e)=>console.log(e.target.value)}>
          <Row 
            justify='start' 
            style={{height: 35, marginBottom: 15}}>
            <Col flex={1} style={{justifyContent:'center', height: 35}}>
              <Form.Item>
              <LineInput/>
              </Form.Item>
            </Col>
            <Col span={3} />
          </Row>
          <Row 
            justify='start' 
            style={{height: 35}}>
            <Col span={1} style={{height: 35}}>
              <Radio value={1} />
            </Col>
            <Col flex={1} style={{justifyContent:'center', height: 35}}>
              <Form.Item>
              <LineInput/>
              </Form.Item>
            </Col>
            <Col span={3} />
          </Row>
          <Row 
            justify='start' 
            style={{height: 35}}>
            <Col span={1} style={{height: 35}}>
              <Radio value={2} />
            </Col>
            <Col flex={1} style={{justifyContent:'center', height: 35}}>
              <Form.Item>
              <LineInput/>
              </Form.Item>
            </Col>
            <Col span={3} />
          </Row>
          <Row 
            justify='start' 
            style={{height: 35}}>
            <Col span={1} style={{height: 35}}>
              <Radio value={3} />
            </Col>
            <Col flex={1} style={{justifyContent:'center', height: 35}}>
              <Form.Item>
              <LineInput/>
              </Form.Item>
            </Col>
            <Col span={3} />
          </Row>
          <Space size={0} style={{margin:'10px 0 50px 35px'}}>
        <StyledText fS={30}>
          <PlusCircleFilled />
          <MinusCircleFilled />
          </StyledText>
          <StyledText fS={18}>ANSWER</StyledText>
        </Space>
      </Radio.Group>
  </>;
};

export default BuilderQuizSingleChoice;
