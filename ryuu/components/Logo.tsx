/** Mark: a market profile in five rows, the point of control in gold. */
export function LogoMark({ size = 26 }: { size?: number }) {
  const rows = [3, 6, 9, 5, 2];
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      {rows.map((w, i) => (
        <rect key={i} x={3} y={2 + i * 4.6} width={w * 2.2} height={3.4} rx={0.8}
          style={{ fill: i === 2 ? "var(--poc)" : "var(--fg)", opacity: i === 2 ? 1 : 0.8 }} />
      ))}
    </svg>
  );
}
