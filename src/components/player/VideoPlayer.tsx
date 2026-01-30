import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/theme';
import { GestureOverlay } from './GestureOverlay';
import { PlayerControls } from './PlayerControls';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    episodeTitle: string;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    initialPosition?: number;
}

const Container = styled.div`
  flex: 1;
  background-color: ${colors.black};
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoUrl,
    title,
    episodeTitle,
    onClose,
    onNext,
    onPrevious,
    initialPosition = 0,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState(initialPosition);
    const [duration, setDuration] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);

    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (showControls) {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false);
                }
            }, 4000);
        }

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [showControls, isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = initialPosition;
        }
    }, []); // Run once on mount if needed, but video src change handles mostly

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setIsBuffering(false);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
        setIsBuffering(false);
        setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }, [isPlaying]);

    const seekTo = useCallback((seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = seconds;
        }
    }, []);

    const skipForward = useCallback(() => {
        const newTime = Math.min(currentTime + 10, duration);
        seekTo(newTime);
    }, [currentTime, duration, seekTo]);

    const skipBackward = useCallback(() => {
        const newTime = Math.max(currentTime - 10, 0);
        seekTo(newTime);
    }, [currentTime, seekTo]);

    const handleTap = useCallback(() => {
        setShowControls((prev) => !prev);
    }, []);

    const handleDoubleTapLeft = useCallback(() => {
        skipBackward();
    }, [skipBackward]);

    const handleDoubleTapRight = useCallback(() => {
        skipForward();
    }, [skipForward]);

    const handleSeek = useCallback((progress: number) => {
        const newTime = progress * duration;
        seekTo(newTime);
    }, [duration, seekTo]);

    return (
        <Container>
            <StyledVideo
                ref={videoRef}
                src={videoUrl}
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onWaiting={handleWaiting}
                onPlaying={handlePlaying}
                onPause={handlePause}
            />

            <GestureOverlay
                onTap={handleTap}
                onDoubleTapLeft={handleDoubleTapLeft}
                onDoubleTapRight={handleDoubleTapRight}
            />

            <PlayerControls
                visible={showControls}
                isPlaying={isPlaying}
                isBuffering={isBuffering}
                currentTime={currentTime}
                duration={duration}
                title={title}
                episodeTitle={episodeTitle}
                onPlayPause={togglePlayPause}
                onSeek={handleSeek}
                onClose={onClose}
                onSkipForward={skipForward}
                onSkipBackward={skipBackward}
                onNext={onNext}
                onPrevious={onPrevious}
            />
        </Container>
    );
};
