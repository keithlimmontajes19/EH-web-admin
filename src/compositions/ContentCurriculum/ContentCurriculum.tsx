import { ReactElement, useEffect, useState } from 'react';
import type { PropsType } from './types';
import { Container } from './styled';

/* reducer action */
import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

/* conponents */
import { Avatar } from 'antd';
import { editorJsParser } from 'editorjs-data-parser';

import ReactPlayer from 'react-player';
import IconImage from 'components/IconImage';
import HTMLRenderer from 'components/RenderHtml';
import QuizStepper from 'compositions/QuizStepper';
import NO_IMAGE from 'assets/icons/no-purple-box.png';
import IntroductionComponent from 'compositions/IntroductionComponent';
import BlockViewer from 'components/editor-js/BlockViewer';

// import Loading from 'components/Loading';
// import TextComponent from 'compositions/TextComponent';
// import ImageComponent from 'compositions/ImageComponent';
// import VideoComponent from 'compositions/VideoComponent';
// import CurriculumLayout from 'compositions/CurriculumLayout';
// const ReactEditorJS = createReactEditorJS();

const ContentCurriculum = (props: PropsType): ReactElement => {
  const { selected, setSelected, lessonIndex, setLessonIndex, course } = props;

  const dispatch = useDispatch();

  const [id, setid] = useState('');
  const { topicId, lessonId, curriculum, contents }: any =
    useSelector<RootState>((state) => state.lms);

  const [lessonDetails, setLessonDetails] = useState(null);
  const [contentDetails, setContentDetails] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    setid(topicId);
  }, [topicId]);

  useEffect(() => {
    setFileUrl(lessonDetails?.preview);
  }, [lessonDetails]);

  useEffect(() => {
    /**
     * CALLING LESSON DETIAILS
     * SET ITEM ON THE SIDEBAR CURRICULUM
     */
    if (!topicId && lessonId) {
      if (course?.lessons) {
        const findLesson: any = course?.lessons?.filter(
          (x) => x?._id === lessonId
        );
        if ((findLesson || []).length) {
          setLessonDetails(findLesson[0]);
        }
      }
    }
    /**
     * CALLING CONTENT DETIAILS
     * SET ITEM ON THE SIDEBAR CURRICULUM
     */
    if (topicId && lessonId) {
      if (course?.lessons) {
        const findLesson: any = course?.lessons?.filter(
          (x) => x?._id === lessonId
        );

        if ((findLesson || []).length) {
          const findContent: any = findLesson[0]?.contents?.filter(
            (x) => x?._id === topicId
          );

          if ((findContent || []).length) {
            setContentDetails(findContent[0]);
          }
        }
      }
    }
  }, [topicId, lessonId]);

  // const header = (type, data) => {
  //   switch (type) {
  //     case 'image':
  //       return <ImageComponent data={data?.preview?.ref} />;
  //     case 'video':
  //       return <VideoComponent data={data?.preview?.ref} />;
  //     default:
  //       return <TextComponent data={data} />;
  //   }
  // };

  // const body = (data, type) => {
  //   // console.log('data', data);
  //   if (type === 'quiz') {
  //     return (
  //       <QuizStepper
  //         data={data}
  //         selected={selected}
  //         setSelected={setSelected}
  //       />
  //     );
  //   } else {
  //     return (
  //       <CurriculumLayout
  //         data={data}
  //         type={type}
  //         lesson={contents}
  //         topic={lessonDetails}
  //         selected={selected}
  //         setSelected={setSelected}
  //         lessonIndex={lessonIndex}
  //         setLessonIndex={setLessonIndex}
  //       />
  //     );
  //   }
  // };

  // console.log(' lessonId && topicId ===>', lessonId, topicId);

  const render = () => {
    if (!id && !lessonId) {
      return <IntroductionComponent course={course} />;
    } else if (!topicId && lessonId) {
      const parseBlocks: any = lessonDetails?.body
        ? JSON.parse(lessonDetails?.body)
        : {};

      return (
        <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
          {lessonDetails?.preview && lessonDetails?.previewId && (
            <Avatar
              src={lessonDetails?.preview}
              size="large"
              shape="square"
              style={{
                width: '100%',
                minHeight: 350,
                maxHeight: 350,
                borderRadius: 15,
              }}
              icon={
                !fileUrl ? (
                  <IconImage source={NO_IMAGE} width={70} height={61} />
                ) : (
                  <ReactPlayer
                    playing
                    width={'100%'}
                    height={'100%'}
                    controls={true}
                    url={[
                      {
                        src: fileUrl,
                        type: 'video/mp4',
                      },
                    ]}
                  />
                )
              }
            />
          )}

          {/* <HTMLRenderer source={editorJsParser(parseBlocks?.blocks)} /> */}
          {(parseBlocks?.blocks || []).map((block) => {
            return (
              <div style={{ margin: 4 }}>
                <BlockViewer key={block?.id} block={block} />
              </div>
            );
          })}
        </div>
      );
    } else {
      const parseBlocks: any = contentDetails?.body
        ? JSON.parse(contentDetails?.body)
        : {};

      return (
        <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
          {contentDetails?.preview && contentDetails?.previewId && (
            <Avatar
              src={contentDetails?.preview}
              size="large"
              shape="square"
              style={{
                width: '100%',
                minHeight: 350,
                maxHeight: 350,
                borderRadius: 15,
              }}
              icon={
                !fileUrl ? (
                  <IconImage source={NO_IMAGE} width={70} height={61} />
                ) : (
                  <ReactPlayer
                    playing
                    width={'100%'}
                    height={'100%'}
                    controls={true}
                    url={[
                      {
                        src: fileUrl,
                        type: 'video/mp4',
                      },
                    ]}
                  />
                )
              }
            />
          )}

          {contentDetails?.contentType === 'quiz' ? (
            <QuizStepper
              data={contentDetails}
              selected={selected}
              setSelected={setSelected}
            />
          ) : (
            // <HTMLRenderer source={editorJsParser(parseBlocks?.blocks)} />
            (parseBlocks?.blocks || []).map((block) => {
              return (
                <div style={{ margin: 4 }}>
                  <BlockViewer key={block?.id} block={block} />
                </div>
              );
            })
          )}
        </div>
      );
    }
  };

  return <Container>{render()}</Container>;
};

export default ContentCurriculum;
