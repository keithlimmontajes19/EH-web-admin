import { ReactElement, useEffect, useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { notificationAlert } from 'utils/alerts';

import {
  Row,
  Col,
  Modal,
  Input,
  Select,
  Button,
  Upload,
  message,
  DatePicker,
} from 'antd';

/* styles */
import {
  StyledH4,
  Container,
  ColumnText,
  StyledUpload,
  ViewerContainer,
} from './styled';

import CustomeSelect from 'components/CustomeSelect';
import schedules_service from 'api/services/schedules_service';

/* reducer action */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizations } from 'ducks/announcement/actionCreator';
import moment from 'moment';

const { Option } = Select;
const { MonthPicker, YearPicker } = DatePicker;

const CreateSchedules = (props: any): ReactElement => {
  const { isModalVisible, setIsModalVisible, callingSchedules } = props;
  const dispatch = useDispatch();

  const [organization, setOrganization] = useState([]);
  const [fileObject, setFileObject] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const [end, setEnd] = useState({
    end_date: null,
    end_month: null,
    end_year: null,
  });

  const [start, setStart] = useState({
    start_date: null,
    start_month: null,
    start_year: null,
  });

  const { organizations }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  /**
   *================
   * @returns
   * FILE UPLOAD
   * COURSE PREVIEW PHOTO
   * ===============
   */
  const baseURL = 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload';
  const uploadProps = {
    maxCount: 1,
    name: 'file',
    action: baseURL,
    showUploadList: false,
    accept: '.pdf',
  };

  const fileUpload = (info) => {
    if (info.file.status === 'done') {
      setFileName(info.file.name);
      setFileObject(info?.file?.originFileObj);

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const UploadCoverPhoto = async (schedID: string) => {
    await schedules_service.patchFileSchedule(schedID).then((res) => {
      fetch(res?.data?.data, {
        body: fileObject,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  };

  const clearFields = () => {
    setOrganization([]);
    setFileObject(null);
    setFileName(null);
    setEnd({
      end_date: null,
      end_year: null,
      end_month: null,
    });
    setStart({
      start_date: null,
      start_year: null,
      start_month: null,
    });
  };

  const postTrainingDates = async (schedID: string) => {
    const end_merge = moment(
      `${end?.end_month}/${end?.end_date}/${end?.end_year}`
    );
    const start_merge = moment(
      `${start?.start_month}/${start?.start_date}/${start?.start_year}`
    );
    const dateDifference = end_merge.diff(start_merge, 'days');

    try {
      const response = await schedules_service.postToSchedules(schedID, {
        date: start_merge,
        range: dateDifference,
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const postOrganization = async (schedID: string) => {
    try {
      const response = await schedules_service.postToOrganizations(schedID, {
        organizations: organization,
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const postSchedule = async () => {
    const data = {
      title: '',
      fileDisplayName: fileName,
      // fileDisplayName: fileName.split('.').slice(0, -1).join('.'),
    };

    try {
      const response = await schedules_service.postSchedules(data);
      const schedID = response?.data?.data?._id;

      if (schedID) {
        Promise.all([
          await postOrganization(schedID),
          await UploadCoverPhoto(schedID),
          await postTrainingDates(schedID),
        ])
          .then(() => {
            clearFields();
            setLoading(false);
            callingSchedules();
            notificationAlert('success', 'Schedule added success!', () => {});

            setTimeout(() => {
              setIsModalVisible(false);
            }, 50);
          })
          .catch(() => {
            setLoading(false);
            notificationAlert('error', 'Schedule added failed!', () => {});
          });
      }
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleSubmit = async () => {
    if (
      fileName &&
      organization &&
      end?.end_date &&
      end?.end_year &&
      end?.end_month &&
      start?.start_year &&
      start?.start_date &&
      start?.start_month &&
      organization.length
    ) {
      setLoading(true);
      await postSchedule();
    } else {
      return notificationAlert(
        'error',
        'Please fill all the fields.',
        () => {}
      );
    }
  };

  return (
    <Container>
      <Modal
        okText="ADD"
        onOk={handleSubmit}
        maskClosable={false}
        visible={isModalVisible}
        onCancel={() => {
          clearFields();
          setIsModalVisible(false);
        }}
        afterClose={() => {
          clearFields();
          setOrganization(undefined);
        }}
        okButtonProps={{
          size: 'large',
          loading: loading,
          style: {
            borderRadius: 8,
            background: '#635FFA',
            fontFamily: 'Red Hat Display',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 14,
          },
        }}
        cancelButtonProps={{
          style: {
            visibility: 'hidden',
          },
        }}
      >
        <ColumnText>Add Schedule</ColumnText>

        <Row justify="space-between" style={{ marginTop: 20 }}>
          <ViewerContainer>
            <CustomeSelect
              size="large"
              mode="multiple"
              value={organization}
              onChange={(e) => setOrganization(e)}
              placeholder="Select Organizations "
              style={{
                width: '468px',
                margin: '20px 0',
                fontSize: 14,
              }}
            >
              {(organizations?.data || []).map((item, i) => {
                return (
                  <Option value={item?._id} key={i}>
                    {item?.name}
                  </Option>
                );
              })}
            </CustomeSelect>
          </ViewerContainer>
        </Row>

        <StyledUpload>PDF Upload:</StyledUpload>

        <Row>
          <Col>
            <Upload {...uploadProps} accept="image/*" onChange={fileUpload}>
              <Button
                size="large"
                style={{
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  background: '#efefff',
                  fontFamily: 'Red Hat Display',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#4C4B7B',
                }}
              >
                Browse
              </Button>
            </Upload>
          </Col>

          <Col flex={1}>
            <Input
              disabled
              value={fileName}
              style={{
                height: 40,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                width: '100%',
              }}
            />
          </Col>

          <Col offset={1}>
            <Upload {...uploadProps} accept="image/*" onChange={fileUpload}>
              <Button
                size="large"
                style={{
                  borderRadius: 8,
                  background: '#635FFA',
                  fontFamily: 'Red Hat Display',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                UPLOAD
              </Button>
            </Upload>
          </Col>
        </Row>

        <Row style={{ marginTop: 31 }}>
          <Col flex={2}>
            <StyledH4>Start Date</StyledH4>

            <div>
              <CalendarOutlined style={{ padding: '5px' }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_month: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '120px',
                  margin: '5px',
                  height: 40,
                }}
              />

              <DatePicker
                format="DD"
                placeholder="Date"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_date: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '80px',
                  margin: '5px',
                  height: 40,
                }}
              />

              <YearPicker
                format="YYYY"
                placeholder="Year"
                onChange={(_date, dateString) =>
                  setStart({
                    ...start,
                    start_year: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '90px',
                  margin: '5px',
                  height: 40,
                }}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 16 }}>
          <Col flex={2}>
            <StyledH4>End Date</StyledH4>

            <div>
              <CalendarOutlined style={{ padding: '5px' }} />
              <MonthPicker
                format="MM"
                placeholder="Month"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_month: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '120px',
                  margin: '5px',
                  height: 40,
                }}
              />

              <DatePicker
                format="DD"
                placeholder="Date"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_date: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '80px',
                  margin: '5px',
                  height: 40,
                }}
              />

              <YearPicker
                format="YYYY"
                placeholder="Year"
                onChange={(_date, dateString) =>
                  setEnd({
                    ...end,
                    end_year: dateString,
                  })
                }
                style={{
                  borderRadius: '8px',
                  width: '90px',
                  margin: '5px',
                  height: 40,
                }}
              />
            </div>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
};

export default CreateSchedules;
