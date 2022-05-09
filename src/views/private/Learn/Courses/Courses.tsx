import TableCourses from 'compositions/TableCourses';
import {PlusOutlined, DownOutlined} from '@ant-design/icons';
import {ReactElement, useEffect, useState} from 'react';
import {Layout, PageHeader, Tabs} from 'antd';
import {StyledButton, StyledTabs, StyledText} from './styled';
import Dropdown from 'components/Dropdown';
import {useHistory, useParams} from 'react-router-dom';
import {Params} from './types';
import BuilderCourse from 'compositions/BuilderCourse';
import { theme } from 'utils/colors';

const headerActions = [
  {
    name: 'action 1',
    action: () => console.log('action 1'),
  },
  {
    name: 'action 2',
    action: () => console.log('action 2'),
  },
];

const Courses = (): ReactElement => {
  const history = useHistory();
  const params: Params = useParams();
  return (
    <>
      {params.page ? (
        <BuilderCourse id={params.subpage} />
      ) : (
        <Layout style={{paddingRight: 50, background: 'transparent'}}>
          <PageHeader
            ghost={false}
            title={<StyledText fS={30}>Courses</StyledText>}
            style={{background: 'none', paddingTop: 8}}
            extra={[
              <StyledButton
                w={130}
                onClick={() => history.push('/learn/courses/add')}
              >
                <PlusOutlined />
                ADD
              </StyledButton>,
              <Dropdown
                menu={headerActions}
                title={
                  <span style={{paddingLeft: 50}}>
                    <StyledText fS={20}>
                      Actions&nbsp;
                      <DownOutlined style={{fontSize: 15}} />
                    </StyledText>
                  </span>
                }
              />,
            ]}
            footer={
              <StyledTabs defaultActiveKey="1">
                <Tabs.TabPane tab={<StyledText fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>All Courses</StyledText>} key="1" />
                <Tabs.TabPane tab={<StyledText fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>Settings</StyledText>} key="2" />
                <Tabs.TabPane tab={<StyledText fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>Shortcodes</StyledText>} key="3" />
              </StyledTabs>
            }
          />
          <TableCourses />
        </Layout>
      )}
    </>
  );
};

export default Courses;
