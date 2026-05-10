import SectionActions from '@/components/ui/SectionActions'
import { scrollToSection } from '@/utils/scrollToSection'
import styles from './sound-section.module.css'

const SoundSection = () => {

  const handleLearnMore = () => {
    scrollToSection('.display-section')
  }

  const actions = [
    { label: 'Buy' },
    { label: 'Learn more', onClick: handleLearnMore, variant: 'link' },
  ]

  return (
    <section className={`${styles.soundSection} sound-section`}>
      <div className={styles.body}>
        <div className={`${styles.content} sound-section-content`}>
          <h2 className={styles.title}>New Sound System</h2>
          <p className={styles.headline}>Feel the bass.</p>
          <span className={styles.description}>
            From $49.95/mo. for 24mo. or $1199 before trade-in
          </span>
          <SectionActions actions={actions} />
        </div>
      </div>
    </section>
  )
}

export default SoundSection
