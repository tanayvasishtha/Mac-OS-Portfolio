import { useState } from "react";

export function NotepadApp() {
  const [text, setText] = useState("");

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing..."
          className="w-full h-full min-h-[200px] p-3 resize-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 border-0 outline-none font-sans text-sm leading-relaxed"
          spellCheck
        />
      </div>
    </div>
  );
}
