import {HeaderText, TableText, SubText} from './styled';
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Row} from 'antd';

import moment from 'moment';
import IconImage from 'components/IconImage';
import COIN_LOGO from 'assets/icons/coin-icon.png';
import MEDAL_LOGO from 'assets/icons/medal-icon.png';

export const columns: any = [
  {
    key: 1,
    title: <HeaderText>#</HeaderText>,
    dataIndex: '_id',
    render: (a: any, b: any, c: number) => <TableText>{c + 1}</TableText>,
  },
  {
    key: 2,
    title: <HeaderText>Name</HeaderText>,
    dataIndex: 'userName',
    render: (a: any, b: any, c: number) => {
      return (
        <>
          <Row>
            <div
              style={{
                marginTop: 10,
                marginRight: 10,
              }}>
              <Avatar size="small" icon={<UserOutlined />} /> <br />
            </div>
            <div>
              <TableText>{a}</TableText>
              <br />
              <SubText>
                {moment(a?.updatedAt).diff(moment(Date.now()), 'days')} day ago
              </SubText>
            </div>
          </Row>
        </>
      );
    },
  },
  {
    key: 3,
    title: <HeaderText>Engage Points</HeaderText>,
    dataIndex: 'points',
    align: 'center',
    render: (a: any, b: any, c: number) => (
      <>
        <IconImage source={COIN_LOGO} width={16} height={16} />
        &nbsp; <TableText>{a}</TableText>
      </>
    ),
  },
  {
    key: 4,
    title: <HeaderText>Level</HeaderText>,
    dataIndex: 'name',
    align: 'center',
    render: (a: any, b: any, c: number) => <TableText>1</TableText>,
  },
  {
    key: 5,
    title: <HeaderText>Achievements</HeaderText>,
    dataIndex: 'achievements',
    align: 'center',
    render: (a: any, b: any, c: number) => (
      <>
        <IconImage source={MEDAL_LOGO} width={16} height={19} />
        &nbsp; <TableText>{b?.achievements.length || 0}</TableText>
      </>
    ),
  },
];
