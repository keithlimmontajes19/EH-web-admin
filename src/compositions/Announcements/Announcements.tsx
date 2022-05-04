import { ReactElement } from "react";
import { PageHeader, Breadcrumb, Layout } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import type { PropsType } from "./types";
import { SearchOutlined } from "@ant-design/icons";
import { StyledText, StyledButton, StyledInput } from "./styled";

const Announcements = (props: PropsType): ReactElement => {
  const [searchInpt, setSearchInpt] = useState("");
  const handleSearch = (e) => {};

  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <PageHeader
          ghost={false}
          title={<StyledText fS={30}>Announcements</StyledText>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[<StyledButton>Create</StyledButton>]}
        />
        <StyledInput
          placeholder="Search Pages"
          defaultValue={searchInpt}
          onChange={handleSearch}
          prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
        />
      </Layout>
    </>
  );
};

export default Announcements;
