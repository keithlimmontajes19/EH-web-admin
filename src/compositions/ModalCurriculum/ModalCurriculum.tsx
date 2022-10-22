import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Row, Col, Modal } from 'antd';

/* composition */
import Loading from 'components/Loading';
import SidebarCurriculum from 'compositions/SidebarCurriculum';
import ContentCurriculum from 'compositions/ContentCurriculum';

/* reducer action */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons } from 'ducks/lms/actionCreator';
import { StyledModal } from './styled';
import Item from 'antd/lib/list/Item';
import Lessons from 'views/private/Learn/Lessons';

const ModalCurriculum = ({ isVisible, isCancel, item }: any): ReactElement => {
  const dispatch = useDispatch();
  const targetRef: any = useRef();

  const [course, setCourse] = useState<any>({});
  const [lessonLoading, setLessonLoading] = useState(false);

  const callback = (lesson, _id, loading) => {
    setLessonLoading(loading);
    lesson && setCourse(lesson);
  };

  useEffect(() => {
    isVisible && dispatch(getLessons({ id: item?._id, callback }));
  }, [item, isVisible]);

  const [selected, setSelected] = useState('a');
  const [lessonIndex, setLessonIndex] = useState<string | number>(-1);

  const content = (
    <Row style={{ borderRadius: 15 }} ref={targetRef}>
      <Col span={6}>
        <SidebarCurriculum
          lesson={course?.lessons}
          selected={selected}
          setSelected={setSelected}
          lessonIndex={lessonIndex}
          setLessonIndex={setLessonIndex}
          curriculumTitle={item?.title || 'Untitled'}
        />
      </Col>
      <Col span={18}>
        <ContentCurriculum
          course={course}
          selected={selected}
          setSelected={setSelected}
          lessonIndex={lessonIndex}
          setLessonIndex={setLessonIndex}
        />
      </Col>
    </Row>
  );

  return (
    <StyledModal
      width={1153}
      maskClosable={false}
      onCancel={isCancel}
      visible={isVisible}
      afterClose={() => {
        setSelected('a');
        setLessonIndex(0);
      }}
      bodyStyle={{
        padding: 0,
        minHeight: 300,
      }}
      footer={null}
    >
      {lessonLoading ? <Loading /> : content}
    </StyledModal>
  );
};

export default ModalCurriculum;
