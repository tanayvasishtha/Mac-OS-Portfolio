/**
 * Safari app - behaves like Ubuntu portfolio's Chrome browser.
 * Uses iframe for Google, custom placeholders for other sites.
 */
import { useState } from "react";

const DEFAULT_URL = "https://www.google.com";
const GOOGLE_WEBHP = "https://www.google.com/webhp?igu=1&gws_rd=ssl";

export function BrowserApp() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [inputValue, setInputValue] = useState(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState(false);

  const handleGo = (e) => {
    e?.preventDefault();
    let u = inputValue.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u)) {
      u = `https://www.google.com/search?q=${encodeURIComponent(u)}`;
    } else if (!u.startsWith("http://") && !u.startsWith("https://")) {
      u = "https://" + u;
    }
    setIsLoading(true);
    setUrl(u);
    setInputValue(u);
    setTimeout(() => setIsLoading(false), 300);
  };

  const goHome = () => {
    setIsLoading(true);
    setUrl(DEFAULT_URL);
    setInputValue(DEFAULT_URL);
    setTimeout(() => setIsLoading(false), 300);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mb-4" />
          <p className="text-gray-600 dark:text-gray-600">Loading...</p>
        </div>
      );
    }

    // Google homepage - use webhp URL like Ubuntu Chrome
    if (url.includes("google.com") && !url.includes("google.com/search")) {
      return (
        <iframe
          src={GOOGLE_WEBHP}
          width="100%"
          height="100%"
          frameBorder="0"
          className="border-0 w-full h-full"
          title="Google Search"
        />
      );
    }

    // Google search - iframe with search URL
    if (url.includes("google.com/search")) {
      return (
        <iframe
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          className="border-0 w-full h-full"
          title="Google Search Results"
        />
      );
    }

    // Custom placeholders for sites that block embedding (like Ubuntu Chrome)
    if (url.includes("github.com")) {
      return (
        <div className="h-full bg-white dark:bg-gray-100 p-8 text-center overflow-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">⌘</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">GitHub</h1>
          <p className="text-gray-600 mb-4">Welcome to GitHub! This is a simulated browser experience.</p>
          <div className="bg-gray-50 dark:bg-gray-200 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2 text-gray-900">Popular Repositories</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>microsoft/vscode</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>facebook/react</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>vercel/next.js</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes("stackoverflow.com")) {
      return (
        <div className="h-full bg-white dark:bg-gray-100 p-8 text-center overflow-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">?</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Stack Overflow</h1>
          <p className="text-gray-600 mb-4">The world&apos;s largest developer community.</p>
          <div className="bg-gray-50 dark:bg-gray-200 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2 text-gray-900">Popular Questions</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>How to center a div in CSS?</div>
              <div>What is the difference between let and var in JavaScript?</div>
              <div>How to install npm packages?</div>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes("developer.mozilla.org")) {
      return (
        <div className="h-full bg-white dark:bg-gray-100 p-8 text-center overflow-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">MDN Web Docs</h1>
          <p className="text-gray-600 mb-4">Resources for developers, by developers.</p>
          <div className="bg-gray-50 dark:bg-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-900">Web Technologies</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm">HTML</span>
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm">CSS</span>
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm">JavaScript</span>
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm">React</span>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes("ubuntu.com")) {
      return (
        <div className="h-full bg-white dark:bg-gray-100 p-8 text-center overflow-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">U</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Ubuntu</h1>
          <p className="text-gray-600 mb-4">The world&apos;s most popular open source operating system.</p>
          <div className="bg-gray-50 dark:bg-gray-200 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2 text-gray-900">Ubuntu Features</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Free and open source</div>
              <div>Secure and reliable</div>
              <div>Easy to use</div>
              <div>Great for developers</div>
            </div>
          </div>
        </div>
      );
    }

    // Other URLs - try iframe
    return (
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        className="border-0 w-full h-full"
        title="Safari browser"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    );
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shrink-0">
        <button
          type="button"
          onClick={goHome}
          className="px-3 py-1.5 rounded-lg text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
        >
          Home
        </button>
        <form onSubmit={handleGo} className="flex-1 flex min-w-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setInputValue(url)}
            placeholder="Search Google or type a URL"
            className="flex-1 min-w-0 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
          >
            Go
          </button>
        </form>
      </div>
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
