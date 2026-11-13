import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

/* HoverPlayCard port from macterm v1 — no framer-motion.
   Hover autoplays muted; click unmutes and plays; state from video events. */

const HoverPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovering && !userStarted) {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => {});
    }
  }, [hovering, userStarted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setUserStarted(false);
    };
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserStarted(true);
      video.muted = false;
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-raised md:rounded-2xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video ref={videoRef} src={src} playsInline preload="metadata" muted className="block h-auto w-full bg-background-1" />

      {hovering || !playing ? (
        <div className="absolute inset-0 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="pointer-events-auto absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-background-1/50 text-foreground shadow-raised backdrop-blur-sm transition-colors hover:bg-background-1/75"
            aria-label={playing ? 'Pause video' : 'Play video'}
          >
            {playing ? <Pause className="size-7" /> : <Play className="size-7" />}
          </button>
          <span className="shadow-raised absolute bottom-3 left-3 rounded-full bg-background-1/60 px-2.5 py-1 font-mono text-meta uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            {playing ? 'Playing' : 'Paused'}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default function VideoOverview({ src }) {
  return (
    <div className="rise mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-card p-px">
      <div
        className="rounded-2xl bg-cover bg-center p-4 md:p-8 lg:p-12"
        style={{ backgroundImage: 'url(macterm/bluetex.png)' }}
      >
        <HoverPlayer src={src} />
      </div>
    </div>
  );
}
