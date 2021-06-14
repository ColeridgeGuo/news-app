import axios from 'axios'
import { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import styles from '../../../styles/DetailNews.module.css'

const article = ({ article }) => {
  const longDescp = article.descp.length > 1000
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{article.title}</p>
      <div className={styles.info}>
        <p>{article.date}</p>
        <p>Icons</p>
      </div>
      <img src={article.image} alt="News image" className={styles.image}></img>
      <p className={`${styles.descp} ${!open ? styles.close : ''}`}>
        {article.descp}
      </p>
      {longDescp && (
        <IoIosArrowUp
          className={`${styles.arrow} ${!open ? styles.close : ''}`}
          onClick={toggleOpen}
        />
      )}
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
