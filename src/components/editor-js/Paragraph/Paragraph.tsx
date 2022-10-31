import styles from './Paragraph.module.css'

export default function Paragraph({data}: any) {
  const text = data?.text?.replace(/&lt;/g, '<') || ''

  return <p dangerouslySetInnerHTML={{__html: text}} className={styles.paragraph}></p>
}
