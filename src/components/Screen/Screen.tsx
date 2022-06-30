import { Fragment, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import type { PropsType } from './types';

/* styled antd */
import {
  Img,
  Heading,
  Container,
  NameStyled,
  Description,
  ImageContainer,
  ScreenContainer,
} from './styled';
import { Row, Col, Popconfirm } from 'antd';
import imageicon from 'assets/icons/image-icon.svg';

/* icons */
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Screen = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const truncate = (string, count) => {
    const delimiter = '...';
    return string.length > count ? string.substr(0, count) + delimiter : string;
  };

  const confirm = () => {
    dispatch(props.deleteOnboading(props.id));
  };

  const onEdit = () => {
    dispatch(props.getOneOnboarding(props.item));
    setTimeout(() => {
      history.push(`/team/onboarding/edit/${props.name}`);
    }, 100);
  };

  return (
    <Fragment>
      <Popconfirm
        okText={
          <a>
            <DeleteOutlined /> &nbsp;{' '}
            <span style={{ color: '#4C4B7B' }}>Delete</span>
          </a>
        }
        title={
          <a onClick={onEdit}>
            <EditOutlined style={{ marginLeft: -7 }} /> &nbsp;{' '}
            <span style={{ color: '#4C4B7B' }}>Edit</span>
          </a>
        }
        icon={<></>}
        placement="right"
        showCancel={false}
        onConfirm={confirm}
        okButtonProps={{ type: 'link' }}
        overlayInnerStyle={{ borderRadius: 10 }}
      >
        <ScreenContainer>
          <Row justify="center" gutter={18}>
            <Col span={24} style={{ backgroundColor: 'transparent' }}>
              <Container style={{ borderRadius: `${props.borderradius}` }}>
                <ImageContainer>
                  <Img
                    width="201"
                    height="149"
                    src={props?.uri || imageicon}
                    style={{ objectFit: 'cover' }}
                  />
                </ImageContainer>

                <Heading>{truncate(props.title, 10)}</Heading>
                <Description>{truncate(props.descreption, 38)}</Description>
              </Container>
            </Col>
          </Row>
        </ScreenContainer>
      </Popconfirm>

      <NameStyled>{props?.name}</NameStyled>
    </Fragment>
  );
};

export default Screen;
