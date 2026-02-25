import { useState } from "react";

export default function AIResponseCard({
  status = "found", // "found" | "notfound"
  aiLabel = "OpsMind AI",
  sourceFile = "sih2025.pdf",
  interpretation = "",
  answer = "",
  documentDetails = {},
  keywords = [],
  confidence = 82
}) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const Badge = ({ children }) => (
    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mr-2">
      {children}
    </span>
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 space-y-6 transition-all">

      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            {aiLabel}
          </h3>
          <div className="text-sm text-zinc-500 flex items-center gap-2">
            <Badge>{sourceFile}</Badge>
            <span className="flex items-center gap-1 text-green-500">
              ● Live
            </span>
          </div>
        </div>
      </div>

      {/* NOT FOUND STATE */}
      {status === "notfound" && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
            No Relevant Information Found
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            The provided documents do not contain a matching answer for your query.
          </p>
        </div>
      )}

      {/* FULL ANSWER STATE */}
      {status === "found" && (
        <>
          {/* QUERY INTERPRETATION */}
          <section>
            <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 border-b pb-2 mb-3">
              Query Interpretation
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {interpretation}
            </p>
          </section>

          {/* ANSWER BLOCK */}
          <section>
            <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 border-b pb-2 mb-3">
              Answer
            </h4>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-4 rounded-md text-zinc-700 dark:text-zinc-200">
              {answer}
            </div>
          </section>

          {/* DOCUMENT DETAILS */}
          <section>
            <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 border-b pb-2 mb-3">
              Document Details
            </h4>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(documentDetails).map(([key, value]) => (
                <div key={key} className="flex flex-col bg-zinc-50 dark:bg-zinc-800 p-3 rounded">
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">
                    {key}
                  </span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* KEYWORDS */}
          <section>
            <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 border-b pb-2 mb-3">
              Related Keywords
            </h4>
            <div>
              {keywords.map((k, i) => (
                <Badge key={i}>{k}</Badge>
              ))}
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <div className="border-t pt-4 flex flex-col gap-4">

        {/* CONFIDENCE BAR */}
        <div>
          <div className="text-xs text-zinc-500 mb-1">
            Confidence: {confidence}%
          </div>
          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded">
            <div
              className="h-2 bg-blue-600 rounded transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={copyText}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button className="px-4 py-2 text-sm rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Sources
          </button>
        </div>

      </div>
    </div>
  );
}