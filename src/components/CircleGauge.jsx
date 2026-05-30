import styles from './CircleGauge.module.css'

export default function CircleGauge({ value, label, color, size = 120 }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const filled = circ * Math.min(1, Math.max(0, value))

  return (
    <div className={styles.wrap}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x="50" y="55" textAnchor="middle"
          style={{
            fill: 'var(--text-0)',
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
          }}>
          {Math.round(value * 100)}%
        </text>
      </svg>
      <span className={styles.label} style={{ color }}>
        {label}
      </span>
    </div>
  )
}
