import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { BounceLoader } from 'react-spinners'
import styles from '../styles/Layout.module.css'
import Nav from './Nav'

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>News App</title>
        <meta name="description" content="News App using React and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {loading && (
        <div className={styles.spinner}>
          <BounceLoader />
        </div>
      )}
      {!loading && children}
      <footer className={styles.footer}>Copyright 2021 Yingxuan Guo</footer>
    </div>
  )
}

export default Layout
