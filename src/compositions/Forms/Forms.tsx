import { ReactElement } from "react";

import type { PropsType } from "./types";
import { StyledText, StyledButton, StyledInput } from "./styled";
import { Layout, PageHeader } from "antd";

import { SearchOutlined } from "@ant-design/icons";

const Forms = (props: PropsType): ReactElement => {
  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <PageHeader
          ghost={false}
          title={<StyledText fS={30}>Forms</StyledText>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[<StyledButton>Create</StyledButton>]}
        />
        <StyledInput
          placeholder="Search Forms"
          // defaultValue={"search here"}
          // onChange={handleSearch}
          prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
        />
      </Layout>
    </>
  );
};

export default Forms;
