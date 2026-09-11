import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import Hls from "hls.js";
export default function VideoPlayer({ item, onClose }) {
  const ref = useRef(null);
  const video =
    item?.videos?.results?.find(
      (v) => v.site === "YouTube" && ["Trailer", "Teaser"].includes(v.type),
    ) || item?.videos?.results?.find((v) => v.site === "YouTube");
  const licensed = import.meta.env.VITE_VIDEO_URL || "";
  useEffect(() => {
    if (!licensed || !ref.current || !licensed.includes(".m3u8")) return undefined;

    const videoEl = ref.current;
    let hls = null;

    try {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(licensed);
        hls.attachMedia(videoEl);
      } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
        videoEl.src = licensed;
      }
    } catch (error) {
      console.warn("Unable to initialize HLS player:", error);
    }

    return () => {
      try {
        if (hls && typeof hls.destroy === "function") {
          hls.destroy();
        }
      } catch (error) {
        console.warn("Unable to destroy HLS player:", error);
      }

      if (videoEl) {
        try {
          videoEl.pause();
          videoEl.removeAttribute("src");
          videoEl.load();
        } catch (error) {
          console.warn("Unable to reset video element:", error);
        }
      }
    };
  }, [licensed]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-3 backdrop-blur-sm sm:p-8">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-black/70 text-white hover:bg-white/15"
          aria-label="Close player"
        >
          <X />
        </button>
        <div className="aspect-video bg-black">
          {licensed ? (
            <video
              ref={ref}
              className="h-full w-full"
              controls
              autoPlay
              playsInline
              src={licensed.includes(".m3u8") ? "" : licensed}
            />
          ) : video ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1`}
              title={`${item.title || item.name} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="text-lg font-semibold">
                  No playable video available
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                  Configure a licensed MP4, WebM or HLS URL with VITE_VIDEO_URL,
                  or choose a title with a TMDB trailer.
                </p>
              </div>
            </div>
          )}
        </div>
        {video && !licensed && (
          <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
            <div>
              <p className="font-semibold">{item.title || item.name}</p>
              <p className="text-xs text-white/40">
                Trailer · playing inside StreamFlix
              </p>
            </div>
            <a
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white"
              href={`https://www.youtube.com/watch?v=${video.key}`}
              target="_blank"
              rel="noreferrer"
            >
              Source <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
