import { useState } from "react";

const FUNNY_ITEMS = [
  "Your hopes and dreams",
  "The code that worked yesterday",
  "Your motivation to fix bugs",
  "The last slice of pizza",
  "Your sleep schedule",
  "404: Motivation not found",
  "The meeting that could have been an email",
  "Your will to live (jk)",
  "Unread emails from 2019",
  "That one variable you forgot to name",
  "Your dignity after debugging for 6 hours",
  "The documentation you were going to write",
  "Your backup of the backup",
  "Ctrl+Z history",
  "The bug that fixed itself",
];

export function TrashApp() {
  const [emptied, setEmptied] = useState(false);

  const handleEmpty = () => {
    setEmptied(true);
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="shrink-0 flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trash</span>
        <button
          type="button"
          onClick={handleEmpty}
          disabled={emptied}
          className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition"
        >
          {emptied ? "Emptied" : "Empty Trash"}
        </button>
      </div>
      <div className="flex-1 min-h-0 p-6 overflow-auto">
        {emptied ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-4xl">
              (empty)
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              Your trash is empty.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
              So is your soul now. Just kidding.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Items in Trash:
            </p>
            {FUNNY_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                <span className="text-2xl">🗑️</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
