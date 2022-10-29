import styles from './Quote.module.css'

export default function Quote({data}: any) {
  const {text, caption, alignment} = data

  return <blockquote className={styles['otro-blockquote']}>
    <p>{text}</p>
  </blockquote>
}
