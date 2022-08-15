import { ReactElement } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { Layout, PageHeader, Tabs } from "antd";
import { StyledTabs } from "./styled";
import { theme } from "utils/colors";
import { Params } from "./types";

import Text from "components/Text";
import Dropdown from "components/Dropdown";
import StyledButton from "components/StyledButton";
import TableCourses from "compositions/TableCourses";
import BuilderCourse from "compositions/BuilderCourse";

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

const Courses = (): ReactElement => {
  const history = useHistory();
  const params: Params = useParams();

  return (
    <>
      {params.page ? (
        <BuilderCourse id={params.subpage} />
      ) : (
        <Layout style={{ paddingRight: 50, background: "transparent" }}>
          <PageHeader
            ghost={false}
            title={<Text fS={30}>Courses</Text>}
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
              <StyledTabs defaultActiveKey="1">
                <Tabs.TabPane
                  tab={
                    <Text fC={theme.BLACK} fW={500} fS={22} m={"0 20px"}>
                      All Courses
                    </Text>
                  }
                  key="1"
                />
                <Tabs.TabPane
                  tab={
                    <Text fC={theme.BLACK} fW={500} fS={22} m={"0 20px"}>
                      Settings
                    </Text>
                  }
                  key="2"
                />
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
