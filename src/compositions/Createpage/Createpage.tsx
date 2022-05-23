import { ReactElement, useEffect, useState } from 'react';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';
import { Params } from './types';
import {
  PageHeader,
  Breadcrumb,
  Row,
  Col,
  Layout,
  InputNumber,
  Button,
} from 'antd';

import {
  RedoOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import {
  EditorState,
  RichUtils,
  contentStateWithEntity,
  AtomicBlockUtils,
  getDefaultKeyBinding,
  convertToRaw
} from 'draft-js';
import { useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import type { PropsType } from './types';
import { StyledButton, StyledButtonCancle } from './styled';
import { Link, useHistory, useParams } from 'react-router-dom';
import { RootState } from 'ducks/store';
import { stat } from 'fs';
import { addPage } from 'ducks/pages/actionCreator';
import { getOnepage } from 'ducks/pages/sagas/listSaga';
import { toast, ToastContainer } from 'react-toastify';

const Createpage = (props: PropsType): ReactElement => {

  // create page constant
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const params: Params = useParams()
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [forms, setForms] = useState(["624ddd5db5ffd056297445f7",
    "624ddda0b5ffd05629744604",
    "624dddc5b5ffd05629744611"])
  const [isPublish, setIsPublish] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);



  const { data: rawData }: any = useSelector<RootState>((state) => state.pages)
  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  useEffect(() => {
    getOnepage(params.pagename)
  }, [params])

  const handlechange = (rawDraftContentState) => {
    const contentstate = rawDraftContentState.getCurrentContent()
    // setDetails(convertToRaw(rawDraftContentState))
    setDetails(convertToRaw(contentstate))
    // console.log(convertToRaw(contentstate))
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    handlechange(editorState)
    console.log(params.pagename)
  };

  const publishpage = () => {
    if (Object.keys(details).length === 0) {
      toast.error("enter some content into the editor")
    }
    else {
      setIsPublish(true)
      addPage({
        title: params.pagename,
        details: JSON.stringify(details),
        forms: forms,
        isPublish: true,
        videoURL: videoURL,
        imageURL: imageURL,
      })
    }
    history.push('/team/pages')
  }

  // reset page method
  const resetPage = () => {
    setEditorState(EditorState.createEmpty())
  }

  // file upload handler
  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb separator="<">
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/team/pages" style={{ textDecoration: 'underline' }}>
                Back to Pages
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        ghost={false}
        style={{
          background: 'none',
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        extra={[
          <RedoOutlined
            style={{
              fontSize: '25px',
              paddingRight: '24px',
              cursor: 'pointer',

            }}
            onClick={resetPage}
          />,
          <StyledButton onClick={publishpage}>
            <CheckOutlined /> Create
          </StyledButton>,
          <StyledButtonCancle>Cancle</StyledButtonCancle>,
        ]}
      />
      <Layout
        style={{
          background: 'none',
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          onTab={onHandleKeyBindings}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </Layout>
      <ToastContainer />

    </>
  );
};

export default Createpage;
