import { Fragment, ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { PropsType } from "./types";

/* styled antd */
import {
  Img,
  Heading,
  Container,
  NameStyled,
  Description,
  ImageContainer,
  ScreenContainer,
} from "./styled";
import { Row, Col, Popconfirm, message } from "antd";
import imageicon from "assets/icons/image-icon.svg";

/* icons */
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Screen = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const truncate = (string) => {
    const delimiter = "...";
    return string.length > 38 ? string.substr(0, 38) + delimiter : string;
  };

  const confirm = () => {
    dispatch(props.deleteOnboading(props.id));
  };

  const onEdit = () => {
    dispatch(props.getOneOnboarding(props.item));
    setTimeout(() => {
      history.push(`/team/onboarding/createonboard/${props.name}`);
    }, 100);
  };

  return (
    <Fragment>
      <Popconfirm
        okText={
          <a>
            <DeleteOutlined />
            &nbsp; Delete
          </a>
        }
        title={
          <a onClick={onEdit}>
            <EditOutlined style={{ marginLeft: -7 }} /> &nbsp; Edit
          </a>
        }
        icon={<></>}
        placement="right"
        onConfirm={confirm}
        showCancel={false}
        okButtonProps={{ type: "link" }}
        overlayInnerStyle={{ borderRadius: 10 }}
      >
        <ScreenContainer>
          <Row justify="center" gutter={18}>
            <Col span={24} style={{ backgroundColor: "transparent" }}>
              <Container style={{ borderRadius: `${props.borderradius}` }}>
                <ImageContainer>
                  <Img
                    alt="image"
                    width="201"
                    height="149"
                    src={props?.uri || imageicon}
                    style={{ objectFit: "cover" }}
                  />
                </ImageContainer>

                <Heading>{props.title}</Heading>
                <Description>{truncate(props.descreption)}</Description>
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
