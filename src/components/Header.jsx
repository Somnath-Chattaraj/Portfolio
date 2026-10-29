import { profile } from "@/data/portfolio";
import Arrow from "./Arrow";
import ThemeToggle from "./ThemeToggle";
import styles from "./Portfolio.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <a
        className={styles.wordmark}
        href="#top"
        aria-label="Somnath Chattaraj, home"
      >
        <span className={styles.monogram}>
          sc<span>.</span>
        </span>
        <span>Somnath Chattaraj</span>
      </a>
      <nav aria-label="Main navigation" className={styles.nav}>
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a className={styles.navContact} href={`mailto:${profile.email}`}>
          Let’s talk <Arrow />
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
