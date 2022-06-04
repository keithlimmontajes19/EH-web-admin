import { ReactElement, useEffect, useState } from "react";
import { Tabs } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { List } from "antd";
import { Table, Tag, Space } from "antd";

// image imported here
import listicon1 from "../../../assets/icons/recent-icon-1.svg";
import listicon2 from "../../../assets/icons/recent-icon-2.svg";
import listicon3 from "../../../assets/icons/recent-icon-3.svg";
import listicon4 from "../../../assets/icons/recent-icon-4.svg";
import viewicon from "../../../assets/icons/viewicon.svg";
import doticon from "../../../assets/icons/dot-icon.svg";
import greendot from "../../../assets/icons/greendot.svg";
import reddot from "../../../assets/icons/red-dot.svg";
import orgicon from "../../../assets/icons/orgicon.svg";
import clockicon from "../../../assets/icons/clockicon.svg";
import noannouncment from "../../../assets/images/noannouncement.png";
import { getAllAnnouncement, getAllOrganizations } from "ducks/announcement/actionCreator"

import type { PropsType } from "./types";
import {
  Container,
  RootContainer,
  IconImg,
  Img,
  Title,
  ListTitle,
  ViewIcon,
  DotIcon,
  Br,
  RecentBody,
  TableContainer,
  StatusDot,
  TableCell,
  TabContainer,
} from "./styled";
import { StyledText } from "compositions/TableDashboards/styled";
import { useSelector } from "react-redux";
import { RootState } from "ducks/store";
import { ColumnType } from "antd/lib/table";
import moment from "moment";
import Loading from "components/Loading";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const data = [
  {
    title: `Sample Dashboard’s Name `,
    src: listicon1,
    description: "Person’s name created this dashboard",
    view: "vieved 3 hours ago",
  },
  {
    title: "Sample Page’s Name",
    src: listicon2,
    description: "Person’s name created this page",
    view: "vieved 4 hours ago",
  },
  {
    title: "Sample Announcement’s Name",
    src: listicon3,
    description: "Person’s name created this announcement",
    view: "vieved 1 day ago",
  },
  {
    title: "Sample Quiz’s Name",
    src: listicon4,
    description: "Person’s name created this quiz",
    view: "vieved 9 hours ago",
  },
];

const columns = [
  {
    title: 'Announcement',
    dataIndex: 'announcement',
    key: 'announcement',
    render: announcement => <TableCell style={{ width: "150px" }}>
      <StatusDot
        src={
          announcement.status === "active"
            ? `${greendot}`
            : `${reddot}`
        }
      />
      <p>{announcement.title}</p>
    </TableCell>
  },
  {
    title: 'organizationTeam',
    dataIndex: 'organizationTeam',
    key: 'organizationTeam',
    render: organization => <TableCell style={{ height: "" }}>
      <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
      <h3 style={{ marginBottom: "0px" }}>{organization}</h3>
    </TableCell>
  },
  {
    title: 'dateadded',
    dataIndex: 'dateadded',
    key: 'dateadded',
    render: dateadded =>
      <TableCell >
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px", width: "150px" }}>{dateadded}</h3>
      </TableCell>
  }

]

const tabledata = [
  {
    announcement: ` Sample Announcement`,
    dateadded: (
      <TableCell>
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
      </TableCell>
    ),
    organizationTeam: (
      <TableCell>
        <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sample NameTeam / Organization</h3>
      </TableCell>
    ),
  },
  {
    announcement: "Sample Announcement",
    dateadded: (
      <TableCell>
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
      </TableCell>
    ),
    organizationTeam: (
      <TableCell>
        <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sample NameTeam / Organization</h3>
      </TableCell>
    ),
  },
  {
    announcement: "Sample Announcement",
    dateadded: (
      <TableCell>
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
      </TableCell>
    ),
    organizationTeam: (
      <TableCell>
        <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sample NameTeam / Organization</h3>
      </TableCell>
    ),
  },
  {
    announcement: "Sample Announcement",
    dateadded: (
      <TableCell>
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
      </TableCell>
    ),
    organizationTeam: (
      <TableCell>
        <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sample NameTeam / Organization</h3>
      </TableCell>
    ),
  },
  {
    announcement: "Sample Announcement",
    dateadded: (
      <TableCell>
        <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
      </TableCell>
    ),
    organizationTeam: (
      <TableCell>
        <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
        <h3 style={{ marginBottom: "0px" }}>Sample NameTeam / Organization</h3>
      </TableCell>
    ),
  },
];

