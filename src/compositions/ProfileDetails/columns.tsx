import {
  MoreStyles,
  EditStyles,
  DeleteStyles,
  StyledHeader,
  overlayStyles,
  StyledHeaderName,
  StyledColumnText,
  PopoverContainer,
  ConfirmContainer,
} from './styled';

import Avatar from 'components/Avatar';
import IconImage from 'components/IconImage';
import USER_ICON from 'assets/icons/user-white.png';
import DELETE_ICON from 'assets/icons/delete-table.png';

import { Popover } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { theme } from 'utils/colors';

export const columns = (
  setEditUserModal: (value: boolean) => void,
  organization_id: string
): any => [
  {
    key: 1,
    title: <StyledHeader>Name</StyledHeader>,
    dataIndex: 'name',
    render: (record: string, object: any) => {
      return (
        <>
          <Avatar
            size={30}
            width={12}
            height={16}
            icon={USER_ICON}
            source={object?.avatar || ''}
          />
          &nbsp;
          <StyledHeaderName>{record}</StyledHeaderName>
        </>
      );
    },
  },
  {
    key: 2,
    title: <StyledHeader>Email Address</StyledHeader>,
    dataIndex: 'email',
    align: 'center',
    render: (record: string) => {
      return <StyledColumnText>{record}</StyledColumnText>;
    },
  },
  {
    key: 3,
    title: <StyledHeader>Contact #</StyledHeader>,
    dataIndex: 'contact',
    align: 'center',
    render: (record: string) => {
      return <StyledColumnText>{record}</StyledColumnText>;
    },
  },
  {
    key: 4,
    title: <StyledHeader>Position</StyledHeader>,
    dataIndex: 'position',
    align: 'center',
    render: (record: string) => {
      return <StyledColumnText>{record}</StyledColumnText>;
    },
  },
  {
    key: 5,
    title: <IconImage source={DELETE_ICON} width={17} height={21} />,
    dataIndex: '_id',
    align: 'center',
    render: () => {
      return (
        <Popover
          trigger="click"
          placement="bottomRight"
          overlayInnerStyle={overlayStyles}
          content={
            <PopoverContainer>
              <ConfirmContainer onClick={() => setEditUserModal(true)}>
                <EditOutlined style={EditStyles} />
                Edit
              </ConfirmContainer>
              <ConfirmContainer onClick={() => console.log('calling')}>
                <DeleteOutlined style={DeleteStyles} />
                Delete
              </ConfirmContainer>
            </PopoverContainer>
          }
        >
          <MoreOutlined style={MoreStyles} />
        </Popover>
      );
    },
  },
];
