import Head from 'next/head'
import Nav from './Nav'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>News App</title>
        <meta name="description" content="News App using React and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {children}
    </div>
  )
}

export default Layout
