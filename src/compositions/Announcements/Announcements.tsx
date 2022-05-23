import { ReactElement } from "react";
import {
  PageHeader,
  Breadcrumb,
  Layout,
  Table,
  Modal,
  Tag,
  Popover,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import Loading from "components/Loading";
import { getDashboard } from "ducks/dashboard/actionCreator";
import { getAllAnnouncement, getAnnouncements } from "ducks/announcement/actionCreator"
import Createannouncement from "compositions/Createannouncement";

import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";

import type { PropsType } from "./types";
// import { SearchOutlined } from "@ant-design/icons";
import {
  StyledText,
  StyledButton,
  StyledInput,
  TableContainer,
  PopupContainer,
  Contentdiv,
  BuildIcon,
} from "./styled";
import buildicon from "../../assets/icons/hammer-icon.svg";

const Announcements = (props: PropsType): ReactElement => {
  const { data: rawData }: any = useSelector<RootState>(
    (state) => state.announcement
  );
  const [loading, setLoading] = useState(true);

  const [searchInpt, setSearchInpt] = useState("");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [file, setFile] = useState("")



  const handlechnage = () => {

  }
  const history = useHistory();
  const pushHistory = (route: string) => {
    history.push(route);
  };

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
    pushHistory("/team/annoubcements/createannouncement");
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
  const onSelectChange = (newRowKeys) => {
    console.log("selectedRowKeys changed: ", newRowKeys);
    setSelectedRowKeys(newRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onEditData = (record) => {
    setIsEditing(true);
    setEditingData({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingData(null);
  };

  const content = (
    <div style={{ fontSize: "18px" }}>
      <Contentdiv>
        <BuildIcon
          src={buildicon}
          style={{
            height: "17px",
            color: "#635ffa",
            fontSize: "18px",
            padding: "0px 10px",
          }}
        />
        Builder
      </Contentdiv>
      <Contentdiv>
        <EditOutlined
          style={{
            color: "#635ffa",
            fontSize: "18px",
            padding: "10px 10px",
          }}
        />
        Edit
      </Contentdiv>
      <Contentdiv>
        <EyeFilled
          style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
        />
        View{" "}
      </Contentdiv>
      <Contentdiv style={{ padding: "0px" }}>
        <DeleteOutlined
          style={{ color: "#635ffa", fontSize: "18px", padding: "10px 10px" }}
        />
        Delete
      </Contentdiv>
    </div>
  );

  const columns = [
    {
      key: "1",
      title: <StyledText fS={20}>TITLE</StyledText>,
      dataIndex: "title",
      width: "35%",
      maxWidth: "35%",
    },
    {
      key: "2",
      title: <StyledText fS={20}>DEPARTMENT</StyledText>,
      dataIndex: "title",
      width: "35%",
      maxWidth: "35%",
    },
    {
      key: "3",
      title: <StyledText fS={20}>STATUS</StyledText>,
      dataIndex: "status",
      width: "35%",
      maxWidth: "35%",
      render: (status) => {
        let color: string = "green";
        if (status === "active") {
          color = "green";
        }
        if (status === "inactive") {
          color = "red";
        }
        if (status === "inprogress") {
          color = "blue";
        }

        return (
          <Tag
            color={color}
            style={{
              borderRadius: "15px",
              fontSize: "16px",
              padding: "10px 30px",
            }}

          >
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      key: "4",
      title: <StyledText fS={20}>DATEADDED</StyledText>,
      dataIndex: "start_date",
      width: "35%",
      maxWidth: "35%",
      render: (dateadded) => {
        return (
          <>
            <PopupContainer>
              <div style={{ fontSize: '16«px' }}>{dateadded.split("T")[0]}</div>
              <Popover
                trigger="click"
                content={content}
                overlayInnerStyle={{ borderRadius: "15px" }}
                placement="bottom"
              >
                <MoreOutlined
                  style={{
                    color: "#635FFA",
                    paddingLeft: "5px",
                  }}
                />
              </Popover>
            </PopupContainer>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getAllAnnouncement();
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

  const handleSearch = (e) => { };

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
          title={<StyledText fS={30}>Announcements</StyledText>}
          style={{ background: "none", paddingTop: 8 }}
          extra={[<Createannouncement />]}
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

          <Table
            onRow={rowListener}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={searchInpt !== "" ? searchdData : dataSource}
            loading={{ indicator: <Loading />, spinning: loading }}
          />
        </TableContainer>
      </Layout>
    </>
  );
};

export default Announcements;
