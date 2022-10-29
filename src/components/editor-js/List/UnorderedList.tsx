export default function UnorderedList({items}: any) {
  return <ul>
    {items.map((item, index) => {
      return <li key={index}>{item}</li>
    })}
  </ul>
}
