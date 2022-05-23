import { ReactElement, useEffect } from 'react';

import type { PropsType } from './types';
import { Modal, Button, Row, Col } from 'antd';
import { useState } from 'react';
import { StyledButton, ModalContainer } from './styled';
import Screen from 'components/Screen';
import './index.css'

const checkList = [
  { value: 1, title: "title1", descreption: 'praising pain was born and I will give you a complete1' },
  { value: 2, title: "title2", descreption: 'praising pain was born and I will give you a complete2' },
  { value: 3, title: "title3", descreption: 'praising pain was born and I will give you a complete3' },
  { value: 4, title: "title4", descreption: 'praising pain was born and I will give you a complete4' },
  { value: 4, title: "title4", descreption: 'praising pain was born and I will give you a complete4' },
]

const PublishOnBoarding = (props: PropsType): ReactElement => {

  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0)
  const [totalcount, setTotalcount] = useState({ selected: [], response: [] });


  const handleSelect = (event) => {

    const { checked, value } = event.target
    const { selected } = totalcount;

    if (checked) {
      setTotalcount({
        selected: [...selected, value],
        response: [...selected, value],
      })
      setCount(count + 1)
    }
    if (!checked) {
      setTotalcount({
        selected: selected.filter((e) => e !== value),
        response: selected.filter((e) => e !== value)
      })
      setCount(count - 1)

    }
    console.log(totalcount)
    console.log(count)
  }
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
        {checkList.map((item, index) => {
          return (
            <label className="form-control" key={index} >
              <div style={{ top: 100, left: 50 }}>
                <input id="selcet1" name="select1" type="checkbox" value={item.value} onChange={handleSelect} />
                <span className='checkmark' >
                  <h1 className='select-count' style={{ color: '#fff' }} >{totalcount.selected[index]}</h1>
                </span>
              </div>
              <Screen title={item.title} descreption={item.descreption} borderradius={15} key={index + 1} />
            </label>
          )
        })}
      </Row>
    </ModalContainer></>;
};

export default PublishOnBoarding;
