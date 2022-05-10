import {ReactElement} from 'react';

import type {PropsType} from './types';
import { PlusCircleFilled } from '@ant-design/icons';
import { CustomDiv, InputStyle, LineInput, StyledText } from './styled';
import { Col, Form, Row, Space } from 'antd';

const BuilderQuizFillBlanks = (props: PropsType): ReactElement => {
  return <>
    <Row 
      justify='start' 
      style={{height: 35, marginBottom: 15}}>
      <Col flex={1} style={{justifyContent:'center', height: 35}}>
        <Form.Item>
          <LineInput />
        </Form.Item>
      </Col>
      <Col span={3} />
    </Row>
    <CustomDiv 
      onInput={(e:any) => {
        if(e.target.localName === 'div') {
          const a = e.target.innerText.split(/\s/);
          const b = e.target.innerHTML
            .replace(/<input class[=]\".{16}\">/g, " < ")
            .replace(/<span>|<\/span>/g, "")
            .split(/\s|&nbsp;/);
          console.log(b)
        }
      }} 
      contentEditable={true}
    >
    {"Complete the following pangram:&lt;The {0} {1} fox {2} over the {3} dog".split(' ').map((value, index) => {
      if (!value.includes('{')) {
        return (
          <>
            <span>{value}&nbsp;</span>
          </>
        );
      } else {
        // add ch value to input width
        return (
          <InputStyle
            onChange={(e) => console.log(e.target.value, index)}
          />
        );
      }
    })}
    </CustomDiv>
    <Space size={0} style={{margin:'35px 0 50px 0'}}>
      <StyledText fS={30}>
        <InputStyle w='195px' m='0 10px 0 0'/>
        <PlusCircleFilled />
      </StyledText>
      <StyledText fS={18}>ANSWER</StyledText>
    </Space>
  </>;
};

export default BuilderQuizFillBlanks;
