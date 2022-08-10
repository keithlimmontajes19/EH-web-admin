import { Fragment, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  StyledName,
  HeaderStyles,
  StyledCreate,
  StyledMembers,
  UserContainer,
} from "./styled";
import { Row, Col, PageHeader } from "antd";

import Loading from "components/Loading";
import Avatar from "components/Avatar/Avatar";
import ORG_IMAGE from "assets/icons/organization.png";
import ProfileAddTeam from "compositions/ProfileAddTeam";

/* reducer */
import {
  getListOrganization,
  getOrgDetails,
} from "ducks/organization/actionCreator";

const ProfileOrganization = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { organizations }: any = useSelector<any>(
    (state) => state.organization
  );

  const [visisble, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getListOrganization());
  }, []);

  const modalCreateHandler = () => setVisible(!visisble);

  return (
    <Fragment>
      <UserContainer>
        <PageHeader
          ghost={false}
          style={HeaderStyles}
          extra={[
            <StyledCreate onClick={modalCreateHandler}>CREATE</StyledCreate>,
          ]}
          title={<StyledMembers>My Organization</StyledMembers>}
        />

        {organizations.loading ? (
          <Loading />
        ) : (
          <Row gutter={100}>
            {(organizations?.data || []).map((item) => (
              <Col key={item?._id}>
                <a
                  onClick={() => {
                    dispatch(getOrgDetails(item));
                    history.push(
                      `/profile/organization/${item?._id}/${item?.name}`,
                      {
                        org_id: item?._id,
                        org_title: item?.name,
                        org_avatar: item?.avatar,
                        org_description: item?.description,
                      }
                    );
                  }}
                >
                  <Avatar
                    size={150}
                    height={54}
                    width={40}
                    icon={ORG_IMAGE}
                    source={item?.avatar}
                  />
                </a>
                <StyledName>{item?.name}</StyledName>
              </Col>
            ))}
          </Row>
        )}
      </UserContainer>

      <ProfileAddTeam
        visible={visisble}
        modalCreateHandler={modalCreateHandler}
      />
    </Fragment>
  );
};

export default ProfileOrganization;
