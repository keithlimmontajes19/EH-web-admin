import {Col, Modal, Row, Space} from 'antd';
import Dropdown from 'components/Dropdown';
import React, {useEffect, useState} from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  PlusOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  getTreeStyle,
  StyledTree,
} from './styled';
import {theme} from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons, postLesson, deleteLesson, postLessonContent, updateLesson, updateLessonContent, deleteLessonContent } from 'ducks/lms/actionCreator';
import Loading from 'components/Loading';
import { useHistory } from 'react-router-dom';
import { AddLesson, EditField, newData } from './components';
import StyledButton from 'components/StyledButton';
import Text from 'components/Text'

function TreeCourse({course, onAdd, setOnAdd, queue, setCourseInfo}) {
  const history = useHistory();
  const [data, setData] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [onDragNode, setOnDragNode]: any = useState({});
  // upto 4 elements, [ onEdit, keyToEdit, onAdd, editFieldMode ]
  const [onEdit, setOnEdit]: any = useState([false]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(()=>{
    localStorage.setItem('courseId', course._id)
    localStorage.setItem('organizationId', '6239ffd1cb8440277f2a2b39')
    dispatch(getLessons({
      callback: defaultCallback
    }))
  }, [])
  
  const getOrgId = () => {
    const getItem = localStorage.getItem('organizationId')
    return getItem ? getItem : '6239ffd1cb8440277f2a2b39'
  }

  const sortByPosition = (arr) => arr.sort((a: any, b: any) => parseFloat(a.position) - parseFloat(b.position))

  const defaultCallback = (res) => {
    if(!res) {
      setData({})
      setTreeData([])
      setIsLoading(true)
      return
    }
    const sorted = sortByPosition(res)
    setData({curriculum: sorted})
    setIsLoading(false)
  }

  useEffect(() => {
    const copy = {...data};
    const keysToExpand = [];

    const dataToTrees = (obj, objKey, lvl) => {
      const arr = obj[objKey];
      if (!arr) return;
      const sortedArr = sortByPosition(arr)
      const _tmp = [];
      for (let i = 0; i < sortedArr.length; i++) {
        const _obj = sortedArr[i];
        if (!_obj || typeof _obj !== 'object') continue;
        const _objMakeKey = lvl + i * 2;
        const editMode = onEdit[1] === _objMakeKey;
        const addMode = onEdit[1] === _objMakeKey && onEdit[2];

        const isSpecial =
          _obj.contentType === 'section-head' || _obj.contentType === 'lesson';
        const isSect = _obj.contentType === 'section-head';
        const nextObjKey = 'curriculum' in _obj ? 'curriculum' : 'contents';
        const lastIofSect = obj.contentType === 'section-head' && i === sortedArr.length - 1;

        const branchLvl = Math.floor((_objMakeKey.length-1)/2)
        const limitAction = branchLvl === 1 ? false : true
        const ids = branchLvl === 1 ? {
          idOrg: getOrgId(),
          idCourse: _obj.course,
          idLesson: _obj._id
        } : branchLvl === 2 ? {
          idOrg: getOrgId(),
          idCourse: obj.course,
          idLesson: obj._id,
          idContent: _obj._id
        } : {}

        const title = (obj, objKey) => ({
          title: (
            <>
              <Row align="middle" justify="space-between">
                <span>
                  {_obj.contentType === 'quiz' ? <FormOutlined /> : ''}
                  {_obj.title || _obj}
                </span>
                <Space
                  className={'action-to-hide'}
                  style={{
                    minHeight: '60px',
                    color: theme.PRIMARY,
                    fontSize: '24px',
                  }}
                >
                  <EditOutlined
                    onClick={() => setOnEdit([true, _objMakeKey])}
                  />
                  <EyeFilled />
                  <DeleteOutlined
                    onClick={() => {
                      Modal.confirm({
                        title: `Are you sure, you want to delete this ${_obj.contentType.replace(
                          /[-]+/g,
                          ' ',
                        )}?`,
                        okText: 'Yes',
                        okType: 'danger',
                        onOk: () => {
                          const copy = {...data};
                          const callback = (res) => 
                          {
                            if(!res) return
                            const reset = (obj, objKey, objI) => {
                              const arr = [...obj[objKey]];
                              obj[objKey] = arr.filter((x, z) => z !== objI);
                              setData(copy);
                            }
                            findAKey(copy, 'curriculum', _objMakeKey, reset);
                          }
                          const payload = {...ids, callback}

                          if(branchLvl === 1) dispatch(deleteLesson(payload));
                          if(branchLvl === 2) dispatch(deleteLessonContent(payload));
                        },
                      });
                    }}
                  />
                  {isSpecial && (
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
          ids
        });
        const editAction = {
          title: (
            <EditField
              setOnEdit={setOnEdit}
              cb={(t, d) => {
                const callback = (res) => {
                  if(!res) return
                  _obj.title = t;
                  _obj.description = d;
                  setData(copy);
                }
                const payload = {
                  data: {..._obj, title: t, description: d},
                  ...ids,
                  callback
                }

                if(branchLvl === 1) dispatch(updateLesson(payload));
                if(branchLvl === 2) dispatch(updateLessonContent(payload));
                setOnEdit([false]);
              }}
              t={_obj.title}
              d={_obj.description}
              mode={
                isSect ? 0 : isSpecial ? 1 : _obj.contentType === 'quiz' ? 3 : 2
              }
            />
          ),
          key: lvl + (i * 2 + 1),
          contentType: 'input',
          style: {display: 'flex'},
          selectable: false,
        };
        const addAction = (mode) => ({
          title: (
            <EditField
              setOnEdit={setOnEdit}
              cb={(t, d) => {
                const payload = {
                  data: newData(mode, t, d, _obj[nextObjKey].length+1), 
                  ...ids
                }
                const callback = (res) => {
                  if(!res) return
                  const oldArr = _obj[nextObjKey];
                  const newArr = [].concat(oldArr, [res]);
                  _obj[nextObjKey] = newArr;
                  setData(copy)
                }

                dispatch(postLessonContent({
                  ...payload,
                  callback
                }))
                setOnEdit([false]);
              }}
              mode={mode}
            />
          ),
          key: lvl + (i * 2 + 1),
          contentType: 'input',
          style: {display: 'flex'},
          selectable: false,
        });

        keysToExpand.push(_objMakeKey);
        _obj.key = _objMakeKey;
        _tmp.push(title(_obj, nextObjKey));
        if (addMode) _tmp.push(addAction(onEdit[3]));
        else if (editMode) _tmp.push(editAction);
      }
      return _tmp;
    };

    const tmp = dataToTrees(copy, 'curriculum', '0-');
    setExpandedKeys(keysToExpand);
    setTreeData(tmp);
  }, [data, onEdit]);
  
  const addActions = (objKey, limitAction) => {
    // Nesting temporarily disabled
    // const specialMode = [{n: 'Section Heading', m: 0}, {n: 'Lesson', m: 1}]
    // const defaultMode = [{n: 'Topic', m: 2}, {n: 'Quiz', m: 3}]
    // const modes = limitAction ? defaultMode : [...specialMode, ...defaultMode]
    const modes = [{n: 'Topic', m: 2},{n: 'Quiz', m: 3},{n: 'Activity', m: 4},{n: 'Assignments', m: 5}]
    const action = (n: any) => setOnEdit([true, objKey, true, n])
    return modes.map(({n, m}, i)=>({name: n, action: () => action(m)}))
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
    const {key: dropKey} = info.node;
    const {key: dragKey} = info.dragNode;
    const dropPos = dropKey.split('-');
    const dropPosition = Math.ceil(Number(dropPos[dropPos.length - 1]) / 2);

    const copy = {...data};

    // Find dropArray and paste dragObject
    let toPaste;
    let branchLvl;
    let ids;

    findAKey(copy, 'curriculum', dragKey, (obj, objKey, objI) => {
      const arr = [...obj[objKey]];
      const foundObj = {...arr[objI]}
      toPaste = foundObj;
      branchLvl = Math.floor((foundObj.key.length-1)/2)
      ids = branchLvl === 1 ? {
        idOrg: getOrgId(),
        idCourse: foundObj.course,
        idLesson: foundObj._id
      } : branchLvl === 2 ? {
        idOrg: getOrgId(),
        idCourse: obj.course,
        idLesson: obj._id,
        idContent: foundObj._id
      } : {}

      obj[objKey] = arr.filter((x, z) => z !== objI);

      findAKey(copy, 'curriculum', dropKey, (obj, objKey) => {
        const arr = [...obj[objKey]];
        const a = arr.slice(0, dropPosition);
        const b = arr.slice(dropPosition);
        const c = [].concat(a, toPaste, b)
        const d = c.map((cObj, cI) => ({...cObj, position: cI+1}))

        d.forEach( (dObj, dI) => {
          const lastObj = dI === c.length - 1
          const callback = (res) => {
            if(!res || !lastObj) return
            obj[objKey] = d;
            setData(copy);
          }
          if(branchLvl === 1) dispatch(updateLesson({
            data: dObj, ...ids, idLesson: dObj._id, callback
          }));
          if(branchLvl === 2) dispatch(updateLessonContent({
            data: dObj, ...ids, idContent: dObj._id, callback
          }));
        })
      });
    });


  };

  const onExpand = (nodeKey) => {
    setExpandedKeys(nodeKey);
  };

  const allowDrop = ({dropNode}) => {
    // conditions to avoid dropping into invincible node (for edit field)
    if (onEdit[0]) return false;
    const dragArr = onDragNode.key.split('-')
    const dropArr = dropNode.key.split('-');
    const dropPosition = Number(dropArr[dropArr.length - 1]) % 2;
    if (dropPosition) return false;
    
    // -- added to limit drag options
    const {key: keyA} = dropNode
    const {key: keyB} = onDragNode
    if (keyA.length !== keyB.length) return false
    if (keyA.length === 5) {
      if (dragArr[1] !== dropArr[1]) return false
    }
    return true
    // const a = onDragNode.contentType;
    // const b = a === 'section-head' || a === 'lesson';
    // if (b) return true;
    // else return dropArr.length !== 2;
  }

  const handleDispatch = (obj) => {
    const callback = (res: any) => {
      if(!res) return
      const copy = JSON.parse(JSON.stringify(data));
      const newArr = [].concat(copy.curriculum, [res.lesson]);
      copy.curriculum = newArr;
      setData(copy);
    }
    dispatch(postLesson({
      data: obj, 
      idOrg: obj.organizationId,
      idCourse: obj.courseId,
      callback
    }))
    setOnAdd(false)
  }

  return (
    <>
      <Row justify='space-between'>
      <StyledButton
        w={213}
        m={'0 0 20px 0'}
        p={'-10px 0 0 0'}
        onClick={() => setOnAdd(true)}
        icon={<PlusOutlined />}
      >
        <Text fC="#fff" fS="18" fW="500">
          LESSON
        </Text>
      </StyledButton>
      {queue && (
        <StyledButton
        m={'0 20px 20px 0'}
        p={'-10px 0 0 0'}
        onClick={setCourseInfo}
      >
          SAVE ?
      </StyledButton>
      )}
      </Row>
      {onAdd && <AddLesson data={data} setOnAdd={setOnAdd} handleDispatch={handleDispatch} />}
      {isLoading ? <Loading /> : (
        <StyledTree
          className="draggable-tree"
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          draggable={!onEdit[0]}
          blockNode
          onDrop={onDropv2}
          onDragStart={({node}) => setOnDragNode(node)}
          allowDrop={allowDrop}
          treeData={treeData}
          style={{background: 'none '}}
        />
      )}
    </>
  )
}

export default TreeCourse;
