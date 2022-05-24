import { ReactElement, useEffect, useState } from 'react';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './index.css';
import { Params, PropsType } from './types';
import {
  PageHeader,
  Breadcrumb,
  Row,
  Col,
  Layout,
  InputNumber,
  Button,
  Empty,
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
  convertToRaw,
  rawDraftContentState,
  convertFromRaw

} from 'draft-js';
import { useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { StyledButton, StyledButtonCancle } from './styled';
import { Link, useHistory, useParams } from 'react-router-dom';
import { RootState } from 'ducks/store';
import { stat } from 'fs';
import { addPage, editPage } from 'ducks/pages/actionCreator';
import { getOnepage } from 'ducks/pages/sagas/listSaga';
import Loading from 'components/Loading';
import { toast, ToastContainer } from 'react-toastify';


const Editpage = (props: PropsType): ReactElement => {


  //Constants for the edit page
  const { data: rawData }: any = useSelector<RootState>(
    (state) => state.pages.page
  );
  const loadingstate = useSelector<RootState>((state) => state.pages.page.loading)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory()
  const [details, setDetails] = useState({});
  const [forms, setForms] = useState(["624ddd5db5ffd056297445f7",
    "624ddda0b5ffd05629744604",
    "624dddc5b5ffd05629744611"])
  const [isPublish, setIsPublish] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const params: Params = useParams()
  const [loading, setLoading] = useState(loadingstate)
  // const history = useHistory();

  // handler keys for editors
  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  //get one page data method here
  async function data() {
    setLoading(true)
    await getOnepage(params.pagename)
    if (rawData === undefined) {
      setLoading(true)
    }
    else {
      let content = EditorState.createWithContent(convertFromRaw(JSON.parse(rawData?.details)))
      setLoading(false)
      setEditorState(content)
    }
  }

  useEffect(() => {
    data()
  }, [rawData])

  useEffect(() => {
    console.log(details)
  }, [details])

  // handle change for editor
  const handlechange = (editorState) => {
    const contentstate = editorState.getCurrentContent()
    setDetails(convertToRaw(contentstate))

  }

  // Editor state change method 
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    handlechange(editorState)

  };


  // publish mehtod
  const publishpage = () => {
    console.log(details)
    if (Object.keys(details).length === 0) {
      toast.error("enter some content into the editor")
    }
    else {
      setIsPublish(true)
      editPage({
        title: rawData.title,
        details: JSON.stringify(details),
        forms: forms,
        isPublish: isPublish,
        videoURL: videoURL,
        imageURL: imageURL,
        pageId: params.pagename
      })
    }
    // history.push('/team/pages')

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
  return <>
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
          <CheckOutlined /> Publish
        </StyledButton>,
        <StyledButtonCancle>Cancle</StyledButtonCancle>,
      ]}
    />
    <Layout
      style={{
        background: 'none',
      }}
    >
      {loading && <Loading />}
      {!loading && <Editor
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
      />}

    </Layout>
    <ToastContainer />

  </>;
};

export default Editpage;
