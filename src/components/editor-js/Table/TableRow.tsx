export default function TableRow({items}: any) {
  return <tr>
    {items.map((item, index) => {
      return <td key={index}>{item}</td>
    })}
  </tr>
}
