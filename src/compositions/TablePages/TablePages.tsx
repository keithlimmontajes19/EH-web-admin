import { ReactElement } from "react";
import type { PropsType } from "./types";
import { useHistory } from "react-router-dom";

import {
  Table,
  Modal,
  Input,
  Layout,
  Space,
  Row,
  Spin,
  Collapse,
  PageHeader,
} from "antd";

import {
  EyeFilled,
  EditOutlined,
  EnterOutlined,
  SearchOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { theme } from "utils/colors";
import { StyledButton, BuildIcon } from "./styled";
import {
  ColumnText,
  StyledTitle,
  StyledInput,
  TableContainer,
  ColumnFirstText,
} from "compositions/Announcements/styled";

import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { deletePage, getPages, updatePage } from "ducks/pages/actionCreator";

// icons imorted here
import nopages from "../../assets/icons/nopages.svg";
import hammericon from "../../assets/icons/hammer-color.png";
import IconImage from "components/IconImage";
import DELETE_ICON from "assets/icons/delete-icon.png";

const TablePages = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();
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

  const makeTitle = (record) => {
    const { forms } = record;
    const testA = forms ? forms.length > 0 : false;

    const toCollapse = (arr) => (
      <Collapse ghost>
        <Collapse.Panel header={record?.title} key="2">
          {typeof arr[0] !== "object" ? (
            <p>
              <EnterOutlined
                style={{
                  transform: "scale(-1,1)",
                  margin: "0 10px 0 10px",
                }}
              />
              <Spin indicator={<LoadingOutlined spin />} />
            </p>
          ) : (
            arr.map(({ title }) => (
              <p>
                <EnterOutlined
                  style={{
                    transform: "scale(-1,1)",
                    margin: "0 10px 0 10px",
                  }}
                />
                <span style={{ color: theme.BLACK }}>{String(title)}</span>
              </p>
            ))
          )}
        </Collapse.Panel>
      </Collapse>
    );

    return testA ? (
      toCollapse(forms)
    ) : (
      <ColumnFirstText>{record.title}</ColumnFirstText>
    );
  };

  const columns = [
    {
      key: "1",
      title: (
        <Row align="middle" justify="space-between">
          <ColumnText>TITLE</ColumnText>
          <div style={{ textAlign: "right" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                onDeleteData(
                  dataSource.filter((obj) => selectedRowKeys.includes(obj.key))
                );
                setSelectedRowKeys([]);
              }}
            >
              <IconImage source={DELETE_ICON} width={17} height={21} />
            </span>
          </div>
        </Row>
      ),

      minWidth: 350,
      render: (rec, record, iB) => ({
        children: (
          <Row align="middle" justify="space-between">
            {makeTitle(record)}
            <Space className="row-actions" size={"middle"}>
              <span onClick={() => onEditData(record)}>
                <EditOutlined style={{ color: "#4C4B7B" }} />
                &nbsp;RENAME
              </span>
              {/* &nbsp; &nbsp; &nbsp;
              <span onClick={() => onEditData(record)}>
                <EyeFilled style={{ color: '#4C4B7B' }} />
                &nbsp;VIEW
              </span> */}
              &nbsp; &nbsp; &nbsp;
              <span
                onClick={() =>
                  pushHistory(`/team/pages/builder/${record?._id}`)
                }
              >
                <BuildIcon
                  src={hammericon}
                  color="#4C4B7B"
                  style={{ color: "#4C4B7B", width: 20, height: 15 }}
                />
                &nbsp;&nbsp;BUILDER
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={() => onDeleteData([record])}>
                <DeleteOutlined style={{ color: "#4C4B7B" }} />
                &nbsp;DELETE
              </span>
            </Space>
          </Row>
        ),
      }),
    },
  ];

  useEffect(() => {
    dispatch(getPages());
  }, []);

  const { data: rawData }: any = useSelector<RootState>((state) => state.pages);

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

  const onDeleteData = (recArr) => {
    if (!recArr.length) return;

    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        function recurseDispatch(count = 0) {
          if (count >= recArr.length) return;
          dispatch(
            deletePage({
              pageId: recArr[count]?._id,
              callback: () => recurseDispatch(count + 1),
            })
          );
        }
        recurseDispatch();
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
      if (regX.test(record?.title)) tmp.push(i);
    });

    if (!tmp.length) return setSearchdData([]);

    setSearchdData(dataSource.filter((obj) => tmp.includes(obj.key)));
  };

  const refreshSearchdData = () => {
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
          title={<StyledTitle>Pages</StyledTitle>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[
            <StyledButton onClick={() => pushHistory("/team/pages/create")}>
              CREATE
            </StyledButton>,
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
            placeholder="Type"
            defaultValue={searchInpt}
            onChange={handleSearch}
            prefix={<SearchOutlined style={{ color: "#A2A1BD" }} />}
          />

          <Table
            onRow={rowListener}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={searchInpt !== "" ? searchdData : dataSource}
            loading={loading}
            locale={{
              emptyText: (
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
              ),
            }}
          />
          <Modal
            title="Rename"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              dispatch(
                updatePage({
                  data: editingData,
                  pageId: editingData?._id,
                })
              );

              setDataSource((pre) => {
                return pre.map((obj) => {
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
              value={editingData?.title}
              prefix="Title: "
              onChange={(e) => {
                setEditingData((pre) => {
                  return { ...pre, title: e.target.value };
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
