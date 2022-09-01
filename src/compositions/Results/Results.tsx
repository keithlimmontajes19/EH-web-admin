import { Fragment, ReactElement, useState } from "react";
import type { PropsType } from "./types";

import { theme } from "utils/colors";
import { Row, Col, Collapse } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { AgChartsReact } from "ag-charts-react";

import {
  Container,
  StyledText,
  StyledResults,
  ModalContainer,
  CollapseContainer,
  StyledTextHeading,
  StyledButtonResult,
} from "./styled";

const Results = (props: PropsType): ReactElement => {
  const { data } = props;
  const [visible, setVisible] = useState(false);

  const toCollapse = (item) => {
    const colors = [];

    if (item?.statistics) {
      (item?.statistics || []).forEach((color) => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
      });
    }

    const options = {
      data: item?.statistics,
      series: [
        {
          type: "pie",
          strokes: "none",
          angleKey: "value",
          labelKey: "label",
          fills: colors,
        },
      ],
    };

    return (
      <Collapse ghost expandIconPosition="right">
        <Collapse.Panel
          key={item?._id}
          header={
            <Row>
              <Col>
                <p style={{ padding: "0px !important", margin: "0px" }}>
                  {item?.title}
                </p>
                {(item?.form || []).map((form) => {
                  return (
                    <h2 style={{ color: theme.GRAY }} key={form?._id}>
                      <EnterOutlined
                        style={{
                          margin: "0 10px 0 10px",
                          transform: "scale(-1,1)",
                        }}
                      />
                      {form?.title}
                    </h2>
                  );
                })}
              </Col>
            </Row>
          }
        >
          {item?.form.length ? (
            <Fragment>
              {(item?.form || []).map((form) => {
                return (
                  <Row justify="end" key={form?._id}>
                    <Col span={24}>
                      <StyledTextHeading>
                        Qusestion #1 ?
                      </StyledTextHeading>
                    </Col>
                  </Row>
                );
              })}

              <Row justify="end">
                <StyledText>{item?.answer.length} Participate</StyledText>
              </Row>
              <AgChartsReact options={options} />
            </Fragment>
          ) : (
            <p
              style={{
                fontSize: 18,
                color: "#e6e6e6",
                textAlign: "center",
              }}
            >
              No results found.
            </p>
          )}
        </Collapse.Panel>
      </Collapse>
    );
  };

  return (
    <Fragment>
      <StyledButtonResult onClick={() => setVisible(true)}>
        SEE RESULTS
      </StyledButtonResult>

      <ModalContainer
        centered
        width={1000}
        footer={false}
        title={<StyledResults>RESULTS</StyledResults>}
        visible={visible}
        maskClosable={false}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Container>
          {(data || []).map((item: any) => (
            <CollapseContainer key={item?._id}>{toCollapse(item)}</CollapseContainer>
          ))}
        </Container>
      </ModalContainer>
    </Fragment>
  );
};

export default Results;
