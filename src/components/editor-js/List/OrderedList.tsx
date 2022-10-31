export default function OrderedList({items}: any) {
  return <ol>
    {items.map((item, index) => {
      const text = item?.replace(/&lt;/g, '<') || ''
      return <li dangerouslySetInnerHTML={{__html: text}} key={index}></li>
    })}
  </ol>
}
