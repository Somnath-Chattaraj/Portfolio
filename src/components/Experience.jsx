import Image from "next/image";
import Section from "./Section";
import styles from "./Portfolio.module.css";
export default function Experience() {
  return (
    <Section
      id="experience"
      number="02"
      label="EXPERIENCE"
      title="Small details. Real impact."
    >
      <article className={styles.experience}>
        <div className={styles.roleMeta}>
          <span className={styles.companyMark} aria-hidden="true">
            <Image src="/brands/google-g.png" alt="" width={72} height={72} />
          </span>
          <h3>Google</h3>
          <p>Bengaluru, Karnataka</p>
          <p className={styles.date}>May — Aug 2026</p>
        </div>
        <div className={styles.roleContent}>
          <p className={styles.eyebrow}>SOFTWARE ENGINEERING INTERN</p>
          <h4>A smoother way to switch tasks.</h4>
          <p>
            Worked on Android Recents production systems with mentors, subject
            matter experts, and two cross-functional teams spanning framework
            and UI rendering.
          </p>
          <ul>
            <li>
              Implemented three task-switching interactions, including
              highlighted-task zoom and dynamic task-card scaling.
            </li>
            <li>
              Optimized rendering and animations, reducing dropped frames by 4%
              during task switching.
            </li>
            <li>
              Created 20+ test scenarios, debugged defects, documented design
              decisions, and incorporated 100+ code reviews before production
              rollout.
            </li>
          </ul>
          <div className={styles.impact}>
            <div>
              <strong>4%</strong>
              <span>fewer dropped frames</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>test scenarios</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>code reviews incorporated</span>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}
