import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* styles antd */
import { Breadcrumb, PageHeader } from 'antd';
import { RootContainer, FlexWrap } from './styled';
import { RedoOutlined, MoreOutlined } from '@ant-design/icons';
import { StyledText } from 'compositions/TableDashboards/styled';

/* components */
import Board from 'compositions/Board';
import ListOfPages from 'compositions/ListOfPages';

/* reducer action */
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';
import { getOneDashboard } from 'ducks/dashboard/actionCreator';

const AddBoard = () => {
  const history = useHistory();

  const { single_dashboard }: any = useSelector<RootState>(
    (state) => state.dashboard
  );

  useEffect(() => {
    let boardID = history?.location?.search;
    boardID = boardID.replace('?', '');

    getOneDashboard(boardID);
  }, []);

  const boardName = single_dashboard?.data.length
    ? single_dashboard?.data[0].name
    : '';

  return (
    <RootContainer style={{ background: 'none !important' }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/team/dashboards"> {`< Back to Dashboards`}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <PageHeader
        title={<StyledText>{boardName}</StyledText>}
        extra={[
          <RedoOutlined
            style={{
              fontSize: '25px',
              paddingRight: '24px',
              cursor: 'pointer',
            }}
          />,
          <ListOfPages />,
          <MoreOutlined
            style={{ fontSize: '26px', color: '#635FFA', cursor: 'pointer' }}
          />,
        ]}
      />

      <FlexWrap>
        {(single_dashboard?.data || []).map((item) => {
          return (item?.boards || []).map((board, index) => {
            return <Board key={index} item={board} />;
          });
        })}
      </FlexWrap>
    </RootContainer>
  );
};

export default AddBoard;
