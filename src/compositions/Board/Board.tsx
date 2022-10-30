import { ReactElement, useEffect, useState } from 'react';

import { Row, Col, Modal } from 'antd';

import { BoardContainer, HeaderContainer, BodyContainer } from './styled';
import Folder from 'components/Folder';
import File from 'components/File';
import { EllipsisOutlined } from '@ant-design/icons';
import Dropdown from 'components/Dropdown';
import { theme } from 'utils/colors';
import Loading from 'components/Loading';
import { useDispatch } from 'react-redux';

const Board = ({
  index,
  item,
  saveBoard,
  deleteBoard,
  setPageState,
  setEditInput,
}): ReactElement => {
  const dispatch = useDispatch();
  const [viewItem, setViewItem]: any = useState(false);
  const [focusItem, setFocusItem] = useState([-1]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [onDispatch, setOnDispatch] = useState(false);

  useEffect(() => {
    if (focusItem[0] === -1) return setViewItem(false);

    const copy = JSON.parse(JSON.stringify(item));
    iterateFindItem(copy, 'board_items', focusItem, 0, (objResult) => {
      setViewItem({ ...objResult });
    });
  }, [focusItem, item]);

  const iterateFindItem = (
    obj,
    objKey,
    indexArr,
    count,
    callback,
    prev = null
  ) => {
    if (indexArr.length === count)
      return callback({ obj, objKey, index: count - 1, indexArr, prev });
    const nextObj = obj[objKey][indexArr[count]];
    const nextObjKey = 'item_pages';
    return iterateFindItem(
      nextObj,
      nextObjKey,
      indexArr,
      count + 1,
      callback,
      obj
    );
  };

  const mainActions = [
    {
      name: 'Rename Board',
      action: () =>
        setEditInput({
          isVisible: true,
          title: 'Rename ' + item?.board_name,
          inputVal: item?.board_name,
          callback: (e) => saveBoard(index, { ...item, board_name: e }),
        }),
    },
    {
      name: 'Delete Board',
      action: () =>
        Modal.confirm({
          title: 'Delete ' + item?.board_name,
          onOk: () => deleteBoard(index),
        }),
    },
  ];

  const defaultActions = () => {
    let directory = [];
    if (viewItem)
      iterateFindItem(
        item,
        'board_items',
        viewItem.indexArr,
        0,
        ({ obj, objKey }) => {
          directory = obj[objKey];
        }
      );
    else directory = item?.board_items;
    return [
      {
        name: 'Add Folder',
        action: () => {
          const title = viewItem ? viewItem?.obj?.item_name : item?.board_name;
          setEditInput({
            isVisible: true,
            title: 'Add Folder to ' + title,
            inputVal: '',
            callback: (e) => {
              const copy = JSON.parse(JSON.stringify(item));
              const blank = {
                item_name: e,
                item_pages: [],
                item_type: 'folder',
              };
              if (viewItem) {
                iterateFindItem(
                  copy,
                  'board_items',
                  viewItem.indexArr,
                  0,
                  ({ obj, objKey, index }) => {
                    const newArr = [...obj[objKey], blank];
                    obj[objKey] = newArr;
                  }
                );
              } else {
                const newItems = [...copy.board_items, blank];
                copy.board_items = newItems;
              }
              saveBoard(index, copy);
            },
          });
        },
      },
      {
        name: 'Add Page',
        action: () =>
          setPageState({
            isVisible: true,
            defaultVal: directory
              .filter((itemObj) => itemObj?.item_type === 'page')
              .map((pageObj) => pageObj?.item_pageId),
            callback: (result) => {
              const copy = JSON.parse(JSON.stringify(item));
              const convertedResult = result.map((pageObj) => ({
                item_name: pageObj?.title,
                item_type: 'page',
                item_pageId: pageObj?._id,
              }));

              if (viewItem) {
                iterateFindItem(
                  copy,
                  'board_items',
                  viewItem.indexArr,
                  0,
                  ({ obj, objKey, index }) => {
                    const newArr = [...obj[objKey], ...convertedResult];
                    obj[objKey] = newArr;
                  }
                );
              } else {
                const newItems = [...copy.board_items, ...convertedResult];
                copy.board_items = newItems;
              }
              saveBoard(index, copy);
            },
          }),
      },
    ];
  };
  const selectedActions = () => {
    const _item = viewItem ? viewItem?.obj : item?.board_items[selectedItem];
    const pageActions = [
      {
        name: `${_item.item_type === 'folder' ? 'Delete' : 'Remove'} Selected`,
        action: () => {
          if (onDispatch) return;
          Modal.confirm({
            title: 'Remove ' + _item?.item_name,
            onOk: () => {
              const copy = JSON.parse(JSON.stringify(item));
              setSelectedItem(-1);
              if (viewItem) {
                iterateFindItem(
                  copy,
                  'board_items',
                  viewItem.indexArr,
                  0,
                  ({ obj, objKey, index }) => {
                    const newArr = [...obj[objKey]];
                    obj[objKey] = newArr.filter((obj, i) => i !== selectedItem);
                  }
                );
              } else {
                copy.board_items = item.board_items.filter(
                  (obj, i) => i !== selectedItem
                );
              }
              saveBoard(index, copy);
            },
          });
        },
      },
    ];
    if (_item?.item_type === 'page') return pageActions;
    return [
      {
        name: 'Rename Selected',
        action: () => {
          const title = viewItem
            ? viewItem?.obj?.item_pages[selectedItem]?.item_name
            : item?.board_items[selectedItem]?.item_name;
          setEditInput({
            isVisible: true,
            title: 'Rename ' + title,
            inputVal: title,
            callback: (e) => {
              const copy = JSON.parse(JSON.stringify(item));
              setSelectedItem(-1);
              if (viewItem) {
                iterateFindItem(
                  copy,
                  'board_items',
                  viewItem.indexArr,
                  0,
                  ({ obj, objKey }) => {
                    const targetChildItem = obj[objKey][selectedItem];
                    targetChildItem.item_name = e;
                  }
                );
              } else {
                const targetItem = copy?.board_items[selectedItem];
                targetItem.item_name = e;
              }
              saveBoard(index, copy);
            },
          });
        },
      },
      ...pageActions,
    ];
  };

  const headerActions = (mode) => (mode ? defaultActions() : selectedActions());

  return (
    <>
      <Col span={10} style={{ margin: 36 }}>
        <BoardContainer>
          <HeaderContainer>
            <h2>{item?.board_name}</h2>
            <Dropdown
              menu={[...mainActions, ...headerActions(selectedItem === -1)]}
              title={
                <div style={{ fontSize: 30 }}>
                  <EllipsisOutlined />
                </div>
              }
            />
          </HeaderContainer>

          <div
            style={{
              color: theme.LIGHT_GRAY,
              height: 50,
              padding: 20,
              marginTop: 80,
              visibility: viewItem ? 'visible' : 'hidden',
              textDecoration: 'underline',
            }}
          >
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const prev = [...focusItem];
                prev.pop();
                setFocusItem(prev.length === 0 ? [-1] : prev);
                setOnDispatch(false);
              }}
            >
              &lt; Back to{' '}
              {viewItem
                ? viewItem.prev?.item_name || viewItem.prev?.board_name
                : ''}
            </span>
          </div>

          <BodyContainer
            onClick={(e: any) => {
              if (e.target.localName === 'div') setSelectedItem(-1);
            }}
          >
            <Row justify="space-around">
              {onDispatch ? (
                <Loading />
              ) : (
                (viewItem
                  ? viewItem.obj[viewItem.objKey] || []
                  : item?.board_items
                ).map((pages, index) => {
                  return (
                    <span
                      onDoubleClick={() => {
                        setSelectedItem(-1);
                        if (pages.item_type === 'page') return;
                        if (focusItem[0] === -1) return setFocusItem([index]);
                        setFocusItem((prev) => [...prev, index]);
                      }}
                      onClick={() =>
                        setSelectedItem((prev) => (prev === index ? -1 : index))
                      }
                      style={{
                        // background: index === selectedItem ? theme.PRIMARY_LIGHT : 'none',
                        borderRadius: 15,
                      }}
                    >
                      {pages?.item_type === 'folder' ? (
                        <Folder
                          key={index}
                          index={index}
                          pages={pages}
                          selectedItem={selectedItem}
                        />
                      ) : (
                        <File
                          index={index}
                          selectedItem={selectedItem}
                          name={pages?.item_name || pages?.title}
                        />
                      )}
                    </span>
                  );
                })
              )}
            </Row>
          </BodyContainer>
        </BoardContainer>
      </Col>
    </>
  );
};

export default Board;
