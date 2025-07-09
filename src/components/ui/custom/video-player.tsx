import {
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
} from "lucide-react";
import { useRef, useState } from "react";

type CustomVideoPlayerProps = Record<string, never>; // If no props are expected

type VideoRefType = HTMLVideoElement | null;

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = () => {
  const videoRef = useRef<VideoRefType>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = (): void => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = (): void => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  const handleForward = (): void => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  const handleProgress = (): void => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;

    setProgress((currentTime / duration) * 100);
    setCurrentTime(formatTime(currentTime));
    setDuration(formatTime(duration));

    if (currentTime >= duration) {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = (): void => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setVolume(videoRef.current.volume || 1);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleFullscreen = (): void => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="max-w-[1200px] flex justify-center m-4 items-center w-[calc(100%-1rem)] relative mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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

      {!isPlaying ? (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 mx-auto my-auto flex items-center justify-center bg-primary/80 backdrop-blur-sm text-white rounded-full w-16 h-16 hover:scale-110 transition-transform"
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

      {isHovering && (
        <div className="absolute bottom-0 w-full bg-black/70 px-4 py-2 text-white">
          <div
            className="relative bg-gray-300 h-2 w-full rounded cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="absolute bg-primary h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {isPlaying && (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-4">
                <button onClick={handleRewind} className="hover:text-primary">
                  <Rewind />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="hover:text-primary"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <button onClick={handleForward} className="hover:text-primary">
                  <FastForward />
                </button>

                <div className="flex items-center space-x-2 relative">
                  <button
                    onClick={handleMuteToggle}
                    className="hover:text-primary"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX />
                    ) : volume <= 0.5 ? (
                      <Volume1 />
                    ) : (
                      <Volume2 />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 max-md:hidden absolute left-full top-1"
                  />
                </div>
              </div>

              <div>
                {currentTime} / {duration}
              </div>

              <button onClick={handleFullscreen} className="hover:text-primary">
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
