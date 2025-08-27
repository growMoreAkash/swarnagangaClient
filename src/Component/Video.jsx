import React, { useRef, useState, useEffect } from 'react';
const video = "https://res.cloudinary.com/dnmljnbh7/video/upload/v1752947052/video_scvoun.mp4"

const VideoSection = () => {
  const wrapperRef = useRef(null);   // for lazy-loading
  const videoRef = useRef(null);   // direct <video>
  const [shouldLoad, setShouldLoad] = useState(false); // set to true when in view
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);  // start with spinner
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // ────────────────── Autoplay once loaded ──────────────────
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          // autoplay blocked – wait for user tap
          setIsPlaying(false);
          setIsBuffering(false);
        });
    }
  }, [shouldLoad]);

  /* ───── Event handlers ───── */
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsBuffering(true); // show spinner until we get 'playing'
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const format = (t) =>
    `${Math.floor(t / 60).toString().padStart(2, '0')}:${Math.floor(t % 60)
      .toString()
      .padStart(2, '0')}`;

  /* ───── Render ───── */
  return (
    <section
      ref={wrapperRef}
      className="py-12  text-white font-century"
    >
      <div className=" mx-auto">
        <h2 className=" italic sm:text-2xl text-center mb-3 font-century text-black">
          Trust us to be part of your precious moments and to deliver
        </h2>
        <h2 className="xxmd:text-5xl xmd:text-4xl  md:text-3xl sm:text-2xl text-lg  text-center mb-10 font-century text-[#bfae7a]">
          Jewellery that you'll cherish forever
        </h2>

        <div className="relative w-full overflow-hidden shadow-2xl">

          {shouldLoad && (
            <video
              ref={videoRef}
              src={video}
              preload="metadata"          
              playsInline
              muted
              loop
              className="w-full h-auto max-h-[70vh] object-cover"
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
              onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
              onWaiting={() => setIsBuffering(true)}  // network hiccup
              onPlaying={() => setIsBuffering(false)}
            />
          )}

          {/* ▸ Spinner overlay while buffering */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#bfae7a] border-t-transparent" />
            </div>
          )}
          <div className='absolute text-white bottom-[35%] left-16' >
            <h1 className='xxmd:text-5xl xmd:text-4xl  md:text-3xl sm:text-2xl text-lgitalic text-[#bfae7a]'>Where elegance finds its</h1>
            <h1 className='font-catchye xxmd:text-9xl xmd:text-8xl md:text-7xl sm:text-5xl text-3xl'>Extraordinary Artistry</h1>
          </div>

          {/* ▸ Controls */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlayPause}
                className="p-3 bg-[#bfae7a] rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-[#bfae7a] focus:ring-offset-2 focus:ring-offset-gray-900 transition"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 4a1 1 0 012 0v12a1 1 0 11-2 0V4zm6 0a1 1 0 00-1 1v12a1 1 0 102 0V5a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 3.5l11 6.5-11 6.5v-13z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;