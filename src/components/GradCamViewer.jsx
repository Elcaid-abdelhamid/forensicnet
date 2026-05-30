import { useState } from 'react'
import styles from './GradCamViewer.module.css'

const MODES = [
  { key: 'gradcam_original', label: 'Original' },
  { key: 'gradcam_heatmap',  label: 'GradCAM' },
  { key: 'gradcam_overlay',  label: 'Fusion' },
]

export default function GradCamViewer({ result }) {
  const [mode, setMode] = useState('gradcam_overlay')

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {MODES.map(m => (
          <button
            key={m.key}
            className={[styles.tab, mode === m.key ? styles.active : ''].join(' ')}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.canvas}>
        <img
          src={result[mode]}
          alt={MODES.find(m => m.key === mode)?.label}
          className={styles.img}
        />
        <span className={styles.badge}>
          {MODES.find(m => m.key === mode)?.label.toUpperCase()}
        </span>
      </div>

      <p className={styles.hint}>
        Régions activées par le backbone RGB (features[-1]) pour la décision
      </p>
    </div>
  )
}
