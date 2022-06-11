import { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { PropsType } from "./types";

/* styled */
import { StyledText, StyledInput, TableContainer } from "./styled";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnnouncements,
  deleteAnnouncements,
} from "ducks/announcement/actionCreator";

/* antd icons */
import { columns } from "./columns";
import { Table, Layout, PageHeader } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/* components */
import Loading from "components/Loading";
import EditAnnouncement from "compositions/EditAnnouncement";
import Createannouncement from "compositions/Createannouncement";

const Announcements = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, loading }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  const [selected, setSelected] = useState({});
  const [editShow, setEditShow] = useState(false);
  const [searchInpt, setSearchInpt] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchdData, setSearchdData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

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

  const handleSearch = (e) => {};

  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <PageHeader
          ghost={false}
          extra={[<Createannouncement />]}
          style={{ background: "none", paddingTop: 8 }}
          title={<StyledText fS={30}>Announcements</StyledText>}
        />
        <TableContainer
          style={{
            paddingLeft: 30,
            paddingRight: 24,
            background: "transparent",
          }}
        >
          <StyledInput
            onChange={handleSearch}
            defaultValue={searchInpt}
            placeholder="Search Pages"
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />
          <Table
            dataSource={data}
            columns={columns(
              dispatch,
              deleteAnnouncements,
              setSelected,
              setEditShow
            )}
            onRow={rowListener}
            // rowSelection={rowSelection}
            loading={{ indicator: <Loading />, spinning: loading }}
          />

          <EditAnnouncement
            selected={selected}
            editShow={editShow}
            setEditShow={setEditShow}
          />
        </TableContainer>
      </Layout>
    </>
  );
};

export default Announcements;
