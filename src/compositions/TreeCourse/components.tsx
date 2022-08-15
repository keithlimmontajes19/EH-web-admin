import { Col, Form, Row, Space, Upload } from "antd";
import { theme } from "utils/colors";
import { VideoCameraOutlined, PictureOutlined } from "@ant-design/icons";

import Text from "components/Text";
import TextArea from "components/TextArea";
import Input from "components/Input";
import StyledButton from "components/StyledButton";
import { useEffect, useState } from "react";

export const newData = (m: number, t: string, d: string, pos: number) => {
  const mode = [
    "section-head",
    "lesson",
    "topic",
    "quiz",
    "activity",
    "assignment",
  ];

  return {
    title: t,
    description: d,
    body: `&lt;html&gt; &lt;body&gt; &lt;p&gt;${d}&lt;/p&gt; &lt;/body&gt; &lt;/html&gt;`,
    preview: {
      type: "video",
    },
    contentType: mode[m],
    position: pos,
  };
};

export const AddLesson = ({ data, setOnAdd, handleDispatch }) => {
  const [file, setFile]: any = useState({ type: false, ref: {} });

  const handleUpload = (type, ref) => setFile({ type, ref });

  const MediaPreview = () => (
    <StyledButton
      bg={"none"}
      c={"red"}
      b={`2px solid ${"red"}`}
      icon={
        file.type === "image" ? <PictureOutlined /> : <VideoCameraOutlined />
      }
      htmlType="button"
      onClick={() => {
        console.log(file);
        setFile({ type: false, ref: {} });
      }}
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
    <Form
      onFinish={({ t, d }) => {
        const newObj = {
          title: t,
          description: d,
          preview: { type: file.type ? file.type : "video" },
          position: data.curriculum.length + 1,
          organizationId: localStorage.getItem("organizationId"),
          courseId: localStorage.getItem("courseId"),
          contentType: "lesson",
        };
        handleDispatch(newObj, file);
      }}
      style={{ marginTop: "10px" }}
    >
      <Form.Item
        name="t"
        rules={[{ required: true, message: "Enter a title" }]}
      >
        <Input placeholder="Lesson title" />
      </Form.Item>

      <Form.Item
        name="d"
        rules={[{ required: true, message: "Enter a content" }]}
      >
        <TextArea style={{ minHeight: "179px" }} placeholder="Add Content" />
      </Form.Item>

      <Form.Item>
        <Row justify="space-between">
          {file.type ? <MediaPreview /> : <MediaField />}
          <Col>
            <Row justify="end">
              <Col>
                <StyledButton
                  bg={"none"}
                  c={theme.BLACK}
                  htmlType="button"
                  onClick={() => setOnAdd(false)}
                >
                  CANCEL
                </StyledButton>
                <StyledButton htmlType="submit">SAVE</StyledButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export const EditField = ({ cb, data, mode = 2, setOnEdit }) => {
  const modes = [
    "Section Heading",
    "Lesson",
    "Topic",
    "Quiz",
    "Activity",
    "Assignment",
  ];
  const { title: t, description: d } = data;
  const [file, setFile]: any = useState({ type: false, ref: {} });

  const handleUpload = (type, ref) => setFile({ type, ref });

  const MediaPreview = () => (
    <StyledButton
      bg={"none"}
      c={"red"}
      b={`2px solid ${"red"}`}
      icon={
        file.type === "image" ? <PictureOutlined /> : <VideoCameraOutlined />
      }
      htmlType="button"
      onClick={() => {
        console.log(file);
        setFile({ type: false, ref: {} });
      }}
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
    <Form
      onFinish={({ t, d }) => cb(t, d, file)}
      initialValues={{ t: t, d: d }}
      style={{ marginTop: "15px" }}
    >
      {mode !== 0 ? (
        <>
          <Form.Item
            name="t"
            rules={[{ required: true, message: `Add a ${modes[mode]} Title` }]}
          >
            <Input placeholder={`${modes[mode]} Title`} />
          </Form.Item>
          <Form.Item
            name="d"
            rules={[{ required: true, message: "Add a Content" }]}
          >
            <TextArea
              style={{ minHeight: "179px" }}
              placeholder="Add Content"
            />
          </Form.Item>
          <Form.Item>
            <Row justify={mode <= 2 ? "space-between" : "end"}>
              {mode <= 2 ? (
                file.type ? (
                  <MediaPreview />
                ) : (
                  <MediaField />
                )
              ) : (
                <></>
              )}
              <Col>
                <Row justify="end">
                  <Col>
                    <StyledButton
                      bg={"none"}
                      c={theme.BLACK}
                      htmlType="button"
                      onClick={() => setOnEdit([false])}
                    >
                      CANCEL
                    </StyledButton>
                    <StyledButton htmlType="submit">SAVE</StyledButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Item>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "60px",
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "calc(100% - 332px)" }}>
            <Form.Item
              name="t"
              rules={[
                { required: true, message: `Add a ${modes[mode]} Title` },
              ]}
            >
              <Input placeholder={`${modes[mode]} Title`} />
            </Form.Item>
          </div>
          <Row align="middle" justify="end">
            <StyledButton
              bg={"none"}
              c={theme.BLACK}
              htmlType="button"
              onClick={() => setOnEdit([false])}
            >
              CANCEL
            </StyledButton>
            <StyledButton htmlType="submit">SAVE</StyledButton>
          </Row>
        </div>
      )}
    </Form>
  );
};
