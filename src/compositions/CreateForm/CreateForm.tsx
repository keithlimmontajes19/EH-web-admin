import { ReactElement } from "react";
import type { PropsType, Params } from "./types";

import Dropdown from "components/Dropdown";

import { PageHeader, message } from "antd";
import { StyledText, StyledButton } from "./styled";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";

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

const CreateForm = (props: PropsType): ReactElement => {
  const history = useHistory();
  const params: Params = useParams();
  
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
  }

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
  }

  const pushHistory = (route: string) => {
    history.push(route);
  };

  return (
    <>
      <PageHeader
        breadcrumb={
          <Link to="/team/forms" style={{ textDecoration: "underline" }}>
            Back to Forms
          </Link>
        }
        ghost={false}
        style={{}}
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
                <StyledText fS={20}>
                  Actions&nbsp;
                  <DownOutlined style={{ fontSize: 15 }} />
                </StyledText>
              </span>
            }
          />,
        ]}
      />
      <StyledText fS={30} style={{ color: "#000", padding: "5px" }}>
        {params.formtitle}
      </StyledText>
    </>
  );
};

export default CreateForm;
