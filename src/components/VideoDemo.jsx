"use client";
import { useRef, useState } from "react";
import styles from "./Portfolio.module.css";
export default function VideoDemo() {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  function close() {
    dialogRef.current.close();
    setPlaying(false);
    triggerRef.current?.focus();
  }
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.videoTrigger}
        onClick={() => {
          setPlaying(true);
          dialogRef.current.showModal();
        }}
        aria-haspopup="dialog"
      >
        <span className={styles.playIcon} aria-hidden="true">
          ▶
        </span>
        <span className={styles.videoLabel}>
          Watch the system in action <span>Open video preview ↗</span>
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.videoDialog}
        aria-labelledby="video-title"
        onCancel={() => setPlaying(false)}
        onClose={() => {
          setPlaying(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className={styles.dialogHeader}>
          <h3 id="video-title">AutoFlow — demo walkthrough</h3>
          <button
            type="button"
            onClick={close}
            autoFocus
            aria-label="Close video preview"
          >
            Close ×
          </button>
        </div>
        {playing && (
          <iframe
            src="https://www.youtube-nocookie.com/embed/30KZ1txxvWY?autoplay=1"
            title="AutoFlow workflow automation demo"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <p>
          Prefer a separate tab?{" "}
          <a
            href="https://youtu.be/30KZ1txxvWY"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube ↗
          </a>
        </p>
      </dialog>
    </>
  );
}
