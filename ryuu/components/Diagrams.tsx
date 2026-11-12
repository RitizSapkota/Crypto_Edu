import type { CSSProperties, ReactNode } from "react";

/* All diagrams are drawn from data on one scale. Colours come from theme tokens. */

const C = {
  fg: { fill: "var(--fg)" } as CSSProperties,
  muted: { fill: "var(--muted)" } as CSSProperties,
  poc: { fill: "var(--poc)" } as CSSProperties,
  bid: { fill: "var(--bid)" } as CSSProperties,
  ask: { fill: "var(--ask)" } as CSSProperties,
  va: { fill: "var(--va)" } as CSSProperties,
  vaSoft: { fill: "var(--va-soft)" } as CSSProperties,
  block: { fill: "var(--muted)", opacity: 0.55 } as CSSProperties,
};
const line = (color: string, width = 1.5, dash?: string): CSSProperties => ({
  stroke: `var(--${color})`,
  strokeWidth: width,
  fill: "none",
  strokeDasharray: dash,
});

/** Value area by the standard method: start at the POC, add the larger pair of rows above or below until 70%. */
export function valueArea(rows: number[], pct = 0.7): { poc: number; hi: number; lo: number } {
  const total = rows.reduce((a, b) => a + b, 0);
  const poc = rows.indexOf(Math.max(...rows));
  let hi = poc;
  let lo = poc;
  let sum = rows[poc];
  while (sum < total * pct && (hi > 0 || lo < rows.length - 1)) {
    const up = (rows[hi - 1] ?? 0) + (rows[hi - 2] ?? 0);
    const down = (rows[lo + 1] ?? 0) + (rows[lo + 2] ?? 0);
    if (up >= down && hi > 0) {
      const n = Math.min(2, hi);
      for (let i = 1; i <= n; i++) sum += rows[hi - i];
      hi -= n;
    } else {
      const n = Math.min(2, rows.length - 1 - lo);
      for (let i = 1; i <= n; i++) sum += rows[lo + i];
      lo += n;
    }
  }
  return { poc, hi, lo }; // row indexes, 0 = top row
}

