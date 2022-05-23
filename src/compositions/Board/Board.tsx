import { ReactElement } from 'react';

import type { PropsType } from './types';
import { Row, Col } from 'antd';

import {
  BoardContainer,
  HeaderContainer,
  BodyContainer,
  Darkdot,
} from './styled';
import Folder from 'components/Folder';
import File from 'components/File';
import { EllipsisOutlined } from '@ant-design/icons';

const Board = (props: PropsType): ReactElement => {
  const { item } = props;

  return (
    <>
      <Col span={12}>
        <BoardContainer>
          <HeaderContainer>
            <h2>{item?.board_name}</h2>
            <div style={{ fontSize: 30 }}>
              <EllipsisOutlined />
            </div>
          </HeaderContainer>

          <BodyContainer>
            <Row justify="space-around">
              {(item?.board_items || []).map((pages, index) => {
                return pages?.item_type === 'folder' ? (
                  <Folder key={index} pages={pages} />
                ) : (
                  <File name={pages?.item_name} />
                );
              })}
            </Row>
          </BodyContainer>
        </BoardContainer>
      </Col>
    </>
  );
};

export default Board;
