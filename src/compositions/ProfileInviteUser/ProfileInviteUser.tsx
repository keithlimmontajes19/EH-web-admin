import { ReactElement, useState } from "react";
import type { PropsType } from "./types";

import {
  Container,
  StyledSave,
  StyledModal,
  StyledTitle,
  StyledInput,
  StyledTable,
  StyledCancel,
  ButtonContainer,
  HeaderContainer,
} from "./styled";
import { SearchOutlined } from "@ant-design/icons";
import { columns } from "./columns";

/* reducer action */
import { useDispatch } from "react-redux";
import { postMembers } from "ducks/organization/actionCreator";

const ProfileInviteUser = (props: PropsType): ReactElement => {
  const {
    data,
    loading,
    visible,
    setVisible,
    organization_id,
    getMembersOrganization,
  } = props;

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const setModalShowHide = () => setVisible(!visible);

  const handleSubmit = () => {
    dispatch(postMembers(organization_id, selectedRowKeys));

    setTimeout(() => setModalShowHide(), 100);
    setTimeout(() => dispatch(getMembersOrganization(organization_id)), 1000);
  };

  return (
    <StyledModal
      width={825}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      title={<StyledTitle>Invite User</StyledTitle>}
    >
      <Container>
        <HeaderContainer>
          <StyledInput
            placeholder="Search Pages"
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
        </HeaderContainer>

        <StyledTable
          dataSource={data}
          loading={loading}
          pagination={false}
          columns={columns()}
          rowSelection={rowSelection}
          rowKey={(record) => {
            return record?.profile?.email;
          }}
        />

        <ButtonContainer>
          <StyledCancel onClick={setModalShowHide}>CANCEL</StyledCancel>
          <StyledSave onClick={() => handleSubmit()}>INVITE</StyledSave>
        </ButtonContainer>
      </Container>
    </StyledModal>
  );
};

export default ProfileInviteUser;
