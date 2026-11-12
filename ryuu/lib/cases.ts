import data from "@/content/cases.json";

export type Direction = "long" | "short";

export interface CaseStudy {
  id: string;
  date: string;
  name: string;
  dirs: Direction[];
  range: string;
  tf: string;
  shots: [string, string][];
  read: [string, string][];
  lesson: string;
}

const FREE_CASES = new Set(["nov10"]);

export const cases = data as CaseStudy[];

export function getCase(id: string): CaseStudy | undefined {
  return cases.find((c) => c.id === id);
}

export function isFreeCase(id: string): boolean {
  return FREE_CASES.has(id);
}
