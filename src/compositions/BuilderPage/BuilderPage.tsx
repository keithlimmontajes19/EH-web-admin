import { ReactElement, useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import './index.css';
import { Params } from "./types";
import {
  PageHeader,
  Breadcrumb,
  Row,
  Col,
  Layout,
  InputNumber,
  Button,
  Modal,
  Input,
} from "antd";

import {
  MoreOutlined,
  RedoOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import Text from "components/Text";

import { useDispatch, useSelector } from "react-redux";
import type { PropsType } from "./types";
import { EditorContainer, StyledButton, StyledButtonCancle } from "./styled";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { getOnePage, postPage, updatePage } from "ducks/pages/actionCreator";
import Loading from "components/Loading";

const blank = {
  title: "New Page",
  details: JSON.stringify(
    convertToRaw(EditorState.createEmpty().getCurrentContent())
  ),
  forms: [],
  isPublish: true,
  videoUrl: null,
  imageUrl: null,
};

const BuilderPage = (props: PropsType): ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();

  // const htmlToEditorState = (html) => {
  //   const contentBlock = htmlToDraft(html)
  //   const contentState =  ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //   return EditorState.createWithContent(contentState)
  // }
  const editorStateToHtml = (editorStateValue) =>
    draftToHtml(convertToRaw(editorStateValue.getCurrentContent()));

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editedData, setEditedData]: any = useState(false);
  const [pageData, setPageData]: any = useState(
    JSON.parse(JSON.stringify(blank))
  );
  const [onDispatch, setOnDispatch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editInput, setEditInput]: any = useState({
    isVisible: false,
    title: "",
    inputVal: "",
    callback: () => {},
  });

  useEffect(() => {
    const callback = (res) => {
      if (!res) return;
      setLoading(false);
      setPageData(res);
    };

    if (params?.page === "create") {
      setPageData(JSON.parse(JSON.stringify(blank)));
      setLoading(false);
    } else
      dispatch(
        getOnePage({
          pageId: params?.subpage,
          callback,
        })
      );
  }, []);

  const resetData = () => {
    setEditedData(false);
    const { details } = pageData;
    try {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(details)))
      );
    } catch {
      setEditorState(EditorState.createEmpty());
    }
  };

  useEffect(resetData, [pageData]);

  const onEditorStateChange = (e) => {
    if (!editedData) setEditedData(pageData);
    setEditorState(e);
  };

  const handleRenamePage = (e) => {
    if (!editedData) {
      const copy = JSON.parse(JSON.stringify(pageData));
      copy.title = e;
      setEditedData(copy);
    } else {
      const prev = JSON.parse(JSON.stringify(editedData));
      prev.title = e;
      setEditedData(prev);
    }
  };

  const handlePagePublish = () => {
    if (!editedData) return;
    if (onDispatch) return;

    setOnDispatch(true);
    const defaultCallback = (res) => {
      if (!res) return;
      setPageData(res);
      setOnDispatch(false);
      setEditedData(false);
    };
    const data = {
      ...editedData,
      details: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    };
    if (params?.page === "create")
      return dispatch(
        postPage({
          data,
          callback: (res) => {
            if (res) history.replace("team/pages/builder/" + res?._id);
            defaultCallback(res);
          },
        })
      );

    dispatch(
      updatePage({
        data,
        pageId: pageData?._id,
        callback: defaultCallback,
      })
    );
  };

  const resetEditInput = () =>
    setEditInput({
      isVisible: false,
      title: "",
      inputVal: "",
      callback: () => {},
    });

  return (
    <Layout style={{ background: "none", marginLeft: 20, marginTop: 25 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumb separator="<">
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/team/pages" style={{ textDecoration: "underline" }}>
                Back to Pages
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          <PageHeader
            title={
              <Text
                onClick={() => {
                  const title = editedData
                    ? editedData?.title
                    : pageData?.title;
                  setEditInput({
                    isVisible: true,
                    title: "Rename " + title,
                    inputVal: title,
                    callback: handleRenamePage,
                  });
                }}
              >
                {editedData ? editedData?.title : pageData?.title}
              </Text>
            }
            ghost={false}
            extra={[
              <RedoOutlined
                style={{
                  fontSize: "25px",
                  paddingRight: "24px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  Modal.confirm({
                    title: "Reset Edit Progress?",
                    onOk: resetData,
                  })
                }
              />,
              <StyledButton disabled={!editedData} onClick={handlePagePublish}>
                {onDispatch ? <LoadingOutlined spin /> : <CheckOutlined />}{" "}
                PUBLISH
              </StyledButton>,
              <StyledButtonCancle onClick={() => history.goBack()}>
                CANCEL
              </StyledButtonCancle>,
              <MoreOutlined
                style={{
                  fontSize: "26px",
                  color: "#635FFA",
                  cursor: "pointer",
                }}
              />,
            ]}
          />

          <EditorContainer>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onFocus={(event) => {}}
              onBlur={(event, editorState) => {}}
              onTab={(event) => {}}
              onEditorStateChange={onEditorStateChange}
            />
          </EditorContainer>

          <ToastContainer />

          <Modal
            visible={editInput.isVisible}
            title={editInput.title}
            children={
              <Input
                value={editInput.inputVal}
                onChange={(e) =>
                  setEditInput((prev) => ({
                    ...prev,
                    inputVal: e.target.value,
                  }))
                }
              />
            }
            onOk={() => {
              editInput.callback(editInput.inputVal);
              resetEditInput();
            }}
            onCancel={resetEditInput}
            okButtonProps={{ disabled: editInput.inputVal === "" }}
          />
        </>
      )}
    </Layout>
  );
};

export default BuilderPage;
