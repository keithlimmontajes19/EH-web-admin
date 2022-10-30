import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { PropsType } from './types';
import {
  Divider,
  Container,
  StyledSave,
  StyledName,
  StyledInput,
  StyledTitle,
  StyledModal,
  StyledCancel,
  RowContainer,
  FlexContainer,
  ButtonContainer,
} from './styled';
import { EditOutlined } from '@ant-design/icons';

import Avatar from 'components/Avatar/Avatar';
import USER_ICON from 'assets/icons/user-white.png';
import Dropdown from 'components/Dropdown';

const ProfileEditUser = (props: PropsType): ReactElement => {
  const {
    visible,
    setVisible,
    putMembers,
    selectedUser,
    organization_id,
    getMembersOrganization,
  } = props;

  const dispatch = useDispatch();
  const setModalShowHide = () => setVisible(!visible);

  const [isEdit, setIsEdit] = useState(false);
  const [position, setPosition] = useState('');

  const headerActions = [
    {
      name: 'staff',
      action: () => setPosition('staff'),
    },
    {
      name: 'manager',
      action: () => setPosition('manager'),
    },
    {
      name: 'admin',
      action: () => setPosition('admin'),
    },
  ];

  const handleSubmit = () => {
    dispatch(putMembers(organization_id, selectedUser?._id, { position }));

    setTimeout(() => setModalShowHide(), 100);
    setTimeout(() => dispatch(getMembersOrganization(organization_id)), 1000);
  };

  useEffect(() => {
    setPosition(selectedUser?.position);
  }, [selectedUser]);

  return (
    <StyledModal
      width={313}
      footer={false}
      closable={false}
      visible={visible}
      maskClosable={false}
      title={<StyledTitle>Edit User</StyledTitle>}
      afterClose={() => setIsEdit(false)}
    >
      <Container>
        <RowContainer>
          <FlexContainer>
            <Avatar
              icon={USER_ICON}
              size={100}
              width={41}
              height={53}
              source={selectedUser?.avatar}
            />
            <StyledName>{selectedUser?.name}</StyledName>
            <Divider />

            {isEdit ? (
              <Dropdown
                menu={headerActions}
                title={<StyledInput value={position} />}
              />
            ) : (
              <span>
                {position} <EditOutlined onClick={() => setIsEdit(true)} />
              </span>
            )}
          </FlexContainer>
        </RowContainer>
        <ButtonContainer>
          <StyledCancel onClick={setModalShowHide}>CANCEL</StyledCancel>
          <StyledSave onClick={() => handleSubmit()}>SAVE</StyledSave>
        </ButtonContainer>
      </Container>
    </StyledModal>
  );
};

export default ProfileEditUser;
