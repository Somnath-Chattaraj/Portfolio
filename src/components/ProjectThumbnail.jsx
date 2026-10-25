import Image from "next/image";
import styles from "./Portfolio.module.css";

export default function ProjectThumbnail({ src, alt, width, height }) {
  return (
    <div className={styles.thumbnailSurface}>
      <Image
        className={styles.projectShot}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 90vw, 480px"
      />
    </div>
  );
}
