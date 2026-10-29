"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";

// Keep the image as the accessible, zero-JS baseline. Allocate a WebGL
// surface only during a fine-pointer hover, then release it after settling.
export default function HoverThumbnail({ src, alt, width, height }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false,
      hovering = false,
      loading = false;
    let runtime = null;
    let pointerX = 0,
      pointerY = 0;
    function release() {
      runtime?.dispose();
      runtime = null;
      delete host.dataset.hoverReady;
    }
    async function initialize() {
      if (runtime || loading || disposed || motion.matches) return;
      loading = true;
      let texture = null,
        renderer = null;
      try {
        const THREE = await import("three");
        if (disposed || !hovering || motion.matches) return;
        const image = host.querySelector("img");
        texture = await new THREE.TextureLoader().loadAsync(
          image.currentSrc || src,
        );
        if (disposed || !hovering || motion.matches) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        texture.anisotropy = Math.min(
          renderer.capabilities.getMaxAnisotropy(),
          4,
        );
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 20);
        camera.position.z = 5;
        const planeHeight = 2 * Math.tan(THREE.MathUtils.degToRad(35 / 2)) * 5;
        const geometry = new THREE.PlaneGeometry(
          (planeHeight * width) / height,
          planeHeight,
        );
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.className = styles.thumbnailCanvas;
        host.appendChild(renderer.domElement);
        let frame = 0,
          last = 0,
          scale = 1;
        function draw() {
          renderer.render(scene, camera);
        }
        function resize() {
          const rect = host.getBoundingClientRect();
          renderer.setSize(rect.width, rect.height, false);
          renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          draw();
        }
        function tick(now) {
          frame = 0;
          if (disposed || document.hidden || motion.matches) {
            release();
            return;
          }
          if (now - last < 1000 / 60 - 0.5) {
            frame = requestAnimationFrame(tick);
            return;
          }
          const dt = Math.min((now - last) / 1000 || 1 / 60, 0.05);
          last = now;
          const damping = 1 - Math.exp(-22 * dt);
          const targetX = hovering ? -pointerY * 0.055 : 0;
          const targetY = hovering ? pointerX * 0.065 : 0;
          const targetScale = hovering ? 0.965 : 1;
          plane.rotation.x += (targetX - plane.rotation.x) * damping;
          plane.rotation.y += (targetY - plane.rotation.y) * damping;
          scale += (targetScale - scale) * damping;
          plane.scale.setScalar(scale);
          draw();
          const unsettled =
            Math.abs(targetX - plane.rotation.x) +
              Math.abs(targetY - plane.rotation.y) +
              Math.abs(targetScale - scale) >
            0.00015;
          if (unsettled) frame = requestAnimationFrame(tick);
          else if (!hovering) release();
        }
        function wake() {
          if (!frame) {
            last = performance.now();
            frame = requestAnimationFrame(tick);
          }
        }
        function lost(event) {
          event.preventDefault();
          release();
        }
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        renderer.domElement.addEventListener("webglcontextlost", lost);
        runtime = {
          wake,
          dispose() {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            renderer.domElement.removeEventListener("webglcontextlost", lost);
            geometry.dispose();
            material.dispose();
            texture.dispose();
            scene.clear();
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
          },
        };
        resize();
        host.dataset.hoverReady = "true";
        wake();
      } catch {
        texture?.dispose();
        renderer?.dispose();
        renderer?.domElement.remove();
        // A failed or unavailable context leaves the original image intact.
      } finally {
        loading = false;
      }
    }
    function enter(event) {
      if (event.pointerType !== "mouse" || motion.matches) return;
      hovering = true;
      move(event);
      initialize();
    }
    function move(event) {
      if (!hovering) return;
      const rect = host.getBoundingClientRect();
      pointerX = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      pointerY = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
      runtime?.wake();
    }
    function leave() {
      hovering = false;
      runtime?.wake();
    }
    function suspend() {
      if (document.hidden || motion.matches) {
        hovering = false;
        release();
      }
    }
    const intersection = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        hovering = false;
        release();
      }
    });
    intersection.observe(host);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", suspend);
    motion.addEventListener("change", suspend);
    return () => {
      disposed = true;
      hovering = false;
      release();
      intersection.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", suspend);
      motion.removeEventListener("change", suspend);
    };
  }, [src, width, height]);
  return (
    <div ref={hostRef} className={styles.thumbnailSurface}>
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
