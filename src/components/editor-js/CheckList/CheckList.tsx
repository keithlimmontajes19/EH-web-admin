export default function CheckList({data}: any) {
  const items = data?.items || []

  return <div>
    {items.map((item) => {
      return <div>
        <input type="checkbox" value={item.text} checked={item.checked}/>
        <label>{item.text}</label>
      </div>
    })}
  </div>
}
