import React, { useEffect, useState } from 'react';
//import 'grapesjs/dist/css/grapes.min.css';
// import './css/grapes.min.css';
// import grapesjs from 'grapesjs';
// import gsWebpage from 'grapesjs-preset-webpage';
// import gsCustome from 'grapesjs-custom-code';

import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import VideoTool from '@weekwood/editorjs-video';
import SimpleVideoTool from 'simple-video-editorjs';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  // video: VideoTool,
};

const App = () => {
  // const [pluginLoaded, setPluginLoaded] = useState(false);
  // const [editor, setEditor] = useState(null);

  useEffect(() => {
    new EditorJS({
      holder: 'editor',
      tools: {
        video: SimpleVideoTool,
        ...EDITOR_JS_TOOLS,
        // header: {
        //   class: Header,
        //   inlineToolbar: ['link'],
        // },
        // list: {
        //   class: List,
        //   inlineToolbar: true,
        // },
      },
    });
    //   grapesjs.init({
    //     // color: "white",
    //     height: '100vh',
    //     width: 'auto',
    //     container: '#g',
    //     fromElement: true,
    //     // plugins: [gsWebpage, gsCustome, gsTap, TablePluginRef, ChartPluginRef],
    //     storageManager: {
    //       type: 'remote',
    //       //   urlStore:
    //       //     "http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ",
    //       //   urlLoad:
    //       //     "http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ",
    //       autosave: false,
    //       autoload: true,
    //       //   contentTypeJson: true,
    //       //   storeComponents: true,
    //       //   allowScripts: 1,
    //       //   storeStyles: true,
    //       //   storeHtml: true,
    //       //   storeCss: true
    //     },
    //   });
  });

  return <div id="editor" />;
};

export default App;
