import CheckList from './CheckList/CheckList'
import Code from './Code/Code'
import Delimiter from './Delimiter/Delimiter'
import Header from './Header/Header'
import Image from './Image/Image'
import LinkTool from './LinkTool/LinkTool'
import List from './List/List'
import Paragraph from './Paragraph/Paragraph'
import Quote from './Quote/Quote'
import RawHtml from './RawHtml/RawHtml'
import Table from './Table/Table'
import Video from './Video/Video'
import Warning from './Warning/Warning'

export default function BlockViewer(props) {
  const block = props.block
  const data = block?.data

  if (block?.type === 'checklist') return <CheckList data={data} />
  if (block?.type === 'code') return <Code data={data} />
  if (block?.type === 'delimiter') return <Delimiter data={data} />
  if (block?.type === 'header') return <Header data={data} />
  if (block?.type === 'image') return <Image data={data} />
  if (block?.type === 'linkTool') return <LinkTool data={data} />
  if (block?.type === 'list') return <List data={data} />
  if (block?.type === 'paragraph') return <Paragraph data={data} />
  if (block?.type === 'quote') return <Quote data={data} />
  if (block?.type === 'raw') return <RawHtml data={data} />
  if (block?.type === 'table') return <Table data={data} />
  if (block?.type === 'video') return <Video data={data} />
  if (block?.type === 'warning') return <Warning data={data} />

  return <p>Unsupported block type...</p>
}
