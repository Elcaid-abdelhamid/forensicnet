import CircleGauge from './CircleGauge'
import ProbBar from './ProbBar'
import GradCamViewer from './GradCamViewer'
import styles from './ResultPanel.module.css'

function Card({ children, className = '' }) {
  return <div className={[styles.card, className].join(' ')}>{children}</div>
}

function SectionLabel({ children }) {
  return <p className={styles.sectionLabel}>{children}</p>
}

export default function ResultPanel({ result }) {
  const isFake = result.label === 'FAKE'
  const mainColor = isFake ? 'var(--red)' : 'var(--green)'
  const bestTypeIdx = result.type_probabilities.reduce(
    (best, t, i, arr) => t.probability > arr[best].probability ? i : best, 0
  )

  return (
    <div className={styles.panel}>

      {/* ── Verdict card ── */}
      <Card className={styles.verdictCard}>
        <div className={styles.verdictTop}>
          <div className={styles.verdictBadge} style={{
            background: isFake ? 'var(--red-dim)' : 'var(--green-dim)',
            borderColor: isFake ? 'rgba(255,61,90,0.4)' : 'rgba(0,240,160,0.4)',
          }}>
            <span className={styles.verdictDot} style={{ background: mainColor, boxShadow: `0 0 6px ${mainColor}` }} />
            <span style={{ color: mainColor }}>{result.label}</span>
            {!result.model_loaded && (
              <span className={styles.demoBadge}>DÉMO</span>
            )}
          </div>
        </div>

        <div className={styles.gauges}>
          <CircleGauge value={result.fake_prob} label="Fake" color="var(--red)" />
          <div className={styles.divider} />
          <CircleGauge value={result.real_prob} label="Réel" color="var(--green)" />
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaChip}>
            <span className={styles.metaDot} />
            {result.inference_ms} ms
          </span>
          <span className={styles.metaChip}>
            <span className={styles.metaDot} style={{ background: result.model_loaded ? 'var(--green)' : 'var(--amber)' }} />
            {result.model_loaded ? 'Modèle chargé' : 'Mode démo'}
          </span>
        </div>
      </Card>

      {/* ── Two-col grid ── */}
      <div className={styles.grid2}>

        {/* Type classification */}
        <Card>
          <SectionLabel>Type de manipulation</SectionLabel>
          <div className={styles.typeHeader}>
            <span className={styles.typeName}>{result.predicted_type_short}</span>
            <span className={styles.typeFull}>{result.predicted_type}</span>
          </div>
          <div className={styles.bars}>
            {result.type_probabilities.map((t, i) => (
              <ProbBar
                key={t.label_short}
                label={t.label_short}
                value={t.probability}
                color="var(--cyan)"
                active={i === bestTypeIdx}
              />
            ))}
          </div>
        </Card>

        {/* Gate weights */}
        <Card>
          <SectionLabel>Fusion adaptative (gate α)</SectionLabel>
          <div className={styles.gateRow}>
            <div className={styles.gateSide} style={{ color: 'var(--violet)' }}>
              <span className={styles.gateVal}>{(result.gate_rgb * 100).toFixed(1)}%</span>
              <span className={styles.gateLabel}>RGB</span>
            </div>
            <div className={styles.gateBar}>
              <div className={styles.gateTrack}>
                <div
                  className={styles.gateFill}
                  style={{ width: `${result.gate_rgb * 100}%`, background: 'var(--violet)' }}
                />
              </div>
              <div className={styles.gateTrack} style={{ marginTop: 6 }}>
                <div
                  className={styles.gateFill}
                  style={{ width: `${result.gate_fft * 100}%`, background: 'var(--green)' }}
                />
              </div>
            </div>
            <div className={styles.gateSide} style={{ color: 'var(--green)' }}>
              <span className={styles.gateVal}>{(result.gate_fft * 100).toFixed(1)}%</span>
              <span className={styles.gateLabel}>FFT</span>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <SectionLabel>Auxiliaire FFT</SectionLabel>
            <ProbBar
              label="P(Fake) — branch FFT seule"
              value={result.fft_fake_prob}
              color="var(--red)"
              active
            />
          </div>
        </Card>
      </div>

      {/* ── GradCAM ── */}
      <Card>
        <SectionLabel>Carte d'activation — GradCAM</SectionLabel>
        <GradCamViewer result={result} />
      </Card>
    </div>
  )
}
