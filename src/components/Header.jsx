import styles from './Header.module.css'

const TAGS = ['EfficientNet-B4', 'Cross-Attention', 'FFT Fusion', 'GradCAM']

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="var(--cyan)" strokeWidth="1.8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <span className={styles.name}>ForensicNet<span className={styles.v}>V2</span></span>
      </div>

      <div className={styles.tags}>
        {TAGS.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
    </header>
  )
}
