import { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [inviteModal, setInviteModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editTeamModal, setEditTeamModal] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      if (selectedRowKeys.includes(record.key))
        return setSelectedRowKeys(
          selectedRowKeys.filter((a) => a !== record.key)
        );
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
              <StyledTitle>Sample Team Name</StyledTitle>
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
        rowkey="_id"
        pagination={false}
        onRow={rowListener}
        dataSource={DUMMY_DATA}
        rowSelection={rowSelection}
        columns={columns(setEditUserModal)}
      />

      <ProfileEditUser visible={editUserModal} setVisible={setEditUserModal} />
      <ProfileEditTeam visible={editTeamModal} setVisible={setEditTeamModal} />
      <ProfileInviteUser visible={inviteModal} setVisible={setInviteModal} />
    </Container>
  );
};

export default ProfileDetails;
