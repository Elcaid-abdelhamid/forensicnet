import styles from './ProbBar.module.css'

export default function ProbBar({ label, value, color, active = false }) {
  const pct = (value * 100).toFixed(1)

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span className={[styles.label, active ? styles.active : ''].join(' ')}>{label}</span>
        <span className={styles.value} style={{ color: active ? color : undefined }}>
          {pct}%
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{
            width: `${pct}%`,
            background: active ? color : 'var(--text-3)',
            boxShadow: active ? `0 0 8px ${color}60` : 'none',
          }}
        />
      </div>
    </div>
  )
}
