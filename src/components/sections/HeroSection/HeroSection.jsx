import HoldingIphone from '@/assets/images/iphone-hand.png'
import styles from './hero-section.module.css'

const HeroSection = () => {

  const handleLearnMore = () => {
    const element = document.querySelector(".sound-section")
    window.scrollTo({
      top: element?.getBoundingClientRect().top, //elementin top mesafesi hesaplama
      left: 0,
      behavior: "smooth"
    })

  }

  return (
    <section className={styles.heroSection}>
      <h2 className={styles.title}>New</h2>
      <h1 className={styles.productName}>iPhone 17 Pro</h1>
      <p className={styles.headline}>Big and bigger.</p>
      <span className={styles.description}>
        From $49.95/mo. for 24mo. or $1199 before trade-in
      </span>
      <div className={styles.actions}>
        <button className={styles.button}>
          Buy
        </button>
        <button
          className={styles.linkButton}
          onClick={handleLearnMore}
          type='button'>
          Learn more
        </button>
      </div>
      <img className={styles.phoneImage} src={HoldingIphone} alt='iPhone' />
    </section>
  )
}

export default HeroSection
