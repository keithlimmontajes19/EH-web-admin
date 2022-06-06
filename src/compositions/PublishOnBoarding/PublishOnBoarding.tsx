import { Fragment, ReactElement, useEffect, useState } from "react";
import type { PropsType } from "./types";

import {
  Img,
  Heading,
  Container,
  Description,
  StyledButton,
  ModalContainer,
  ImageContainer,
  ScreenContainer,
} from "./styled";
import "./index.css";
import { Row, Col } from "antd";

/* reducer action */
import { useDispatch } from "react-redux";
import { publishOnboarding } from "ducks/onboarding/actionCreator";

const PublishOnBoarding = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const publishItems = [];

    (props?.data?.data || []).map((item) => {
      if (item?.isPublish) {
        publishItems.push(item?._id);
      }
    });

    setSelected(publishItems);
  }, [props?.data?.data]);

  const changeSelected = (item: any) => {
    let objectOriginal = Array.from(selected);

    if (!objectOriginal.includes(item?._id)) {
      objectOriginal.push(item?._id);
      setSelected(objectOriginal);
    } else {
      const findIndex = objectOriginal.findIndex((x) => x === item?._id);
      objectOriginal = objectOriginal.slice(0, findIndex);
      setSelected(objectOriginal);
    }
  };

  const Screens = (item) => {
    const isPublish = selected.includes(item?._id);
    const findIndex = selected.findIndex((x) => x === item?._id);

    return (
      <ScreenContainer
        onClick={() => changeSelected(item)}
        isPublish={isPublish}
      >
        {isPublish && (
          <Row justify="center">
            <div
              style={{
                zIndex: 999,
                marginTop: 150,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  textAlign: "center",
                  backgroundColor: "#635FFA",
                }}
              >
                <h1 style={{ color: "#fff", padding: "25px 0px" }}>
                  {isPublish && findIndex + 1}
                </h1>
              </div>
            </div>
          </Row>
        )}

        <Row justify="center" gutter={18}>
          <Col span={24} style={{ backgroundColor: "transparent" }}>
            <Container style={{ borderRadius: 10 }}>
              <ImageContainer>
                <Img
                  alt="image"
                  width="201"
                  height="149"
                  src={item?.imageURL || ""}
                  style={{ objectFit: "cover" }}
                />
              </ImageContainer>

              <Heading>{item?.title}</Heading>
              <Description>{item?.description}</Description>
            </Container>
          </Col>
        </Row>
      </ScreenContainer>
    );
  };

  return (
    <Fragment>
      <StyledButton Publish onClick={() => setVisible(true)}>
        Publish
      </StyledButton>

      <ModalContainer
        centered
        width={1000}
        visible={visible}
        title="Publish Onboarding Screens"
        onCancel={() => setVisible(false)}
        footer={[
          <StyledButton
            onClick={() => {
              dispatch(publishOnboarding(selected));

              setTimeout(() => {
                setVisible(false);
              }, 500);
            }}
          >
            Publish
          </StyledButton>,
        ]}
      >
        <Row justify="center">
          {(props?.data?.data || []).map((item) => {
            return Screens(item);
          })}
        </Row>
      </ModalContainer>
    </Fragment>
  );
};

export default PublishOnBoarding;
