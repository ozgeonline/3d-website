import styles from './sound-section.module.css'

const SoundSection = () => {

  const handleLearnMore = () => {
    const element = document.querySelector('.display-section')
    window.scrollTo({
      top: element?.getBoundingClientRect().bottom,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className={styles.soundSection}>
      <div className={styles.body}>
        <div className={styles.content}>
          <h2 className={styles.title}>New Sound System</h2>
          <p className={styles.headline}>Feel the bass.</p>
          <span className={styles.description}>
            From $49.95/mo. for 24mo. or $1199 before trade-in
          </span>
          <div className={styles.actions}>
            <button className={styles.button}>Buy</button>
            <button className={styles.linkButton} onClick={handleLearnMore} type='button'>Learn more</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoundSection
