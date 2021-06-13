import Link from 'next/link'
import styles from '../styles/HomeNews.module.css'

const ArticleItem = ({ article }) => {
  return (
    <Link
      href="/article/[id]"
      as={`/article/${encodeURIComponent(article.id)}`}
    >
      <a className={styles.card}>
        <div>
          <img
            src={article.image}
            alt="News image"
            className={styles.image}
          ></img>
        </div>
        <div className={styles.content}>
          <div>
            <h3 className={styles.title}>{article.title}</h3>
            <p className={styles.descp}>{article.descp}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.date}>{article.date}</p>
            <p className={styles.section}>{article.sectionId}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ArticleItem
