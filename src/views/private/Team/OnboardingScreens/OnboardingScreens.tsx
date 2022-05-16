import { ReactElement } from "react";
import { useState } from "react";

import type { PropsType } from "./types";
import {
  StyledButton,
  StyledButtonCreate,
  ScreensContainer,
  ModalContainer,
} from "./styled";
import Screen from "components/Screen";

import { Layout, PageHeader, Table, Input, Row, Col } from "antd";

const screens = [
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
  {
    title: "title1",
    descreption:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete",
    screentitle: "Screen Name 1",
  },
];
const OnboardingScreens = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Layout style={{ background: "none" }}>
        <PageHeader
          ghost={false}
          extra={[
            <>
              <StyledButtonCreate onClick={showModal}>
                CREATE
              </StyledButtonCreate>
              <ModalContainer
                visible={isModalVisible}
                title="Create Onboarding Screens"
                onCancel={handleCancel}
                onOk={handleOk}
                centered
              >
                <Input
                  placeholder="Sample Announcement_2"
                  style={{
                    borderRadius: "15px",
                    background: "#F8F8F8",
                    width: "485px",
                    height: "38px",
                    margin: "10px 0px",
                  }}
                  size="large"
                  aria-placeholder="Screen Name 1"
                  defaultValue="Screen Name 1"
                ></Input>
              </ModalContainer>
            </>,
            <StyledButton>PUBLISH</StyledButton>,
          ]}
        />
        <Row justify="center">
          {screens?.map((item, index) => (
            <Col>
              <Screen
                title={item.title}
                descreption={item.descreption}
                key={index}
                screentitle={item.screentitle}
              />
            </Col>
          ))}
        </Row>
      </Layout>
    </>
  );
};

export default OnboardingScreens;
