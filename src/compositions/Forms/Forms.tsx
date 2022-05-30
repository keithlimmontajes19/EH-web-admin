import { ReactElement, useEffect, useState } from "react";
import type { PropsType } from "./types";
import {
  StyledText,
  StyledButton,
  StyledInput,
  StyledButtonResult,
  TableContainer,
  ModalContainer,
} from "./styled";
import { Layout, PageHeader, Table, Input, Empty, Popover, Modal } from "antd";
import { History } from "history";
import NoForms from 'assets/icons/NoFormsIcon.svg'
import Results from "compositions/Results";

import { SearchOutlined, DeleteFilled, MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Contentdiv, PopupContainer } from "compositions/Announcements/styled";
import Loading from "components/Loading";
import { deleteForm, getAllfroms } from "ducks/forms/actionCreator";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import moment from "moment";


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
  const { data: rawData }: any = useSelector<RootState>((state) => state.forms)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formtitle, setFormName] = useState("")
  const [searchdData, setSearchdData] = useState([]);
  const [searchInpt, setSearchInpt] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push(`/team/forms/createforms/${formtitle}`)

  };
  const onSelectChange = (newRowKeys) => {
    console.log("selectedRowKeys changed: ", newRowKeys);
    setSelectedRowKeys(newRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onDeleteData = (recArr) => {
    if (!Object.keys(recArr).length) return;
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteForm(recArr._id)

        // setDataSource((pre) => {
        //   return pre
        //     .filter((obj) => recArr.every((record) => record.key !== obj.key))
        //     .map((obj, i) => ({ ...obj, key: i }));
        // });
        // if (searchInpt !== "") refreshSearchdData();
      },
    });
  };

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
      dataIndex: "type",
      width: "35%",
      maxWidth: "35%",
    },
    {
      key: "3",
      title: <StyledText fS={20}>DATEADDED</StyledText>,
      width: "35%",
      dataIndex: 'createdAt',
      maxWidth: "35%",
      render: (createdAt) => {
        return (
          <div style={{ fontSize: '16«px' }}>{moment(createdAt).format("DD/MM/YYYY")}</div>
        )
      }
    },
    {
      key: 4,
      title: <DeleteFilled style={{ color: "#635ffa" }} />,
      width: "15%",
      maxWidth: "15%",
      render: (createdAt, rawData) => {
        return (
          <>
            <PopupContainer>
              {/* <div style={{ fontSize: '16«px' }}>{createdAt.split("T")[0]}</div> */}
              <Popover
                trigger="click"
                // visible={visible}
                content={
                  <div style={{ fontSize: "18px" }}>
                    {/* <EditAnnouncement data={rawData} /> */}
                    <Contentdiv>
                      <EditOutlined
                        style={{
                          color: "#635ffa",
                          fontSize: "18px",
                          padding: "10px 10px",
                        }}
                      />
                      Edit
                    </Contentdiv>
                    <Contentdiv style={{ padding: "0px" }} onClick={() => onDeleteData(rawData)}>
                      <DeleteOutlined
                        style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
                      />
                      Delete
                    </Contentdiv>
                  </div>
                }
                overlayInnerStyle={{ borderRadius: "15px" }}
                placement="bottom"
              >
                <MoreOutlined
                  style={{
                    color: "#635FFA",
                    paddingLeft: "5px",
                    fontSize: "28px"
                  }}
                />
              </Popover>
            </PopupContainer>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getAllfroms();
  }, [])
  useEffect(() => {
    if (!rawData.length) return;
    setDataSource(
      rawData.map((obj, i) => ({
        ...obj,
        key: i,
      }))
    );
    setLoading(false);
  }, [rawData]);
  useEffect(() => {
    if (searchInpt === "") return;
    setSearchdData(
      dataSource.filter((obj) => {
        return searchdData.some((objX) => {
          if (objX._id === obj._id) return true;
        });
      })
    );
  }, [dataSource]);

  const handleSearch = (e) => {
    setSearchInpt(e.target.value);
    setSelectedRowKeys([]);
    const pattern = e.target.value
      .split("")
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join("");
    const regX = new RegExp(`${pattern}`, "gi");
    const tmp = [];
    dataSource.forEach((record, i) => {
      if (regX.test(record?.title + " " + record?.department)) tmp.push(i);
    });
    if (!tmp.length) return setSearchdData([]);
    setSearchdData(dataSource.filter((obj) => tmp.includes(obj.key)));
    console.log(
      tmp,
      dataSource.filter((obj) => tmp.includes(obj.key)),
      e.target.value,
      searchInpt
    );
  };

  const rowListener = (record) => ({
    onClick: (event) => {
      if (event.target.localName != "td") {
        event.stopPropagation();
        return;
      }
      if (selectedRowKeys.includes(record.key))
        return setSelectedRowKeys(
          selectedRowKeys.filter((a) => a !== record.key)
        );
      setSelectedRowKeys([...selectedRowKeys, record.key]);
    },
  });


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
            defaultValue={"search here"}
            onChange={handleSearch}
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
          {data.length === 0 ? (<>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "80px",
              }}
            >
              <img
                src={NoForms}
                style={{
                  height: "109px",
                  width: "87px",
                }}
              ></img>
              <h3
                style={{
                  padding: "10px",
                  fontWeight: "500",
                  fontSize: "22px",
                  color: "#2B2E4A !important",
                }}
              >
                No Forms
              </h3>
            </div>

          </>) : <>
            <Table onRow={rowListener} rowSelection={rowSelection} columns={columns} dataSource={searchInpt !== "" ? searchdData : dataSource} />

          </>}
        </TableContainer>
      </Layout>
    </>
  );
};

export default Forms;
