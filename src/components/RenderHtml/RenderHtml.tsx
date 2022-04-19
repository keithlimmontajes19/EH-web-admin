import {ReactElement} from 'react';

import type {PropsType} from './types';
import HTMLRenderer from 'react-html-renderer';

const RenderHtml = (props: PropsType): ReactElement => {
  const clean = {
    html: props.source.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
  };
  return <HTMLRenderer html={clean?.html} />;
};

export default RenderHtml;
