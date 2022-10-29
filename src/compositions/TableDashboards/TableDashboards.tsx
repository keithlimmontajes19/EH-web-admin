import { Table, Modal, Input, PageHeader, Layout } from 'antd';
import { useEffect, useState } from 'react';
import {
  EyeFilled,
  DeleteFilled,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import {
  ColumnText,
  StyledTitle,
  StyledInput,
  TableContainer,
  ColumnFirstText,
} from 'compositions/Announcements/styled';
import { useHistory } from 'react-router-dom';

// ducks action
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import {
  deleteDashboard,
  getDashboard,
  updateDashboard,
} from 'ducks/dashboard/actionCreator';
import CreateDashboard from '../CreateDashboard';
import IconImage from 'components/IconImage';
import DELETE_ICON from 'assets/icons/delete-icon.png';
import hammericon from '../../assets/icons/hammer-color.png';
import { BuildIcon } from '../TablePages/styled';
import { Space } from 'antd';

function TableDashboards() {
  const dispatch = useDispatch();
  const { data: rawData, loading }: any = useSelector<RootState>(
    (state) => state.dashboard
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [searchInpt, setSearchInpt] = useState('');

  const history = useHistory();

  const pushHistory = (route: string) => {
    history.push(route);
  };

  const columns = [
    {
      key: '1',
      title: <ColumnText>TITLE</ColumnText>,
      dataIndex: 'name',
      width: '35%',
      maxWidth: '35%',
      render: (record) => <ColumnFirstText>{record}</ColumnFirstText>,
    },
    {
      key: '2',
      title: <ColumnText>DEPARTMENT</ColumnText>,
      dataIndex: 'organization',
      maxWidth: '25%',
      render: (record: any) => {
        return (
          <>
            {(record || []).map((item) => (
              <>{item?.name} &nbsp;</>
            ))}
          </>
        );
      },
    },
    {
      key: '3',
      title: (
        <div style={{ textAlign: 'right' }}>
          <span
            style={{ cursor: 'pointer' }}
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
      ),
      minWidth: 350,
      render: (record) => {
        return (
          <>
            <div className="row-actions">
              <Space className="row-actions" size={'middle'}>
                <span onClick={() => onDeleteData([record])}>
                  <DeleteFilled
                    style={{
                      color: '#4C4B7B',
                      width: 20,
                      fontSize: 20,
                    }}
                  />
                </span>

                <span onClick={() => onEditData(record)}>
                  <EditOutlined
                    style={{
                      color: '#4C4B7B',
                      width: 20,
                      fontSize: 20,
                    }}
                  />
                </span>

                <span
                  onClick={() => pushHistory(`/team/dashboards/${record?._id}`)}
                >
                  <BuildIcon
                    src={hammericon}
                    color="#4C4B7B"
                    style={{
                      color: '#4C4B7B',
                      width: 20,
                      height: 17,
                      marginTop: -5,
                    }}
                  />
                </span>
              </Space>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  useEffect(() => {
    if (!rawData) return;
    setDataSource(
      rawData.map((obj, i) => ({
        ...obj,
        key: i,
      }))
    );
  }, [rawData]);

  useEffect(() => {
    if (searchInpt === '') return;
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
      title: 'Are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        function recurseDispatch(count = 0) {
          if (count >= recArr.length) return;
          localStorage.setItem('dashboardId', recArr[count]._id);
          dispatch(
            deleteDashboard({
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
          selectedRowKeys.filter((a) => a !== record.key)
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
  };
  const refreshSearchdData = () => {
    setSearchdData(
      dataSource.filter((record) =>
        searchdData.some((obj) => obj.key === record.key)
      )
    );
  };

  return (
    <Layout style={{ paddingRight: 50, background: 'transparent' }}>
      <PageHeader
        ghost={false}
        title={<StyledTitle>Dashboards</StyledTitle>}
        style={{ background: 'none', paddingTop: 8 }}
        extra={[<CreateDashboard />]}
      />

      <TableContainer
        hasData={dataSource.length}
        style={{
          paddingLeft: 30,
          paddingRight: 24,
          background: 'transparent',
        }}
      >
        <StyledInput
          placeholder="Type"
          defaultValue={searchInpt}
          onChange={handleSearch}
          prefix={<SearchOutlined style={{ color: '#A2A1BD' }} />}
        />

        <Table
          onRow={rowListener}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={searchInpt !== '' ? searchdData : dataSource}
          loading={loading}
        />

        <Modal
          title="Rename"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            const copyEdited = JSON.parse(JSON.stringify(editingData));
            localStorage.setItem('dashboardId', copyEdited._id);
            const callback = (res) => {
              if (!res) return;
              setDataSource((pre) => {
                return pre.map((obj) => {
                  if (obj._id === copyEdited._id) {
                    return copyEdited;
                  } else {
                    return obj;
                  }
                });
              });
            };
            dispatch(updateDashboard({ data: copyEdited, callback }));
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
  );
}

export default TableDashboards;
