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
import { EllipsisOutlined } from "@ant-design/icons"

const Board = (props: PropsType): ReactElement => {
  return (
    <>
      <Col span={12}>
        <BoardContainer>
          <HeaderContainer>

            <h2>Board Name_1</h2>
            <div style={{ color: "" }}>
              <EllipsisOutlined />
            </div>

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
