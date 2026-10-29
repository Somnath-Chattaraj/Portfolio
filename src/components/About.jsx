import { skills } from "@/data/portfolio";
import Arrow from "./Arrow";
import Section from "./Section";
import styles from "./Portfolio.module.css";
export default function About() {
  return (
    <>
      <Section
        id="about"
        number="03"
        label="TOOLKIT & PERSPECTIVE"
        title="Curiosity, backed by craft."
        description="My work spans frontend interactions, backend architecture, and the practices that keep software dependable."
      >
        <div className={styles.skills}>
          {skills.map((group, index) => (
            <div className={styles.skillGroup} key={group.title}>
              <span className={styles.smallIndex}>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="education"
        number="04"
        label="FOUNDATIONS"
        title="Learning. Building. Iterating."
      >
        <div className={styles.foundations}>
          <article className={styles.education}>
            <p className={styles.eyebrow}>EDUCATION</p>
            <h3>Jadavpur University</h3>
            <p className={styles.degree}>B.E. in Information Technology</p>
            <p>
              Kolkata, West Bengal
              <br />
              Aug 2023 — Expected Jun 2027
            </p>
            <h4>Relevant coursework</h4>
            <p>
              Computer Science Fundamentals, Data Structures & Algorithms,
              Distributed Systems, Operating Systems, DBMS
            </p>
          </article>
          <article className={styles.achievements}>
            <p className={styles.eyebrow}>BEYOND THE CLASSROOM</p>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <h3>Codeforces Specialist</h3>
                  <p>700+ algorithmic problems solved on LeetCode.</p>
                  <div className={styles.inlineLinks}>
                    <a
                      href="https://codeforces.com/profile/somnath910"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Codeforces <Arrow />
                    </a>
                    <a
                      href="https://leetcode.com/u/Somnath160/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LeetCode <Arrow />
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>16th nationally · 143rd globally</h3>
                  <p>IMC Trading Prosperity 4.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Top 8 of 400+ teams</h3>
                  <p>East India Blockchain Summit Hackathon, IIT Kharagpur.</p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </Section>
    </>
  );
}