interface DataType {
  announcement?: any,
  dateadded?: any,
  organizationTeam?: any

}

const Home = (props: PropsType): ReactElement => {
  const { data: rawData }: any = useSelector<RootState>((state) => state?.announcement)
  const { data: Organization }: any = useSelector<RootState>((state) => state?.announcement?.organizations)
  const [loading, setLoading] = useState(true)

  function listorg(orgs) {
    const data = Organization?.filter(o => orgs.includes(o._id))
    const data1 = data?.map((item, index) => {
      return (item.name)
    })
    console.log(data1)
    return data1

  }

  const tabledata1: DataType[] = rawData?.map((item, index) =>
  (<>
    announcement: item,
    dateadded: (
    <TableCell key={index}>
      <StatusDot src={clockicon} style={{ margin: "0px 5px" }} />
      <h3 style={{ marginBottom: "0px" }}>Sept. 11, 2022 11:24 PM</h3>
    </TableCell>
    ),
    organizationTeam: (
    <TableCell key={index}>
      <StatusDot src={orgicon} style={{ margin: "0px 5px" }} />
      <h3 style={{ marginBottom: "0px" }}>{item.title}</h3>
    </TableCell>
    {console.log(item, "item")}
    ),
  </>
  ),
  )

  const data2: DataType[] = rawData?.map((item, index) => {
    return (
      {
        key: index,
        announcement: item,
        organizationTeam: moment(item.createdAt).format('L'),
        dateadded: listorg(item.organization)

      }
    )
  })
  useEffect(() => {
    getAllAnnouncement();
    getAllOrganizations();
    setLoading(false)
  }, [])
  console.log(rawData, Organization)
  return (
    <div>
      <RootContainer>
        <Row gutter={16} style={{ padding: "30px" }}>
          <Col className="gutter-row" span={12}>
            <Container>
              <Img src={noannouncment} alt="noannpuncment"></Img>
              <Title>No Announcement</Title>
            </Container>
          </Col>
          <Col className="gutter-row" span={12}>
            <TableContainer>
              <Table
                dataSource={data2}
                columns={columns}
                loading={{ indicator: <Loading />, spinning: loading }}
                pagination={{ pageSize: 4 }}
              />
            </TableContainer>
          </Col>
        </Row>

        <RecentBody>
          <PageHeader
            title={<StyledText fs={30}>Recents</StyledText>}
            style={{ background: "none", padding: 8 }}
          />
          <TabContainer>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Visited" key={1}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<IconImg src={item.src} />}
                        title={<ListTitle>{item.title}</ListTitle>}
                        description={
                          <div>
                            {item.description} <DotIcon src={doticon} />{" "}
                            <ViewIcon src={viewicon} />
                            {item.view}
                          </div>
                        }
                      />
                      <Br />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Worked on" key={2}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<IconImg src={item.src} />}
                        title={<ListTitle>{item.title}</ListTitle>}
                        description={
                          <div>
                            {item.description} <DotIcon src={doticon} />{" "}
                            <ViewIcon src={viewicon} />
                            {item.view}
                          </div>
                        }
                      />
                      <Br />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Draft" key={3}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<IconImg src={item.src} />}
                        title={<ListTitle>{item.title}</ListTitle>}
                        description={
                          <div>
                            {item.description} <DotIcon src={doticon} />{" "}
                            <ViewIcon src={viewicon} />
                            {item.view}
                          </div>
                        }
                      />
                      <Br />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Started" key={4}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<IconImg src={item.src} />}
                        title={<ListTitle>{item.title}</ListTitle>}
                        description={
                          <div>
                            {item.description} <DotIcon src={doticon} />{" "}
                            <ViewIcon src={viewicon} />
                            {item.view}
                          </div>
                        }
                      />
                      <Br />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </TabContainer>
        </RecentBody>
      </RootContainer>
    </div>
  );
};

export default Home;
