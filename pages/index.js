import axios from 'axios'
import ArticleItem from '../components/ArticleItem.js'
import articleStyles from '../styles/HomeNews.module.css'

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
  const res = await axios.get(`http://localhost:3000/api/guardian`)
  return {
    props: { articles: res.data.articles },
  }
}
