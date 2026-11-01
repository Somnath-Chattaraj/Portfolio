import ProjectThumbnail from "./ProjectThumbnail";
import { projects } from "@/data/portfolio";
import Arrow from "./Arrow";
import Section from "./Section";
import VideoDemo from "./VideoDemo";
import styles from "./Portfolio.module.css";
export default function Projects() {
  return (
    <Section
      id="work"
      number="01"
      label="SELECTED SYSTEMS"
      title="The engineering behind the interface."
      description="Six projects, explored from source: the data models, execution paths, and trade-offs that shape them."
    >
      <div className={styles.projects}>
        {projects.map((project) => (
          <article key={project.id} className={styles.project}>
            <div className={`${styles.projectVisual} ${styles[project.tone]}`}>
              <div className={styles.visualTop}>
                <span>{project.kind}</span>
                <span>{project.id} / {String(projects.length).padStart(2, "0")}</span>
              </div>
              {project.image ? (
                <figure className={styles.projectFigure}>
                  <div className={styles.browserChrome} aria-hidden="true">
                    <span>● ● ●</span>
                    <span>{project.mediaLabel}</span>
                  </div>
                  <ProjectThumbnail
                    src={project.image}
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                  />
                  <figcaption>{project.capture}</figcaption>
                </figure>
              ) : project.video ? (
                <VideoDemo />
              ) : (
                <div
                  className={styles.flow}
                  aria-label={`Architecture: ${project.flow.join(" to ")}`}
                >
                  {project.flow.map((step, i) => (
                    <div className={styles.flowStep} key={step}>
                      <span className={styles.flowNumber}>0{i + 1}</span>
                      <span>{step}</span>
                      {i < project.flow.length - 1 && (
                        <span className={styles.flowArrow} aria-hidden="true">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {project.video && project.image && <VideoDemo />}
              <div className={styles.visualBottom}>
                <strong>{project.metric}</strong>
                <span>{project.qualifier}</span>
              </div>
            </div>
            <div className={styles.projectContent}>
              <p className={styles.eyebrow}>PROJECT {project.id}</p>
              <h3>{project.title}</h3>
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
              <p className={styles.projectSummary}><strong>{project.kind}.</strong> {project.summary}</p>
              <p className={styles.projectDetail}>{project.detail}</p>
              <ul className={styles.tags} aria-label="Technologies">
                {project.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <details className={styles.architecture}>
                <summary>
                  Architecture & trade-offs<span aria-hidden="true">+</span>
                </summary>
                <div>
                  <ul>
                    {project.architecture.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Design boundary.</strong> {project.tradeoff}
                  </p>
                  <div className={styles.evidenceLinks}>
                    {project.evidence.map((e) => (
                      <a
                        key={e.url}
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {e.label} <Arrow />
                      </a>
                    ))}
                  </div>
                </div>
              </details>
              <div className={styles.projectLinks}>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source <Arrow />
                  <span className="sr-only"> for {project.title}</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.demoLabel} <Arrow />
                    <span className="sr-only"> for {project.title}</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
