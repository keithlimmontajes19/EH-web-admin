export default function Code({data}: any) {
  return <code>
    {data?.code || ''}
  </code>
}
