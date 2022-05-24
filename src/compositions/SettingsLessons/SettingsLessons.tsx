import {Col, Row} from 'antd';
import {useState} from 'react';
import {theme} from 'utils/colors';
import {
  HeaderDiv,
  SettingsContainer,
  StyledCollapse,
  StyledPanel,
} from './styled';
import StyledButton from 'components/StyledButton'

const SaveButtons = () => (
  <Row justify="end">
    <Col>
      <StyledButton bg={'none'} c={theme.BLACK}>
        CANCEL
      </StyledButton>
      <StyledButton htmlType="submit">SAVE</StyledButton>
    </Col>
  </Row>
);

const panels = [
  {
    title: 'Lesson Display Settings',
    sub: '',
  },
  {
    title: 'Lesson Categories',
    sub: 'Control which taxonomies can be used to better organize your lessons',
  },
  {
    title: 'Lesson Access Settings',
    sub: 'Controls the timing and way lessons can be accessed',
  },
  {
    title: 'Lesson Display & Content Options',
    sub: 'Controls the look and feel of the lesson and optional content settings',
  },
];

function SettingsLessons() {
  const [activeKey, setActiveKey]: any = useState([]);

  return (
    <SettingsContainer>
      <StyledCollapse
        bordered={false}
        expandIconPosition={'right'}
        defaultActiveKey={[]}
        activeKey={activeKey}
        onChange={(newArr) => setActiveKey(newArr)}
      >
        {panels.map((obj, i) => (
          <StyledPanel
            header={
              <>
                <HeaderDiv>
                  <div className="panel-title">{obj.title}</div>
                  {obj.sub !== '' && (
                    <div className="panel-subtitle">{obj.sub}</div>
                  )}
                </HeaderDiv>
              </>
            }
            key={i.toString()}
          >
            <SaveButtons />
          </StyledPanel>
        ))}
      </StyledCollapse>
    </SettingsContainer>
  );
}

export default SettingsLessons;
