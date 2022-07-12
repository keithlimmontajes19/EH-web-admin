import { ReactElement, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.css";

import { theme } from "utils/colors";
import { ChartContainer, DateSelectionSpace } from "./styled";
import Text from "components/Text";
import Dropdown from "components/Dropdown";

const CourseReportsViewChart = ({ courseViewData = [] }) => {
  const getDateNow = new Date();
  const viewOption = ["Monthly Views", "Weekly Views", "Daily Views"];

  // View Data Converter per Date

  const getMonthlyViews = ({ data, year, month, day }) => {
    return Array.from(Array(12)).map((x, i) => {
      const momented = moment(Number(i) + 1 + "-" + 1 + "-" + year);
      const momentedDate = momented.toDate();
      return {
        name: momented.format("MMMM"),
        acronym: momented.format("MMM"),
        views: data.filter((viewObj) => {
          const viewDate = new Date(viewObj.date);
          return (
            viewDate.getMonth() === momentedDate.getMonth() &&
            viewDate.getFullYear() === momentedDate.getFullYear()
          );
        }),
        monthNum: month,
        yearNum: year,
      };
    });
  };

  const getWeeklyViews = ({ data, year, month, day }) => {
    const testWeek = [
      ...Array.from(Array(3).keys()).map(
        (n) => (testN) => testN <= (n + 1) * 7 && testN > n * 7
      ),
      (testN) => testN > 21,
    ];
    return Array.from(Array(4)).map((x, i) => {
      const momented = moment(month + "-" + 1 + "-" + year, "MM-DD-YYYY");
      const momentedDate = momented.toDate();
      return {
        name: "Week " + (i + 1),
        acronym: "Week " + (i + 1),
        views: data.filter((viewObj) => {
          const viewDate = new Date(viewObj.date);
          return (
            testWeek[i](viewDate.getDate()) &&
            viewDate.getMonth() === momentedDate.getMonth() &&
            viewDate.getFullYear() === momentedDate.getFullYear()
          );
        }),
        monthNum: month,
        yearNum: year,
      };
    });
  };

  const getDailyViews = ({ data, year, month, day }) => {
    const numDay = Number(day);
    const totalDays = new Date(Number(year), Number(month), 0).getDate();
    const excessDays = totalDays - 28;
    const startOfWeek =
      (Math.ceil(
        (numDay > totalDays - excessDays ? numDay - excessDays : numDay) / 7
      ) -
        1) *
        7 +
      1;

    const returnFormat = (x, i) => {
      const momented = moment(
        month + "-" + (startOfWeek + i) + "-" + year,
        "MM-DD-YYYY"
      );
      const momentedDate = momented.toDate();
      return {
        name: momented.format("dddd"),
        acronym: momented.format("ddd"),
        views: data.filter((viewObj) => {
          const viewDate = new Date(viewObj.date);
          return (
            viewDate.getDate() === momentedDate.getDate() &&
            viewDate.getMonth() === momentedDate.getMonth() &&
            viewDate.getFullYear() === momentedDate.getFullYear()
          );
        }),
        weekNum: i,
        monthNum: startOfWeek + i,
        yearNum: year,
      };
    };
    return [
      ...Array.from(Array(7)).map(returnFormat),
      ...Array.from(Array(startOfWeek === 22 ? excessDays : 0)).map((x, i) =>
        returnFormat(x, i + excessDays)
      ),
    ];
  };

  // Configuration for Apex Charts

  const series = (seriesData) => [
    {
      name: "Views",
      data: seriesData,
    },
  ];

  const options: any = (categories) => ({
    chart: {
      height: 220,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "65%",
        distributed: false,
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      colors: [theme.PRIMARY],
      gradient: {
        type: "vertical",
        opacityFrom: 0.9,
        opacityTo: 0.1,
        stops: [0, 99, 100],
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#A2A1BD",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: theme.PRIMARY,
          fontSize: "14px",
          fontWeight: 700,
        },
      },
    },
  });

  // The rest of React Composition Code

  const [datePickerValue, setDatePickerValue] = useState(moment(getDateNow));
  const [viewMode, setViewMode] = useState({
    mode: 2,
    date: getDateNow,
    data: getDailyViews({
      data: courseViewData,
      year: getDateNow.getFullYear(),
      month: getDateNow.getMonth() + 1,
      day: getDateNow.getDate(),
    }),
  });

  const updateViewData = (mode, momentDate, viewData) => {
    const getViewsMode = [getMonthlyViews, getWeeklyViews, getDailyViews];
    const getViewsParams = {
      data: viewData,
      year: momentDate.format("YYYY"),
      month: momentDate.format("M"),
      day: momentDate.format("D"),
    };
    return getViewsMode[mode](getViewsParams);
  };

  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(viewMode));
    copy.data = updateViewData(copy.mode, moment(copy.date), courseViewData);
    setViewMode(copy);
  }, [courseViewData]);

  const onModeChange = (i) => {
    const copy = JSON.parse(JSON.stringify(viewMode));
    copy.mode = i;
    copy.data = updateViewData(i, moment(copy.date), courseViewData);
    setViewMode(copy);
  };

  const onDateChange = (momentDate) => {
    if (!momentDate) return;
    const copy = JSON.parse(JSON.stringify(viewMode));
    copy.date = momentDate.toDate();
    copy.data = updateViewData(copy.mode, momentDate, courseViewData);
    setViewMode(copy);
    setDatePickerValue(momentDate);
  };

  const datePickerProps = {
    suffixIcon: <DownOutlined />,
    value: datePickerValue,
    onChange: onDateChange,
  };

  // Customized Date Picker for Week Selection

  const datePickerWeekRender = (current, i) => {
    const style: React.CSSProperties = {};
    const dayToWeek = Math.ceil(current.toDate().getDate() / 7);
    const isOddWeek = dayToWeek % 2 !== 0;
    const isSelectedMonth = current.format("M") === datePickerValue.format("M");
    const isNotExcessWeek = dayToWeek !== 5;
    const selectedDayToWeek = Math.ceil(
      Number(datePickerValue.format("D")) / 7
    );
    const isSelectedWeekExcess = selectedDayToWeek === 5;
    const isSelectedWeek =
      dayToWeek === (isSelectedWeekExcess ? 4 : selectedDayToWeek);
    style.color = theme.BLACK;
    style.minWidth = 36;
    if (
      (isSelectedWeek && isSelectedMonth) ||
      (isSelectedWeekExcess && !isNotExcessWeek && isSelectedMonth)
    )
      style.borderBottom = `3px solid ${theme.PRIMARY}`;
    if (isOddWeek && isSelectedMonth && isNotExcessWeek)
      style.background = theme.PRIMARY_SMID;
    else if (!isOddWeek || !isSelectedMonth || !isNotExcessWeek) {
      if (!isSelectedMonth) style.opacity = 0.3;
      style.background = theme.PRIMARY_SLIGHT;
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  return (
    <ChartContainer>
      <DateSelectionSpace>
        <Dropdown
          title={
            <div className="ant-picker" style={{ width: 173 }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "85%",
                    justifyContent: "center",
                  }}
                >
                  <Text fS={18} fW={400}>
                    {viewOption[viewMode.mode]}
                  </Text>
                </div>
                <div className="ant-picker-suffix">
                  <DownOutlined />
                </div>
              </div>
            </div>
          }
          menu={viewOption.map((item, i) => ({
            name: item,
            action: () => onModeChange(i),
          }))}
        />
        {viewMode.mode > 0 ? (
          <DatePicker
            dropdownClassName="ant-picker-date-fixed"
            allowClear={false}
            format={() => datePickerValue.format("MMMM")}
            {...datePickerProps}
            placeholder="Month"
            picker="month"
            style={{ maxWidth: 153 }}
          />
        ) : (
          <></>
        )}
        {viewMode.mode > 1 ? (
          <DatePicker
            dropdownClassName="ant-picker-date-fixed"
            allowClear={false}
            format={(v) => {
              const dayToWeek = Math.ceil(v.toDate().getDate() / 7);
              return "Week " + (dayToWeek !== 5 ? dayToWeek : 4);
            }}
            dateRender={datePickerWeekRender}
            {...datePickerProps}
            placeholder="Week"
            picker="date"
            style={{ maxWidth: 110 }}
          />
        ) : (
          <></>
        )}
        <DatePicker
          allowClear={false}
          format={(v) => v.toDate().getFullYear().toString()}
          {...datePickerProps}
          placeholder="Year"
          picker="year"
          style={{ maxWidth: 94 }}
        />
      </DateSelectionSpace>
      <ReactApexChart
        options={options(viewMode.data.map((obj) => obj.acronym))}
        series={series(viewMode.data.map((obj) => obj.views.length))}
        type="bar"
        height={220}
      />
    </ChartContainer>
  );
};

export default CourseReportsViewChart;
