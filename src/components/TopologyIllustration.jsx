import styles from "./Portfolio.module.css";

// Decorative geometry is rendered with the page; no WebGL context or client JS.
export default function TopologyIllustration() {
  return (
    <div className={styles.topology}>
      <svg
        className={styles.topologyMesh}
        viewBox="0 0 280 170"
        fill="none"
        stroke="currentColor"
        strokeWidth=".65"
        aria-hidden="true"
      >
        {Array.from({ length: 11 }, (_, i) => (
          <path key={`row-${i}`} d={`M25 ${35 + i * 8} Q140 ${i * 9 - 20} 255 ${80 + i * 6}`} />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`column-${i}`} d={`M${25 + i * 19} ${35 + i * 3} Q${60 + i * 13} 90 ${25 + i * 19} ${115 + i * 3}`} />
        ))}
      </svg>
      <p className={styles.canvasCaption}>01 / TOPOLOGICAL SURFACE</p>
    </div>
  );
}
