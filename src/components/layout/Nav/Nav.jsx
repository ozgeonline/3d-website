import { useState } from 'react'
import { NAV_ACTIONS, NAV_BRAND, NAV_LINKS } from './nav.data'
import styles from './nav.module.css'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen((currentMenuState) => !currentMenuState)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContent}>
        <a className={styles.brandLink} href='#top' aria-label={NAV_BRAND.label}>
          <img className={styles.brandIcon} src={NAV_BRAND.icon} alt=''/>
        </a>

        <ul className={styles.desktopLinks}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a className={styles.linkStyled} href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navActions}>
          {NAV_ACTIONS.map(({ label, icon }) => (
            <a className={styles.actionLink} href={`#${label.toLowerCase()}`} key={label} aria-label={label}>
              <img className={styles.actionIcon} src={icon} alt=''/>
            </a>
          ))}
          <button
            aria-expanded={isMenuOpen}
            aria-label='Open navigation menu'
            className={styles.menuButton}
            onClick={handleMenuToggle}
            type='button'
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ label, href }) => (
            <a className={styles.mobileMenuLink} href={href} key={label} onClick={handleMenuClose}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Nav
