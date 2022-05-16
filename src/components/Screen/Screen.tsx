import { ReactElement } from "react";
import { Row, Col } from "antd";
import type { PropsType } from "./types";
import {
  ImageContainer,
  Img,
  Description,
  Heading,
  Container,
  ScreenTitle,
} from "./styled";

// icons imported here

import imageicon from "assets/icons/image-icon.svg";
const Screen = (props: PropsType): ReactElement => {
  return (
    <Row
      justify="center"
      style={{ borderRadius: "15px", background: "#fff", padding: "15px" }}
    >
      <Col span={24}>
        <Container>
          <ImageContainer>
            <Img src={imageicon} alt="image" />
          </ImageContainer>
          <Heading>{props.title}</Heading>
          <Description>{props.descreption}</Description>
        </Container>
        <ScreenTitle>
          <h4>{props.screentitle}</h4>
        </ScreenTitle>
      </Col>
    </Row>
  );
};

export default Screen;
