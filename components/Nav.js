import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/world">World</Link>
        </li>
        <li>
          <Link href="/politics">Politics</Link>
        </li>
        <li>
          <Link href="/business">Business</Link>
        </li>
        <li>
          <Link href="/techonology">Technology</Link>
        </li>
        <li>
          <Link href="/sports">Sports</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
