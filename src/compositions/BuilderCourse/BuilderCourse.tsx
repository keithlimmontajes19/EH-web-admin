import { ReactElement, useEffect, useState } from "react";

import Text from "components/Text";
import Input from "components/Input";

import { Col, Form, Layout, PageHeader, Row, Space, Upload } from "antd";
import { VideoCameraOutlined, PictureOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getCourse, postCourse } from "ducks/lms/actionCreator";
import Loading from "components/Loading";
import TreeCourse from "compositions/TreeCourse";
import { useHistory, useParams } from "react-router-dom";
import { Params } from "views/private/Learn/Courses/types";
import StyledButton from "components/StyledButton";
import { theme } from "utils/colors";
import { updateCourse } from "ducks/lms/actionCreator";

const blankData = {
  title: "NaN$",
  description: "NaN$",
  body: "&lt;html&gt; &lt;body&gt;NaN$&lt;/body&gt; &lt;/html&gt;",
  preview: {
    type: "image",
  },
  instructor: {
    name: "NaN$",
    title: "NaN$",
  },
  points: "",
};

const BuilderCourse = ({ id = "" }: any): ReactElement => {
  const history: any = useHistory();
  const dispatch = useDispatch();
  const params: Params = useParams();

  const addNew = params.page === "add";
  const organizationId = history?.location?.state?.organization;

  
  const [course, setCourse]: any = useState(
    JSON.parse(JSON.stringify(blankData))
  );
  const [queue, setQueue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onAdd, setOnAdd]: any = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [file, setFile]: any = useState({ type: false, ref: {} });

  useEffect(() => {
    localStorage.setItem("courseId", id);
    localStorage.setItem("organizationId", organizationId);

    if (!addNew)
      dispatch(
        getCourse({
          callback: defaultCallback,
        })
      );
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (!refreshed && "_id" in course) {
      history.replace("/learn/courses/builder/" + course?._id);
      setRefreshed(true);
    }
  }, [course]);

  const uploadFile = (signedUrl, file) => {
    const getBlob = async (fileUri: any) => {
      const resp = await fetch(fileUri);
      const fileBody = await resp.blob();
      return fileBody;
    };
    const reader = new FileReader();
    reader.onloadend = async () => {
      const formData = new FormData();
      formData.append("file", file);
      const fileBlob = await getBlob(reader.result);

      const response = await fetch(
        new Request(signedUrl, {
          method: "PUT",
          body: fileBlob,
          headers: new Headers({ "Content-Type": file.type }),
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const addNewCallback = (res) => {
    if (!res) return;
    const { type, ref }: any = file;
    if (type) uploadFile(res.uploadSignedUrl, ref);
    localStorage.setItem("courseId", res._id);
    setCourse(res);
    setLoading(false);
  };

  const defaultCallback = (res) => {
    if (!res) return;
    setCourse(res.data);
    setLoading(false);
  };

  const setCourseInfo = () => {
    if (addNew) {
      dispatch(
        postCourse({
          data: course,
          callback: addNewCallback,
        })
      );
      setQueue(false);
      return;
    }

    localStorage.setItem("courseId", course?._id);
    // localStorage.setItem("organizationId", organizationId);

    const { type, ref }: any = file;
    const callback = async (res) => {
      if (!res) return;
      if (type) uploadFile(res.uploadSignedUrl, ref);
    };
    dispatch(
      updateCourse({
        ...course,
        preview: { type: type ? type : "image" },
        callback,
      })
    );
    setQueue(false);
  };

  const handleUpload = (type, ref) => {
    setQueue(true);
    setFile({ type, ref });
  };

  const MediaPreview = () => (
    <StyledButton
      bg={"none"}
      c={"red"}
      b={`2px solid ${"red"}`}
      icon={
        file.type === "image" ? <PictureOutlined /> : <VideoCameraOutlined />
      }
      htmlType="button"
      onClick={() => setFile({ type: false, ref: {} })}
    >
      <Text fC={"red"} fS={18} fW={500}>
        {file.ref.name}
      </Text>
    </StyledButton>
  );

  const MediaField = () => (
    <Space>
      <Upload
        maxCount={1}
        showUploadList={false}
        beforeUpload={(f) => {
          if (/video/g.test(f.type)) handleUpload("video", f);
          return false;
        }}
      >
        <StyledButton
          bg={"none"}
          c={theme.PRIMARY}
          b={`2px solid ${theme.PRIMARY}`}
          icon={<VideoCameraOutlined />}
          htmlType="button"
        >
          <Text fS={18} fW={500}>
            Add Video
          </Text>
        </StyledButton>
      </Upload>
      <Upload
        maxCount={1}
        showUploadList={false}
        beforeUpload={(f) => {
          if (/image/g.test(f.type)) handleUpload("image", f);
          return false;
        }}
      >
        <StyledButton
          bg={"none"}
          c={theme.PRIMARY}
          b={`2px solid ${theme.PRIMARY}`}
          icon={<PictureOutlined />}
          htmlType="button"
        >
          <Text fS={18} fW={500}>
            Add Picture
          </Text>
        </StyledButton>
      </Upload>
    </Space>
  );

  return (
    <Layout style={{ paddingRight: 50, background: "transparent" }}>
      <PageHeader
        ghost={false}
        title={
          <Text
            fS={16}
            fW={500}
            u={true}
            fC={"#A2A1BD"}
            onClick={() => history.push("/learn/courses")}
          >
            {"< "}Back to Courses
          </Text>
        }
        footer={
          <Text fS={25} fC={"#2B2E4A"}>
            Add Course
          </Text>
        }
        style={{ background: "none", paddingTop: 8, paddingBottom: 30 }}
      />
      {loading ? (
        <Loading />
      ) : (
        <Layout
          style={{ background: "none", paddingLeft: 30, paddingRight: 25 }}
        >
          <Form
            initialValues={{
              t: course?.title === "NaN$" ? "" : course?.title,
              d: course?.description === "NaN$" ? "" : course?.description,
              a: course?.instructor?.name === "NaN$" ? "" : course?.instructor?.name,
              p: course?.points || "",
            }}
          >
            <Row>
              <Col flex={19}>
                <Form.Item
                  name="t"
                  rules={[{ required: true, message: "Enter a title" }]}
                >
                  <Input
                    placeholder={"Course Title"}
                    value={course?.title}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.title = e.target.value;
                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col flex={0.5} />
              <Col flex={3}>
                <Form.Item name="p">
                  <Input
                    isNumber={true}
                    min={0}
                    max={100}
                    controls={false}
                    placeholder={"Points Earned"}
                    value={course?.points}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.points = e;
                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col flex={11}>
                <Form.Item
                  name="d"
                  rules={[{ required: true, message: "Enter a content" }]}
                >
                  <Input
                    placeholder={"Add Subtitle/Short Slogan/Short Description"}
                    value={course?.description}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.description = e.target.value;
                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col flex={0.5} />
              <Col flex={11}>
                <Form.Item
                  name="a"
                  rules={[{ required: true, message: "Enter an author" }]}
                >
                  <Input
                    placeholder={"Author"}
                    onChange={(e) => {
                      setQueue(true);
                      setCourse((prev) => {
                        prev.instructor = {
                          name: e.target.value,
                          title: prev.instructor.title,
                        };
                        return prev;
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Row justify="space-between" style={{ marginBottom: 25 }}>
            {file.type ? <MediaPreview /> : <MediaField />}
            <StyledButton
              p={"-10px 0 0 0"}
              onClick={setCourseInfo}
              style={{ visibility: queue ? "visible" : "hidden" }}
            >
              {addNew ? "PUBLISH" : "SAVE"}
            </StyledButton>
          </Row>
          {addNew ? (
            <></>
          ) : (
            <TreeCourse course={course} onAdd={onAdd} setOnAdd={setOnAdd} />
          )}
          <Row justify="end" style={{ marginTop: 150, paddingRight: 20 }}>
            <Col>
              {!onAdd && (
                <>
                  <StyledButton
                    htmlType="submit"
                    disabled={onAdd}
                    onClick={() => history.goBack()}
                  >
                    BACK
                  </StyledButton>
                </>
              )}
            </Col>
          </Row>
        </Layout>
      )}
    </Layout>
  );
};

export default BuilderCourse;
