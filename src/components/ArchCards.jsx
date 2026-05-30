import styles from './ArchCards.module.css'

const CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Branche RGB',
    desc: 'EfficientNet-B4 + Channel Attention sur le signal visuel brut',
    color: 'var(--cyan)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12h20M12 2v20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/>
      </svg>
    ),
    title: 'Branche FFT',
    desc: 'Spectre fréquentiel log-magnitude analysé par EfficientNet-B4',
    color: 'var(--violet)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/>
      </svg>
    ),
    title: 'Cross-Attention',
    desc: 'Fusion bidirectionnelle avec gate adaptatif α appris',
    color: 'var(--green)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="m4.93 4.93 14.14 14.14"/>
      </svg>
    ),
    title: 'GradCAM',
    desc: 'Localisation des régions manipulées via gradients sur features[-1]',
    color: 'var(--red)',
  },
]

export default function ArchCards() {
  return (
    <div className={styles.grid}>
      {CARDS.map(c => (
        <div key={c.title} className={styles.card}>
          <span className={styles.icon} style={{ color: c.color, background: `${c.color}14` }}>
            {c.icon}
          </span>
          <p className={styles.title}>{c.title}</p>
          <p className={styles.desc}>{c.desc}</p>
        </div>
      ))}
    </div>
  )
}
