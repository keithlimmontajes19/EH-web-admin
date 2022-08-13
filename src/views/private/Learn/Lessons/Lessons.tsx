import { ReactElement, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Params } from "./types";

import { theme } from "utils/colors";
import { Layout, PageHeader, Tabs } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { StyledTabs } from "./styled";

import Dropdown from "components/Dropdown";
import TableLessons from "compositions/TableLessons";
import SettingsLessons from "compositions/SettingsLessons";
import StyledButton from "components/StyledButton";
import Text from "components/Text";

const headerActions = [
  {
    name: "action 1",
    action: () => console.log("action 1"),
  },
  {
    name: "action 2",
    action: () => console.log("action 2"),
  },
];

const Lessons = (): ReactElement => {
  const history = useHistory();
  const [page, setPage] = useState("0");
  const params: Params = useParams();

  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <PageHeader
          ghost={false}
          title={<Text fS={30}>Lessons</Text>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[
            <StyledButton
              w={130}
              onClick={() => history.push("/learn/courses/add")}
            >
              <PlusOutlined />
              ADD
            </StyledButton>,
            <Dropdown
              menu={headerActions}
              title={
                <span style={{ paddingLeft: 50 }}>
                  <Text fS={20}>
                    Actions&nbsp;
                    <DownOutlined style={{ fontSize: 15 }} />
                  </Text>
                </span>
              }
            />,
          ]}
          footer={
            <StyledTabs activeKey={page} onChange={(n) => setPage(n)}>
              <Tabs.TabPane
                tab={
                  <Text fC={theme.BLACK} fW={500} fS={22} m={"0 20px"}>
                    All Lessons
                  </Text>
                }
                key={"0"}
              />
              <Tabs.TabPane
                tab={
                  <Text fC={theme.BLACK} fW={500} fS={22} m={"0 20px"}>
                    Settings
                  </Text>
                }
                key={"1"}
              />
            </StyledTabs>
          }
        />
        {page === "0" ? <TableLessons /> : <SettingsLessons />}
      </Layout>
    </>
  );
};

export default Lessons;
