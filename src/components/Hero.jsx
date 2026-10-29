import { profile } from "@/data/portfolio";
import Arrow from "./Arrow";
import TopologyCanvas from "./TopologyCanvas";
import styles from "./Portfolio.module.css";
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroMain}>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} /> SOFTWARE ENGINEER · KOLKATA,
          INDIA
        </p>
        <h1 id="hero-title">
          Thoughtful interfaces.
          <br />
          <span>Dependable systems.</span>
        </h1>
        <p className={styles.heroIntro}>
          I’m Somnath. I build software with care — from the details of an
          Android interaction to the systems working behind it.
        </p>
        <div className={styles.actions}>
          <a href="#work" className={styles.primaryButton}>
            Explore my work <Arrow direction="down" />
          </a>
          <a
            href={profile.resume}
            download="Somnath-Chattaraj-Resume.pdf"
            className={styles.textLink}
          >
            Download resume <Arrow />
          </a>
        </div>
        <div className={styles.socials}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow />
          </a>
          <a href={`mailto:${profile.email}`}>
            Email <Arrow />
          </a>
        </div>
      </div>
      <aside className={styles.heroAside} aria-label="Engineering focus">
        <div className={styles.asideTop}>
          <span className={styles.eyebrow}>THE ENGINEERING APPROACH</span>
          <span className={styles.smallIndex}>SC / 01</span>
        </div>
        <TopologyCanvas />
        <p>
          Good software feels simple.
          <br />
          The engineering makes it possible.
        </p>
        <div className={styles.asideBottom}>
          <span>PREVIOUSLY AT</span>
          <strong>
            Google <Arrow />
          </strong>
        </div>
      </aside>
      <div className={styles.heroFoot}>
        <span>Information Technology · Jadavpur University</span>
        <span>
          Building across product & infrastructure{" "}
          <span aria-hidden="true">↘</span>
        </span>
      </div>
    </section>
  );
}
