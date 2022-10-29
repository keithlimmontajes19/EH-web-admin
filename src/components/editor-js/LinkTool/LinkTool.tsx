export default function LinkTool({data}: any) {
  return <a href={`${data.link}`} target="_blank">{data.link}</a>
}
