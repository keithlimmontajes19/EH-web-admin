import { Fragment, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import type { PropsType } from './types';

import {
  StyledText,
  StyledName,
  StyledImage,
  StyledAvatar,
  StyledPopover,
  StyledDivider,
  StyledSubtitle,
  ContentContainer,
} from './styled';
import { Row, Col } from 'antd';
import { POPOVER_PROFILE } from './data';

/* reducer */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

const PopoverProfile = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { children } = props;
  const { user_details }: any = useSelector<RootState>(
    (state) => state.authentication
  );

  const pushHistory = (route: string) => history.push(route);

  const content = () => {
    return (
      <Fragment>
        {POPOVER_PROFILE.map((item, index) => (
          <ContentContainer
            index={index}
            key={item.title}
            onClick={() => {
              if (item.title === 'Log Out') {
                localStorage.clear();
                dispatch({ type: 'GET_AUTHENTICATION_FAILED' });
              } else {
                pushHistory(item.url);
              }
            }}
          >
            <StyledImage source={item.icon} />
            <StyledText>{item.title}</StyledText>
            <StyledDivider />
          </ContentContainer>
        ))}

        <Row>
          <Col span={5}>
            <StyledAvatar size="small" source={user_details?.profile?.avatar} />
          </Col>
          <Col>
            <StyledName>
              {user_details?.profile?.firstName || ''}{' '}
              {user_details?.profile?.lastName || ''}
            </StyledName>
            <StyledSubtitle>
              {user_details?.profile?.email || ''}
            </StyledSubtitle>
          </Col>
        </Row>
      </Fragment>
    );
  };

  return <StyledPopover title={content()}>{children}</StyledPopover>;
};

export default PopoverProfile;
