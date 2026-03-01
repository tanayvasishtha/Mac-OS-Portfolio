import { useState } from "react";

const NOTES_EMAIL = "edgepersonal2004@gmail.com";

export function NotepadApp() {
  const [text, setText] = useState("");

  const handleSave = () => {
    const subject = encodeURIComponent("Note from Portfolio");
    const body = encodeURIComponent(text.trim() || "(No content)");
    window.location.href = `mailto:${NOTES_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</span>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition"
        >
          Save
        </button>
      </div>
      <div className="flex-1 min-h-0 p-4 overflow-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing... When you click Save, this note will be sent to me via email."
          className="w-full h-full min-h-[200px] p-3 resize-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 border-0 outline-none font-sans text-sm leading-relaxed"
          spellCheck
        />
      </div>
    </div>
  );
}
