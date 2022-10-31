import React, { useEffect, useState } from 'react';
// import EditorJS from '@editorjs/editorjs';
import axios from 'axios';
import api from 'api/index';
import edjsParser from 'editorjs-parser';

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
import VideoTool from '@weekwood/editorjs-video';

import { createReactEditorJS } from 'react-editor-js';
// import { editorJsParser } from 'editorjs-data-parser';

const ReactEditorJS = createReactEditorJS();
// const baseURL = 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  // linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  image: {
    class: Image,
    config: {
      field: 'file',
      endpoints: {
        byFile: 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload',
      },
      //   uploader: {
      //     uploadSelectedFile(file) {
      //       return axios
      //         .post(baseURL, file, {
      //           headers: {
      //             'Content-Type': 'multipart/form-data',
      //           },
      //         })
      //         .then((res: any) => {
      //           return {
      //             success: 1,
      //             type: 'image',
      //             file: {
      //               url: res?.data?.data?.url,
      //             },
      //           };
      //         });
      //     },
      //   },
    },
  },
  video: {
    class: VideoTool,
    config: {
      player: {
        pip: false,
        light: false,
        controls: true,
        playing: true,
      },
      field: 'file',
      endpoints: {
        byFile: 'https://engage-hub-platform-dev.herokuapp.com/api/v1/upload',
      },
      // uploader: {
      //   uploadByFile(file) {
      //     return axios
      //       .post(baseURL, { name: '', mimetype: '', data: file })
      //       .then((res) => {
      //         return {
      //           success: 1,
      //           file: {
      //             url: res?.data?.data?.url,
      //           },
      //         };
      //       });
      //   },
      // },
      actions: [
        {
          name: 'new_button',
          icon: '<svg>...</svg>',
          title: 'New Button',
          action: (name) => {
            alert(`${name} button clicked`);
            return false;
          },
        },
      ],
    },
  },
};

/**
 * =================================
 * VIDEO CONFIGS BASED ON THE GITHUB
 * =================================
 */
// endpoints: config.endpoints || '',
// additionalRequestData: config.additionalRequestData || {},
// additionalRequestHeaders: config.additionalRequestHeaders || {},
// field: config.field || 'video',
// types: config.types || 'video/*',
// captionPlaceholder: this.api.i18n.t(config.captionPlaceholder || 'Caption'),
// buttonContent: config.buttonContent || '',
// uploader: config.uploader || undefined,
// actions: config.actions || [],
// player: {
//   pip: config.player.pip || false,
//   controls: config.player.controls || false,
//   light: config.player.light || false,
//   playing: config.player.playing || false,
// },

// const ReactEditor = new EditorJS({
//   holder: 'editor',
//   placeholder: 'Let`s write an awesome story!',
//   onChange: (event) => {
//     console.log('evenerts', event);
//   },
//   autofocus: false,
//   tools: {
//     ...EDITOR_JS_TOOLS,
//   },
// });

// const convertDataToHtml = (blocks) => {
//   let convertedHtml = '';
//   blocks.map((block) => {
//     switch (block.type) {
//       case 'header':
//         convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
//         break;
//       case 'video':
//         convertedHtml += `<div><iframe width="560" height="315" src="${block.data.file.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
//         break;
//       case 'paragraph':
//         convertedHtml += `<p>${block.data.text}</p>`;
//         break;
//       case 'delimiter':
//         convertedHtml += '<hr />';
//         break;
//       case 'image':
//         convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
//         break;
//       case 'list':
//         convertedHtml += '<ul>';
//         block.data.items.forEach(function (li) {
//           convertedHtml += `<li>${li}</li>`;
//         });
//         convertedHtml += '</ul>';
//         break;
//       default:
//         console.log('Unknown block type', block.type);
//         break;
//     }
//   });
//   return convertedHtml;
// };

const GrapeEditor = (props: any) => {
  const { editorCore, blocks } = props;

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  // const handleSave = React.useCallback(async () => {
  //   const savedData =
  //     await editorCore.current.dangerouslyLowLevelInstance?.save();

  //   // const converted = convertDataToHtml(savedData?.blocks);
  //   // const parser = new edjsParser(undefined, undefined);
  //   // console.log('converted', converted);

  //   setValues(savedData?.blocks);
  //   console.log(savedData?.blocks);
  //   console.log('parser --->', editorJsParser(savedData?.blocks));
  // }, []);

  return (
    <ReactEditorJS
      value={blocks}
      defaultValue={blocks}
      tools={EDITOR_JS_TOOLS}
      onInitialize={handleInitialize}
      placeholder="Lets start making your content!"
    />
  );
};

export default GrapeEditor;
