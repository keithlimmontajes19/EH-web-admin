import { Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  EyeFilled,
  BuildFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { SpaceDiv, TableContainer } from "./styled";

/* reducer action */
import {
  updateCourse,
  getMyCourses,
  deleteCourse,
  getCurriculum,
} from "ducks/lms/actionCreator";
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";

import Text from "components/Text";
import Loading from "components/Loading";
import ModalCurriculum from "compositions/ModalCurriculum";

const TableCourses = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [viewVisible, setViewVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      key: "a1",
      title: <Text fS={20}>TITLE</Text>,
      dataIndex: "title",
      width: "35%",
      maxWidth: "35%",
    },
    {
      key: "a2",
      title: (
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
            <DeleteOutlined style={{ color: "#635ffa" }} />
            <Text fC="inherit" fS={20}>
              DELETE
            </Text>
          </span>
        </div>
      ),
      minWidth: 350,
      render: (record, object) => {
        return (
          <>
            <div className="row-actions">
              <span onClick={() => onEditData(record)}>
                <EditOutlined style={{ color: "#635ffa" }} />
                &nbsp;RENAME
              </span>
              <SpaceDiv w={"5%"}>@</SpaceDiv>
              <span onClick={() => openView(record)}>
                <EyeFilled style={{ color: "#635ffa" }} />
                &nbsp;VIEW
              </span>
              <SpaceDiv w={"5%"}>@</SpaceDiv>
              <span onClick={() => onDeleteData([record])}>
                <DeleteOutlined style={{ color: "#635ffa" }} />
                &nbsp;DELETE
              </span>
              <SpaceDiv w={"5%"}>@</SpaceDiv>
              <span
                onClick={() => {
                  localStorage.setItem("courseId", record?._id);

                  history.push("/learn/courses/builder/" + record._id);
                }}
              >
                <BuildFilled style={{ color: "#635ffa" }} />
                &nbsp;BUILDER
              </span>
            </div>
          </>
        );
      },
    },
  ];

  const { data, loading: rawLoading }: any = useSelector<RootState>(
    (state) => state.lms
  );

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setDataSource([]);
      return;
    }

    const sortIt = (a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    };

    const sorted = data.sort((a, b) => sortIt(a.title, b.title));

    setDataSource(
      sorted.map((obj, i) => ({
        ...obj,
        key: i,
      }))
    );
    setLoading(false);
  }, [data]);

  const onDeleteData = (recArr) => {
    if (!recArr.length) return;
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const callback = (res) => {
          if (!res) return;
          setDataSource((pre) => {
            return pre
              .filter((obj) => recArr.every((record) => record.key !== obj.key))
              .map((obj, i) => ({ ...obj, key: i }));
          });
        };

        recArr.forEach((record) =>
          dispatch(
            deleteCourse({
              idOrg: record.organizationId,
              idCourse: record._id,
              callback,
            })
          )
        );
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

  const renameOk = () => {
    if (JSON.stringify(editingData) === "{}") return;

    console.log("editingData", editingData);

    localStorage.setItem("courseId", editingData._id);
    localStorage.setItem("organizationId", editingData.organizationId);

    dispatch(updateCourse(editingData));

    const mapped = dataSource.map((obj) => {
      if (obj._id === editingData._id) return editingData;
      return obj;
    });

    resetEditing();
    setDataSource(mapped);
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

  const openView = (obj) => {
    localStorage.setItem("courseId", obj?._id);
    localStorage.setItem("organizationId", obj?.organizationId);

    dispatch(getCurriculum(obj));
    setViewVisible(true);
  };

  const closeView = () => {
    setViewVisible(false);
  };

  return (
    <TableContainer
      style={{
        paddingLeft: 30,
        paddingRight: 24,
        paddingTop: 45,
        background: "transparent",
      }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={rawLoading}
        onRow={rowListener}
        rowSelection={rowSelection}
      />
      <Modal
        title="Rename"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={renameOk}
      >
        <Input
          value={editingData?.name}
          prefix="Title: "
          onChange={(e) => {
            setEditingData((pre) => {
              return { ...pre, title: e.target.value };
            });
          }}
        />
      </Modal>
      <ModalCurriculum isVisible={viewVisible} isCancel={closeView} />
    </TableContainer>
  );
};

export default TableCourses;
