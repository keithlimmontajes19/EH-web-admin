import { useState } from 'react';

import { theme } from 'utils/colors';
import { Col, Form, Row } from 'antd';

import Text from 'components/Text';
import Input from 'components/Input';
import StyledButton from 'components/StyledButton';

export const newData = (m: number, t: string, d: string, pos: number) => {
  const mode = ['section-head', 'topic', 'quiz', 'assignment'];

  return {
    title: t,
    description: d,
    // body: `&lt;html&gt; &lt;body&gt; &lt;p&gt;${d}&lt;/p&gt; &lt;/body&gt; &lt;/html&gt;`,
    preview: {
      type: 'video',
    },
    contentType: mode[m],
    position: pos,
  };
};

/**
 * @param param
 * @returns
 * FOR ADDING OF NEW LESSONS
 */
export const AddLesson = ({ data, setOnAdd, handleDispatch }) => {
  const [file, setFile]: any = useState({ type: false, ref: {} });

  return (
    <Form
      onFinish={({ t }) => {
        const newObj = {
          title: t,
          description: '$nan',
          contentType: 'lesson',
          position: (data.curriculum || []).length + 1,
          courseId: localStorage.getItem('courseId'),
          preview: { type: file.type ? file.type : 'video' },
          organizationId: localStorage.getItem('organizationId'),
        };

        handleDispatch(newObj, file);
      }}
      style={{ marginTop: '10px' }}
    >
      <Row>
        <Col span={17}>
          <Form.Item
            name="t"
            rules={[{ required: true, message: 'Enter a title' }]}
          >
            <Input placeholder="Lesson Title" />
          </Form.Item>
        </Col>

        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Row justify="end">
                <Col>
                  <StyledButton
                    bg={'none'}
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
      </Row>
    </Form>
  );
};

/**
 * @param param
 * @returns
 * THIS IS FOR CREATE OF CONTENT
 * QUIZ, TOPIC, ASSIGNMENT
 * FORMS
 */

export const EditField = ({ cb, data, mode = 2, setOnEdit, setTitle }) => {
  const { title: t, description: d } = data;

  const modes = ['Section Heading', 'Topic', 'Quiz', 'Assignment'];
  const [file, setFile]: any = useState({ type: false, ref: {} });

  return (
    <Form
      style={{ marginTop: '15px' }}
      initialValues={{ t: t, d: d }}
      onFinish={({ content_title, content_description = '$nan' }) =>
        cb(content_title, content_description, file)
      }
    >
      <div
        style={{
          height: '60px',
          display: 'flex',
          marginBottom: '20px',
        }}
      >
        <Col span={15}>
          <Form.Item
            name="content_title"
            rules={[{ required: true, message: `Add a ${modes[mode]} Title` }]}
          >
            <Input
              placeholder={`${modes[mode]} Title`}
              style={{ border: '1px solid #cee1fa' }}
            />
          </Form.Item>
        </Col>

        <Row align="middle" justify="end">
          <StyledButton
            bg={'none'}
            c={theme.BLACK}
            htmlType="button"
            onClick={() => setOnEdit([false])}
          >
            CANCEL
          </StyledButton>
          <StyledButton htmlType="submit">SAVE</StyledButton>
        </Row>
      </div>
    </Form>
  );
};
