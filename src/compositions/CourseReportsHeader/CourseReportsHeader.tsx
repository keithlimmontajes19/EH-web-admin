import coinIcon from "assets/icons/coin-icon.png";
import medalIcon from "assets/icons/medal-icon.png";
import rankIcon from "assets/icons/rank-icon.svg";
import userIcon from "assets/icons/user-icon.png";

import { Row, Col, Space } from "antd";
import { HeaderImage, StyledIcon } from "./styled";
import Text from "components/Text";
import { theme } from "utils/colors";

const CourseReportsHeader: any = ({
  userPreview,
  firstName,
  lastName,
  companyName,
  position,
  rewards,
  enrolled,
  inProgress,
  completed,
}) => {
  const firstColStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0 0 0 40px",
  };

  const secondColStyle = {
    display: "flex",
    alignItems: "center",
    maxWidth: 550,
    padding: "0 40px 0 0",
  };

  return (
    <Row
      justify="space-between"
      style={{ height: 166, background: "#F0EFFF", marginBottom: 8 }}
    >
      <Col span={11} style={firstColStyle}>
        <HeaderImage src={userPreview || userIcon} />
        <Space size={1} direction="vertical">
          <Text fS={25}>{firstName + " " + lastName || "Unnamed User"}</Text>
          <Text fS={16} fC={theme.BLACK}>
            {companyName || "Untitled Company"}
          </Text>
          <Text fS={15} fC={theme.GRAY} fStyle="italic">
            {position}
          </Text>
        </Space>
      </Col>

      <Col span={11} style={secondColStyle}>
        <Row justify="space-between" style={{ width: "100%" }}>
          <Col span={12}>
            <Space
              size={20}
              direction="vertical"
              style={{ width: "100%", maxWidth: 250 }}
            >
              <Row align="middle" justify="space-between">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StyledIcon src={coinIcon} />
                  <Text fS={20} fC={theme.BLACK}>
                    Points
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {rewards?.points || 0}
                  </Text>
                </div>
              </Row>
              <Row align="middle" justify="space-between">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StyledIcon src={medalIcon} />
                  <Text fS={20} fC={theme.BLACK}>
                    Achievements
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {rewards?.achievements.length || 0}
                  </Text>
                </div>
              </Row>
              <Row align="middle" justify="space-between">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StyledIcon src={rankIcon} />
                  <Text fS={20} fC={theme.BLACK}>
                    Rank
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {rewards?.level || 0}
                  </Text>
                </div>
              </Row>
            </Space>
          </Col>
          <Col span={12} style={{}}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Space
                size={20}
                direction="vertical"
                style={{ width: "100%", maxWidth: 200 }}
              >
                <Row align="middle" justify="space-between">
                  <Text fS={20} fC={theme.BLACK}>
                    Course Enrolled
                  </Text>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {enrolled || 0}
                  </Text>
                </Row>
                <Row align="middle" justify="space-between">
                  <Text fS={20} fC={theme.BLACK}>
                    In Progress
                  </Text>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {inProgress || 0}
                  </Text>
                </Row>
                <Row align="middle" justify="space-between">
                  <Text fS={20} fC={theme.BLACK}>
                    Completed
                  </Text>
                  <Text fS={16} fC={theme.PRIMARY}>
                    {completed || 0}
                  </Text>
                </Row>
              </Space>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CourseReportsHeader;
