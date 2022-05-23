import {
  Table,
  Modal,
  Input,
  Row,
  Space,
  Collapse,
} from 'antd';
import {useEffect, useState} from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  BuildFilled,
  EnterOutlined,
} from '@ant-design/icons';
import { TableContainer} from './styled';
import {theme} from 'utils/colors';

// ducks action
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'ducks/store';
import {getMyCourses} from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import Text from 'components/Text';
import {useHistory} from 'react-router-dom';

function TableLessons() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {data: rawData}: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const columns = [
    {
      key: 'b1',
      title: (
        <Row align="middle" justify="space-between">
          <Text fS={20}>TITLE</Text>
          <span
            style={{cursor: 'pointer'}}
            onClick={() => deleteSelected(selectedRowKeys)}
          >
            <DeleteOutlined style={{color: '#635ffa', fontSize: 20}} />
            &nbsp;
            <Text fS={20} fC={theme.BLACK}>
              DELETE
            </Text>
          </span>
        </Row>
      ),
      dataIndex: 'table',
      style: {marginBottom: 100},
    },
  ];

  useEffect(() => {
    dispatch(getMyCourses());
  }, []);

  useEffect(() => {
    if (!rawData || dataSource.length !== 0) return;
    const tmp = [...rawData];
    for (let i = 0; i < tmp.length; i++) {
      createUniqueId(tmp[i], 'curriculum', `${i}`);
    }
    setDataSource(tmp);
    setLoading(false);
  }, [rawData]);

  useEffect(() => {
    const copy = [...dataSource];

    const makeTitle = (record) => {
      const {curriculum, contents, contentType} = record;
      const testA = curriculum ? curriculum.length > 0 : false;
      const testB = contents ? contents.length > 0 : false;
      const testC = contentType === 'section-head' || contentType === 'lesson';
      const toCollapse = (arr) => (
        <Collapse ghost>
          <Collapse.Panel header={record.title} key="1">
            {arr.map((t) => (
              <p>
                <EnterOutlined
                  style={{
                    transform: 'scale(-1,1)',
                    margin: '0 10px 0 21px',
                  }}
                />
                <span style={{color: theme.GRAY}}>{t}</span>
              </p>
            ))}
          </Collapse.Panel>
        </Collapse>
      );
      return testA && testC ? (
        toCollapse(curriculum)
      ) : testB && testC ? (
        toCollapse(contents)
      ) : (
        <span className="ant-no-collapse" style={{marginLeft: 36}}>
          {record.title}
        </span>
      );
    };

    const tmp = copy.map((obj, iA) => ({
      table: (
        <Table
          columns={[
            {
              key: 'b1',
              title: (
                <Row align="middle" justify="space-between">
                  <Text fS={25} fC={theme.BLACK} fW={500}>
                    {obj.title}
                  </Text>
                  <Space className="row-actions" size={'middle'}>
                    <span onClick={() => onEditData(copy, iA, -1)}>
                      <EditOutlined style={{color: '#635ffa'}} />
                      &nbsp;RENAME
                    </span>
                    <span>
                      <EyeFilled style={{color: '#635ffa'}} />
                      &nbsp;VIEW
                    </span>
                    <span onClick={() => onDeleteData([obj.key])}>
                      <DeleteOutlined style={{color: '#635ffa'}} />
                      &nbsp;DELETE
                    </span>
                    <span
                      onClick={() =>
                        history.push('/learn/courses/builder/' + obj._id)
                      }
                    >
                      <BuildFilled style={{color: '#635ffa'}} />
                      &nbsp;BUILDER
                    </span>
                  </Space>
                </Row>
              ),
              render: (rec, record, iB) => ({
                children: (
                  <Row align="middle" justify="space-between">
                    {makeTitle(record)}
                    <Space className="row-actions" size={'middle'}>
                      <span onClick={() => onEditData(copy, iA, iB)}>
                        <EditOutlined style={{color: '#635ffa'}} />
                        &nbsp;RENAME
                      </span>
                      <span>
                        <EyeFilled style={{color: '#635ffa'}} />
                        &nbsp;VIEW
                      </span>
                      <span onClick={() => onDeleteData([record.key])}>
                        <DeleteOutlined style={{color: '#635ffa'}} />
                        &nbsp;DELETE
                      </span>
                      <span
                        onClick={() =>
                          history.push('/learn/courses/builder/' + obj._id)
                        }
                      >
                        <BuildFilled style={{color: '#635ffa'}} />
                        &nbsp;BUILDER
                      </span>
                    </Space>
                  </Row>
                ),
              }),
            },
          ]}
          rowClassName={(record) => {
            const testA = record.contentType === 'section-head';
            const resultA = testA
              ? 'table-row-section-head'
              : 'table-row-lesson';
            return resultA;
          }}
          dataSource={obj.curriculum}
          pagination={false}
          className="ant-sub-table"
          rowSelection={rowSelection(iA + 1)}
        />
      ),
      key: iA,
      isLone: 'curriculum' in obj ? obj.curriculum < 1 : true,
    }));

    setTreeData(tmp);
  }, [dataSource, selectedRowKeys]);

  const onDeleteData = (recArr) => {
    if (!recArr.length) return;
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setSelectedRowKeys({});
        setDataSource((pre: any): any => {
          const tmp = [...pre];
          for (let i = 0; i < pre.length; i++) {
            if (recArr.includes(pre[i].key)) tmp[i] = undefined;
            else
              recArr.forEach((key) =>
                findAKey(tmp[i], 'curriculum', key, (obj, objKey, i) => {
                  const tmp = [...obj[objKey]];
                  obj[objKey] = tmp.filter((a, b) => b !== i);
                }),
              );
          }
          return tmp.filter((i) => i);
        });
      },
    });
  };

  const createUniqueId = (obj, objKey, lvl) => {
    obj.key = lvl;
    const arr = obj[objKey];
    if (!arr) return;
    for (let i = 0; i < arr.length; i++) {
      const _obj = arr[i];
      if (!_obj || typeof _obj !== 'object') continue;
      const currLvl = lvl + '-' + i;
      const isSect = _obj.contentType === 'section-head';
      const nextObjKey = isSect ? 'curriculum' : 'contents';
      _obj.style = {background: 'red'};
      _obj.key = currLvl;
      createUniqueId(_obj, nextObjKey, currLvl);
    }
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

      const isSect = _obj.contentType === 'section-head';
      const nextObjKey = isSect ? 'curriculum' : 'contents';
      findAKey(_obj, nextObjKey, key, callback);
    }
  };

  const deleteSelected = (keysArrInObject) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete the selected record/s?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        let copy = [...dataSource];
        let deletedArr = [];
        for (const i in keysArrInObject) {
          if (i.toString() === '0') {
            deletedArr = keysArrInObject[0];
            copy = copy.filter((a, b) => !keysArrInObject[0].includes(b));
            continue;
          }
          if (deletedArr.includes(i.toString())) continue;

          copy.forEach((obj) =>
            keysArrInObject[i].forEach((key) =>
              findAKey(obj, 'curriculum', key, (obj, objKey, i) => {
                const tmp = [...obj[objKey]];
                obj[objKey] = tmp.filter((a, b) => b !== i);
              }),
            ),
          );
        }
        setSelectedRowKeys({});
        setDataSource(copy);
      },
    });
  };

  const onEditData = (copy, iA, iB) => {
    setIsEditing(true);
    setEditingData({copy, iA, iB, title: ''});
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };
  const onSelectChange = (newRowKeys, i) => {
    const tmp = {...selectedRowKeys};
    tmp[i] = newRowKeys;
    if (i === 0) newRowKeys.forEach((n) => (tmp[n + 1] = []));
    if (i !== 0 && 0 in tmp ? tmp[0].includes(i - 1) : false)
      tmp[0] = tmp[0].filter((n) => n !== i - 1);
    setSelectedRowKeys(tmp);
  };
  const rowSelection = (i) => ({
    selectedRowKeys: selectedRowKeys[i],
    onChange: (newRowKeys) => onSelectChange(newRowKeys, i),
  });

  return (
    <TableContainer
      style={{
        paddingLeft: 30,
        paddingRight: 24,
        paddingTop: 31,
        background: 'transparent',
      }}
    >
      <Table
        rowSelection={rowSelection(0)}
        columns={columns}
        dataSource={treeData}
        loading={{indicator: <Loading />, spinning: loading}}
        rowClassName={(rec) =>
          rec.isLone ? 'main-table-row row-is-lone' : 'main-table-row'
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
          if (editingData.iB === -1)
            tmp[editingData.iA].title = editingData.title;
          else
            tmp[editingData.iA].curriculum[editingData.iB].title =
              editingData.title;
          setDataSource(tmp);
          resetEditing();
        }}
      >
        <Input
          value={editingData?.name}
          prefix="Title: "
          onChange={(e) => {
            setEditingData((pre) => {
              return {...pre, title: e.target.value};
            });
          }}
        />
      </Modal>
    </TableContainer>
  );
}
1;
export default TableLessons;
