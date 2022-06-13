import { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import type { PropsType } from './types';

/* styled antd */
import { Layout, PageHeader, Input, Row, Col } from 'antd';
import { StyledButtonCreate, ModalContainer, InputStyles } from './styled';

/* components */
import Screen from 'components/Screen';
import PublishOnBoarding from 'compositions/PublishOnBoarding';

/* reducer action */
import {
  deleteOnboading,
  getOneOnboarding,
  getOnboardingList,
} from 'ducks/onboarding/actionCreator';
import { RootState } from 'ducks/store';
import { useSelector, useDispatch } from 'react-redux';

const OnboardingScreens = (props: PropsType): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [screenname, setScreenname] = useState('');
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
    history.push(`/team/onboarding/create/${screenname}`);
  };

  useEffect(() => {
    dispatch(getOnboardingList());
  }, []);

  const titleChecker = screenname.length > 0;

  return (
    <Layout style={{ background: 'none' }}>
      <PageHeader
        ghost={false}
        extra={[
          <>
            <StyledButtonCreate onClick={showModal}>CREATE</StyledButtonCreate>
            <ModalContainer
              centered
              okText="Create"
              onOk={handleOk}
              onCancel={handleCancel}
              maskClosable={false}
              visible={isModalVisible}
              cancelButtonProps={{ hidden: true }}
              okButtonProps={{
                disabled: titleChecker ? false : true,
                ghost: titleChecker ? false : true,
              }}
              title="Create Onboarding Screens"
            >
              <Input
                size="large"
                style={InputStyles}
                placeholder="Enter onboarding name"
                onChange={(e) => setScreenname(e.target.value)}
              />
            </ModalContainer>
          </>,
          <PublishOnBoarding data={onboarding_list} />,
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
              getOnboardingList={getOnboardingList}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default OnboardingScreens;
