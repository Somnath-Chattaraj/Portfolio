"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.module.css";

// Three.js loads only once this illustration intersects the viewport.
// Motion responds to input and stops when the damped target settles.
export default function TopologyCanvas() {
  const hostRef = useRef(null);
  const pauseRef = useRef(false);
  const wakeRef = useRef(() => {});
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let teardown = () => {};
    let started = false;
    async function initialize() {
      const THREE = await import("three");
      if (disposed) return;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
          powerPreference: "low-power",
        });
      } catch {
        return;
      } // The CSS fallback remains visible without WebGL.
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
      camera.position.set(0, 0, 6.2);
      const plane = new THREE.PlaneGeometry(3.8, 2.8, 22, 16);
      const positions = plane.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i),
          y = positions.getY(i);
        positions.setZ(
          i,
          0.28 * Math.sin(x * 1.7) * Math.cos(y * 1.5) + 0.16 * x * y,
        );
      }
      const geometry = new THREE.WireframeGeometry(plane);
      plane.dispose();
      const material = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.6,
      });
      const surface = new THREE.LineSegments(geometry, material);
      surface.rotation.set(-0.72, 0.12, -0.35);
      scene.add(surface);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);
      host.dataset.ready = "true";
      let frame = 0,
        visible = true,
        last = 0;
      let targetX = -0.72,
        targetY = 0.12;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      function draw() {
        renderer.render(scene, camera);
      }
      function tick(now) {
        frame = 0;
        if (
          disposed ||
          !visible ||
          document.hidden ||
          pauseRef.current ||
          motion.matches
        )
          return;
        if (now - last < 1000 / 60) {
          frame = requestAnimationFrame(tick);
          return;
        }
        const dt = Math.min((now - last) / 1000 || 1 / 60, 0.05);
        last = now;
        const damping = 1 - Math.exp(-8 * dt);
        surface.rotation.x += (targetX - surface.rotation.x) * damping;
        surface.rotation.y += (targetY - surface.rotation.y) * damping;
        draw();
        if (
          Math.abs(targetX - surface.rotation.x) +
            Math.abs(targetY - surface.rotation.y) >
          0.0002
        )
          frame = requestAnimationFrame(tick);
      }
      function wake() {
        if (
          !frame &&
          visible &&
          !document.hidden &&
          !pauseRef.current &&
          !motion.matches
        ) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        }
      }
      wakeRef.current = wake;
      function resize() {
        const { width, height } = host.getBoundingClientRect();
        if (width < 1 || height < 1) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        draw();
      }
      function colors() {
        const css = getComputedStyle(document.documentElement);
        material.color.set(css.getPropertyValue("--mesh").trim());
        renderer.setClearColor(css.getPropertyValue("--panel").trim(), 1);
        draw();
      }
      function pointer(event) {
        const rect = host.getBoundingClientRect();
        targetY =
          0.12 + ((event.clientX - rect.left) / rect.width - 0.5) * 0.24;
        targetX =
          -0.72 + ((event.clientY - rect.top) / rect.height - 0.5) * 0.16;
        wake();
      }
      function leave() {
        targetX = -0.72;
        targetY = 0.12;
        wake();
      }
      function scroll() {
        if (!visible) return;
        const rect = host.getBoundingClientRect();
        targetX =
          -0.72 + Math.max(-1, Math.min(1, rect.top / innerHeight)) * 0.08;
        wake();
      }
      function visibility() {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else wake();
      }
      function reducedMotion() {
        cancelAnimationFrame(frame);
        frame = 0;
        if (motion.matches) {
          surface.rotation.set(-0.72, 0.12, -0.35);
          draw();
        } else wake();
      }
      function contextLost(event) {
        event.preventDefault();
        cancelAnimationFrame(frame);
        frame = 0;
        host.dataset.ready = "false";
      }
      function contextRestored() {
        host.dataset.ready = "true";
        colors();
        resize();
        wake();
      }
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          draw();
          wake();
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      });
      intersection.observe(host);
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const themeObserver = new MutationObserver(colors);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      host.addEventListener("pointermove", pointer);
      host.addEventListener("pointerleave", leave);
      window.addEventListener("scroll", scroll, { passive: true });
      document.addEventListener("visibilitychange", visibility);
      motion.addEventListener("change", reducedMotion);
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      renderer.domElement.addEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      colors();
      resize();
      teardown = () => {
        cancelAnimationFrame(frame);
        intersection.disconnect();
        resizeObserver.disconnect();
        themeObserver.disconnect();
        host.removeEventListener("pointermove", pointer);
        host.removeEventListener("pointerleave", leave);
        window.removeEventListener("scroll", scroll);
        document.removeEventListener("visibilitychange", visibility);
        motion.removeEventListener("change", reducedMotion);
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          contextLost,
        );
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          contextRestored,
        );
        geometry.dispose();
        material.dispose();
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        delete host.dataset.ready;
        wakeRef.current = () => {};
      };
    }
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        loadObserver.disconnect();
        initialize().catch(() => {});
      }
    });
    loadObserver.observe(host);
    return () => {
      disposed = true;
      loadObserver.disconnect();
      teardown();
    };
  }, []);
  return (
    <div className={styles.topology}>
      <div ref={hostRef} className={styles.canvasHost} aria-hidden="true">
        <svg
          className={styles.meshFallback}
          viewBox="0 0 280 170"
          fill="none"
          stroke="currentColor"
          strokeWidth=".65"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={i}
              d={`M25 ${35 + i * 8} Q140 ${i * 9 - 20} 255 ${80 + i * 6}`}
            />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <path
              key={i}
              d={`M${25 + i * 19} ${35 + i * 3} Q${60 + i * 13} 90 ${25 + i * 19} ${115 + i * 3}`}
            />
          ))}
        </svg>
      </div>
      <div className={styles.canvasCaption}>
        <span>01 / TOPOLOGICAL SURFACE</span>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => {
            pauseRef.current = !paused;
            setPaused(!paused);
            if (paused) wakeRef.current();
          }}
        >
          {paused ? "Enable motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
