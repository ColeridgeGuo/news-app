import axios from 'axios'
import articleStyles from '../../../styles/DetailNews.module.css'

const article = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.descp}</p>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await axios.get(
    `http://localhost:3000/api/guardian/article/${encodeURIComponent(id)}`
  )
  return {
    props: { article: res.data },
  }
}

export default article
