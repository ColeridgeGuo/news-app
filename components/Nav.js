import Link from 'next/link'
import { sectionList } from '../pages/[sectionId].js'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        {
          // list out sections in the navbar
          ['', ...sectionList].map(sec => (
            <li key={sec}>
              <Link href={`/${sec}`}>
                {sec.charAt(0).toUpperCase() + sec.substr(1).toLowerCase() ||
                  'Home'}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav
