import {ReactElement, useEffect} from 'react';
import type {PropsType} from './types';

import {
  SubLabel,
  MenuLabel,
  TitleStyled,
  StyledLabel,
  MenuSublabel,
  MenuContainer,
} from './styled';
import {Menu} from 'antd';
import {theme} from 'utils/colors';
import {CaretRightOutlined} from '@ant-design/icons';

import {
  getTopicID,
  getLessonId,
} from 'ducks/lms/actionCreator';
import {useDispatch} from 'react-redux';

const {SubMenu} = Menu;
const SidebarCurriculum = (props: PropsType): ReactElement => {
  const {curriculumTitle ,selected, setSelected, lessonIndex, setLessonIndex} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setTopicId(null);
    setLessonId(null);
  }, []);

  const {lesson} = props;

  const colorCondition = (key: string) => {
    return selected === key ? theme.WHITE : theme.GRAY;
  };

  const subColorCondition = (key: string) => {
    return selected === key ? theme.WHITE : theme.SUBTITLE_GRAY;
  };

  const checkNullUndefined = (stats: string, label: string) => {
    return stats ? `${stats + ' ' + label} ` : ' ';
  };

  const setTopicId = (id) => dispatch(getTopicID(id));
  const setLessonId = (id) => dispatch(getLessonId(id));

  return (
    <MenuContainer>
      <TitleStyled>{curriculumTitle}</TitleStyled>
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        defaultSelectedKeys={['1']}
        openKeys={[lessonIndex.toString()]}
        onSelect={(e) => setSelected(e?.key)}
        style={{background: theme.SUB_LAYOUT, paddingRight: 8}}
        expandIcon={(e) => <CaretRightOutlined rotate={e.isOpen ? 90 : 0} />}>
        {/**
         * =================
         * DEFAULT Sidebar
         * Introduction Menu
         * =================
         */}
        <Menu.Item
          key={'a'}
          onClick={() => {
            setTopicId(null);
            setLessonId(null);
            localStorage.setItem('topicId', '');
            localStorage.setItem('lessonId', '');
          }}>
          <StyledLabel color={colorCondition('a')}>Introduction</StyledLabel>
        </Menu.Item>

        {/**
         * ===============
         * LESSON Sidebar
         * Lessons Menu
         * ===============
         */}
        {(lesson?.data || [])
          .sort((a, b) => a?.position - b?.position)
          .map((lessonContent, itemIndex) => {
            const stats = lessonContent?.stats;

            return lessonContent?.contents.length > 0 ? (
              <SubMenu
                key={itemIndex}
                onTitleClick={(e) => {
                  setTopicId(null);
                  setSelected(lessonContent?._id);
                  setLessonIndex(e?.key);
                  setLessonId(lessonContent?._id);
                  localStorage.setItem('topicId', '');
                  localStorage.setItem('lessonId', lessonContent?._id);
                }}
                className={selected === lessonContent?._id ? 'active-ant-menu-submenu' : 'inactive-ant-menu-submenu'}
                title={
                  <StyledLabel color={colorCondition(lessonContent?.title)}>
                    {lessonContent?.title}
                    <SubLabel color={colorCondition(lessonContent?.title)}>
                      {checkNullUndefined(stats?.lesson, 'Lesson')}
                      {checkNullUndefined(stats?.topic, 'Topic')}
                      {checkNullUndefined(stats?.quiz, 'Quiz')}
                    </SubLabel>
                  </StyledLabel>
                }>
                {/**
                 * ==================
                 * TOPIC Sidebar
                 * Topic Menu
                 * ==================
                 */}
                {(lessonContent?.contents || [])
                  .sort((a, b) => a?.position - b?.position)
                  .map((topicContent, topicIndex) => {
                    const firstIndex = () => {
                      return (
                        (lessonIndex === '0' && topicIndex === 0) ||
                        topicContent?.progress?.started
                      );
                    };

                    return (
                      <Menu.Item
                        key={topicContent?.title}
                        onClick={() => {
                          setTopicId(topicContent?._id);
                          setLessonId(lessonContent?._id);

                          localStorage.setItem('lessonId', lessonContent?._id);
                          localStorage.setItem('topicId', topicContent?._id);
                        }}>
                        <MenuLabel color={colorCondition(topicContent?.title)}>
                          {topicContent?.title}
                          <MenuSublabel
                            color={subColorCondition(topicContent?.title)}>
                            {topicContent?.description}
                          </MenuSublabel>
                        </MenuLabel>
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            ) : (
              <Menu.Item
                key={itemIndex}
                onClick={(e) => {
                  setTopicId(null);
                  setLessonIndex(e?.key);
                  setLessonId(lessonContent?._id);
                  localStorage.setItem('topicId', '');
                  localStorage.setItem('lessonId', lessonContent?._id);
                }}>
                <StyledLabel color={colorCondition(lessonContent?.title)}>
                  {lessonContent?.title}
                </StyledLabel>
              </Menu.Item>
            );
          })}
      </Menu>
    </MenuContainer>
  );
};

export default SidebarCurriculum;
