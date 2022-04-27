import {Button, Col, Form, Input, Layout, Modal, Row, Space, Tree} from 'antd';
import Dropdown from 'components/Dropdown';
import React, {useEffect, useState} from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
  PlusOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  FormOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import {
  StyledButton,
  StyledInput,
  StyledText,
  StyledTextArea,
  StyledTree,
} from './styled';
import {theme} from 'utils/colors';
import {newData} from 'compositions/BuilderCourse/BuilderCourse';

function TreeCourse({data, setData}) {
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [onDragNode, setOnDragNode]: any = useState({});
  // upto 4 elements, [ onEdit, keyToEdit, onAdd, editFieldMode ]
  const [onEdit, setOnEdit]: any = useState([false]);

  useEffect(() => {
    const copy = {...data};
    const dataToTrees = (obj, objKey, lvl) => {
      const arr = obj[objKey];
      if (!arr) return;
      const _tmp = [];
      for (let i = 0; i < arr.length; i++) {
        const _obj = arr[i];
        if (!_obj || typeof _obj !== 'object') continue;
        const _objMakeKey = lvl + i * 2;
        const editMode = onEdit[1] === _objMakeKey;
        const addMode = onEdit[1] === _objMakeKey && onEdit[2];
        const isSpecial =
          _obj.contentType === 'section-head' || _obj.contentType === 'lesson';
        const isSect = _obj.contentType === 'section-head';
        const nextObjKey = isSect ? 'curriculum' : 'contents';

        const lastIofSect =
          obj.contentType === 'section-head' && i === arr.length - 1;

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
                          findAKey(
                            copy,
                            'curriculum',
                            _objMakeKey,
                            (obj, objKey, objI) => {
                              const arr = [...obj[objKey]];
                              obj[objKey] = arr.filter((x, z) => z !== objI);
                              setData(copy);
                            },
                          );
                        },
                      });
                    }}
                  />
                  {isSpecial && (
                    <Dropdown
                      menu={addActions(_objMakeKey)}
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
          style: getTreeStyle(_obj.contentType, _objMakeKey, lastIofSect),
        });
        const editAction = {
          title: (
            <EditField
              cb={(t, d) => {
                _obj.title = t;
                _obj.description = d;
                setData(copy);
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
              cb={(t, d) => {
                const oldArr = _obj[nextObjKey];
                const newArr = [].concat(oldArr, [newData(onEdit[3], t, d)]);
                _obj[nextObjKey] = newArr;
                setData(copy);
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

        _obj.key = _objMakeKey;
        _tmp.push(title(_obj, nextObjKey));
        if (addMode) _tmp.push(addAction(onEdit[3]));
        else if (editMode) _tmp.push(editAction);
      }
      return _tmp;
    };

    const tmp = dataToTrees(copy, 'curriculum', '0-2');
    setTreeData(tmp);
  }, [data, onEdit]);

  const EditField = ({cb, t = '', d = '', mode = 2}) => {
    const modes = ['Section Heading', 'Lesson', 'Topic', 'Quiz'];

    return (
      <Form
        onFinish={({t, d}) => cb(t, d)}
        initialValues={{t: t, d: d}}
        style={{marginTop: '15px'}}
      >
        {mode !== 0 ? (
          <>
            <Form.Item
              name="t"
              rules={[{required: true, message: `Add a ${modes[mode]} Title`}]}
            >
              <StyledInput placeholder={`${modes[mode]} Title`} />
            </Form.Item>
            <Form.Item
              name="d"
              rules={[{required: true, message: 'Add a Content'}]}
            >
              <StyledTextArea
                style={{minHeight: '179px'}}
                placeholder="Add Content"
              />
            </Form.Item>
            <Form.Item>
              <Row justify={mode <= 1 ? 'space-between' : 'end'}>
                {mode <= 1 && (
                  <Space>
                    <StyledButton
                      bg={'none'}
                      c={theme.PRIMARY}
                      b={`2px solid ${theme.PRIMARY}`}
                      icon={<VideoCameraOutlined />}
                      htmlType="button"
                    >
                      <StyledText fS={18} fW={500}>
                        Add Video
                      </StyledText>
                    </StyledButton>
                    <StyledButton
                      bg={'none'}
                      c={theme.PRIMARY}
                      b={`2px solid ${theme.PRIMARY}`}
                      icon={<PictureOutlined />}
                      htmlType="button"
                    >
                      <StyledText fS={18} fW={500}>
                        Add Picture
                      </StyledText>
                    </StyledButton>
                  </Space>
                )}
                <Col>
                  <Row justify="end">
                    <Col>
                      <StyledButton
                        bg={'none'}
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
              display: 'flex',
              height: '60px',
              marginBottom: '20px',
              justifyContent: 'center',
            }}
          >
            <div style={{width: 'calc(100% - 332px)'}}>
              <Form.Item
                name="t"
                rules={[
                  {required: true, message: `Add a ${modes[mode]} Title`},
                ]}
              >
                <StyledInput placeholder={`${modes[mode]} Title`} />
              </Form.Item>
            </div>
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
        )}
      </Form>
    );
  };

  const addActions = (objKey) => {
    const action = (n) => {
      setOnEdit([true, objKey, true, n]);
    };

    return [
      {
        name: 'Section Heading',
        action: () => action(0),
      },
      {
        name: 'Lesson',
        action: () => action(1),
      },
      {
        name: 'Topic',
        action: () => action(2),
      },
      {
        name: 'Quiz',
        action: () => action(3),
      },
    ];
  };

  const getTreeStyle = (type, key, lastIofSect) => {
    const mode =
      type === 'section-head'
        ? 0
        : type === 'lesson'
        ? 1
        : type === 'quiz'
        ? 3
        : 2;
    const color = [
      theme.PRIMARY_MID,
      '#fff',
      theme.PRIMARY_LIGHT,
      theme.PRIMARY_SLIGHT,
    ];
    return {
      background: color[mode],
      fontSize: mode === 0 ? '20px' : '18px',
      fontWeight: mode === 0 ? 600 : 400,
      marginTop: mode === 0 ? '15px' : '0',
      marginBottom: mode === 0 || lastIofSect ? '15px' : '0',
      color: theme.BLACK,
      height: '60px',
      borderTop: mode === 0 ? '1px solid #635FFA' : 'none',
      borderBottom: mode === 0 ? '1px solid #635FFA' : 'none',
      zIndex: mode <= 1 ? 3 : 2,
      filter: `drop-shadow(0 0 ${mode <= 1 ? 2 : 1}px #635FFAEA)`,
    };
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
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = dropKey.split('-');
    const dropPosition = Math.ceil(Number(dropPos[dropPos.length - 1]) / 2);

    const copy = {...data};

    // Find dropArray and paste dragObject
    let toPaste;

    findAKey(copy, 'curriculum', dragKey, (obj, objKey, objI) => {
      const arr = [...obj[objKey]];
      toPaste = {...arr[objI]};
      obj[objKey] = arr.filter((x, z) => z !== objI);

      findAKey(copy, 'curriculum', dropKey, (obj, objKey) => {
        const arr = [...obj[objKey]];
        const a = arr.slice(0, dropPosition);
        const b = arr.slice(dropPosition);
        obj[objKey] = [].concat(a, toPaste, b);
      });
    });

    setData(copy);
  };

  return (
    <>
      <StyledTree
        className="draggable-tree"
        defaultExpandedKeys={expandedKeys}
        defaultExpandAll={true}
        autoExpandParent={true}
        draggable={!onEdit[0]}
        blockNode
        onDrop={onDropv2}
        onDragStart={({node}) => setOnDragNode(node)}
        allowDrop={({dropNode}: any) => {
          if (onEdit[0]) return false;
          const dropPos = dropNode.key.split('-');
          const dropPosition = Number(dropPos[dropPos.length - 1]) % 2;
          if (dropPosition) return false;

          const a = onDragNode.contentType;
          const b = a === 'section-head' || a === 'lesson';

          if (b) return true;
          else return dropPos.length !== 2;
        }}
        treeData={treeData}
        style={{background: 'rgb(248, 248, 248)'}}
      />
    </>
  );
}

export default TreeCourse;
