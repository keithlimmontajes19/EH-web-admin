import { Fragment, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  StyledName,
  HeaderStyles,
  StyledCreate,
  StyledMembers,
  UserContainer,
} from './styled';
import { Row, Col, PageHeader } from 'antd';

import Avatar from 'components/Avatar/Avatar';
import ORG_IMAGE from 'assets/icons/organization.png';

/* reducer */
import { getListOrganization } from 'ducks/organization/actionCreator';

const ProfileOrganization = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { organizations }: any = useSelector<any>(
    (state) => state.organization
  );

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
          {(organizations?.data || []).map((item) => (
            <Col key={item?._id}>
              <a
                onClick={() =>
                  history.push(
                    `/profile/organization/${item?._id}/${item?.name}`,
                    {
                      org_id: item?._id,
                      org_title: item?.name,
                    }
                  )
                }
              >
                <Avatar size={150} height={54} width={40} icon={ORG_IMAGE} />
              </a>
              <StyledName>{item?.name}</StyledName>
            </Col>
          ))}
        </Row>
      </UserContainer>
    </Fragment>
  );
};

export default ProfileOrganization;
