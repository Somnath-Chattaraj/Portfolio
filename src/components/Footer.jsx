import { profile } from "@/data/portfolio";
import Arrow from "./Arrow";
import styles from "./Portfolio.module.css";
export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.contact}>
        <p className={styles.eyebrow}>HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s build something
          <br />
          <span>worth the details.</span>
        </h2>
        <a className={styles.emailLink} href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow />
        </a>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Somnath Chattaraj</span>
        <span>Made with intention.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
