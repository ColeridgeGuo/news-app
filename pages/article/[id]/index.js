import axios from 'axios'
import { useState, useRef, forwardRef } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from '../../../styles/DetailNews.module.css'

const article = ({ article }) => {
  const longDescp = article.descp.length > 1000
  const [expand, setExpand] = useState(false)
  const toggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{article.title}</p>
      <div className={styles.info}>
        <p>{article.date}</p>
        <p>Icons</p>
      </div>
      <img src={article.image} alt="News image" className={styles.image}></img>
      {!longDescp && <p className={styles.descp}>{article.descp}</p>}
      {longDescp && (
        <>
          <p className={`${styles.descp} ${!expand ? styles.collapse : ''}`}>
            {article.descp}
          </p>
          {expand ? (
            <IoIosArrowUp
              className={styles.expand_arrow}
              onClick={toggleExpand}
            />
          ) : (
            <IoIosArrowDown
              className={styles.expand_arrow}
              onClick={toggleExpand}
            />
          )}
        </>
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
