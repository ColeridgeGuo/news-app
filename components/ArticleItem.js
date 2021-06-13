import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

const ArticleItem = ({ article }) => {
  return (
    <Link
      href="/article/[id]"
      as={`/article/${encodeURIComponent(article.id)}`}
    >
      <a className={articleStyles.card}>
        <div>
          <img src={article.image} alt="" className={articleStyles.image}></img>
        </div>
        <div className={articleStyles.content}>
          <div>
            <h3 className={articleStyles.title}>{article.title}</h3>
            <p className={articleStyles.descp}>{article.descp}</p>
          </div>
          <div className={articleStyles.info}>
            <p className={articleStyles.date}>{article.date}</p>
            <p className={articleStyles.section}>{article.sectionId}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ArticleItem
