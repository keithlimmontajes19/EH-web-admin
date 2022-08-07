import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { RootState } from "ducks/store";
import { getMembersOrganization } from "ducks/organization/actionCreator";

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
import { DUMMY_DATA } from "./data";

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
  const [inviteModal, setInviteModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editTeamModal, setEditTeamModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    organization_members: { data },
  }: any = useSelector<RootState>((state) => state.organization);

  useEffect(() => {
    dispatch(getMembersOrganization(organization_id));
  }, []);

  const onSelectChange = (newRowKeys) => {
    setSelectedRowKeys(newRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const rowListener = (record) => ({
    onClick: (event) => {
      if (event.target.localName != "td") {
        event.stopPropagation();
        return;
      }

      if (selectedRowKeys.includes(record.key)) {
        return setSelectedRowKeys(
          selectedRowKeys.filter((a) => a !== record.key)
        );
      }

      setSelectedRowKeys([...selectedRowKeys, record.key]);
    },
  });

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
            <StyledCancel>REMOVE</StyledCancel>,
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
        onRow={rowListener}
        rowkey={(item) => item?._id}
        rowSelection={rowSelection}
        columns={columns(setEditUserModal, organization_id)}
      />

      <ProfileEditUser visible={editUserModal} setVisible={setEditUserModal} />
      <ProfileEditTeam
        visible={editTeamModal}
        setVisible={setEditTeamModal}
        org_id={organization_id}
        org_title={history?.location?.state?.org_title || ""}
        org_avatar={history?.location?.state?.org_avatar || ""}
        org_description={history?.location?.state?.org_description || ""}
      />
      <ProfileInviteUser visible={inviteModal} setVisible={setInviteModal} />
    </Container>
  );
};

export default ProfileDetails;
