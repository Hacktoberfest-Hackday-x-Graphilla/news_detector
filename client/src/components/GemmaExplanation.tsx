import { Sparkles } from "lucide-react";

interface GemmaExplanationData {
  status: "ready" | "error";
  mode: "fallback" | "supplementary";
  model?: string;
  explanation?: string;
  message?: string;
}

interface GemmaExplanationProps {
  result?: GemmaExplanationData;
}

export default function GemmaExplanation({ result }: GemmaExplanationProps) {
  if (!result) return null;

  const isFallback = result.mode === "fallback";

  return (
    <section
      aria-label="Gemma 4 explanation"
      className={`border-t px-8 py-4 ${
        result.status === "error"
          ? "border-amber-200 bg-amber-50"
          : "border-blue-100 bg-blue-50/50"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-[#3B4FE0]" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-[#1a2744]">
          Gemma 4 {isFallback ? "visual description" : "additional explanation"}
        </h2>
        {result.model && (
          <span className="text-xs text-gray-400">{result.model}</span>
        )}
      </div>
      {isFallback && (
        <p className="mb-2 text-xs font-medium text-amber-800">
          Non-authoritative: visual description only; it does not determine whether this media is real or fake.
        </p>
      )}
      <p
        role={result.status === "error" ? "alert" : undefined}
        className="text-sm leading-6 text-gray-700"
      >
        {result.status === "ready"
          ? result.explanation
          : result.message || "Gemma 4 could not provide an explanation."}
      </p>
    </section>
  );
}
