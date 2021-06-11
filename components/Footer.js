import { FaGithubSquare, FaFacebookSquare } from 'react-icons/fa'
import footerStyles from '../styles/Footer.module.css'

const Footer = () => {
  const iconSize = 36
  return (
    <footer className={footerStyles.footer}>
      <p>Copyright© {new Date().getFullYear()} Yingxuan Guo</p>
      <a href="https://github.com/ColeridgeGuo" target="_blank">
        <FaGithubSquare size={iconSize} />
      </a>
      <a href="https://www.facebook.com/ColeridgeGuo/" target="_blank">
        <FaFacebookSquare size={iconSize} />
      </a>
    </footer>
  )
}

export default Footer
