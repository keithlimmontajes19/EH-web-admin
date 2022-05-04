import { ReactElement, useEffect, useState } from "react";

/* styles and ant design */
import {
  TeamOutlined,
  HomeOutlined,
  PlaySquareOutlined,
  FileTextOutlined,
  ExpandOutlined,
  NotificationOutlined,
  PaperClipOutlined,
  AppstoreOutlined,
  FolderOutlined,
  BookOutlined,
  FolderOpenOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { theme } from "utils/colors";
import { Layout, Menu, Avatar, Input, Row } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  HeaderStyled,
  StyledLayout,
  StyledSubMenu,
  LayoutStyles,
  MenuItemOnSelect,
  Searchdiv,
  SearchIcon,
} from "./styled";

import searchicon from "../../../assets/icons/search-icon.svg";

const { Search } = Input;

/* components */
import NavigationContent from "navigations/privateRoute";

const { Sider, Content } = Layout;

const teamItems = [
  { name: "Dashboards", link: "dashboards", icon: AppstoreOutlined },
  { name: "Pages", link: "pages", icon: FileTextOutlined },
  { name: "Announcements", link: "announcements", icon: NotificationOutlined },
  { name: "Forms", link: "forms", icon: PaperClipOutlined },
  { name: "Onboarding\nScreens", link: "onboarding", icon: ExpandOutlined },
];
const learnItems = [
  { name: "Courses", link: "courses", icon: FolderOutlined },
  { name: "Lessons", link: "lessons", icon: BookOutlined },
  { name: "Topics", link: "topics", icon: FolderOpenOutlined },
  { name: "Quizzes", link: "quizzes", icon: ClockCircleOutlined },
];

const MainLayout = (): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState("1");
  const [listNum, setListNum] = useState(0);
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
      learnItems.forEach((o: any, i: number) => {
        const regX = new RegExp(o.link, "g");
        if (regX.test(path)) setListNum(i);
      });
      return;
    }
    if (/team/g.test(path)) {
      setSelected("3");
      teamItems.forEach((o: any, i: number) => {
        const regX = new RegExp(o.link, "g");
        if (regX.test(path)) return setListNum(i);
      });
      return;
    }
    if (/home/g.test(path)) return setSelected("1");
  }, [location]);

  return (
    <StyledLayout>
      <HeaderStyled>
        <Row>
          <Searchdiv>
            <Input
              placeholder="search"
              style={{ borderRadius: "10px", width: "497px", height: "48px" }}
              size="large"
              prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
            ></Input>
          </Searchdiv>
        </Row>
        <Avatar size={64} icon={<UserOutlined style={{ padding: "0px" }} />} />
      </HeaderStyled>
      <Layout>
        <Sider
          collapsed={collapsed}
          onMouseOver={() => setCollapsed(false)}
          // onMouseLeave={()=>setCollapsed(true)}
          collapsedWidth={100}
          width={230}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            onSelect={(e: any) => setSelected(e?.key)}
            style={{
              height: "100%",
              borderRight: 0,
              minWidth: 100,
              paddingTop: 48,
              zIndex: 2,
            }}
          >
            <Menu.Item
              key="1"
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
              // style={selected === '2' && MenuItemOnSelect}
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
                  <div
                    style={{
                      marginTop: 5,
                      display: "inline-block",
                      fontSize: 16,
                      fontWeight: 700,
                      paddingLeft: 8,
                      width: "100px",
                      lineHeight: 1.25,
                      whiteSpace: "pre",
                    }}
                  >
                    {obj.name}
                  </div>
                </Menu.Item>
              ))}
            </StyledSubMenu>

            <StyledSubMenu
              active={selected === "3" ? 1 : 0}
              collapsed={collapsed}
              key="3"
              // style={selected === '3' && MenuItemOnSelect}
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
                  <div
                    style={{
                      marginTop: 5,
                      display: "inline-block",
                      fontSize: 16,
                      fontWeight: 700,
                      paddingLeft: 8,
                      width: "100px",
                      lineHeight: 1.25,
                      whiteSpace: "pre",
                    }}
                  >
                    {obj.name}
                  </div>
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
