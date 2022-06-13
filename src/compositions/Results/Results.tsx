import { ReactElement, useState } from 'react';
import type { PropsType } from './types';

import { theme } from 'utils/colors';
import { Row, Col, Collapse } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import { AgChartsReact } from 'ag-charts-react';

import {
  Container,
  StyledText,
  StyledButton,
  ModalContainer,
  StyledTextHeading,
  StyledButtonResult,
} from './styled';

const data = [{ title: ['Sample Survey_1'], participates: 49 }];

const pages = [<>Page1</>, 'page2', 'page3', 'page4'];
var options = {
  data: [
    {
      label: 'Sample Answere A',
      value: 50,
    },
    {
      label: 'Sample Answere B',
      value: 25,
    },
    {
      label: ' Sample Answere C',
      value: 25,
    },
  ],
  series: [
    {
      type: 'pie',
      angleKey: 'value',
      labelKey: 'label',
      strokes: 'none',
      fills: ['#AB70F1', '#FF4545', '#FF755B'],
    },
  ],
  highlightStyle: {
    fill: '#AB70F1',
  },
};

const series = {
  type: 'pie',
  angleKey: 'value',
  labelKey: 'label',
};
const Results = (props: PropsType): ReactElement => {
  const [visible, setVisible] = useState(false);

  const toCollapse = (arr, title) => (
    <Collapse ghost expandIconPosition="right">
      {arr.map((t) => (
        <>
          <Collapse.Panel
            header={
              <>
                <Row>
                  <Col>
                    <p style={{ padding: '0px !important', margin: '0px' }}>
                      {title}
                    </p>
                    <h2 style={{ color: theme.GRAY }}>
                      {' '}
                      <EnterOutlined
                        style={{
                          transform: 'scale(-1,1)',
                          margin: '0 10px 0 10px',
                        }}
                      />
                      {title}
                    </h2>
                  </Col>
                </Row>
              </>
            }
            key="1"
          >
            <Row justify="end">
              <Col span={24}>
                <StyledTextHeading> Sample Qusestion #1 ?</StyledTextHeading>
              </Col>
            </Row>
            <Row justify="end">
              <StyledText>{t.participates} Participate</StyledText>
            </Row>
            <AgChartsReact options={options} />
          </Collapse.Panel>
        </>
      ))}
    </Collapse>
  );

  return (
    <>
      <StyledButtonResult onClick={() => setVisible(true)}>
        SEE RESULTS
      </StyledButtonResult>

      <ModalContainer
        title="RESULTS"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        width={1000}
        footer={[
          <StyledButton onClick={() => setVisible(false)}>
            Publish
          </StyledButton>,
        ]}
      >
        <Container>
          {pages.map((title) => (
            <>{toCollapse(data, title)}</>
          ))}
        </Container>
      </ModalContainer>
    </>
  );
};

export default Results;
