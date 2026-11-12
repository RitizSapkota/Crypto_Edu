"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const KEY = "ryuu-journal-v1";
export const SETUPS = [
  "POC lost, failed retest",
  "POC reclaimed and held",
  "Sweep and reclaim",
  "Liquidation fade",
  "Quiet low after flush",
  "Wall break",
  "Other",
];

type Side = "long" | "short";
type Trade = {
  id: string;
  date: string;
  setup: string;
  side: Side;
  entry: number;
  stop: number;
  exit: number;
  note: string;
};

/** Result in R: profit divided by the distance to the stop. */
function rOf(t: Trade): number {
  const risk = Math.abs(t.entry - t.stop);
  if (!risk) return 0;
  const move = t.side === "long" ? t.exit - t.entry : t.entry - t.exit;
  return move / risk;
}

function load(): Trade[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter(valid) : [];
  } catch {
    return [];
  }
}

function valid(t: unknown): t is Trade {
  if (!t || typeof t !== "object") return false;
  const x = t as Record<string, unknown>;
  return (
    typeof x.id === "string" &&
    typeof x.date === "string" &&
    typeof x.setup === "string" &&
    (x.side === "long" || x.side === "short") &&
    [x.entry, x.stop, x.exit].every((n) => typeof n === "number" && Number.isFinite(n))
  );
}

const fmtR = (r: number) => (r > 0 ? "+" : "") + r.toFixed(2) + "R";

