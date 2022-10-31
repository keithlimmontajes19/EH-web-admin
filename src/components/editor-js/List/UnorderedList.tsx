export default function UnorderedList({items}: any) {
  return <ul>
    {items.map((item, index) => {
      const text = item?.replace(/&lt;/g, '<') || ''
      return <li dangerouslySetInnerHTML={{__html: text}} key={index}></li>
    })}
  </ul>
}
