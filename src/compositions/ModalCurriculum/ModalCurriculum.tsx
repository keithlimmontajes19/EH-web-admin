import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Row, Col, Modal } from "antd";

/* composition */
import Loading from "components/Loading";
import SidebarCurriculum from "compositions/SidebarCurriculum";
import ContentCurriculum from "compositions/ContentCurriculum";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { getLessons } from "ducks/lms/actionCreator";
import { StyledModal } from "./styled";

const ModalCurriculum = ({ isVisible, isCancel }): ReactElement => {
  const dispatch = useDispatch();
  const targetRef: any = useRef();

  // useEffect(() => {
  //   if (isVisible) dispatch(getLessons(courseId, ()));
  // }, [isVisible]);

  const { lesson, curriculum }: any = useSelector<RootState>(
    (state) => state.lms
  );
  const [selected, setSelected] = useState("1");
  const [lessonIndex, setLessonIndex] = useState<string | number>(-1);

  const content = (
    <Row style={{ borderRadius: 15 }} ref={targetRef}>
      <Col span={6}>
        <SidebarCurriculum
          lesson={lesson}
          selected={selected}
          setSelected={setSelected}
          lessonIndex={lessonIndex}
          setLessonIndex={setLessonIndex}
          curriculumTitle={curriculum?.title || "Untitled"}
        />
      </Col>
      <Col span={18}>
        <ContentCurriculum
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
      onCancel={isCancel}
      visible={isVisible}
      bodyStyle={{
        padding: 0,
        minHeight: 300,
      }}
      footer={null}
    >
      {lesson?.loading ? <Loading /> : content}
    </StyledModal>
  );
};

export default ModalCurriculum;