export function Journal() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTrades(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(trades));
    } catch {
      setStatus("Your browser blocked saving. Export your trades so you don't lose them.");
    }
  }, [trades, ready]);

  const stats = useMemo(() => {
    const by = new Map<string, number[]>();
    for (const t of trades) {
      const list = by.get(t.setup) ?? [];
      list.push(rOf(t));
      by.set(t.setup, list);
    }
    return [...by.entries()]
      .map(([setup, rs]) => ({
        setup,
        n: rs.length,
        win: rs.filter((r) => r > 0).length / rs.length,
        avg: rs.reduce((a, b) => a + b, 0) / rs.length,
        total: rs.reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.n - a.n);
  }, [trades]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const num = (k: string) => Number(f.get(k));
    const t: Trade = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: String(f.get("date") || new Date().toISOString().slice(0, 10)),
      setup: String(f.get("setup")),
      side: f.get("side") === "short" ? "short" : "long",
      entry: num("entry"),
      stop: num("stop"),
      exit: num("exit"),
      note: String(f.get("note") || "").trim(),
    };
    if (![t.entry, t.stop, t.exit].every((n) => Number.isFinite(n) && n > 0)) {
      setStatus("Entry, stop and exit all need a price.");
      return;
    }
    if (t.side === "long" && t.stop >= t.entry) {
      setStatus("On a long the stop goes below the entry.");
      return;
    }
    if (t.side === "short" && t.stop <= t.entry) {
      setStatus("On a short the stop goes above the entry.");
      return;
    }
    setTrades((prev) => [t, ...prev]);
    setStatus(`Logged: ${t.setup}, ${fmtR(rOf(t))}.`);
    const form = e.currentTarget;
    (["entry", "stop", "exit", "note"] as const).forEach((k) => {
      const el = form.elements.namedItem(k) as HTMLInputElement | null;
      if (el) el.value = "";
    });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(trades, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ryuu-journal-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data)) throw new Error();
      const incoming = data.filter(valid) as Trade[];
      setTrades((prev) => {
        const seen = new Set(prev.map((t) => t.id));
        return [...incoming.filter((t) => !seen.has(t.id)), ...prev].sort((a, b) => b.date.localeCompare(a.date));
      });
      setStatus(`Imported ${incoming.length} trades.`);
    } catch {
      setStatus("That file isn't a Ryuu journal export.");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="stack" style={{ gap: 26 }}>
      <form className="log" onSubmit={onSubmit} aria-label="Log a trade">
        <div className="f">
          <label className="label" htmlFor="j-date">Date</label>
          <input id="j-date" name="date" type="date" defaultValue={today} />
        </div>
        <div className="f">
          <label className="label" htmlFor="j-setup">Setup</label>
          <select id="j-setup" name="setup" defaultValue={SETUPS[0]}>
            {SETUPS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="f">
          <label className="label" htmlFor="j-side">Side</label>
          <select id="j-side" name="side" defaultValue="long">
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div className="f">
          <label className="label" htmlFor="j-entry">Entry</label>
          <input id="j-entry" name="entry" type="number" step="any" inputMode="decimal" required />
        </div>
        <div className="f">
          <label className="label" htmlFor="j-stop">Stop</label>
          <input id="j-stop" name="stop" type="number" step="any" inputMode="decimal" required />
        </div>
        <div className="f">
          <label className="label" htmlFor="j-exit">Exit</label>
          <input id="j-exit" name="exit" type="number" step="any" inputMode="decimal" required />
        </div>
        <div className="f wide">
          <label className="label" htmlFor="j-note">What you saw</label>
          <textarea id="j-note" name="note" placeholder="Open interest, CVD, the level, why you took it, and how you felt." />
        </div>
        <div className="wide actions" style={{ alignItems: "center" }}>
          <button className="btn btn-primary" type="submit">Log trade</button>
          <span className="status" role="status">{status}</span>
        </div>
      </form>

      <section className="stack" style={{ gap: 12 }}>
        <h2>By setup</h2>
        {stats.length === 0 ? (
          <div className="empty">No trades yet. Stats show up here once you log some.</div>
        ) : (
          <div className="tablebox">
            <table>
              <thead><tr><th>Setup</th><th>Trades</th><th>Win rate</th><th>Average</th><th>Total</th></tr></thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.setup}>
                    <td>{s.setup}</td>
                    <td className="num">{s.n}</td>
                    <td className="num">{Math.round(s.win * 100)}%</td>
                    <td className="num" style={{ color: s.avg >= 0 ? "var(--bid)" : "var(--ask)" }}>{fmtR(s.avg)}</td>
                    <td className="num">{fmtR(s.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {stats.some((s) => s.n < 30) && (
          <p className="muted" style={{ fontSize: 14 }}>
            Under 30 trades a setup's numbers are mostly noise. Keep logging before you decide anything.
          </p>
        )}
      </section>

      <section className="stack" style={{ gap: 12 }}>
        <div className="actions" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h2>Trades</h2>
          <div className="actions">
            <button className="btn-small" type="button" onClick={exportJson} disabled={!trades.length}>Export</button>
            <button className="btn-small" type="button" onClick={() => fileRef.current?.click()}>Import</button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) importJson(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>
        {trades.length === 0 ? (
          <div className="empty">Nothing logged yet.</div>
        ) : (
          <div className="tablebox">
            <table>
              <thead><tr><th>Date</th><th>Setup</th><th>Side</th><th>Entry</th><th>Stop</th><th>Exit</th><th>R</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                {trades.map((t) => {
                  const r = rOf(t);
                  return (
                    <tr key={t.id}>
                      <td className="num">{t.date}</td>
                      <td>{t.setup}</td>
                      <td>{t.side}</td>
                      <td className="num">{t.entry}</td>
                      <td className="num">{t.stop}</td>
                      <td className="num">{t.exit}</td>
                      <td className="num" style={{ color: r >= 0 ? "var(--bid)" : "var(--ask)" }}>{fmtR(r)}</td>
                      <td className="note-cell">{t.note}</td>
                      <td>
                        {pendingDelete === t.id ? (
                          <span className="actions" style={{ flexWrap: "nowrap" }}>
                            <button className="btn-small danger" type="button" onClick={() => { setTrades((p) => p.filter((x) => x.id !== t.id)); setPendingDelete(null); }}>Delete</button>
                            <button className="btn-small" type="button" onClick={() => setPendingDelete(null)}>Keep</button>
                          </span>
                        ) : (
                          <button className="btn-small" type="button" onClick={() => setPendingDelete(t.id)} aria-label={`Delete trade from ${t.date}`}>×</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="muted" style={{ fontSize: 14 }}>
          Trades are saved in this browser only. Nobody else can see them, and clearing your browser data deletes them. Export
          now and then to keep a copy.
        </p>
      </section>
    </div>
  );
}
