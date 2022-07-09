import { ReactElement, useEffect, useState } from "react";

import type { PropsType } from "./types";

import CourseReportsStats from "compositions/CourseReportsStats";
import CourseReportsViewChart from "compositions/CourseReportsViewChart";
import CourseReportsTable from "compositions/CourseReportsTable";

import { Col, Row } from "antd";
import { useDispatch } from "react-redux";

import {
  getAllUserReports,
  getCourseReportsStats,
  getCourseView,
} from "ducks/lms/actionCreator";

const Reports = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const [reportStats, setReportStats] = useState({});
  const [reportViewChart, setReportViewChart]: any = useState({});
  const [reportTable, setReportTable] = useState([]);

  useEffect(() => {
    const idOrg =
      localStorage.getItem("organizationId") || "6239ffd1cb8440277f2a2b39";

    dispatch(
      getCourseReportsStats({
        callback: (res = []) => {
          if (!res) return;
          setReportStats(res[0]);
        },
      })
    );

    dispatch(
      getCourseView({
        idOrg,
        callback: (res) => {
          if (!res) return;
          setReportViewChart(res[0]);
        },
      })
    );

    dispatch(
      getAllUserReports({
        callback: (res) => {
          if (!res) return;
          setReportTable(res);
        },
      })
    );
  }, []);

  return (
    <>
      <Row wrap={false} align={"middle"}>
        <Col flex={"none"}>
          <CourseReportsStats {...reportStats} />
        </Col>
        <Col flex={"auto"}>
          <CourseReportsViewChart
            courseViewData={reportViewChart?.courseViews || []}
          />
        </Col>
      </Row>
      <CourseReportsTable reportTableData={reportTable} />
    </>
  );
};

export default Reports;
