import styles from "./Portfolio.module.css";
export default function Section({
  id,
  number,
  label,
  title,
  description,
  children,
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>
            <span>{number}</span> {label}
          </p>
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        {description && (
          <p className={styles.sectionDescription}>{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
