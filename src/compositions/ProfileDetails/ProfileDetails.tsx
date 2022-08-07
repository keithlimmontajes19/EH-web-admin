import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/* reducer action */
import {
  putMembers,
  deleteMembers,
  getMembersOrganization,
} from "ducks/organization/actionCreator";
import { RootState } from "ducks/store";
import { getAllUsers } from "ducks/authentication/actionCreator";

import {
  Container,
  StyledBack,
  StyledTable,
  StyledTitle,
  StyledInput,
  StyledCancel,
  StyledInvite,
  HeaderContainer,
} from "./styled";
import { theme } from "utils/colors";
import { Row, PageHeader } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";

import { columns } from "./columns";

import Avatar from "components/Avatar";
import IconImage from "components/IconImage";
import ORG_ICON from "assets/icons/organization.png";
import SETTING_ICON from "assets/icons/setting-icon.png";

import ProfileEditUser from "compositions/ProfileEditUser";
import ProfileEditTeam from "compositions/ProfileEditTeam";
import ProfileInviteUser from "compositions/ProfileInviteUser";

const ProfileDetails = (): ReactElement => {
  const history: any = useHistory();
  const dispatch = useDispatch();

  const organization_id = history?.location?.state?.org_id || "";

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [inviteModal, setInviteModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editTeamModal, setEditTeamModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    organization_members: { data },
  }: any = useSelector<RootState>((state) => state.organization);

  const { users }: any = useSelector<RootState>(
    (state) => state.authentication
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getMembersOrganization(organization_id));
  }, []);

  const onSelectChange = (newRowKeys) => {
    setSelectedRowKeys(newRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const multipleDelete = () => {
    selectedRowKeys.map((item) => {
      setTimeout(() => dispatch(deleteMembers(organization_id, item)), 50);
    });

    dispatch(getMembersOrganization(organization_id));
  };

  return (
    <Container>
      <StyledBack onClick={() => history.goBack()}>
        <LeftOutlined style={{ fontSize: 11, width: 15 }} />
        Back to My Organization
      </StyledBack>

      <HeaderContainer>
        <PageHeader
          ghost={false}
          style={{ background: theme.HEADER }}
          extra={[
            <a onClick={() => setEditTeamModal(true)}>
              <IconImage source={SETTING_ICON} width={30} height={30} />
            </a>,
          ]}
          title={
            <Row>
              <Avatar icon={ORG_ICON} size={45} width={17} height={20} />
              <StyledTitle>
                {history?.location?.state?.org_title || ""}
              </StyledTitle>
            </Row>
          }
        />

        <PageHeader
          ghost={false}
          style={{ background: theme.HEADER }}
          extra={[
            <StyledCancel onClick={() => multipleDelete()}>
              REMOVE
            </StyledCancel>,
            <StyledInvite onClick={() => setInviteModal(true)}>
              INVITE
            </StyledInvite>,
          ]}
          title={
            <StyledInput
              placeholder="Search Pages"
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
            />
          }
        />
      </HeaderContainer>

      <StyledTable
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={(record) => record?._id}
        columns={columns(
          setEditUserModal,
          organization_id,
          deleteMembers,
          dispatch,
          getMembersOrganization,
          setSelectedUser
        )}
      />

      <ProfileEditUser
        putMembers={putMembers}
        visible={editUserModal}
        selectedUser={selectedUser}
        setVisible={setEditUserModal}
        organization_id={organization_id}
        getMembersOrganization={getMembersOrganization}
      />

      <ProfileEditTeam
        visible={editTeamModal}
        setVisible={setEditTeamModal}
        org_id={organization_id}
        org_title={history?.location?.state?.org_title || ""}
        org_avatar={history?.location?.state?.org_avatar || ""}
        org_description={history?.location?.state?.org_description || ""}
      />

      <ProfileInviteUser
        data={users?.data}
        visible={inviteModal}
        loading={users?.loading}
        setVisible={setInviteModal}
        organization_id={organization_id}
        getMembersOrganization={getMembersOrganization}
      />
    </Container>
  );
};

export default ProfileDetails;
