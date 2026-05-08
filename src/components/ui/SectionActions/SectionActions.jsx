import styles from './section-actions.module.css'

const ACTION_CLASS_BY_VARIANT = {
  link: styles.linkButton,
  primary: styles.button,
}

const SectionActions = ({ actions, className = '' }) => {
  const classes = [styles.actions, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {actions.map(({ label, onClick, variant = 'primary' }) => (
        <button
          className={ACTION_CLASS_BY_VARIANT[variant]}
          key={label}
          onClick={onClick}
          type='button'
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default SectionActions
