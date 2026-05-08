import SectionActions from '@/components/ui/SectionActions'
import styles from './display-section.module.css'

const DisplaySection = ({ triggerPreview }) => {
  const actions = [
    { label: 'Try me!', onClick: triggerPreview },
  ]

  return (
    <section className={styles.displaySection}>
      <h2 className={styles.title}>New</h2>
      <p className={styles.headline}>Brilliant.</p>
      <span className={styles.description}>A display that's up to 2x brighter in the sun.</span>
      <SectionActions actions={actions} className={styles.actions} />
    </section>
  )
}

export default DisplaySection
