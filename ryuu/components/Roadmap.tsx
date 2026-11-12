export function Roadmap() {
  const stages = [
    { n: "Stage 1", t: "Education", d: "Lessons, case library, playbook and journal.", now: true },
    { n: "Stage 2", t: "Profiles and flow", d: "Live BTC with session TPO and volume profiles, delta and CVD." },
    { n: "Stage 3", t: "Footprint", d: "Bid and ask volume inside each bar, on range bars." },
    { n: "Stage 4", t: "Heatmap and liquidations", d: "Order book depth over time and the liquidation feed." },
  ];
  return (
    <div className="roadmap">
      {stages.map((s) => (
        <div key={s.n} className={s.now ? "now" : undefined}>
          <span className="label">{s.n}{s.now ? " · live" : ""}</span>
          <h3>{s.t}</h3>
          <p className="muted">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
