import {Table, Modal, Input, PageHeader, Layout, Tabs} from 'antd';
import {useEffect, useState} from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  BuildFilled,
  PlusOutlined,
} from '@ant-design/icons';
import {SpaceDiv, StyledText, TableContainer} from './styled';

// ducks action
import {useSelector} from 'react-redux';
import {RootState} from 'ducks/store';
import {getMyCourses} from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import {useHistory} from 'react-router-dom';

function TableCourses() {
  const history = useHistory();
  const {data: rawData}: any = useSelector<RootState>((state) => state.lms);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      key: 'a1',
      title: <StyledText fS={20}>TITLE</StyledText>,
      dataIndex: 'title',
      width: '35%',
      maxWidth: '35%',
    },
    {
      key: 'a2',
      title: (
        <div style={{textAlign: 'right'}}>
          <span
            style={{cursor: 'pointer'}}
            onClick={() => {
              onDeleteData(selectedRowKeys.map((key) => ({key: key})));
              setSelectedRowKeys([]);
            }}
          >
            <DeleteOutlined style={{color: '#635ffa'}} />
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
                <EditOutlined style={{color: '#635ffa'}} />
                &nbsp;RENAME
              </span>
              <SpaceDiv w={'5%'}>@</SpaceDiv>
              <span>
                <EyeFilled style={{color: '#635ffa'}} />
                &nbsp;VIEW
              </span>
              <SpaceDiv w={'5%'}>@</SpaceDiv>
              <span onClick={() => onDeleteData([record])}>
                <DeleteOutlined style={{color: '#635ffa'}} />
                &nbsp;DELETE
              </span>
              <SpaceDiv w={'5%'}>@</SpaceDiv>
              <span
                onClick={() =>
                  history.push('/learn/courses/builder/' + record._id)
                }
              >
                <BuildFilled style={{color: '#635ffa'}} />
                &nbsp;BUILDER
              </span>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    if (!rawData || dataSource.length !== 0) return;
    setDataSource(
      rawData.map((obj, i) => ({
        ...obj,
        key: i,
      })),
    );
    setLoading(false);
  }, [rawData]);

  const onDeleteData = (recArr) => {
    if (!recArr.length) return;
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource((pre) => {
          return pre
            .filter((obj) => recArr.every((record) => record.key !== obj.key))
            .map((obj, i) => ({...obj, key: i}));
        });
      },
    });
  };
  const onEditData = (record) => {
    setIsEditing(true);
    setEditingData({...record});
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
      if (event.target.localName != 'td') {
        event.stopPropagation();
        return;
      }
      if (selectedRowKeys.includes(record.key))
        return setSelectedRowKeys(
          selectedRowKeys.filter((a) => a !== record.key),
        );
      setSelectedRowKeys([...selectedRowKeys, record.key]);
    },
  });

  return (
    <TableContainer
      style={{
        paddingLeft: 30,
        paddingRight: 24,
        paddingTop: 45,
        background: 'transparent',
      }}
    >
      <Table
        onRow={rowListener}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={{indicator: <Loading />, spinning: loading}}
      />
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
              return {...pre, title: e.target.value};
            });
          }}
        />
      </Modal>
    </TableContainer>
  );
}

export default TableCourses;
