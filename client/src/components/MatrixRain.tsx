/**
 * MatrixRain.tsx — Animated Matrix digital rain background
 *
 * Design: Authentic Matrix-style falling characters on pure black
 * - Katakana + Latin + digits mix (like the original film)
 * - Bright white leading character, fading green trail
 * - Variable column speeds for organic feel
 * - Fully responsive — resizes with window
 */

import { useEffect, useRef } from "react";

// Matrix character set: Katakana + digits + Latin symbols
const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>[]{}|/\\";

interface MatrixRainProps {
  className?: string;
  /** Opacity of the overall canvas overlay (0–1). Default 1 */
  opacity?: number;
  /** Font size in px. Default 14 */
  fontSize?: number;
}

export function MatrixRain({
  className = "",
  opacity = 1,
  fontSize = 14,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let cols: number;
    let drops: number[];

    function init() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -canvas!.height / fontSize)
      );
    }

    function draw() {
      if (!canvas || !ctx) return;

      // Fade trail — semi-transparent black overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * fontSize;

        // Leading character — bright white/light-green flash
        if (drops[i] > 0) {
          ctx.fillStyle = "#e0ffe0";
          ctx.fillText(char, i * fontSize, y);
        }

        // Characters just behind the head — bright green
        if (drops[i] > 1) {
          ctx.fillStyle = "#00ff41";
          const prevChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(prevChar, i * fontSize, (drops[i] - 1) * fontSize);
        }

        // Rest of trail — medium green (handled by fade overlay)
        ctx.fillStyle = "#00cc33";
        const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        if (drops[i] > 2) {
          ctx.fillText(trailChar, i * fontSize, (drops[i] - 2) * fontSize);
        }

        // Reset column when it goes off screen + random restart
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      init();
      draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity, display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
