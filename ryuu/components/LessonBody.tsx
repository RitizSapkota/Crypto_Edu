import { renderLesson } from "@/lib/markdown";
import { DIAGRAMS } from "./Diagrams";

export function LessonBody({ md }: { md: string }) {
  const segs = renderLesson(md);
  return (
    <div className="prose">
      {segs.map((s, i) => {
        if (s.kind === "html") return <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: s.html }} />;
        const D = DIAGRAMS[s.name];
        return D ? <D key={i} /> : null;
      })}
    </div>
  );
}
