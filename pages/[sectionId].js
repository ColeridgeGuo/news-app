import axios from 'axios'
import ArticleItem from '../components/ArticleItem.js'
import articleStyles from '../styles/HomeNews.module.css'

export const sectionList = [
  'world',
  'politics',
  'business',
  'technology',
  'sports',
]

export default function Section({ articles }) {
  return (
    <div className={articleStyles.grid}>
      {articles.map(article => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </div>
  )
}

export const getStaticProps = async ({ params: { sectionId } }) => {
  const res = await axios.get(
    `http://localhost:3000/api/guardian/section/${sectionId}`
  )
  return { props: { articles: res.data.articles } }
}

export const getStaticPaths = async () => {
  return {
    paths: sectionList.map(sec => ({
      params: {
        sectionId: sec,
      },
    })),
    fallback: false,
  }
}
