import { ReactElement } from "react";

import type { PropsType } from "./types";
import { TotalIcon, TotalCard, StatContainer } from "./styled";

// import totalLearnersIcon from "assets/icons/total-learners-icon.svg";
import totalCoursesIcon from "assets/icons/total-courses-icon.svg";
import totalVideosIcon from "assets/icons/total-videos-icon.svg";
import totalOrganizationsIcon from "assets/icons/total-organizations-icon.svg";
import totalLearnersIcon from "assets/icons/card-courses.png";

import { Col, Row } from "antd";
import { theme } from "utils/colors";

import Text from "components/Text";

const StatTotalCard = ({ primary, secondary, icon, count, title }: any) => (
  <TotalCard bordered={false} b={secondary}>
    <Row align="middle" justify="start" style={{ width: "100%" }}>
      <Col style={{ margin: "0 20px 0 0" }}>
        <TotalIcon src={icon} />
      </Col>
      <Col>
        <Row style={{ width: 140 }}>
          <Text fS={40} fC={primary} o={0.6} m={"-6px 0 0 0"}>
            {count}
          </Text>
        </Row>
        <Row style={{ width: 140 }}>
          <Text fS={20} fC={primary}>
            Total {title}
          </Text>
        </Row>
      </Col>
    </Row>
  </TotalCard>
);

const CourseReportsStats = ({
  totalLearners,
  totalCourses,
  totalOrganizations,
  totalVideos,
}: any): ReactElement => {
  return (
    <StatContainer>
      <StatTotalCard
        primary={theme.PRIMARY}
        secondary={theme.PRIMARY_MID}
        title={"Learners"}
        count={totalLearners || 0}
        icon={totalLearnersIcon}
      />
      <StatTotalCard
        primary={theme.RED}
        secondary={theme.RED_MID}
        title={"Courses"}
        // count={totalCourses || 0}
        count={0}
        icon={totalCoursesIcon}
      />
      <StatTotalCard
        primary={theme.BLUE}
        secondary={theme.BLUE_MID}
        title={"Videos"}
        // count={totalOrganizations || 0}
        count={0}
        icon={totalVideosIcon}
      />
      <StatTotalCard
        primary={theme.LIGHT_GREEN}
        secondary={theme.LIGHT_GREEN_MID}
        title={"Organizations"}
        // count={totalVideos || 0}
        count={0}
        icon={totalOrganizationsIcon}
      />
    </StatContainer>
  );
};

export default CourseReportsStats;
