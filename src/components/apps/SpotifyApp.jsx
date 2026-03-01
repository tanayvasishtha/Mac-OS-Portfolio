/**
 * Spotify in-app: embedded player (Ubuntu portfolio style).
 * Uses Spotify’s embed so playback stays inside the portfolio.
 */
export function SpotifyApp() {
  return (
    <div className="h-full flex flex-col bg-[#121212] text-white">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="p-2 border-b border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-sm">♪</div>
          <span className="font-semibold text-sm">Spotify</span>
        </div>
        <div className="flex-1 min-h-0 relative">
          <iframe
            src="https://open.spotify.com/embed/playlist/6pEbErhMyNati1TEcZ8jsz?utm_source=generator&theme=0"
            title="Spotify Embed: Build Inc. Playlist"
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