function Frame({ caption, children, label }: { caption: string; children: ReactNode; label: string }) {
  return (
    <figure>
      <div className="diagram" role="img" aria-label={label}>
        {children}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* ---------- Profile anatomy ---------- */

const ANATOMY = [1, 1, 1, 2, 3, 4, 6, 7, 9, 10, 12, 11, 9, 8, 6, 5, 4, 3, 2, 1, 1];

export function ProfileSvg({ rows = ANATOMY, labels = true }: { rows?: number[]; labels?: boolean }) {
  const RH = 16; // row height
  const BW = 16; // block width
  const X0 = 70;
  const Y0 = 14;
  const { poc, hi, lo } = valueArea(rows);
  const maxW = Math.max(...rows) * BW;
  const W = X0 + maxW + (labels ? 190 : 30);
  const H = Y0 * 2 + rows.length * RH;
  const yOf = (i: number) => Y0 + i * RH;
  const labelX = X0 + maxW + 26;
  const price = (i: number) => (64000 - i * 25).toLocaleString("en-US");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x={X0 - 8} y={yOf(hi)} width={maxW + 16} height={(lo - hi + 1) * RH} rx={3} style={C.vaSoft} />
      {rows.map((n, i) => (
        <g key={i}>
          {i % 4 === 0 && (
            <text x={X0 - 14} y={yOf(i) + RH * 0.72} textAnchor="end" fontSize={10.5} style={C.muted}>
              {price(i)}
            </text>
          )}
          {Array.from({ length: n }, (_, k) => (
            <rect key={k} x={X0 + k * BW + 1} y={yOf(i) + 1} width={BW - 2} height={RH - 2} rx={1.5} style={i === poc ? C.poc : C.block} />
          ))}
        </g>
      ))}
      {labels && (
        <g fontSize={12}>
          <line x1={X0 + rows[poc] * BW + 4} y1={yOf(poc) + RH / 2} x2={labelX - 6} y2={yOf(poc) + RH / 2} style={line("poc", 1)} />
          <text x={labelX} y={yOf(poc) + RH * 0.72} style={C.poc}>POC</text>
          <text x={labelX} y={yOf(hi) + RH * 0.72} style={C.va}>VAH</text>
          <text x={labelX} y={yOf(lo) + RH * 0.72} style={C.va}>VAL</text>
          <text x={labelX} y={yOf(1) + RH * 0.72} style={C.muted}>tail: rejected high</text>
          <text x={labelX} y={yOf(rows.length - 1) + RH * 0.72} style={C.muted}>tail: rejected low</text>
          <text x={labelX} y={yOf(Math.round((poc + hi) / 2)) + RH * 0.72} style={C.muted}>~70% of activity</text>
        </g>
      )}
    </svg>
  );
}

export function ProfileAnatomy() {
  return (
    <Frame
      label="A TPO profile with its point of control, value area and tails"
      caption="Each block is one 30-minute period that traded at that price. The value area here is computed with the standard 70% method from the rows shown."
    >
      <ProfileSvg />
    </Frame>
  );
}

/* ---------- Single prints / double distribution ---------- */

const DOUBLE = [1, 2, 4, 6, 8, 7, 5, 3, 1, 1, 1, 1, 2, 4, 6, 7, 5, 3, 2, 1];

export function SinglePrints() {
  const RH = 16, BW = 16, X0 = 30, Y0 = 14;
  const maxW = Math.max(...DOUBLE) * BW;
  const W = X0 + maxW + 230;
  const H = Y0 * 2 + DOUBLE.length * RH;
  const yOf = (i: number) => Y0 + i * RH;
  const singles = [8, 9, 10, 11];
  const labelX = X0 + maxW + 26;
  return (
    <Frame
      label="A double distribution profile separated by single prints"
      caption="Two distributions joined by a run of single prints. While the move is fresh they act as support. Once the market rebalances, they become a target."
    >
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <rect x={X0 - 6} y={yOf(singles[0])} width={maxW + 12} height={singles.length * RH} rx={3} style={{ fill: "var(--poc)", opacity: 0.12 }} />
        {DOUBLE.map((n, i) =>
          Array.from({ length: n }, (_, k) => (
            <rect key={`${i}-${k}`} x={X0 + k * BW + 1} y={yOf(i) + 1} width={BW - 2} height={RH - 2} rx={1.5} style={singles.includes(i) ? C.poc : C.block} />
          )),
        )}
        <g fontSize={12}>
          <text x={labelX} y={yOf(4) + RH * 0.72} style={C.muted}>later distribution</text>
          <text x={labelX} y={yOf(9) + RH * 0.72} style={C.poc}>single prints:</text>
          <text x={labelX} y={yOf(10) + RH * 0.72} style={C.poc}>crossed once, never revisited</text>
          <text x={labelX} y={yOf(15) + RH * 0.72} style={C.muted}>earlier distribution</text>
          <text x={labelX} y={yOf(18) + RH * 0.72} style={C.muted}>move started here, up</text>
        </g>
      </svg>
    </Frame>
  );
}

/* ---------- Range, impulse, range ---------- */

export function RangeImpulse() {
  // price path in (x, y) where y grows downward = lower price
  const r1: [number, number][] = [[20, 70], [45, 50], [70, 82], [95, 52], [120, 80], [145, 55], [170, 78]];
  const imp: [number, number][] = [[170, 78], [200, 150], [220, 175]];
  const r2: [number, number][] = [[220, 175], [245, 150], [270, 190], [295, 160], [315, 188]];
  const retest: [number, number][] = [[315, 188], [345, 120], [362, 88]];
  const down: [number, number][] = [[362, 88], [395, 170], [425, 200], [455, 260]];
  const pts = [...r1, ...imp.slice(1), ...r2.slice(1), ...retest.slice(1), ...down.slice(1)];
  const path = pts.map((p) => p.join(",")).join(" ");
  const r1Low = 84;
  return (
    <Frame
      label="Price ranges, drops in an impulse, ranges again, then retests the old range low before falling further"
      caption="Range, impulse, range. The retest of the range just left is the trade: sell at the old range low, buy back near the current range or one average candle away."
    >
      <svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg">
        <rect x={14} y={44} width={166} height={r1Low - 44} rx={3} style={{ fill: "var(--va-soft)" }} />
        <rect x={214} y={144} width={110} height={50} rx={3} style={{ fill: "var(--va-soft)" }} />
        <line x1={14} y1={r1Low} x2={420} y2={r1Low} style={line("ask", 1, "4 4")} />
        <polyline points={path} style={line("fg", 2)} />
        <circle cx={362} cy={88} r={5} style={C.ask} />
        <g fontSize={12}>
          <text x={20} y={34} style={C.muted}>range 1</text>
          <text x={220} y={136} style={C.muted}>range 2</text>
          <text x={150} y={130} style={C.muted}>impulse</text>
          <text x={372} y={76} style={C.ask}>sell: retest of the</text>
          <text x={372} y={91} style={C.ask}>old range low</text>
          <text x={430} y={r1Low - 6} style={C.muted}>range 1 low</text>
          <text x={430} y={246} style={C.muted}>next leg</text>
        </g>
      </svg>
    </Frame>
  );
}

/* ---------- Liquidation fade ---------- */

type Candle = { o: number; h: number; l: number; c: number; v: number };
const LIQ: Candle[] = [
  { o: 100, h: 101, l: 97, c: 98, v: 8 },
  { o: 98, h: 99.5, l: 96.5, c: 97, v: 9 },
  { o: 97, h: 98, l: 93, c: 94, v: 14 },
  { o: 94, h: 95.5, l: 92.5, c: 95, v: 10 },
  { o: 95, h: 95.5, l: 91, c: 91.5, v: 15 },
  { o: 91.5, h: 92, l: 80, c: 82, v: 62 },
  { o: 82, h: 89.5, l: 81, c: 89, v: 18 },
  { o: 89, h: 92, l: 88, c: 91.5, v: 14 },
  { o: 91.5, h: 95.2, l: 90.5, c: 94.8, v: 12 },
  { o: 94.8, h: 95.5, l: 92.5, c: 93.5, v: 9 },
];

export function LiquidationFade() {
  const X0 = 46, CW = 30, GAP = 14;
  const PTOP = 20, PH = 190, PMIN = 78, PMAX = 102;
  const VTOP = 240, VH = 70, VMAX = 62;
  const y = (p: number) => PTOP + ((PMAX - p) / (PMAX - PMIN)) * PH;
  const x = (i: number) => X0 + i * (CW + GAP);
  const tps = [
    { p: 91.5, label: "TP1: origin of the last leg" },
    { p: 94.8, label: "TP2: origin of the leg before" },
  ];
  const W = x(LIQ.length) + 200;
  return (
    <Frame
      label="Candles falling into a high-volume liquidation candle, followed by a large green candle on low volume and a recovery to the leg origins"
      caption="The liquidation candle (high volume) is followed by a large candle back on low volume: forced selling has stopped and the book is empty. Targets are the origins of the legs that made the drop."
    >
      <svg viewBox={`0 0 ${W} ${VTOP + VH + 26}`} xmlns="http://www.w3.org/2000/svg">
        {[80, 85, 90, 95, 100].map((p) => (
          <g key={p}>
            <line x1={X0 - 8} y1={y(p)} x2={W - 10} y2={y(p)} style={{ stroke: "var(--line)", strokeWidth: 1 }} />
            <text x={X0 - 12} y={y(p) + 4} textAnchor="end" fontSize={10.5} style={C.muted}>{p}</text>
          </g>
        ))}
        {tps.map((t) => (
          <g key={t.p}>
            <line x1={x(5)} y1={y(t.p)} x2={x(LIQ.length) + 8} y2={y(t.p)} style={line("bid", 1.2, "5 4")} />
            <text x={x(LIQ.length) + 14} y={y(t.p) + 4} fontSize={11.5} style={C.bid}>{t.label}</text>
          </g>
        ))}
        {LIQ.map((k, i) => {
          const up = k.c >= k.o;
          const col = up ? "bid" : "ask";
          const top = y(Math.max(k.o, k.c));
          const bot = y(Math.min(k.o, k.c));
          const vh = (k.v / VMAX) * VH;
          return (
            <g key={i}>
              <line x1={x(i) + CW / 2} y1={y(k.h)} x2={x(i) + CW / 2} y2={y(k.l)} style={line(col, 1.5)} />
              <rect x={x(i)} y={top} width={CW} height={Math.max(2, bot - top)} rx={1.5} style={{ fill: `var(--${col})` }} />
              <rect x={x(i)} y={VTOP + VH - vh} width={CW} height={vh} rx={1.5} style={{ fill: `var(--${col})`, opacity: 0.55 }} />
            </g>
          );
        })}
        <text x={X0 - 12} y={VTOP + 10} textAnchor="end" fontSize={10.5} style={C.muted}>vol</text>
        <g fontSize={11.5}>
          <text x={x(5) - 4} y={VTOP - 8} textAnchor="end" style={C.ask}>liquidation: huge volume</text>
          <text x={x(6) + CW + 6} y={VTOP + VH - 26} style={C.bid}>big candle back, low volume</text>
        </g>
      </svg>
    </Frame>
  );
}

export const DIAGRAMS: Record<string, () => ReactNode> = {
  "profile-anatomy": ProfileAnatomy,
  "single-prints": SinglePrints,
  "range-impulse": RangeImpulse,
  "liquidation-fade": LiquidationFade,
};
