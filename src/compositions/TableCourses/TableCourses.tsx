import { Table, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  EyeFilled,
  BuildFilled,
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons';

import {
  SpaceDiv,
  FirstText,
  TextStyled,
  ColumnText,
  TableContainer,
} from './styled';
import { StyledInput } from 'compositions/LoginForm/styled';

/* reducer action */
import {
  updateCourse,
  getMyCourses,
  deleteCourse,
  getCurriculum,
} from 'ducks/lms/actionCreator';
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

import ModalCurriculum from 'compositions/ModalCurriculum';

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
      key: 'a1',
      title: <TextStyled>TITLE</TextStyled>,
      dataIndex: 'title',
      width: '35%',
      maxWidth: '35%',
    },
    {
      key: 'a2',
      title: (
        <div style={{ textAlign: 'right' }}>
          <FirstText
            onClick={() => {
              onDeleteData(
                dataSource.filter((obj) => selectedRowKeys.includes(obj.key))
              );
              setSelectedRowKeys([]);
            }}
          >
            <DeleteFilled style={{ color: '#4C4B7B,', fontSize: 19 }} />
          </FirstText>
        </div>
      ),
      minWidth: 350,
      render: (record) => {
        return (
          <>
            <div className="row-actions">
              <ColumnText onClick={() => onEditData(record)}>
                <EditFilled style={{ color: '#4C4B7B' }} />
                &nbsp;RENAME
              </ColumnText>

              <SpaceDiv w={'5%'}>@</SpaceDiv>

              <ColumnText onClick={() => openView(record)}>
                <EyeFilled style={{ color: '#4C4B7B' }} />
                &nbsp;VIEW
              </ColumnText>

              <SpaceDiv w={'5%'}>@</SpaceDiv>

              <ColumnText onClick={() => onDeleteData([record])}>
                <DeleteFilled style={{ color: '#4C4B7B' }} />
                &nbsp;DELETE
              </ColumnText>

              <SpaceDiv w={'5%'}>@</SpaceDiv>

              <ColumnText
                onClick={() => {
                  localStorage.setItem('courseId', record?._id);
                  history.push('/learn/courses/builder/' + record._id);
                }}
              >
                <BuildFilled style={{ color: '#4C4B7B' }} />
                &nbsp;BUILDER
              </ColumnText>
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
      title: 'Are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
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
    if (JSON.stringify(editingData) === '{}') return;

    localStorage.setItem('courseId', editingData._id);
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

  const openView = (obj) => {
    localStorage.setItem('courseId', obj?._id);
    localStorage.setItem('organizationId', obj?.organizationId);

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
        paddingTop: 30,
        background: 'transparent',
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
        okText="SAVE"
        cancelText="CANCEL"
        visible={isEditing}
        onOk={renameOk}
        onCancel={() => {
          resetEditing();
        }}
        okButtonProps={{
          size: 'large',
          style: {
            borderRadius: 8,
            background: '#635FFA',
            fontFamily: 'Red Hat Display',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 16,
          },
        }}
        cancelButtonProps={{
          size: 'large',
          style: {
            borderRadius: 8,
            background: '#FFF',
            fontFamily: 'Red Hat Display',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 16,
            color: '#635FFA',
            border: 'none',
          },
        }}
      >
        <div style={{ padding: 20 }}>
          <ColumnText>Rename Course</ColumnText>
          <StyledInput
            prefix="Title: "
            value={editingData?.title}
            onChange={(e) => {
              setEditingData((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
        </div>
      </Modal>
      <ModalCurriculum isVisible={viewVisible} isCancel={closeView} />
    </TableContainer>
  );
};

export default TableCourses;
