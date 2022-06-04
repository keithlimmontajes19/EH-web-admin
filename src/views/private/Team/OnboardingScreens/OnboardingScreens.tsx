import { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { PropsType } from "./types";

/* styled antd */
import { Layout, PageHeader, Input, Row, Col } from "antd";
import { StyledButtonCreate, ModalContainer } from "./styled";

/* components */
import Screen from "components/Screen";
import PublishOnBoarding from "compositions/PublishOnBoarding";

/* reducer action */
import {
  deleteOnboading,
  getOneOnboarding,
  getOnboardingList,
} from "ducks/onboarding/actionCreator";
import { RootState } from "ducks/store";
import { useSelector, useDispatch } from "react-redux";

const OnboardingScreens = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [screenname, setScreenname] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { onboarding_list }: any = useSelector<RootState>(
    (state) => state.onboarding
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    history.push(`/team/onboarding/createonboard/${screenname}`);
  };

  useEffect(() => {
    dispatch(getOnboardingList());
  }, []);

  return (
    <Layout style={{ background: "none" }}>
      <PageHeader
        ghost={false}
        extra={[
          <>
            <StyledButtonCreate onClick={showModal}>CREATE</StyledButtonCreate>

            <ModalContainer
              visible={isModalVisible}
              title="Create Onboarding Screens"
              onCancel={handleCancel}
              onOk={handleOk}
              centered
            >
              <Input
                placeholder="Sample Announcement_2"
                style={{
                  borderRadius: "15px",
                  background: "#F8F8F8",
                  width: "485px",
                  height: "38px",
                  margin: "10px 0px",
                }}
                size="large"
                aria-placeholder="Screen Name 1"
                defaultValue="Screen Name 1"
                onChange={(e) => setScreenname(e.target.value)}
              />
            </ModalContainer>
          </>,
          <PublishOnBoarding />,
        ]}
      />

      <Row justify="center">
        {(onboarding_list?.data || [])?.map((item, index) => (
          <Col>
            <Screen
              key={index}
              item={item}
              id={item?._id}
              name={item?.name}
              title={item?.title}
              uri={item?.imageURL}
              descreption={item?.description}
              screentitle={item?.screentitle}
              getOneOnboarding={getOneOnboarding}
              deleteOnboading={deleteOnboading}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default OnboardingScreens;
