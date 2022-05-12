import { ReactElement, useState } from "react";
import type { PropsType } from "./types";
import {
  StyledText,
  StyledButton,
  StyledInput,
  StyledButtonResult,
  TableContainer,
  ModalContainer,
} from "./styled";
import { Layout, PageHeader, Table, Input } from "antd";
import { History } from "history";
import Results from "compositions/Results";

import { SearchOutlined, DeleteFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const columns = [
  {
    key: "1",
    title: <StyledText fS={20}>TITLE</StyledText>,
    dataIndex: "title",
    width: "35%",
    maxWidth: "35%",
  },
  {
    key: "2",
    title: <StyledText fS={20}>FORM TYPE</StyledText>,
    dataIndex: "formtype",
    width: "35%",
    maxWidth: "35%",
  },
  {
    key: "3",
    title: <StyledText fS={20}>DATEADDED</StyledText>,
    dataIndex: "date",
    width: "35%",
    maxWidth: "35%",
  },
  {
    key: 4,
    title: <DeleteFilled style={{ color: "#635ffa" }} />,
    width: "15%",
    maxWidth: "15%",
  },
];

const data = [
  {
    key: 1,
    title: "sample_survey",
    formtype: "SURVEY",
    date: "05/05/2022",
  },
  {
    key: 2,
    title: "sample_survey2",
    formtype: "SURVEY",
    date: "06/05/2022",
  },
  {
    key: 3,
    title: "test3",
    formtype: "QUIZE",
    date: "07/05/2022",
  },
];

const Forms = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formtitle, setFormName] = useState("")
  const history = useHistory()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push(`/team/forms/createforms/${formtitle}`)

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <TableContainer style={{ background: "none" }}>
          <PageHeader
            ghost={false}
            title={<StyledText fS={30}>Forms</StyledText>}
            style={{ background: "none", paddingTop: 8 }}
            extra={[
              data.length === 0 ? (
                <StyledButtonResult>See Results</StyledButtonResult>
              ) : (
                <>
                  <Results />
                </>
              ),
              <>
                <StyledButton onClick={showModal}>Create</StyledButton>
                <ModalContainer
                  visible={isModalVisible}
                  title="Create Forms"
                  onCancel={handleCancel}
                  onOk={handleOk}
                  centered
                >
                  <Input
                    placeholder="Sample Announcement_2"
                    style={{
                      borderRadius: "15px",
                      background: "#F8F8F8",
                      width: "485px",
                      height: "38px",
                      margin: "10px 0px",

                    }}
                    onChange={(e) => setFormName(e.target.value)}
                    size="large"
                    aria-placeholder="Form Name 1"
                    defaultValue="Form Name 1"
                  ></Input>
                </ModalContainer>
              </>,
            ]}
          />
          <StyledInput
            placeholder="Search Forms"
            // defaultValue={"search here"}
            // onChange={handleSearch}
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
          <Table columns={columns} dataSource={data} />
        </TableContainer>
      </Layout>
    </>
  );
};

export default Forms;
