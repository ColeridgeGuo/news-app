import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

export const sectionList = [
  'world',
  'politics',
  'business',
  'technology',
  'sports',
]

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {
          // list out sections in the navbar
          sectionList.map(sec => (
            <li key={sec}>
              <Link href={`/${sec}`}>
                {sec.charAt(0).toUpperCase() + sec.substr(1).toLowerCase()}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav
