import {
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Volume1, // Import Volume1 icon for medium volume
  Maximize,
} from "lucide-react";
import { useRef, useState } from "react";

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isHovering, setIsHovering] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    videoRef.current.currentTime += 10;
  };

  const handleProgress = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;

    setProgress((currentTime / duration) * 100);
    setCurrentTime(formatTime(currentTime));
    setDuration(formatTime(duration));

    if (currentTime >= duration) {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume > 0) {
      setIsMuted(false); // Automatically unmute when volume is adjusted
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      videoRef?.current.muted = false;
      setIsMuted(false);
      setVolume(videoRef.current.volume || 1); // Restore volume if muted
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(0); // Set volume to 0 when muted
    }
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="max-w-[1200px] flex justify-center m-4 items-center w-[calc(100%-1rem)] relative mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        width="1200"
        height="600"
        className="w-full h-full"
        controls={false}
        onTimeUpdate={handleProgress}
        onLoadedMetadata={handleProgress}
      >
        <source
          src="https://res.cloudinary.com/dx2tjofpa/video/upload/v1734095633/c8alknmbpzbjkbnljjhk.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Button in the Center */}
      {!isPlaying ? (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 mx-auto my-auto flex items-center justify-center bg-[#067a01]/80 backdrop-blur-sm text-white rounded-full w-16 h-16 hover:scale-110 transition-transform"
        >
          <Play size={32} className="pl-1" />
        </button>
      ) : isHovering ? (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 mx-auto my-auto flex items-center justify-center bg-black/50 text-white rounded-full w-16 h-16 hover:scale-110 transition-transform"
        >
          <Pause size={32} />
        </button>
      ) : null}

      {/* Controls (Bottom Bar) */}
      {isHovering && (
        <div className="absolute bottom-0 w-full bg-black/70 px-4 py-2 text-white ">
          {/* {/* Progress Bar2} */}
          <div
            className="relative bg-gray-300 h-2 w-full rounded cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="absolute bg-[#067a01] h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Control Buttons */}
          {isPlaying && (
            <div className="flex items-center justify-between mt-2 ">
              <div className="flex items-center space-x-4">
                <button onClick={handleRewind} className="hover:text-[#067a01]">
                  <Rewind />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="hover:text-[#067a01]"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <button
                  onClick={handleForward}
                  className="hover:text-[#067a01]"
                >
                  <FastForward />
                </button>

                {/* Volume/Mute Control */}
                <div className="flex items-center  space-x-2 relative">
                  <button
                    onClick={handleMuteToggle}
                    className="hover:text-[#067a01]"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX />
                    ) : volume <= 0.5 ? (
                      <Volume1 /> // Display Volume1 for medium volume
                    ) : (
                      <Volume2 />
                    )}
                  </button>
                  {/* Show the slider when hovering the volume area */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume} // Bind the slider to volume or mute
                    onChange={handleVolumeChange}
                    className="w-24 max-md:hidden absolute left-full top-1" // Make it visible on top of icons
                  />
                </div>
              </div>

              {/* Time Display */}
              <div>
                {currentTime} / {duration}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="hover:text-[#067a01]"
              >
                <Maximize />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
