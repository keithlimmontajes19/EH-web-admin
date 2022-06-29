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
import { DUMMY_DATA } from "./data";

const ProfileInviteUser = (props: PropsType): ReactElement => {
  const { visible, setVisible } = props;

  const [search, setSearch] = useState("");
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

  const setModalShowHide = () => setVisible(!visible);

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
          rowkey="_id"
          pagination={false}
          columns={columns()}
          onRow={rowListener}
          dataSource={DUMMY_DATA}
          rowSelection={rowSelection}
        />

        <ButtonContainer>
          <StyledCancel onClick={setModalShowHide}>CANCEL</StyledCancel>
          <StyledSave onClick={setModalShowHide}>INVITE</StyledSave>
        </ButtonContainer>
      </Container>
    </StyledModal>
  );
};

export default ProfileInviteUser;
