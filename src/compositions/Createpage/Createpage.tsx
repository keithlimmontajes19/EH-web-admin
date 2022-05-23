import { ReactElement, useState } from 'react';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';
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
  PlusOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import {
  EditorState,
  RichUtils,
  contentStateWithEntity,
  AtomicBlockUtils,
  getDefaultKeyBinding,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import type { PropsType } from './types';
import { StyledButton, StyledButtonCancle } from './styled';
import { Link } from 'react-router-dom';

const Createpage = (props: PropsType): ReactElement => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
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

  // let picker = colorPickerPlugin(setEditorState(editorState), editorState);
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
          />,
          <StyledButton>
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
    </>
  );
};

export default Createpage;
