import { ReactElement } from 'react';
import { useState } from 'react';
import type { PropsType } from './types';
import { Modal, Button, Row, Col, Collapse, } from 'antd';
import { EnterOutlined } from "@ant-design/icons"
import { theme } from 'utils/colors';
import ReactApexChart from 'react-apexcharts'

import { StyledButton, ModalContainer } from './styled';

const data = [
  { title: ['page1'] },

];
var series: [44, 55, 13, 43, 22]
var options = [{
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}]
const Results = (props: PropsType): ReactElement => {
  const [visible, setVisible] = useState(false);

  const toCollapse = (arr) => (
    <Collapse ghost>
      <Collapse.Panel header={"page1"} key="1">
        {arr.map((t) => (
          <p>
            <EnterOutlined
              style={{
                transform: 'scale(-1,1)',
                margin: '0 10px 0 21px',
              }}
            />
            <span style={{ color: theme.GRAY }}>{t.title}</span>
            {/* <ApexCharts options={Option} /> */}
            {/* <ReactApexChart options={options} series={series} type="pie" width="380" /> */}
          </p>
        ))}
      </Collapse.Panel>
    </Collapse>
  )
  return <>
    <StyledButton onClick={() => setVisible(true)}>
      See Results
    </StyledButton>
    <ModalContainer
      title="RESULTS"
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      width={1000}
      footer={[<StyledButton onClick={() => setVisible(false)}>Publish</StyledButton>]}
    >
      {toCollapse(data)}

    </ModalContainer>
  </>;
};

export default Results;
