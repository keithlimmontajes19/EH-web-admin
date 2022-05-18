import { ReactElement, useEffect } from "react";
import { Row, Col, Popover } from "antd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import type { PropsType } from "./types";
import {
  ImageContainer,
  Img,
  Description,
  Heading,
  Container,
  ScreenTitle,
  Contentdiv
} from "./styled";

// icons imported here

import imageicon from "assets/icons/image-icon.svg";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const content = (
  <div style={{ fontSize: "18px" }}>

    <Contentdiv>
      <EditOutlined
        style={{
          color: "#635ffa",
          fontSize: "18px",
          padding: "10px 10px",
        }}
      />
      Edit
    </Contentdiv>

    <Contentdiv style={{ padding: "0px" }}>
      <DeleteOutlined
        style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
      />
      Delete
    </Contentdiv>
  </div>
);
const Screen = (props: PropsType): ReactElement => {

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      // event.preventDefault();
    });
  }, [])
  return (
    <>
      <ContextMenu id="contextmenu">

        <div style={{ fontSize: "16px", background: '#fff', borderRadius: '15px' }}>

          <Contentdiv>
            <EditOutlined
              style={{
                color: "#635ffa",
                fontSize: "14px",
                padding: "10px 10px",
              }}
            />
            Edit
          </Contentdiv>

          <Contentdiv style={{ padding: "0px" }}>
            <DeleteOutlined
              style={{ color: "#635ffa", fontSize: "16px", padding: "10px 10px" }}
            />
            Delete
          </Contentdiv>
        </div>

      </ContextMenu>
      <ContextMenuTrigger id="contextmenu">
        <Row
          justify="center"
          style={{ borderRadius: "15px", background: `#fff`, padding: "15px" }}
        >

          <Col span={24} >
            <Container style={{ borderRadius: `${props.borderradius}` }}>
              {console.log(props.borderradius)}
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
      </ContextMenuTrigger>
    </>
  );
};

export default Screen;
