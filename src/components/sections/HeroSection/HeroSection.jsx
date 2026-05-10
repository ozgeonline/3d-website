import HoldingIphone from '@/assets/images/iphone-hand.png'
import SectionActions from '@/components/ui/SectionActions'
import { scrollToSection } from '@/utils/scrollToSection'
import styles from './hero-section.module.css'

const HeroSection = () => {

  const handleLearnMore = () => {
    scrollToSection('.sound-section')
  }

  const actions = [
    { label: 'Buy' },
    { label: 'Learn more', onClick: handleLearnMore, variant: 'link' },
  ]

  return (
    <section className={`${styles.heroSection} hero-section`}>
      <h2 className={styles.title}>New</h2>
      <h1 className={styles.productName}>iPhone 17 Pro</h1>
      <p className={styles.headline}>Big and bigger.</p>
      <span className={styles.description}>
        From $49.95/mo. for 24mo. or $1199 before trade-in
      </span>
      <SectionActions actions={actions} />
      <img className={styles.phoneImage} src={HoldingIphone} alt='iPhone' />
    </section>
  )
}

export default HeroSection
