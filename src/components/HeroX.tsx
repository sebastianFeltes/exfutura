// HeroX — X 3D de Exfutura (canvas 2D + proyección manual, sin dependencias externas)
import { useEffect, useRef } from "react";

// ── Exfutura X: geometría y render 2D con proyección 3D manual (sin dependencias) ──
type V2 = readonly [number, number];
type V3 = [number, number, number];

// Polígonos tomados del ícono oficial (exfutura-icono.svg), en unidades del logo.
const LOGO_L: V2[] = [[0, 920], [326.6, 920], [677.4, 1460], [326.6, 2000], [0, 2000], [350.8, 1460]];
const LOGO_R: V2[] = [[883, 920], [644.5, 1287.2], [756.7, 1460], [644.5, 1632.8], [883, 2000], [1209.6, 2000], [858.8, 1460], [1209.6, 920]];
const DEPTH = 0.24; // profundidad de la extrusión (alto de la X = 1)
const CAM = 3.4; // distancia de cámara (perspectiva)
const norm = (p: V2): V2 => [(p[0] - 604.8) / 1080, -(p[1] - 1460) / 1080];
const POLYS: V2[][] = [LOGO_L.map(norm), LOGO_R.map(norm)];
const DEG = Math.PI / 180;

type XFrame = {
  rotY: number; // radianes
  rotX: number; // radianes
  progress: number; // 0..1 dibujo de aristas
  glow: number; // 0..1 intensidad del halo
};

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

function drawX(ctx: CanvasRenderingContext2D, size: number, f: XFrame): void {
  const cy = Math.cos(f.rotY), sy = Math.sin(f.rotY);
  const cx = Math.cos(f.rotX), sx = Math.sin(f.rotX);
  const k = size * 0.56;
  const c = size / 2;
  const tf = (x: number, y: number, z: number): V3 => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const y2 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    return [x1, y2, z2];
  };
  const pr = (v: V3): V2 => {
    const s = k / (1 - v[2] / CAM);
    return [c + v[0] * s, c - v[1] * s];
  };
  const nz = tf(0, 0, 1)[2]; // orientación de la cara frontal hacia la cámara

  ctx.clearRect(0, 0, size, size);

  // Halo
  const g = Math.max(0, Math.min(1, f.glow));
  if (g > 0) {
    const rg = ctx.createRadialGradient(c, c, 0, c, c, size * 0.5);
    rg.addColorStop(0, `rgba(20,184,166,${0.26 * g})`);
    rg.addColorStop(0.45, `rgba(20,184,166,${0.08 * g})`);
    rg.addColorStop(1, "rgba(20,184,166,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, size, size);
  }

  const p = f.progress;
  const fillA = ease(seg(p, 0.45, 1));
  const lw = Math.max(1.1, size / 300);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  type Edge = { a: V3; b: V3; t: number };
  const edges: Edge[] = [];

  for (const poly of POLYS) {
    const n = poly.length;
    const F = poly.map(([x, y]) => tf(x, y, DEPTH / 2));
    const B = poly.map(([x, y]) => tf(x, y, -DEPTH / 2));
    const FP = F.map(pr), BP = B.map(pr);

    if (fillA > 0) {
      // Caras laterales (volumen), sólo las que miran a la cámara
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const ex = poly[j][0] - poly[i][0], ey = poly[j][1] - poly[i][1];
        const len = Math.hypot(ex, ey) || 1;
        // normal hacia afuera del lado (polígonos en sentido horario en pantalla → ajustar signo)
        const nn = tf(ey / len, -ex / len, 0)[2];
        const facing = Math.abs(nn);
        ctx.fillStyle = `rgba(20,184,166,${(0.05 + 0.16 * facing) * fillA})`;
        ctx.beginPath();
        ctx.moveTo(FP[i][0], FP[i][1]);
        ctx.lineTo(FP[j][0], FP[j][1]);
        ctx.lineTo(BP[j][0], BP[j][1]);
        ctx.lineTo(BP[i][0], BP[i][1]);
        ctx.closePath();
        ctx.fill();
      }
      // Tapas
      for (const [P, facing] of [[BP, -nz], [FP, nz]] as const) {
        ctx.fillStyle = `rgba(20,184,166,${(0.08 + 0.28 * Math.max(0, facing)) * fillA})`;
        ctx.beginPath();
        P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
        ctx.closePath();
        ctx.fill();
      }
    }

    // Aristas con su ventana de dibujo
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      edges.push({ a: F[i], b: F[j], t: seg(p, (i / n) * 0.5, ((i + 1) / n) * 0.5) });
      edges.push({ a: F[i], b: B[i], t: seg(p, 0.4, 0.7) });
      edges.push({ a: B[i], b: B[j], t: seg(p, 0.55 + (i / n) * 0.45, 0.55 + ((i + 1) / n) * 0.45) });
    }
  }

  // Ordenar de atrás hacia adelante y trazar (halo ancho + línea fina)
  edges.sort((e1, e2) => e1.a[2] + e1.b[2] - (e2.a[2] + e2.b[2]));
  for (const pass of [0, 1]) {
    for (const e of edges) {
      if (e.t <= 0) continue;
      const A = pr(e.a);
      const end: V3 = [e.a[0] + (e.b[0] - e.a[0]) * e.t, e.a[1] + (e.b[1] - e.a[1]) * e.t, e.a[2] + (e.b[2] - e.a[2]) * e.t];
      const Bp = pr(end);
      const zm = (e.a[2] + end[2]) / 2;
      const depthA = 0.35 + 0.65 * Math.min(1, Math.max(0, (zm + 0.6) / 1.2));
      ctx.beginPath();
      ctx.moveTo(A[0], A[1]);
      ctx.lineTo(Bp[0], Bp[1]);
      if (pass === 0) {
        ctx.strokeStyle = `rgba(20,184,166,${0.22 * depthA * (0.6 + 0.4 * g)})`;
        ctx.lineWidth = lw * 5;
      } else {
        ctx.strokeStyle = `rgba(94,234,212,${0.95 * depthA})`;
        ctx.lineWidth = lw;
      }
      ctx.stroke();
    }
  }
}


