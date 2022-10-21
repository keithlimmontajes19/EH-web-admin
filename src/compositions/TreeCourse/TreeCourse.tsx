import { useEffect, useState } from 'react';
import { Row, Space } from 'antd';

import { PlusOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';

import {
  getLessons,
  postLesson,
  deleteLesson,
  updateLesson,
  getCurriculum,
  postLessonContent,
  updateLessonContent,
  deleteLessonContent,
} from 'ducks/lms/actionCreator';

import { RootState } from 'ducks/store';
import { useDispatch, useSelector } from 'react-redux';

import { theme } from 'utils/colors';
import { useHistory } from 'react-router-dom';
import { AddLesson, EditField, newData } from './components';
import { getTreeStyle, StyledTree, StyledLesson, BuildIcon } from './styled';

import Dropdown from 'components/Dropdown';
import IconImage from 'components/IconImage';
import StyledButton from 'components/StyledButton';
import QUIZ_PINK from 'assets/icons/quiz-pink.png';
import TOPIC_PINK from 'assets/icons/topic-pink.png';
import ModalCurriculum from 'compositions/ModalCurriculum';
import hammericon from '../../assets/icons/hammer-color.png';
import Loading from 'components/Loading';

function TreeCourse({ course, onAdd, setOnAdd, isBuilder, addNew }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [itemTitle, setTitle] = useState('');
  const [data, setData] = useState<any>({});
  const [treeData, setTreeData] = useState([]);
  const [onDragNode, setOnDragNode]: any = useState({});
  const [onEdit, setOnEdit]: any = useState([false]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  const { lesson }: any = useSelector<RootState>((state) => state.lms);
  const { loading } = lesson;

  useEffect(() => {
    if (!addNew) {
      setData({ curriculum: lesson?.data?.lessons });
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem('courseId', course._id);

    if (isBuilder === 'false') {
      dispatch(
        getLessons({
          id: course?._id,
          callback: (res, _id, loading) => {
            if (!res) return;

            setIsLoading(loading);
          },
          // callback: lessonCallback,
        })
      );
    }
  }, []);

  const lessonCallback = (res, id, loading) => {
    if (!res) {
      setData({});
      setTreeData([]);
      return;
    }

    console.log('res', res);
    setData({ curriculum: res?.lessons });
  };

  useEffect(() => {
    const copy = { ...data };

    const keysToExpand = [];
    const dataToTrees = (obj, objKey, lvl) => {
      const arr = obj[objKey];

      if (!arr) return;

      const sortedArr = arr;
      const _tmp = [];

      for (let i = 0; i < sortedArr.length; i++) {
        const _obj = sortedArr[i];

        if (!_obj || typeof _obj !== 'object') continue;

        const _objMakeKey = lvl + i * 2;
        const editMode = onEdit[1] === _objMakeKey;
        const addMode = onEdit[1] === _objMakeKey && onEdit[2];

        const isSect = _obj.contentType === 'section-head';
        const nextObjKey = 'curriculum' in _obj ? 'curriculum' : 'contents';

        const isSpecial =
          _obj.contentType === 'section-head' || _obj.contentType === 'lesson';
        const lastIofSect =
          obj.contentType === 'section-head' && i === sortedArr.length - 1;

        const branchLvl = Math.floor((_objMakeKey.length - 1) / 2);
        const limitAction = branchLvl === 1 ? false : true;

        let ids = {};

        if (branchLvl === 1) {
          ids = {
            idCourse: _obj.course,
            idLesson: _obj._id,
          };
        }

        if (branchLvl === 2) {
          ids = {
            idCourse: obj.course,
            idLesson: obj._id,
            idContent: _obj._id,
          };
        }

        /**
         * THIS IS FOR THE ACTION BUTTONS
         * FOR THE RIGHT SIDE OF THE LESSONS
         * FOR DELETE LESSON, EDIT LESSON, VIEW LESSON
         * ADD CONTENT LESSON (QUIZ, TOPIC, SECTION HEADER)
         */
        const title = (obj, objKey) => ({
          title: (
            <>
              <Row align="middle" justify="space-between">
                <span>
                  {_obj.contentType === 'quiz' ? (
                    <IconImage width={20} height={20} source={QUIZ_PINK} />
                  ) : (
                    ''
                  )}
                  {_obj.contentType === 'topic' ? (
                    <IconImage width={20} height={20} source={TOPIC_PINK} />
                  ) : (
                    ''
                  )}
                  &nbsp;{_obj.title || _obj}
                </span>

                <Space
                  className={'action-to-hide'}
                  style={{
                    fontSize: '18px',
                    minHeight: '60px',
                    color: theme.SEMI_BLACK,
                  }}
                >
                  <BuildIcon
                    onClick={() => {
                      obj?.contentType === 'quiz'
                        ? history.push(
                            `/learn/quiz/builder/${course?._id}/${obj._id}`,
                            {
                              data: obj,
                            }
                          )
                        : history.push(
                            `/learn/builder/${course?._id}/${obj._id}`,
                            {
                              data: obj,
                            }
                          );
                    }}
                    src={hammericon}
                    color="#4C4B7B"
                    style={{
                      width: 18,
                      height: 16,
                      marginRight: 5,
                      color: '#4C4B7B',
                    }}
                  />

                  <EditOutlined
                    onClick={() => setOnEdit([true, _objMakeKey])}
                  />

                  <DeleteFilled
                    onClick={() => {
                      const copy = { ...data };
                      const callback = (res) => {
                        if (!res) return;

                        const reset = (obj, objKey, objI) => {
                          const arr = [...obj[objKey]];
                          obj[objKey] = arr.filter((x, z) => z !== objI);
                          setData(copy);
                        };

                        findAKey(copy, 'curriculum', _objMakeKey, reset);
                      };

                      const payload = { ...ids, callback };

                      if (branchLvl === 1) dispatch(deleteLesson(payload));
                      if (branchLvl === 2)
                        dispatch(deleteLessonContent(payload));
                    }}
                  />

                  {!obj?.contentType && (
                    <Dropdown
                      menu={addActions(_objMakeKey, limitAction)}
                      title={<PlusOutlined />}
                    />
                  )}
                </Space>
              </Row>
            </>
          ),
          key: _objMakeKey,
          selectable: !onEdit[0],
          contentType: _obj.contentType || 'none',
          children: dataToTrees(obj, objKey, lvl + i * 2 + '-'),
          style: getTreeStyle(_obj.contentType, lastIofSect, i),
          branchLvl,
          ids,
        });

        /**
         * THIS IS FOR THE FORMS
         * ADD CONTENT OF LESSON
         * IF TOPIC LESSON QUIZ SECTION HEADER
         * CALLING FORMS HERE
         */
        const editAction = {
          title: (
            <EditField
              setTitle={setTitle}
              setOnEdit={setOnEdit}
              cb={(t, d, { type, ref }) => {
                const callback = (res) => {
                  if (!res) return;

                  _obj.title = t;
                  _obj.description = d;

                  setData(copy);

                  dispatch(
                    getLessons({
                      id: course?._id,
                      callback: lessonCallback,
                    })
                  );

                  // setData({ curriculum: res?.lessons });
                };

                const payload = {
                  data: {
                    ..._obj,
                    title: t,
                    description: d,
                    preview: { type: type ? type : 'image' },
                  },
                  ...ids,
                  callback,
                };

                if (branchLvl === 1) dispatch(updateLesson(payload));
                if (branchLvl === 2) dispatch(updateLessonContent(payload));

                setOnEdit([false]);
              }}
              data={_obj}
              mode={
                isSect ? 0 : isSpecial ? 1 : _obj.contentType === 'quiz' ? 3 : 2
              }
            />
          ),
          selectable: false,
          contentType: 'input',
          key: lvl + (i * 2 + 1),
          style: { display: 'flex' },
        };

        /**
         * MAR CODES
         * SAVING NEW LESSON CONTENT
         * EDIT FIELD THIS WILL BE
         * PUSH THE NEW FORM BUT THE
         * RETURN TITLE IS NOT RIGHT
         */
        const addAction = (mode) => ({
          title: (
            <EditField
              setTitle={setTitle}
              setOnEdit={setOnEdit}
              cb={(t, d) => {
                console.log(t, d);
                const payload = {
                  data: newData(mode, t, d, (_obj || []).length + 1),
                  ...ids,
                };

                keysToExpand.push(_objMakeKey);
                _obj.key = _objMakeKey;
                _tmp.push(title(_obj, nextObjKey));

                const callback = (res) => {
                  if (res) {
                    dispatch(
                      getLessons({
                        id: course?._id,
                        callback: lessonCallback,
                      })
                    );
                  }
                };

                dispatch(
                  postLessonContent({
                    ...payload,
                    callback,
                  })
                );

                setOnEdit([false]);
              }}
              data={_obj}
              mode={mode}
            />
          ),
          selectable: false,
          contentType: 'input',
          key: lvl + (i * 2 + 1),
          style: { display: 'flex' },
        });

        keysToExpand.push(_objMakeKey);
        _obj.key = _objMakeKey;
        _tmp.push(title(_obj, nextObjKey));

        /**
         * MAR CODES
         * PUSHING ITEMS ON THE TREE
         * ALSO FOR SAVING THE ITEM EDIT FIELD COMPONENT
         */

        if (addMode) {
          _tmp.push({ ...addAction(onEdit[3]) });
        } else if (editMode) {
          _tmp.push({ ...editAction });
        }
      }

      return _tmp;
    };

    const tmp = dataToTrees(copy, 'curriculum', '0-');

    setTreeData(tmp);
    setExpandedKeys(keysToExpand);
  }, [data, onEdit]);

  const addActions = (objKey, _limitAction) => {
    const modes = [
      { n: 'Section Heading', m: 0 },
      { n: 'Topic', m: 1 },
      { n: 'Quiz', m: 2 },
      { n: 'Assignment', m: 3 },
    ];
    const action = (n: any) => setOnEdit([true, objKey, true, n]);

    return modes.map(({ n, m }, i) => ({ name: n, action: () => action(m) }));
  };

  // Recursive object and keys array iterator
  const findAKey = (obj, objKey, key, callback) => {
    const arr = obj[objKey];
    if (!arr) return;

    for (let i = 0; i < arr.length; i++) {
      const _obj = arr[i];
      if (!_obj) continue;
      if (_obj.key === key) {
        callback(obj, objKey, i);
        break;
      } else if (
        arr[i].contentType === 'section-heading' ||
        arr[i].contentType === 'section-head'
      ) {
        findAKey(_obj, 'curriculum', key, callback);
        continue;
      } else findAKey(_obj, 'contents', key, callback);
    }
  };

  const onDropv2 = (info) => {
    const { key: dropKey } = info.node;
    const { key: dragKey } = info.dragNode;
    const dropPos = dropKey.split('-');
    const dropPosition = Math.ceil(Number(dropPos[dropPos.length - 1]) / 2);

    const copy = { ...data };

    let ids;
    let toPaste;
    let branchLvl;

    findAKey(copy, 'curriculum', dragKey, (obj, objKey, objI) => {
      const arr = [...obj[objKey]];
      const foundObj = { ...arr[objI] };
      toPaste = foundObj;
      branchLvl = Math.floor((foundObj.key.length - 1) / 2);
      ids =
        branchLvl === 1
          ? {
              idCourse: foundObj.course,
              idLesson: foundObj._id,
            }
          : branchLvl === 2
          ? {
              idCourse: obj.course,
              idLesson: obj._id,
              idContent: foundObj._id,
            }
          : {};

      obj[objKey] = arr.filter((x, z) => z !== objI);

      findAKey(copy, 'curriculum', dropKey, (obj, objKey) => {
        const arr = [...obj[objKey]];
        const a = arr.slice(0, dropPosition);
        const b = arr.slice(dropPosition);
        const c = [].concat(a, toPaste, b);
        const d = c.map((cObj, cI) => ({ ...cObj, position: cI + 1 }));

        d.forEach((dObj, dI) => {
          const lastObj = dI === c.length - 1;
          const callback = (res) => {
            if (!res || !lastObj) return;
            obj[objKey] = d;
            setData(copy);
          };

          if (branchLvl === 1)
            dispatch(
              updateLesson({
                data: dObj,
                ...ids,
                idLesson: dObj._id,
                callback,
              })
            );

          if (branchLvl === 2)
            dispatch(
              updateLessonContent({
                data: dObj,
                ...ids,
                idContent: dObj._id,
                callback,
              })
            );
        });
      });
    });
  };

  const onExpand = (nodeKey) => {
    setExpandedKeys(nodeKey);
  };

  const allowDrop = ({ dropNode }) => {
    // conditions to avoid dropping into invincible node (for edit field)
    if (onEdit[0]) return false;
    const dragArr = onDragNode.key.split('-');
    const dropArr = dropNode.key.split('-');
    const dropPosition = Number(dropArr[dropArr.length - 1]) % 2;
    if (dropPosition) return false;

    // -- added to limit drag options
    const { key: keyA } = dropNode;
    const { key: keyB } = onDragNode;
    if (keyA.length !== keyB.length) return false;
    if (keyA.length === 5) {
      if (dragArr[1] !== dropArr[1]) return false;
    }
    return true;
  };

  const handleLessonDispatch = (obj) => {
    const callback = (res: any) => {
      if (!res) return;

      const newArr = Array.from(data?.curriculum || []);

      newArr.push(res);

      setData({ curriculum: newArr });
    };

    dispatch(
      postLesson({
        data: obj,
        idOrg: obj.organizationId,
        idCourse: obj.courseId,
        callback,
      })
    );
    setOnAdd(false);
  };

  const content = () => {
    return (
      <div style={{ paddingBottom: 50 }}>
        <Row justify="space-between">
          <StyledButton
            w={180}
            m={'0 0 20px 0'}
            p={'-10px 0 0 0'}
            onClick={() => setOnAdd(true)}
          >
            <StyledLesson>ADD LESSON</StyledLesson>
          </StyledButton>
        </Row>

        {onAdd && (
          <AddLesson
            data={data}
            setOnAdd={setOnAdd}
            handleDispatch={handleLessonDispatch}
          />
        )}

        <StyledTree
          blockNode
          onDrop={onDropv2}
          onExpand={onExpand}
          treeData={treeData}
          allowDrop={allowDrop}
          draggable={!onEdit[0]}
          className="draggable-tree"
          expandedKeys={expandedKeys}
          style={{ background: 'none ' }}
          onDragStart={({ node }) => setOnDragNode(node)}
        />
      </div>
    );
  };

  return isLoading ? <Loading /> : content();
}

export default TreeCourse;
