import AnimatedLogo from '@/assets/images/logo-animated.gif'
import styles from './loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.logo} src={AnimatedLogo} alt='iphone logo' />
    </div>
  )
}

export default Loader
