"use client";

// Adapted from ReactBits ClickSpark (via Bedrock). One fixed, full-viewport canvas listens to
// window clicks, so it covers the whole site without wrapping the layout, and the rAF loop
// only runs while sparks are alive.
import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; angle: number; start: number; color: string };

const COLORS = ["#f5b82e", "#8b5cf6", "#facd4d", "#a78bfa"];
const COUNT = 10;
const RADIUS = 22;
const SIZE = 11;
const DURATION = 450;

export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sparks: Spark[] = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((s) => {
        const t = (now - s.start) / DURATION;
        if (t >= 1) return false;
        const eased = t * (2 - t);
        const dist = eased * RADIUS;
        const len = SIZE * (1 - eased);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x + dist * Math.cos(s.angle), s.y + dist * Math.sin(s.angle));
        ctx.lineTo(s.x + (dist + len) * Math.cos(s.angle), s.y + (dist + len) * Math.sin(s.angle));
        ctx.stroke();
        return true;
      });
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < COUNT; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / COUNT,
          start: now,
          color: COLORS[i % COLORS.length],
        });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] h-screen w-screen"
    />
  );
}
