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
} from "./styled";

// icons imorted here
import nopages from "../../assets/icons/nopages.svg";
import hammericon from "../../assets/icons/hammer-icon.svg";

import type { PropsType } from "./types";
import { useHistory } from "react-router-dom";

import { } from "./styled";

import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import { getDashboard } from "ducks/dashboard/actionCreator";
import Loading from "components/Loading";

const TablePages = (props: PropsType): ReactElement => {
  const { data: rawData }: any = useSelector<RootState>(
    (state) => state.dashboard
  );
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [searchInpt, setSearchInpt] = useState("");

  const history = useHistory();

  const pushHistory = (route: string) => {
    history.push(route);
  };
  const columns = [
    {
      key: "1",
      title: <StyledText fS={20}>TITLE</StyledText>,
      dataIndex: "name",
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
              <span onClick={() => onEditData(record)}>
                <EditOutlined style={{ color: "#635ffa" }} />
                &nbsp;RENAME
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onEditData(record)}>
                <EyeFilled style={{ color: "#635ffa" }} />
                &nbsp;VIEW
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onEditData(record)}>
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
  useEffect(() => {
    getDashboard();
  }, []);
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
      name: "Name " + newKey,
      email: newKey + "@gmail.com",
      department: "Address " + newKey,
    };
    setDataSource((pre) => {
      return [];
    });
    console.log("add");
    pushHistory("/team/pages/createpage");
  };
  const onDeleteData = (recArr) => {
    if (!recArr.length) return;
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre
            .filter((obj) => recArr.every((record) => record.key !== obj.key))
            .map((obj, i) => ({ ...obj, key: i }));
        });
        if (searchInpt !== "") refreshSearchdData();
      },
    });
  };
  const onEditData = (record) => {
    setIsEditing(true);
    setEditingData({ ...record });
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
      if (regX.test(record?.name + " " + record?.department)) tmp.push(i);
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
          extra={[<StyledButton onClick={onAddData}>Create</StyledButton>]}
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
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
          {dataSource.length === 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "80px",
                }}
              >
                <img
                  src={nopages}
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
                  No pages
                </h3>
              </div>
            </>
          ) : (
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
            onCancel={() => {
              resetEditing();
            }}
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
              resetEditing();
            }}
          >
            <Input
              value={editingData?.name}
              prefix="Title: "
              onChange={(e) => {
                setEditingData((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
            />
          </Modal>
        </TableContainer>
      </Layout>
    </>
  );
};

export default TablePages;
