import { Table, Modal, Input, Row, Space, Collapse, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  BuildFilled,
  EnterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { TableContainer } from "./styled";
import { theme } from "utils/colors";

// ducks action
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "ducks/store";
import {
  deleteCourse,
  deleteLesson,
  getCurriculum,
  getLessons,
  getMyCourses,
  updateCourse,
  updateLesson,
} from "ducks/lms/actionCreator";
import Loading from "components/Loading";
import Text from "components/Text";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ModalCurriculum from "compositions/ModalCurriculum";

function TableTopics() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  //{0: [is for selected course index+1], {key: number a.k.a. course index+1}: [selected lesson keys] }
  const [selectedRowKeys, setSelectedRowKeys] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [onDispatch, setOnDispatch] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);

  const columns = [
    {
      key: "b1",
      title: (
        <Row align="middle" justify="space-between">
          <Text fS={20}>TITLE</Text>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteSelected(selectedRowKeys)}
          >
            <DeleteOutlined style={{ color: "#635ffa", fontSize: 20 }} />
            &nbsp;
            <Text fS={20} fC={theme.BLACK}>
              DELETE
            </Text>
          </span>
        </Row>
      ),
      dataIndex: "table",
      style: { marginBottom: 100 },
    },
  ];

  const getOrgId = () => {
    const getItem = localStorage.getItem("organizationId");
    return getItem ? getItem : "6239ffd1cb8440277f2a2b39";
  };

  const { data: rawData = [] }: any = useSelector<RootState>(
    (state) => state.lms
  );

  useEffect(() => {
    setOnDispatch(false);
    dispatch(getMyCourses());
  }, []);

  useEffect(() => {
    if (rawData.length === 0 || onDispatch || dataSource.length !== 0) return;
    const sortIt = (a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    };
    const tmp = [...rawData].sort(sortIt);
    tmp.forEach((x, _i) => createUniqueId(tmp[_i], "curriculum", `${_i}`));
    setDataSource(tmp);
    setOnDispatch(true);
    iterateArray([...rawData].sort(sortIt));
    setLoading(false);
  }, [rawData]);

  const sortByPosition = (arr) =>
    arr.sort(
      (a: any, b: any) => parseFloat(a.position) - parseFloat(b.position)
    );

  const createUniqueId = (obj, objKey, lvl) => {
    obj.key = lvl;
    const arr = obj[objKey];

    if (!arr) return;
    for (let i = 0; i < arr.length; i++) {
      const _obj = arr[i];
      if (!_obj || typeof _obj !== "object") continue;

      const currLvl = lvl + "-" + i;
      _obj.style = { background: "red" };
      _obj.key = currLvl;
    }
  };

  const iterateArray = (tmp) => {
    const dispatchIterator = (i = 0) => {
      const obj = tmp[i];
      const callback = (res) => {
        const result = res ? sortByPosition(res) : [];
        result.forEach((_obj, _i) => {
          result[_i].contents = _obj.contents.filter(
            (obj) => obj.contentType === "topic"
          );
        });
        tmp[i].curriculum = result;
        tmp.forEach((x, _i) => createUniqueId(tmp[_i], "curriculum", `${_i}`));
        setDataSource([...tmp]);

        if (i < tmp.length - 1) return dispatchIterator(i + 1);
        setOnDispatch(false);
        return;
      };
      const idList = {
        idCourse: obj._id,
        idOrg: getOrgId(),
      };
      dispatch(getLessons({ callback, idList }));
    };
    //self iterate
    dispatchIterator();
  };

  useEffect(() => {
    const copy = [...dataSource];

    const makeTitle = (record) => {
      const { contents } = record;
      const testA = contents ? contents.length > 0 : false;
      const toCollapse = (arr) => (
        <Collapse activeKey={"2"} expandIcon={() => <></>} ghost>
          <Collapse.Panel header={record.title} key="2">
            {typeof arr[0] !== "object" ? (
              <p>
                <EnterOutlined
                  style={{
                    transform: "scale(-1,1)",
                    margin: "0 10px 0 21px",
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
                      margin: "0 10px 0 21px",
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
        toCollapse(contents)
      ) : (
        <span className="ant-no-collapse" style={{ marginLeft: 36 }}>
          {record.title}
        </span>
      );
    };

    const tmp = copy.map((obj, iA) => ({
      table: (
        <Table
          columns={[
            {
              key: "b1",
              title: (
                <Row align="middle" justify="space-between">
                  <Text fS={25} fC={theme.BLACK} fW={500}>
                    {obj.title}
                  </Text>
                  <Space className="row-actions" size={"middle"}>
                    <span onClick={() => onEditData(copy, iA, -1)}>
                      <EditOutlined style={{ color: "#635ffa" }} />
                      &nbsp;RENAME
                    </span>
                    <span onClick={() => openView(obj)}>
                      <EyeFilled style={{ color: "#635ffa" }} />
                      &nbsp;VIEW
                    </span>
                    <span onClick={() => onDeleteData([obj.key])}>
                      <DeleteOutlined style={{ color: "#635ffa" }} />
                      &nbsp;DELETE
                    </span>
                    <span
                      onClick={() =>
                        history.push("/learn/courses/builder/" + obj._id)
                      }
                    >
                      <BuildFilled style={{ color: "#635ffa" }} />
                      &nbsp;BUILDER
                    </span>
                  </Space>
                </Row>
              ),
              render: (rec, record, iB) => ({
                children: (
                  <Row align="middle" justify="space-between">
                    {makeTitle(record)}
                    <Space className="row-actions" size={"middle"}>
                      <span onClick={() => onEditData(copy, iA, iB)}>
                        <EditOutlined style={{ color: "#635ffa" }} />
                        &nbsp;RENAME
                      </span>
                      <span onClick={() => openView(obj)}>
                        <EyeFilled style={{ color: "#635ffa" }} />
                        &nbsp;VIEW
                      </span>
                      <span onClick={() => onDeleteData([record.key])}>
                        <DeleteOutlined style={{ color: "#635ffa" }} />
                        &nbsp;DELETE
                      </span>
                      <span
                        onClick={() =>
                          history.push("/learn/courses/builder/" + obj._id)
                        }
                      >
                        <BuildFilled style={{ color: "#635ffa" }} />
                        &nbsp;BUILDER
                      </span>
                    </Space>
                  </Row>
                ),
              }),
            },
          ]}
          rowClassName={(record) => {
            const testA = record.contentType === "section-head";
            const resultA = testA
              ? "table-row-section-head"
              : "table-row-lesson";
            return resultA;
          }}
          dataSource={obj.curriculum}
          pagination={false}
          className="ant-sub-table"
          rowSelection={rowSelection(iA + 1)}
        />
      ),
      key: iA + 1,
      isLone: "curriculum" in obj ? obj.curriculum < 1 : true,
    }));

    setTreeData(tmp);
  }, [dataSource, selectedRowKeys]);

  const onDeleteData = (recArr) => {
    if (!recArr.length) return;
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setSelectedRowKeys({});
        const tmp = { arr: [...dataSource] };
        recArr.forEach((key) =>
          findAKey(tmp, "arr", key, (obj, objKey, i) => {
            const arr = [...obj[objKey]];
            const result = arr[i];
            const isLesson = "course" in result;
            const ids = isLesson
              ? {
                  idOrg: getOrgId(),
                  idCourse: result.course,
                  idLesson: result._id,
                }
              : {
                  idOrg: getOrgId(),
                  idCourse: result._id,
                };
            const callback = (res) => {
              if (!res) return;
              obj[objKey] = arr.filter((a, b) => b !== i);
              setDataSource(tmp.arr.filter((i) => i));
            };
            if (isLesson) dispatch(deleteLesson({ ...ids, callback }));
            else dispatch(deleteCourse({ ...ids, callback }));
          })
        );
      },
    });
  };

  const findAKey = (obj, objKey, key, callback) => {
    const arr = obj[objKey];
    if (!arr) return;
    for (let i = 0; i < arr.length; i++) {
      const _obj = arr[i];
      if (!_obj) continue;
      if (_obj.key === key) {
        callback(obj, objKey, i);
        break;
      }

      const nextObjKey = "curriculum" in _obj ? "curriculum" : "contents";
      findAKey(_obj, nextObjKey, key, callback);
    }
  };

  const deleteSelected = (keysArrInObject) => {
    Modal.confirm({
      title: "Are you sure, you want to delete the selected record/s?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        let copy = [...dataSource];
        let deletedArr = [];
        for (const i in keysArrInObject) {
          // course is detected
          if (i.toString() === "0") {
            const callback = (res) => {
              if (!res) return;
              deletedArr = keysArrInObject[0];
              copy = copy.filter(
                (a, deleteI) => !keysArrInObject[0].includes(deleteI + 1)
              );
              setDataSource(copy);
            };

            copy.forEach((course, _deleteI) => {
              if (keysArrInObject[0].includes(_deleteI + 1))
                dispatch(
                  deleteCourse({
                    idOrg: course.organizationId,
                    idCourse: course._id,
                    callback,
                  })
                );
            });
            continue;
          }
          // lesson for deleted course detected
          if (deletedArr.includes(i.toString())) continue;

          // lesson detected default
          copy.forEach((obj, index) =>
            keysArrInObject[i].forEach((key) =>
              findAKey(obj, "curriculum", key, (obj, objKey, i) => {
                // return location for lesson
                const tmp = [...obj[objKey]];
                const _lesson = tmp[i];
                const callback = (res) => {
                  if (res) obj[objKey] = tmp.filter((a, b) => b !== i);
                  if (index === copy.length - 1) {
                    setSelectedRowKeys({});
                    setDataSource(copy);
                  }
                };

                dispatch(
                  deleteLesson({
                    idOrg: getOrgId(),
                    idCourse: _lesson.course,
                    idLesson: _lesson._id,
                    callback,
                  })
                );
              })
            )
          );
        }
      },
    });
  };

  const onEditData = (copy, iA, iB) => {
    setIsEditing(true);
    setEditingData({ copy, iA, iB, title: "" });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };
  const onSelectChange = (newRowKeys, i) => {
    const tmp = { ...selectedRowKeys };
    tmp[i] = newRowKeys;
    if (i === 0) newRowKeys.forEach((n) => (tmp[n] = []));
    if (i !== 0 && 0 in tmp ? tmp[0].includes(i) : false)
      tmp[0] = tmp[0].filter((n) => n !== i);
    setSelectedRowKeys(tmp);
  };
  const rowSelection = (i) => ({
    selectedRowKeys: selectedRowKeys[i],
    onChange: (newRowKeys) => onSelectChange(newRowKeys, i),
  });

  const openView = (obj) => {
    console.log("eto GAGO", obj);
    dispatch(getCurriculum(obj));

    localStorage.setItem("courseId", obj?._id);
    localStorage.setItem("organizationId", obj?.organizationId);
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
        paddingTop: 31,
        background: "transparent",
      }}
    >
      <Table
        rowSelection={rowSelection(0)}
        columns={columns}
        dataSource={[]} //TODO: should be treeData
        loading={{ indicator: <Loading />, spinning: loading }}
        rowClassName={(rec) =>
          rec.isLone ? "main-table-row row-is-lone" : "main-table-row"
        }
        className="parent-table"
      />
      <Modal
        title="Rename"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          const tmp = editingData.copy;
          if (editingData.iB === -1) {
            const callback = (res) => {
              if (!res) return;
              tmp[editingData.iA].title = editingData.title;
              setDataSource(tmp);
            };
            const result = { ...tmp[editingData.iA], title: editingData.title };
            localStorage.setItem("organizationId", getOrgId());
            localStorage.setItem("courseId", result._id);
            dispatch(updateCourse({ ...result, callback }));
            resetEditing();
            return;
          }

          const callback = (res) => {
            if (!res) return;
            tmp[editingData.iA].curriculum[editingData.iB].title =
              editingData.title;
            setDataSource(tmp);
          };
          const result = {
            ...tmp[editingData.iA].curriculum[editingData.iB],
            title: editingData.title,
          };
          dispatch(
            updateLesson({
              data: result,
              idLesson: result._id,
              idCourse: result.course,
              idOrg: getOrgId(),
              callback,
            })
          );
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
      <ModalCurriculum isVisible={viewVisible} isCancel={closeView} />
    </TableContainer>
  );
}
1;
export default TableTopics;
