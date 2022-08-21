import { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/* styles and ant design */
import {
  Searchdiv,
  StyledMenu,
  ItemTextDiv,
  HeaderStyled,
  StyledLayout,
  LayoutStyles,
  StyledSubMenu,
  MenuItemOnSelect,
} from "./styled";

import {
  TeamOutlined,
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  ExpandOutlined,
  FolderOutlined,
  SearchOutlined,
  BarChartOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  PaperClipOutlined,
  PlaySquareOutlined,
  FolderOpenOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { theme } from "utils/colors";
import { Layout, Menu, Avatar, Input } from "antd";

/* components */
import NavigationContent from "navigations/privateRoute";
import PopoverProfile from "compositions/PopoverProfile";
import MainLogo from 'assets/icons/main-logo.png';
import IconImage from "components/IconImage";

const { Sider, Content } = Layout;

const teamItems = [
  { name: "Dashboards", link: "dashboards", icon: AppstoreOutlined },
  { name: "Pages", link: "pages", icon: FileTextOutlined },
  { name: "Announcements", link: "announcements", icon: NotificationOutlined },
  { name: "Forms", link: "forms", icon: PaperClipOutlined },
  { name: `Onboarding \nScreens`, link: "onboarding", icon: ExpandOutlined },
];

const learnItems = [
  { name: "Courses", link: "courses", icon: FolderOutlined },
  { name: "Lessons", link: "lessons", icon: BookOutlined },
  { name: "Topics", link: "topics", icon: FolderOpenOutlined },
  { name: "Quizzes", link: "quizzes", icon: ClockCircleOutlined },
  { name: "Reports", link: "reports", icon: BarChartOutlined },
];

const MainLayout = (): ReactElement => {
  const history = useHistory();
  const location = useLocation();

  const { user_details: data }: any = useSelector<any>(
    (states) => states.authentication
  );

  const [selected, setSelected] = useState("1");
  const [openKeys, setOpenKeys] = useState([]);
  const [listNum, setListNum] = useState(-1);
  const [collapsed, setCollapsed] = useState(true);

  const colorCondition = (key: string) => {
    return selected === key ? theme.WHITE : theme.BLACK;
  };

  const pushHistory = (route: string) => {
    history.push(route);
  };

  useEffect(() => {
    const path = location.pathname;

    if (/learn/g.test(path)) {
      setSelected("2");
      setListNum(-1);
      learnItems.forEach((o: any, i: number) => {
        const regX = new RegExp(o.link, "g");
        if (regX.test(path)) setListNum(i);
      });
      return;
    }
    if (/team/g.test(path)) {
      setSelected("3");
      setListNum(-1);
      teamItems.forEach((o: any, i: number) => {
        const regX = new RegExp(o.link, "g");
        if (regX.test(path)) return setListNum(i);
      });
      return;
    }
    if (/home/g.test(path)) return setSelected("1");
  }, [location]);

  const handleOpenKeys = (key) =>
    setOpenKeys((prev) => {
      if (openKeys.includes(key)) return prev.filter((n) => n !== key);
      return [...prev, key];
    });

  return (
    <StyledLayout>
      <HeaderStyled>
        <IconImage source={MainLogo} height={80} width={180} />
        <Searchdiv collapsed={false}>
          <Input
            size="large"
            placeholder="Search for anything"
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
            style={{ borderRadius: "10px", width: "497px", height: "48px" }}
          />
        </Searchdiv>

        <PopoverProfile name="Keith Lim Montajes" organization="Organization">
          <Avatar size={64} src={data?.profile?.avatar || ""} />
        </PopoverProfile>
      </HeaderStyled>

      <Layout>
        <Sider
          onClick={() => {
            if (collapsed) setCollapsed(false);
          }}
          collapsed={collapsed}
          collapsedWidth={100}
          width={250}
        >
          <StyledMenu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            onSelect={(e: any) => setSelected(e?.key)}
            openKeys={collapsed ? [] : openKeys}
          >
            <Menu.Item
              key="1"
              title=""
              style={selected === "1" && MenuItemOnSelect}
              onClick={() => pushHistory("/home")}
            >
              <HomeOutlined
                style={{
                  fontSize: 20,
                  marginTop: 4,
                  color: colorCondition("1"),
                }}
              />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: colorCondition("1"),
                }}
              >
                Home
              </span>
            </Menu.Item>

            <StyledSubMenu
              active={selected === "2" ? 1 : 0}
              collapsed={collapsed}
              key="2"
              title={
                <span>
                  <PlaySquareOutlined
                    style={{
                      fontSize: 20,
                      marginTop: 4,
                      color: colorCondition("2"),
                    }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: colorCondition("2"),
                    }}
                  >
                    Learn
                  </span>
                </span>
              }
              onTitleClick={(e) => {
                const acceptArr = [
                  "ant-menu-submenu-arrow",
                  "ant-menu-submenu-title",
                ];
                if (acceptArr.includes(e.domEvent.target.className))
                  handleOpenKeys("2");
                else pushHistory("/learn");
              }}
            >
              {learnItems.map((obj, i) => (
                <Menu.Item
                  key={"learn-" + i}
                  onClick={() => {
                    setListNum(listNum);
                    pushHistory("/learn/" + obj.link);
                  }}
                  style={{
                    height: "20px",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    color: listNum === i && selected === "2" ? "#635ffa" : "",
                  }}
                >
                  <obj.icon
                    style={{
                      fontSize: 20,
                      marginTop: 5,
                    }}
                  />
                  <ItemTextDiv>{obj.name}</ItemTextDiv>
                </Menu.Item>
              ))}
            </StyledSubMenu>

            <StyledSubMenu
              active={selected === "3" ? 1 : 0}
              collapsed={collapsed}
              key="3"
              title={
                <span>
                  <TeamOutlined
                    style={{
                      fontSize: 20,
                      marginTop: 4,
                      color: colorCondition("3"),
                    }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: colorCondition("3"),
                    }}
                  >
                    Team
                  </span>
                </span>
              }
              onTitleClick={(e) => {
                const acceptArr = [
                  "ant-menu-submenu-arrow",
                  "ant-menu-submenu-title",
                ];
                if (acceptArr.includes(e.domEvent.target.className))
                  handleOpenKeys("3");
                else pushHistory("/team");
              }}
            >
              {teamItems.map((obj, i) => (
                <Menu.Item
                  key={"team-" + i}
                  onClick={() => {
                    setListNum(listNum);
                    pushHistory("/team/" + obj.link);
                  }}
                  style={{
                    height: "20px",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    color: listNum === i && selected === "3" ? "#635ffa" : "",
                  }}
                >
                  <obj.icon
                    style={{
                      fontSize: 20,
                      marginTop: 5,
                    }}
                  />
                  <ItemTextDiv>{obj.name}</ItemTextDiv>
                </Menu.Item>
              ))}
            </StyledSubMenu>
            <div
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => setCollapsed(!collapsed)}
            />
          </StyledMenu>
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
