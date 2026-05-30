import { useState, useCallback } from 'react'
import Header from './components/Header'
import UploadZone from './components/UploadZone'
import ResultPanel from './components/ResultPanel'
import ArchCards from './components/ArchCards'
import { usePredict } from './hooks/usePredict'
import styles from './App.module.css'

export default function App() {
  const { result, loading, error, predict, reset } = usePredict()
  const [preview, setPreview] = useState(null)

  const handleFile = useCallback((file) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    predict(file)
  }, [predict])

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    reset()
  }, [preview, reset])

  const hasResult = !!result
  const hasContent = loading || hasResult

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Détection de<br />
            <span className={styles.titleAccent}>deepfakes</span>
          </h1>
          <p className={styles.subtitle}>
            Fusion RGB + FFT par cross-attention — localisation des manipulations par GradCAM
          </p>
        </div>

        <div className={[styles.workspace, hasContent ? styles.split : ''].join(' ')}>
          {/* Left column */}
          <div className={styles.left}>
            <UploadZone onFile={handleFile} loading={loading} disabled={loading} />

            {preview && !loading && (
              <div className={styles.previewWrap}>
                <img src={preview} alt="Aperçu" className={styles.preview} />
                {result && (
                  <span
                    className={styles.previewBadge}
                    style={{
                      background: result.label === 'FAKE' ? 'var(--red-dim)' : 'var(--green-dim)',
                      border: `1px solid ${result.label === 'FAKE' ? 'rgba(255,61,90,0.4)' : 'rgba(0,240,160,0.4)'}`,
                      color: result.label === 'FAKE' ? 'var(--red)' : 'var(--green)',
                    }}
                  >{result.label}</span>
                )}
                <button className={styles.resetBtn} onClick={handleReset} title="Réinitialiser">
                  ×
                </button>
              </div>
            )}

            {error && (
              <div className={styles.errorBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Tech chips */}
            <div className={styles.chips}>
              {['RGB Branch','FFT Branch','Cross-Attention','Channel Att.','GradCAM','Multi-Class'].map(c => (
                <span key={c} className={styles.chip}>{c}</span>
              ))}
            </div>
          </div>

          {/* Right column */}
          {hasContent && (
            <div className={styles.right}>
              {loading && (
                <div className={styles.loadingCard}>
                  <div className={styles.loadingSpinner} />
                  <p className={styles.loadingText}>Inférence…</p>
                  <p className={styles.loadingHint}>Extraction RGB + FFT + GradCAM</p>
                </div>
              )}
              {result && <ResultPanel result={result} />}
            </div>
          )}
        </div>

        {!hasContent && <ArchCards />}
      </main>

      <footer className={styles.footer}>
        ForensicNetV2 — PFE — RGB + FFT Cross-Attention Fusion Deepfake Detection
      </footer>
    </>
  )
}
