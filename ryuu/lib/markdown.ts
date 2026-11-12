import { marked } from "marked";

marked.setOptions({ gfm: true });

export type Segment = { kind: "html"; html: string } | { kind: "diagram"; name: string };

/**
 * Lessons are markdown. A line of the form `::diagram name` inserts a drawn
 * diagram component at that point.
 */
export function renderLesson(md: string): Segment[] {
  const parts = md.split(/^::diagram\s+([\w-]+)\s*$/m);
  const out: Segment[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) out.push({ kind: "diagram", name: part });
    else if (part.trim()) out.push({ kind: "html", html: wrapTables(marked.parse(part) as string) });
  });
  return out;
}

function wrapTables(html: string): string {
  return html.replace(/<table>/g, '<div class="tablebox"><table>').replace(/<\/table>/g, "</table></div>");
}
