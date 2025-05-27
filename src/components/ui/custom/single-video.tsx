import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlayCircle, PauseCircle } from "@mynaui/icons-react";
import { cn } from "@/lib/utils"; // Ensure cn utility for conditional classNames

function SingleVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  // Seek to the clicked position
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((newTime / videoRef.current.duration) * 100);
    }
  };

  // Show time preview tooltip
  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const previewTime =
        (offsetX / rect.width) * videoRef.current.duration || 0;
      setHoverTime(previewTime);
      setHoverPos(offsetX);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border-2 border-foreground h-auto  hover:border-primary hover:bg-primary hover:text-background"
        >
          Video <PlayCircle className="!w-6 !h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80%] border-none w-full rounded-lg overflow-hidden p-0">
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Player */}
          <video
            ref={videoRef}
            width="2400"
            height="1200"
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            controls={false}
          >
            <source
              src="https://res.cloudinary.com/dx2tjofpa/video/upload/v1739566194/Getting_diamonds_in_under_2_minutes_v6qzpo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Button (center) */}
          <button
            onClick={togglePlayPause}
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            {isPlaying ? (
              <PauseCircle className="w-24 h-24 text-white" />
            ) : (
              <PlayCircle className="w-24 h-24 text-white" />
            )}
          </button>

          {/* Custom Timeline */}
          <div
            className="absolute bottom-6 w-[calc(100%-32px)] ml-4 h-2 cursor-pointer"
            onClick={handleSeek}
            onMouseMove={handleHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            {/* Primary Progress Bar */}
            <div className="relative w-full h-2 bg-gray-500/60 rounded-full">
              {/* White line inside the primary bar */}
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              >
                {/* <div className="h-full w-2 bg-white rounded-full" /> */}
              </div>
            </div>

            {/* Time Tooltip */}
            {hoverTime !== null && (
              <div
                className="absolute -top-8 px-2 py-1 bg-black text-white text-xs rounded shadow-md"
                style={{ left: `${hoverPos}px`, transform: "translateX(-50%)" }}
              >
                {new Date(hoverTime * 1000).toISOString().substr(14, 5)}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { SingleVideo };
