import {ReactElement, useState} from 'react';

/* styles and ant design */
import {
  TeamOutlined,
  HomeOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import {theme} from 'utils/colors';
import {Layout, Menu} from 'antd';
import {useHistory} from 'react-router-dom';
import {HeaderStyled, StyledLayout, LayoutStyles} from './styled';

/* components */
import NavigationContent from 'navigations/privateRoute';

const {Sider, Content} = Layout;
const MainLayout = (): ReactElement => {
  const history = useHistory();
  const [selected, setSelected] = useState('1');

  const colorCondition = (key: string) => {
    return selected === key ? theme.WHITE : theme.BLACK;
  };

  const pushHistory = (route: string) => {
    history.push(route);
  };

  return (
    <StyledLayout>
      <HeaderStyled></HeaderStyled>
      <Layout>
        <Sider width={200} collapsed={true}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={['1']}
            onSelect={(e: any) => setSelected(e?.key)}
            style={{height: '100%', borderRight: 0}}>
            <Menu.Item
              key="1"
              style={{marginTop: 48}}
              onClick={() => pushHistory('/home')}
              icon={
                <HomeOutlined
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    color: colorCondition('1'),
                  }}
                />
              }>
              <span
                style={{
                  marginTop: 20,
                  fontSize: 16,
                  fontWeight: 700,
                  color: colorCondition('1'),
                }}>
                Home
              </span>
            </Menu.Item>

            <Menu.Item
              key="2"
              onClick={() => pushHistory('/learn')}
              icon={
                <PlaySquareOutlined
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    color: colorCondition('2'),
                  }}
                />
              }>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: colorCondition('2'),
                }}>
                Learn
              </span>
            </Menu.Item>

            <Menu.Item
              key="3"
              onClick={() => pushHistory('/team')}
              icon={
                <TeamOutlined
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    color: colorCondition('3'),
                  }}
                />
              }>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: colorCondition('3'),
                }}>
                Team
              </span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={LayoutStyles}>
          <Content>
            <NavigationContent />
          </Content>
        </Layout>
      </Layout>
    </StyledLayout>
  );
};

export default MainLayout;
