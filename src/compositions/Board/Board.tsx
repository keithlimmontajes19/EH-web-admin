import { ReactElement } from "react";

import type { PropsType } from "./types";
import { Row, Col } from "antd";

import {
  BoardContainer,
  HeaderContainer,
  BodyContainer,
  Darkdot,
} from "./styled";
import Folder from "components/Folder";
import File from "components/File";

const Board = (props: PropsType): ReactElement => {
  return (
    <>
      <Col span={12}>
        <BoardContainer>
          <HeaderContainer>
            <Row justify="space-between">
              <Col span={6}>Board Name_1</Col>
              <Col span={6} style={{ color: "" }}>
                <Darkdot />
              </Col>
            </Row>
          </HeaderContainer>
          <BodyContainer>
            <Row justify="space-around">
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <File />
              <File />
              <File />
              <File />
              <File />
            </Row>
          </BodyContainer>
        </BoardContainer>
      </Col>
    </>
  );
};

export default Board;
