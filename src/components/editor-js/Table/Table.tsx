import TableRow from './TableRow'
import styles from './Table.module.css'

export default function Table({data}: any) {
  const withHeadings = data?.withHeadings || false
  let contents = data?.content || []

  let headings = []
  if (withHeadings) {
    headings = contents.slice(0, 1)
    contents = contents.slice(1)
  }

  return <table className={styles.table}>
    <thead>
      {headings.map((items, index) => {
        return <TableRow key={index} items={items} />
      })}
    </thead>
    <tbody>
      {contents.map((items, index) => {
        return <TableRow key={index} items={items} />
      })}
    </tbody>
  </table>
}
