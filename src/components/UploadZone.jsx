import { useState, useRef, useCallback } from 'react'
import styles from './UploadZone.module.css'

export default function UploadZone({ onFile, loading, disabled }) {
  const [drag, setDrag] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) onFile(file)
  }, [onFile])

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) onFile(file)
    e.target.value = ''
  }

  return (
    <div
      className={[
        styles.zone,
        drag ? styles.dragging : '',
        loading ? styles.loading : '',
      ].join(' ')}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !loading && !disabled && inputRef.current?.click()}
    >
      {loading && <div className={styles.scanLine} />}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={handleChange}
      />

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p className={styles.loadingTitle}>Analyse en cours…</p>
          <p className={styles.loadingSubtitle}>RGB + FFT + GradCAM</p>
        </div>
      ) : (
        <div className={styles.idleState}>
          <div className={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="var(--cyan)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <p className={styles.title}>Déposer une image</p>
          <p className={styles.subtitle}>ou cliquer pour parcourir — JPG · PNG · BMP · TIFF</p>
        </div>
      )}
    </div>
  )
}
