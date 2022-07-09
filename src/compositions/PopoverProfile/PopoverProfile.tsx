import {Fragment, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import type {PropsType} from './types';

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
import {Row, Col} from 'antd';
import {POPOVER_PROFILE} from './data';

const PopoverProfile = (props: PropsType): ReactElement => {
  const history = useHistory();
  const {children, src = '', name = '', organization = ''} = props;

  const pushHistory = (route: string) => history.push(route);

  const content = () => {
    return (
      <Fragment>
        {POPOVER_PROFILE.map((item, index) => (
          <ContentContainer
            index={index}
            key={item.title}
            onClick={() => pushHistory(item.url)}>
            <StyledImage source={item.icon} />
            <StyledText>{item.title}</StyledText>
            <StyledDivider />
          </ContentContainer>
        ))}

        <Row>
          <Col span={5}>
            <StyledAvatar size="small" source={src} />
          </Col>
          <Col>
            <StyledName>{name}</StyledName>
            <StyledSubtitle>{organization}</StyledSubtitle>
          </Col>
        </Row>
      </Fragment>
    );
  };

  return <StyledPopover title={content()}>{children}</StyledPopover>;
};

export default PopoverProfile;
