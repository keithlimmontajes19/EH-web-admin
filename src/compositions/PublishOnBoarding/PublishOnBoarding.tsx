import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Modal, Button, Row, Col } from 'antd';
import { useState } from 'react';
import { StyledButton, ModalContainer } from './styled';
import Screen from 'components/Screen';

const PublishOnBoarding = (props: PropsType): ReactElement => {

  const [visible, setVisible] = useState(false);
  return <>
    <StyledButton Publish onClick={() => setVisible(true)}>
      Publish
    </StyledButton>
    <ModalContainer
      title="Publish Onboarding Screens"
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      width={1000}
      footer={[<StyledButton onClick={() => setVisible(false)}>Publish</StyledButton>]}
    >
      <Row justify='center'>
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
        <Screen title='title' descreption='praising pain was born and I will give you a complete"' borderradius={15} />
      </Row>
    </ModalContainer></>;
};

export default PublishOnBoarding;
