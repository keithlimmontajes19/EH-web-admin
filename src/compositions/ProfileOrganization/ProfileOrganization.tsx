import { Fragment, ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  StyledName,
  HeaderStyles,
  StyledCreate,
  StyledMembers,
  UserContainer,
  StyledPosition,
} from "./styled";
import { Row, Col, PageHeader } from "antd";

import Avatar from "components/Avatar/Avatar";
import ORG_IMAGE from "assets/icons/organization.png";

import { DUMMY_DATA } from "./data";

/* reducer action */
import { useSelector, useDispatch } from "react-redux";
import { getListOrganization } from "ducks/organization/actionCreator";

const ProfileOrganization = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const states: any = useSelector<any>((state) => state.organization);

  console.log(states);

  useEffect(() => {
    dispatch(getListOrganization());
  }, []);

  return (
    <Fragment>
      <UserContainer>
        <PageHeader
          ghost={false}
          style={HeaderStyles}
          extra={[<StyledCreate>CREATE</StyledCreate>]}
          title={<StyledMembers>My Organization</StyledMembers>}
        />

        <Row gutter={100}>
          {DUMMY_DATA.map((item) => (
            <Col key={item?._id}>
              <a
                onClick={() =>
                  history.push(
                    `/profile/organization/${item?._id}/${item?.title}`
                  )
                }
              >
                <Avatar size={150} height={54} width={40} icon={ORG_IMAGE} />
              </a>
              <StyledName>Organization Name</StyledName>
              <StyledPosition>Name</StyledPosition>
            </Col>
          ))}
        </Row>
      </UserContainer>
    </Fragment>
  );
};

export default ProfileOrganization;
