import { Table, Modal, Input, PageHeader, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { StyledButton, StyledInput, StyledText, TableContainer } from './styled';
import { Link, Redirect, useHistory } from 'react-router-dom';


// ducks action
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import { getDashboard } from 'ducks/dashboard/actionCreator';
import Loading from 'components/Loading';

function TableDashboards() {
  const { data: rawData }: any = useSelector<RootState>(
    (state) => state.dashboard,
  );
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [searchInpt, setSearchInpt] = useState('');

  const history = useHistory()

  const pushHistory = (route: string) => {
    history.push(route)
  }

  const columns = [
    {
      key: '1',
      title: <StyledText fS={20}>TITLE</StyledText>,
      dataIndex: 'name',
      width: '35%',
      maxWidth: '35%',
    },
    {
      key: '2',
      title: <StyledText fS={20}>DEPARTMENT</StyledText>,
      dataIndex: 'department',
      maxWidth: '25%',
    },
    {
      key: '3',
      title: (
        <div style={{ textAlign: 'right' }}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onDeleteData(selectedRowKeys.map((key) => ({ key: key })));
              setSelectedRowKeys([]);
            }}
          >
            <DeleteOutlined style={{ color: '#635ffa' }} />
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
                <EditOutlined style={{ color: '#635ffa' }} />
                &nbsp;RENAME
              </span>
              <div
                style={{
                  display: 'inline-block',
                  visibility: 'hidden',
                  textIndent: -99999,
                  width: '20%',
                }}
              >
                @
              </div>
              <span onClick={() => onDeleteData([record])}>
                <DeleteOutlined style={{ color: '#635ffa' }} />
                &nbsp;DELETE
              </span>
            </div>
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
      })),
    );
    setLoading(false);
  }, [rawData]);

  useEffect(() => {
    if (searchInpt === '') return;
    setSearchdData(
      dataSource.filter((obj) => {
        return searchdData.some((objX) => {
          if (objX._id === obj._id) return true;
        });
      }),
    );
  }, [dataSource]);

  const onAddData = () => {
    const newKey = dataSource.length;
    const newData = {
      _id: newKey,
      key: newKey,
      name: 'Name ' + newKey,
      email: newKey + '@gmail.com',
      department: 'Address ' + newKey,
    };
    setDataSource((pre) => {
      return [...pre, newData];
    });
    console.log('add');
    pushHistory('/team/dashboards/create')
  };
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
            .map((obj, i) => ({ ...obj, key: i }));
        });
        if (searchInpt !== '') refreshSearchdData();
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
    console.log('selectedRowKeys changed: ', newRowKeys);
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
  const handleSearch = (e) => {
    setSearchInpt(e.target.value);
    setSelectedRowKeys([]);
    const pattern = e.target.value
      .split('')
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join('');
    const regX = new RegExp(`${pattern}`, 'gi');
    const tmp = [];
    dataSource.forEach((record, i) => {
      if (regX.test(record?.name + ' ' + record?.department)) tmp.push(i);
    });
    if (!tmp.length) return setSearchdData([]);
    setSearchdData(dataSource.filter((obj) => tmp.includes(obj.key)));
    console.log(
      tmp,
      dataSource.filter((obj) => tmp.includes(obj.key)),
      e.target.value,
      searchInpt,
    );
  };
  const refreshSearchdData = () => {
    console.log('refresh');
    setSearchdData(
      dataSource.filter((record) =>
        searchdData.some((obj) => obj.key === record.key),
      ),
    );
  };
  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        title={<StyledText fS={30}>Dashboards</StyledText>}
        style={{ background: 'none', paddingTop: 8 }}
        extra={[<StyledButton onClick={onAddData}>Create</StyledButton>]}
      />
      <TableContainer
        style={{
          paddingLeft: 30,
          paddingRight: 24,
          background: 'transparent',
        }}
      >
        <StyledInput
          placeholder="Search Dashboards"
          defaultValue={searchInpt}
          onChange={handleSearch}
          prefix={<SearchOutlined style={{ color: '#635ffa' }} />}
        />
        <Table
          onRow={rowListener}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={searchInpt !== '' ? searchdData : dataSource}
          loading={{ indicator: <Loading />, spinning: loading }}
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
          <Input
            value={editingData?.department}
            prefix="Department: "
            onChange={(e) => {
              setEditingData((pre) => {
                return { ...pre, department: e.target.value };
              });
            }}
          />
        </Modal>
      </TableContainer>
    </Layout>
  );
}

export default TableDashboards;
