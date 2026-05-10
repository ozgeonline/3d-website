import styles from './scroll-top-button.module.css'

const ScrollTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label='Scroll to top'
      className={styles.button}
      onClick={handleScrollToTop}
      type='button'
    >
      Top
    </button>
  )
}

export default ScrollTopButton
