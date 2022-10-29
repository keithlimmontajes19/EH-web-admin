export default function OrderedList({items}: any) {
  return <ol>
    {items.map((item, index) => {
      return <li key={index}>{item}</li>
    })}
  </ol>
}
