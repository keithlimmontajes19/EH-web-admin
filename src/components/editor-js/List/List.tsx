import OrderedList from './OrderedList'
import UnorderedList from './UnorderedList'

export default function List({data}: any) {
  const style = data?.style
  const items = data?.items || []

  if (style === 'ordered') return <OrderedList items={items} />
  return <UnorderedList items={items} />
}