// ── Componente ──
type HeroXProps = { className?: string };

const TURN_S = 20; // una vuelta cada 20 s
const WOBBLE = 8 * DEG; // ±8°
const MOUSE_TILT = 10 * DEG; // hasta 10° hacia el mouse
const DRAW_MS = 1200;
const STATIC_Y = 25 * DEG;

export default function HeroX({ className = "" }: HeroXProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    let onScreen = true;
    let size = 0;
    let raf = 0;
    let last = 0;
    let elapsed = 0; // ms acumulados sólo mientras anima
    const target = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(1, Math.round(Math.min(r.width, r.height)));
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!raf) paint();
    };

    const paint = () => {
      if (!size) return;
      if (reduced) {
        drawX(ctx, size, { rotY: STATIC_Y, rotX: -6 * DEG, progress: 1, glow: 0.9 });
        return;
      }
      const t = elapsed / 1000;
      const progress = Math.min(1, elapsed / DRAW_MS);
      const pulse = 0.82 + 0.18 * Math.sin((2 * Math.PI * t) / 3.2);
      drawX(ctx, size, {
        rotY: (2 * Math.PI * t) / TURN_S + tilt.y,
        rotX: -6 * DEG + WOBBLE * Math.sin((2 * Math.PI * t) / 7) + tilt.x,
        progress: 1 - Math.pow(1 - progress, 2),
        glow: progress * pulse,
      });
    };

    const frame = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      tilt.x += (target.x - tilt.x) * 0.06;
      tilt.y += (target.y - tilt.y) * 0.06;
      paint();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const run = onScreen && !document.hidden && !reduced;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        paint();
      }
    };

    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      target.y = nx * MOUSE_TILT;
      target.x = ny * MOUSE_TILT;
    };
    const onMq = () => {
      reduced = mq.matches;
      sync();
      paint();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onPointer, { passive: true });
    mq.addEventListener("change", onMq);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none relative shrink-0 h-[220px] w-[220px] select-none md:h-[380px] md:w-[380px] ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
