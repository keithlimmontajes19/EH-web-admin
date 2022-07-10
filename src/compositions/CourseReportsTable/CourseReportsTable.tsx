import { ReactElement, useEffect, useState } from "react";
import moment from "moment";

import { Table, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { theme } from "utils/colors";
import CourseReportsHeader from "compositions/CourseReportsHeader";
import Text from "components/Text";
import {
  BackArrowButton,
  DetailSpan,
  StyledInput,
  StyledSubTabs,
  StyledTabs,
  TableContainer,
  TableHeader,
} from "./styled";
import { useDispatch } from "react-redux";
import {
  getUserCourseReports,
  getUserCourseReportsDetails,
  getUserDetails,
} from "ducks/lms/actionCreator";

const { TabPane } = Tabs;

const CourseReportsTable = ({ reportTableData }): ReactElement => {
  const idOrg =
    localStorage.getItem("organizationId") || "6239ffd1cb8440277f2a2b39";
  const dispatch = useDispatch();

  const [reportsHeader, setReportsHeader]: any = useState({});
  const [loading, setLoading] = useState(false);

  // Index & Value per mode | 1 = User{data:[]}, 2 = Course{title:'', data:[]}, 3 = CourseDetail{title:'', data:[[]]}
  const [dataSource, setDataSource]: any = useState([{ data: "loading" }]);

  // Value per mode | User & Course = [], CourseDetail = [[]]
  const [searchdData, setSearchdData]: any = useState([]);

  // Value per mode | User & Course = "", CourseDetail = [""]
  const [searchInpt, setSearchInpt]: any = useState("");

  useEffect(() => {
    setDataSource([
      { data: reportTableData.map((item, i) => ({ ...item, key: i })) },
    ]);
    setSearchInpt("");
    setSearchdData([]);
  }, [reportTableData]);

  const renderCapsCell = (item) => (
    <Text fS={20} fC={theme.HEADINGS}>
      {item}
    </Text>
  );
  const cellTextAlign = (TextElem: any, textAlign: any = "center") => (
    <div style={{ textAlign }} children={TextElem} />
  );

  const userDetailHandler = (record) => {
    setLoading(true);
    const userPrevCallback = (res, userRecord) => {
      if (!res) return;
      setReportsHeader({ ...userRecord, userPreview: res?.profile?.avatar });
    };
    const courseReportCallback = (res) => {
      if (!res) return;
      const copy = JSON.parse(JSON.stringify(dataSource));
      copy.push({
        title: record?.firstName + `'s Course List`,
        data: res.map((obj) => ({
          ...obj,
          completed: obj?.completed ? "Completed" : "In Progress",
          createdAt: moment(obj?.createdAt)?.format("MM/DD/YY"),
        })),
      });

      dispatch(
        getUserDetails({
          idUser: record?._id,
          callback: (_res) => {
            if (!_res) return;
            userPrevCallback(_res, record);

            setLoading(false);
            setDataSource(copy);
          },
        })
      );
    };

    dispatch(
      getUserCourseReports({
        idOrg: record?.organizationId,
        idUser: record?._id,
        callback: courseReportCallback,
      })
    );
  };

  const courseDetailHandler = (record) => {
    setLoading(true);
    const courseReportDetailCallback = (res) => {
      if (!res) return;
      const { lessons, topics, quizzes, assignments } = res[0];
      const generateAssociated = (id) => {
        for (let count = 0; count < lessons.length; count++) {
          if (lessons[count]?.contents?.includes(id))
            return lessons[count]?.title;
        }
        return "None";
      };
      const mapper = (item, i) => ({
        ...item,
        index: i,
        associated: generateAssociated(item._id),
        createdAt: moment(item?.progressCreatedAt || item?.createdAt)?.format(
          "MM/DD/YY"
        ),
      });
      const detailResult = [
        lessons?.map(mapper),
        topics?.map(mapper),
        quizzes?.map(mapper),
        assignments?.map(mapper),
      ];

      const copy = JSON.parse(JSON.stringify(dataSource));
      copy.push({ title: record?.title, data: detailResult });
      setLoading(false);
      setDataSource(copy);
      setSearchInpt(["", "", "", ""]);
      setSearchdData([[], [], [], []]);
    };

    dispatch(
      getUserCourseReportsDetails({
        idOrg: record?.organizationId,
        idUser: record?.userId,
        idCourse: record?._id,
        callback: courseReportDetailCallback,
      })
    );
  };

  // Arr indexes | 1 = User, 2 = Course, 3 = Course-Details
  const tableViewModes = [
    {
      name: "User",
      searchKeys: ["firstName", "lastName", "organizationTitle", "enrolled"],
      column: [
        {
          t: cellTextAlign("Name", "left"),
          dI: "firstName",
          w: 24,
          render: (item) => cellTextAlign(renderCapsCell(item), "left"),
        },
        { t: "Organization", dI: "organizationTitle", w: 26.5, render: false },
        { t: "Course Enrolled", dI: "enrolled", w: 19.4, render: false },
        { t: "Completed", dI: "completed", w: 16, render: false },
        {
          t: "Detail",
          dI: "",
          w: 19,
          render: (record, wholeRecord) => (
            <DetailSpan onClick={() => userDetailHandler(wholeRecord)}>
              See Details
            </DetailSpan>
          ),
        },
      ],
    },
    {
      name: "Course",
      searchKeys: ["title", "index"],
      column: [
        {
          t: cellTextAlign("Course", "left"),
          dI: "title",
          w: 24,
          render: (item) => cellTextAlign(renderCapsCell(item), "left"),
        },
        { t: "Completed", dI: "completed", w: 26.5, render: false },
        { t: "Quiz Score", dI: "totalQuizScore", w: 16, render: false },
        { t: "Completion Date", dI: "createdAt", w: 19.5, render: false },
        {
          t: "Detail",
          dI: "",
          w: 19,
          render: (record, wholeRecord) => (
            <DetailSpan onClick={() => courseDetailHandler(wholeRecord)}>
              See Details
            </DetailSpan>
          ),
        },
      ],
    },
    {
      multiName: ["Lesson", "Topic", "Quiz", "Assignments"],
      multiSearchKeys: [
        ["title", "index"],
        ["title", "index"],
        ["title", "score"],
        ["title"],
      ],
      multiColumn: [
        [
          { t: "Order", dI: "index", w: 19.5, render: false },
          {
            t: cellTextAlign("Lesson Name", "left"),
            dI: "title",
            w: 66,
            render: (item) => cellTextAlign(renderCapsCell(item), "left"),
          },
          { t: "Status", dI: "status", w: 19.5, render: false },
          ,
        ],
        [
          { t: "Order", dI: "index", w: 12, render: false },
          {
            t: cellTextAlign("Topic Name", "left"),
            dI: "title",
            w: 47,
            render: (item) => cellTextAlign(renderCapsCell(item), "left"),
          },
          { t: "Status", dI: "status", w: 19.5, render: false },
          ,
          {
            t: cellTextAlign("Associated Lesson", "left"),
            dI: "associated",
            w: 26.5,
            render: (item) => cellTextAlign(item, "left"),
          },
        ],
        [
          {
            t: cellTextAlign("Quiz Name", "left"),
            dI: "title",
            w: 32.5,
            render: (item) => cellTextAlign(renderCapsCell(item), "left"),
          },
          { t: "Score", dI: "score", w: 19.5, render: false },
          {
            t: cellTextAlign("Associated Lesson", "left"),
            dI: "associated",
            w: 26.5,
            render: (item) => cellTextAlign(item, "left"),
          },
          { t: "Date Completed", dI: "createdAt", w: 26.5, render: false },
          ,
        ],
        [
          {
            t: cellTextAlign("Assignment Name", "left"),
            dI: "title",
            w: 19.5,
            render: (item) => cellTextAlign(renderCapsCell(item), "left"),
          },
          { t: "Approval", dI: "approval", w: 19.5, render: false },
          { t: "Submitted On", dI: "createdAt", w: 26.5, render: false },
          ,
        ],
      ],
    },
  ];

  const columnMapper = (arr) =>
    arr.map((obj, i) => ({
      key: i,
      title: <Text fS={20}>{obj?.t}</Text>,
      dataIndex: obj?.dI,
      width: obj?.w + "%",
      ...(obj?.render ? { render: obj?.render } : {}),
    }));

  const handleSearch = (e, subModeIndex: any = false) => {
    let inpt = searchInpt;
    subModeIndex === false
      ? (inpt = e.target.value)
      : (inpt[subModeIndex] = e.target.value);
    setSearchInpt(inpt);
    const pattern = e.target.value
      .split("")
      .map((x) => `(?=.*${x})`)
      .join("");
    const regX = new RegExp(`${pattern}`, "gi");

    const modeIndex = dataSource.length - 1;
    const tmp = [];
    const data = dataSource[modeIndex]?.data;
    const dataToFilter = subModeIndex === false ? data : data[subModeIndex];

    const searchKeys =
      subModeIndex === false
        ? tableViewModes[modeIndex]?.searchKeys
        : tableViewModes[modeIndex]?.multiSearchKeys[subModeIndex];
    const getSearchString = (record) => {
      let _string = "";
      searchKeys.forEach((key) => (_string += ` ${record[key]}`));
      return _string;
    };
    dataToFilter.forEach((record, i) => {
      if (regX.test(getSearchString(record))) tmp.push(record?._id);
    });

    let copyData = JSON.parse(JSON.stringify(searchdData));
    const result = dataToFilter.filter((obj) => tmp.includes(obj?._id));
    subModeIndex === false
      ? (copyData = result)
      : (copyData[subModeIndex] = result);

    setSearchdData(copyData);
  };

  return (
    <>
      <StyledTabs defaultActiveKey="1" type="card">
        <TabPane tab={<Text fS={20}>Course Report</Text>} key="1" />
        <TabPane tab={<Text fS={20}>User Report</Text>} key="2" />
      </StyledTabs>
      {dataSource.length > 1 ? (
        <CourseReportsHeader {...reportsHeader} />
      ) : (
        <></>
      )}
      <TableContainer
        bG={dataSource.length > 1 ? theme.LIGHT_HEADINGS : theme.PRIMARY_MID}
      >
        {dataSource.length > 1 && !loading ? (
          <BackArrowButton
            onClick={() => {
              if (dataSource.length === 1) return;
              const copy = JSON.parse(JSON.stringify(dataSource));
              copy.pop();
              setSearchInpt("");
              setSearchdData([]);
              setDataSource(copy);
            }}
          />
        ) : (
          <></>
        )}
        {dataSource.length === 3 && (
          <div
            style={{ margin: "20px 0 20px 10px" }}
            children={
              <Text fS={22}>{dataSource[dataSource.length - 1]?.title}</Text>
            }
          />
        )}
        {dataSource.length < 3 ? (
          <>
            <TableHeader
              bG={
                dataSource.length > 1 ? theme.LIGHT_HEADINGS : theme.PRIMARY_MID
              }
            >
              {dataSource.length === 2 && (
                <Text fC={theme.HEADINGS} fS={22} m={"10px 0 30px 0"}>
                  {dataSource[dataSource.length - 1]?.title}
                </Text>
              )}
              <StyledInput
                placeholder={
                  "Search " + tableViewModes[dataSource.length - 1]?.name
                }
                defaultValue={searchInpt}
                onChange={handleSearch}
                prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
              />
            </TableHeader>
            <Table
              size="middle"
              loading={loading}
              columns={columnMapper(
                tableViewModes[dataSource.length - 1]?.column
              )}
              dataSource={
                searchInpt !== ""
                  ? searchdData
                  : typeof dataSource[dataSource.length - 1]?.data !== "object"
                  ? []
                  : dataSource[dataSource.length - 1]?.data
              }
            />
          </>
        ) : (
          <StyledSubTabs defaultActiveKey="0" type="card">
            {dataSource[2]?.data?.map((data, i) => (
              <TabPane
                tab={<Text fS={20}>{tableViewModes[2]?.multiName[i]}</Text>}
                key={i.toString()}
              >
                <TableHeader bG={theme.LIGHT_HEADINGS}>
                  <StyledInput
                    placeholder={"Search " + tableViewModes[2]?.multiName[i]}
                    defaultValue={searchInpt[i]}
                    onChange={(e) => handleSearch(e, i)}
                    prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
                  />
                </TableHeader>
                <Table
                  size="middle"
                  loading={loading}
                  columns={columnMapper(tableViewModes[2]?.multiColumn[i])}
                  dataSource={searchInpt[i] !== "" ? searchdData[i] : data}
                />
              </TabPane>
            ))}
          </StyledSubTabs>
        )}
      </TableContainer>
    </>
  );
};

export default CourseReportsTable;
