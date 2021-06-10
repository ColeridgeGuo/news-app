import ArticleItem from '../components/ArticleItem.js'
import articleStyles from '../styles/Article.module.css'

export default function Home({ articles }) {
  return (
    <div className={articleStyles.grid}>
      {articles.map(article => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:5000/guardian`)
  const articles = await res.json()
  return {
    props: { articles: articles.articles },
  }
}
