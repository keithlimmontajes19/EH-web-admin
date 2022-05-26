import { ReactElement } from "react";
import { Table, Modal, Input, PageHeader, Layout } from "antd";
import { useEffect, useState } from "react";
import Collapsetab from "components/Collapsetab";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
} from "@ant-design/icons";
import {
  StyledButton,
  StyledInput,
  StyledText,
  TableContainer,
  BuildIcon,
  ModalContainer
} from "./styled";

// icons imorted here
import nopages from "../../assets/icons/nopages.svg";
import hammericon from "../../assets/icons/hammer-icon.svg";

import type { PropsType } from "./types";
import { useHistory } from "react-router-dom";

import { } from "./styled";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "ducks/store";

import { getPages, addPage, deletePage, getOnePage, editPage } from "ducks/pages/actionCreator"
import Loading from "components/Loading";
import { readConfigFile } from "typescript";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const TablePages = (props: PropsType): ReactElement => {
  const { data: rawData }: any = useSelector<RootState>(
    (state) => state.pages
  );
  const [loading, setLoading] = useState(true);
  const [pagename, setPageName] = useState("")
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [searchInpt, setSearchInpt] = useState("");
  const [modaldata, setModaldata] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const history = useHistory();

  const pushHistory = (route: string) => {
    history.push(route);
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
      key: "3",
      title: (
        <div style={{ textAlign: "right" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              onDeleteData(selectedRowKeys.map((key) => ({ key: key })));
              setSelectedRowKeys([]);
            }}
          >
            <DeleteOutlined style={{ color: "#635ffa" }} />
            <StyledText fC="inherit" fS={20}>
              DELETE
            </StyledText>
          </span>
        </div>
      ),
      minWidth: 350,
      render: (record) => {
        return (
          <>
            <div className="row-actions">
              <span onClick={() => onRename(record)}>
                <EditOutlined style={{ color: "#635ffa" }} />
                &nbsp;RENAME
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onEditData(record._id)}>
                <EyeFilled style={{ color: "#635ffa" }} />
                &nbsp;VIEW
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onEditData(record._id)}>
                <BuildIcon src={hammericon} style={{ color: "#635ffa" }} />
                &nbsp;BUILDER
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onDeleteData([record])}>
                <DeleteOutlined style={{ color: "#635ffa" }} />
                &nbsp;DELETE
              </span>
            </div>
            {/* <Collapsetab title="page1" /> */}
          </>
        );
      },
    },
  ];
  // useEffect(() => {
  //   getPages();
  // }, [rawData]);
  useEffect(() => {
    getPages();
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

  const onAddData = () => {
    const newKey = dataSource.length;
    const newData = {
      _id: newKey,
      key: newKey,
      title: "Name " + newKey,
      email: newKey + "@gmail.com",
      department: "Address " + newKey,
    };
    // setDataSource((pre) => {
    //   return [];
    // });
    console.log("add");
    // pushHistory("/team/pages/createpage");
    setIsModalVisible(true)
  };
  const onokData = () => {
    pushHistory(`/team/pages/createpage/${pagename}`)
  }
  const onDeleteData = (recArr) => {

    if (!recArr.length) return;
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deletePage(recArr[0]._id)
        // setDataSource((pre) => {
        //   return pre
        //     .filter((obj) => recArr.every((record) => record.key !== obj.key))
        //     .map((obj, i) => ({ ...obj, key: i }));
        // });
        // if (searchInpt !== "") refreshSearchdData();
      },
    });
  };

  const onRename = (record) => {
    setIsEditing(true)
    setEditingData(record);
  }
  const onEditData = (record) => {
    setIsEditing(true);
    getOnePage(record)
    history.push(`/team/pages/editpage/${record}`)
    setEditingData(record.title);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };
  const onSelectChange = (newRowKeys) => {
    console.log("selectedRowKeys changed: ", newRowKeys);
    setSelectedRowKeys(newRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
  const refreshSearchdData = () => {
    console.log("refresh");
    setSearchdData(
      dataSource.filter((record) =>
        searchdData.some((obj) => obj.key === record.key)
      )
    );
  };
  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <PageHeader
          ghost={false}
          title={<StyledText fS={30}>Pages</StyledText>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[<StyledButton onClick={onAddData}>Create</StyledButton>
            ,
          <ModalContainer
            visible={isModalVisible}
            title="Create Page"
            onCancel={() => setIsModalVisible(false)}
            onOk={onokData}
            centered
          >
            <Input
              placeholder="Page 1"
              style={{
                borderRadius: "15px",
                background: "#F8F8F8",
                width: "485px",
                height: "38px",
                margin: "10px 0px",

              }}
              onChange={(e) => setPageName(e.target.value)}
              size="large"
              aria-placeholder="Page 1"
              defaultValue="Page 1"
            ></Input>
          </ModalContainer>
          ]}
        />
        <TableContainer
          style={{
            paddingLeft: 30,
            paddingRight: 24,
            background: "transparent",
          }}
        >
          <StyledInput
            placeholder="Search Pages"
            defaultValue={searchInpt}
            onChange={handleSearch}
            loading={{ indicator: <Loading />, spinnig: loading }}
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
          {(
            <Table
              onRow={rowListener}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={searchInpt !== "" ? searchdData : dataSource}
              loading={{ indicator: <Loading />, spinning: loading }}
            />
          )}
          <Modal
            title="Rename"
            visible={isEditing}
            okText="Save"
            onCancel={() =>
              setIsEditing(false)}
            onOk={() => {
              setDataSource((pre) => {
                return pre.map((obj) => {
                  console.log(obj);
                  if (obj._id === editingData._id) {
                    return editingData;
                  } else {
                    return obj;
                  }
                });
              });
              editPage({
                title: editingData?.title,
                details: editingData?.details,
                forms: editingData?.forms,
                isPublish: editingData?.isPublish,
                videoURL: editingData?.videoURL,
                imageURL: editingData?.imageURL,
                pageId: editingData?._id
              });
              resetEditing();
            }}
          >
            <Input
              value={editingData?.title}
              prefix="Title:"
              onChange={(e) => {
                setEditingData((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
            {console.log(editingData)}
          </Modal>

        </TableContainer>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default TablePages;
