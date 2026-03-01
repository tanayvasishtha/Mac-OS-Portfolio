import { useRef } from "react";

export function SpotifyApp() {
  const iframeRef = useRef(null);

  return (
    <div className="h-full flex flex-col bg-[#121212] text-white">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-[#1DB954] flex items-center justify-center mx-auto text-4xl">
            ♪
          </div>
          <h2 className="text-xl font-semibold">Spotify</h2>
          <p className="text-gray-400 text-sm">
            Open Spotify in a new tab to listen while you browse the portfolio.
          </p>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white font-medium transition"
          >
            Open Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
