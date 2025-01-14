"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CustomCodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    const loadHighlighter = async () => {
        const html = await codeToHtml(code, {
            lang: language,
            theme: 'dracula-soft',
          })
      setHighlightedCode(html);
    };

    loadHighlighter();
  }, [code, language]);

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 space-x-2">
        {/* Language badge */}
        <span className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded-md inline-flex items-center">
          <Terminal className="w-3 h-3 mr-1" />
          {language}
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-2 bottom-2 p-2 rounded-md transition-colors duration-200
          bg-slate-800 hover:bg-slate-700 opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-slate-300" />
        )}
      </button>

      {/* Code block */}
      <div className="rounded-lg overflow-hidden bg-[#282A36]">
        <div
          className="shiki-code-block p-4 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};

export default CustomCodeBlock;