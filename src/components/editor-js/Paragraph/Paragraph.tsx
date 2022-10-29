import styles from './Paragraph.module.css'

export default function Paragraph({data}: any) {
  return <p className={styles.paragraph}>{data?.text || ''}</p>
}
