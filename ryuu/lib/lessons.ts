import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Access = "free" | "member";

export interface LessonMeta {
  slug: string;
  title: string;
  group: string;
  order: number;
  summary: string;
  access: Access;
  lead: string;
}

export interface Lesson extends LessonMeta {
  body: string;
}

const DIR = path.join(process.cwd(), "content", "lessons");

function readAll(): Lesson[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/^\d+-/, "").replace(/\.md$/, "");
      return {
        slug,
        title: String(data.title),
        group: String(data.group),
        order: Number(data.order),
        summary: String(data.summary),
        access: data.access === "free" ? "free" : "member",
        lead: String(data.lead ?? ""),
        body: content.trim(),
      } satisfies Lesson;
    })
    .sort((a, b) => a.order - b.order);
}

let cache: Lesson[] | null = null;
export function getLessons(): Lesson[] {
  if (!cache) cache = readAll();
  return cache;
}

export function getLesson(slug: string): Lesson | undefined {
  return getLessons().find((l) => l.slug === slug);
}

export function getLessonGroups(): { group: string; lessons: LessonMeta[] }[] {
  const groups: { group: string; lessons: LessonMeta[] }[] = [];
  for (const l of getLessons()) {
    let g = groups.find((x) => x.group === l.group);
    if (!g) {
      g = { group: l.group, lessons: [] };
      groups.push(g);
    }
    const { body: _body, ...meta } = l;
    g.lessons.push(meta);
  }
  return groups;
}

/** The part of a member lesson shown before the paywall: everything up to the second section heading. */
export function previewBody(body: string): string {
  const heads = [...body.matchAll(/^### /gm)];
  if (heads.length < 2) return body.split("\n\n").slice(0, 3).join("\n\n");
  return body.slice(0, heads[1].index);
}
