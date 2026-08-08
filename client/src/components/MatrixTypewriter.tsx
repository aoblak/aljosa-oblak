/**
 * MatrixTypewriter.tsx — Matrix-style typewriter with character scramble
 *
 * Behaviour per character position:
 *   1. Scramble phase  — rapid random Matrix chars flash at that position
 *   2. Resolve phase   — the real character snaps in with a green glow burst
 *   3. Cursor          — blinking green block ▮ trails the last revealed char
 *
 * After the full string is revealed the cursor keeps blinking for 3 s,
 * then fades out so the title settles cleanly.
 */

import { useEffect, useRef, useState } from "react";

// Matrix scramble character pool
const POOL =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "0123456789@#$%&*<>[]{}|/\\";

function randomChar() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

interface UseMatrixTypewriterOptions {
  /** The final string to reveal */
  text: string;
  /** Delay before animation starts (ms). Default 400 */
  startDelay?: number;
  /** How many ms each character takes to scramble before resolving. Default 120 */
  scrambleDuration?: number;
  /** Gap between starting each character's scramble (ms). Default 90 */
  charInterval?: number;
  /** How many scramble frames per character. Default 8 */
  scrambleFrames?: number;
}

interface CharState {
  /** What is currently displayed */
  display: string;
  /** Whether this position has resolved to the real character */
  resolved: boolean;
  /** Whether this position is actively scrambling */
  active: boolean;
}

export function useMatrixTypewriter({
  text,
  startDelay = 400,
  scrambleDuration = 120,
  charInterval = 90,
  scrambleFrames = 8,
}: UseMatrixTypewriterOptions) {
  const [chars, setChars] = useState<CharState[]>(
    Array.from({ length: text.length }, () => ({
      display: "\u00a0", // non-breaking space placeholder
      resolved: false,
      active: false,
    }))
  );
  const [cursorPos, setCursorPos] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear on unmount
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // Reset state
    setChars(
      Array.from({ length: text.length }, () => ({
        display: "\u00a0",
        resolved: false,
        active: false,
      }))
    );
    setCursorPos(-1);
    setCursorVisible(true);
    setDone(false);

    // Schedule each character
    text.split("").forEach((targetChar, idx) => {
      const charStart = startDelay + idx * charInterval;

      // Scramble frames
      for (let f = 0; f < scrambleFrames; f++) {
        const t = setTimeout(() => {
          setChars((prev) => {
            const next = [...prev];
            next[idx] = { display: randomChar(), resolved: false, active: true };
            return next;
          });
          setCursorPos(idx);
        }, charStart + (f * scrambleDuration) / scrambleFrames);
        timers.current.push(t);
      }

      // Resolve to real character
      const resolveAt = charStart + scrambleDuration;
      const rt = setTimeout(() => {
        setChars((prev) => {
          const next = [...prev];
          next[idx] = { display: targetChar, resolved: true, active: false };
          return next;
        });
        setCursorPos(idx + 1);

        // After last char: blink cursor for 2.5 s then hide
        if (idx === text.length - 1) {
          const doneTimer = setTimeout(() => setDone(true), 2500);
          timers.current.push(doneTimer);
        }
      }, resolveAt);
      timers.current.push(rt);
    });
  }, [text, startDelay, charInterval, scrambleDuration, scrambleFrames]);

  // Cursor blink
  useEffect(() => {
    if (done) {
      setCursorVisible(false);
      return;
    }
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, [done]);

  return { chars, cursorPos, cursorVisible, done };
}

// ── Rendered component ─────────────────────────────────────────────────────

interface MatrixTypewriterProps {
  /** Line 1 text */
  line1: string;
  /** Line 2 text */
  line2: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MatrixTypewriter({ line1, line2, className = "", style }: MatrixTypewriterProps) {
  const totalLength = line1.length + line2.length;

  // Animate line1 first, then line2 starts after line1 finishes
  const tw1 = useMatrixTypewriter({
    text: line1,
    startDelay: 500,
    charInterval: 95,
    scrambleDuration: 130,
    scrambleFrames: 9,
  });

  const line2Delay = 500 + line1.length * 95 + 130 + 80; // starts after line1 resolves
  const tw2 = useMatrixTypewriter({
    text: line2,
    startDelay: line2Delay,
    charInterval: 100,
    scrambleDuration: 140,
    scrambleFrames: 9,
  });

  return (
    <h1 className={className} style={style} aria-label={`${line1} ${line2}`}>
      {/* Line 1 */}
      <span className="block" aria-hidden="true">
        {tw1.chars.map((c, i) => (
          <span
            key={i}
            style={{
              color: c.resolved ? "#00ff41" : c.active ? "#a0ffa0" : "transparent",
              textShadow: c.resolved
                ? "0 0 30px #00ff4180, 0 0 60px #00cc3340"
                : c.active
                ? "0 0 12px #00ff4160"
                : "none",
              transition: c.resolved ? "text-shadow 0.3s ease" : "none",
              display: "inline-block",
              minWidth: "0.55em",
            }}
          >
            {c.display}
          </span>
        ))}
        {/* Cursor after line1 if line2 hasn't started yet */}
        {tw1.cursorPos === line1.length && !tw1.done && tw1.cursorVisible && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "0.55em",
              background: "#00ff41",
              boxShadow: "0 0 8px #00ff41",
              marginLeft: "2px",
              verticalAlign: "baseline",
              height: "0.85em",
              position: "relative",
              top: "0.05em",
            }}
          />
        )}
      </span>

      {/* Line 2 */}
      <span className="block" aria-hidden="true">
        {tw2.chars.map((c, i) => (
          <span
            key={i}
            style={{
              color: c.resolved
                ? "#e0ffe0"
                : c.active
                ? "#a0ffa0"
                : "transparent",
              textShadow: c.resolved
                ? "0 0 20px #00ff4199"
                : c.active
                ? "0 0 10px #00ff4150"
                : "none",
              transition: c.resolved ? "text-shadow 0.3s ease" : "none",
              display: "inline-block",
              minWidth: "0.55em",
            }}
          >
            {c.display}
          </span>
        ))}
        {/* Trailing cursor */}
        {tw2.cursorPos >= 0 && !tw2.done && tw2.cursorVisible && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "0.55em",
              background: "#00ff41",
              boxShadow: "0 0 8px #00ff41",
              marginLeft: "2px",
              verticalAlign: "baseline",
              height: "0.85em",
              position: "relative",
              top: "0.05em",
            }}
          />
        )}
      </span>
    </h1>
  );
}
