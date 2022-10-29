import styles from './Header.module.css'

export default function Header({data}: any) {
  if (data?.level === 1) {
    return <h1 className={`${styles.header}`}>{data?.text}</h1>
  }

  if (data?.level === 2) {
    return <h2 className={`${styles.header}`}>{data?.text}</h2>
  }

  if (data?.level === 3) {
    return <h3 className={`${styles.header}`}>{data?.text}</h3>
  }

  if (data?.level === 4) {
    return <h4 className={`${styles.header}`}>{data?.text}</h4>
  }

  if (data?.level === 5) {
    return <h5 className={`${styles.header}`}>{data?.text}</h5>
  }

  if (data?.level === 6) {
    return <h6 className={`${styles.header}`}>{data?.text}</h6>
  }

  return <p>Loading...</p>
}
