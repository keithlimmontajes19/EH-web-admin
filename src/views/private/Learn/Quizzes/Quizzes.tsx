import { ReactElement, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Params } from './types';

import { theme } from 'utils/colors';
import { Layout, PageHeader, Tabs } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { StyledTabs } from './styled';

import Dropdown from 'components/Dropdown';
import TableQuizzes from 'compositions/TableQuizzes';
import SettingsLessons from 'compositions/SettingsLessons';
import BuilderQuiz from 'compositions/BuilderQuiz';
import Text from 'components/Text';

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

const Quizzes = (): ReactElement => {
  const history = useHistory();
  const [page, setPage] = useState('0');
  const params: Params = useParams();
  return (
    <>
      {params.page ? (
        <BuilderQuiz />
      ) : (
        <Layout style={{ paddingRight: 50, background: 'transparent' }}>
          <PageHeader
            ghost={false}
            title={<Text fS={30}>Quizzes</Text>}
            style={{ background: 'none', paddingTop: 8 }}
            extra={[
              <Dropdown
                menu={headerActions}
                // title={
                //   <span style={{ paddingLeft: 50 }}>
                //     <Text fS={20}>
                //       Actions&nbsp;
                //       <DownOutlined style={{ fontSize: 15 }} />
                //     </Text>
                //   </span>
                // }
              />,
            ]}
            footer={
              <StyledTabs activeKey={page} onChange={(n) => setPage(n)}>
                <Tabs.TabPane
                  tab={
                    <Text fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>
                      All Quizzes
                    </Text>
                  }
                  key={'0'}
                />
                <Tabs.TabPane
                  tab={
                    <Text fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>
                      Settings
                    </Text>
                  }
                  key={'1'}
                />
                {/* <Tabs.TabPane
                tab={
                  <Text fC={theme.BLACK} fW={500} fS={22} m={'0 20px'}>
                    Submitted Essays
                  </Text>
                }
                key={'2'}
              /> */}
              </StyledTabs>
            }
          />
          {page === '0' ? <TableQuizzes /> : <SettingsLessons />}
        </Layout>
      )}
    </>
  );
};

export default Quizzes;
