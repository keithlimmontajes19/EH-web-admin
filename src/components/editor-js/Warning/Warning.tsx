import styles from './Warning.module.css'

export default function Warning({data}: any) {
  return <div className={styles.warning}>
    <p><strong>{data?.title || ''}</strong></p>
    <p>{data?.message || ''}</p>
  </div>
}
