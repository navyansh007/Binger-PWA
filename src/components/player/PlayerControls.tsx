import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronDown,
    FastForward,
    Loader2,
    MoreHorizontal,
    Pause,
    Play,
    Rewind,
    SkipBack,
    SkipForward
} from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { formatDuration } from '../../utils/formatters';

interface PlayerControlsProps {
    visible: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    currentTime: number;
    duration: number;
    title: string;
    episodeTitle: string;
    onPlayPause: () => void;
    onSeek: (progress: number) => void;
    onClose: () => void;
    onSkipForward: () => void;
    onSkipBackward: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
}

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
`;

const TopGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  pointer-events: none;
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  pointer-events: none;
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md};
  z-index: 20;
`;

const TitleContainer = styled.div`
  flex: 1;
  margin: 0 ${spacing.md};
  text-align: center;
`;

const SeriesTitle = styled.div`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.lg};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EpisodeTitle = styled.div`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const CenterControls = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: ${spacing.xl};
  z-index: 20;
`;

const PlayButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${colors.glass};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
`;

const BottomControls = styled.div`
  padding: ${spacing.md};
  padding-bottom: ${spacing.lg};
  width: 100%;
  box-sizing: border-box;
  z-index: 20;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
`;

const StyledRange = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: ${colors.textMuted};
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${colors.accent};
    margin-top: -6px;
    box-shadow: 0 0 4px rgba(0,0,0,0.5);
  }

  &:focus {
    outline: none;
  }
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.text};
  font-size: ${typography.fontSize.sm};
  font-family: ${typography.fontFamily.body};
`;

const Spinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayerControls: React.FC<PlayerControlsProps> = ({
    visible,
    isPlaying,
    isBuffering,
    currentTime,
    duration,
    title,
    episodeTitle,
    onPlayPause,
    onSeek,
    onClose,
    onSkipForward,
    onSkipBackward,
    onNext,
    onPrevious,
}) => {
    const { lightImpact } = useHaptics();

    const handlePlayPause = () => {
        lightImpact();
        onPlayPause();
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        onSeek(val / 100);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <AnimatePresence>
            {visible && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <TopGradient />
                    <BottomGradient />

                    <TopControls>
                        <IconButton onClick={onClose}>
                            <ChevronDown size={28} />
                        </IconButton>

                        <TitleContainer>
                            <SeriesTitle>{title}</SeriesTitle>
                            <EpisodeTitle>{episodeTitle}</EpisodeTitle>
                        </TitleContainer>

                        <IconButton>
                            <MoreHorizontal size={24} />
                        </IconButton>
                    </TopControls>

                    <CenterControls>
                        {onPrevious && (
                            <IconButton onClick={onPrevious}>
                                <SkipBack size={32} />
                            </IconButton>
                        )}

                        <IconButton onClick={onSkipBackward}>
                            <Rewind size={32} />
                        </IconButton>

                        <PlayButton onClick={handlePlayPause}>
                            {isBuffering ? (
                                <Spinner
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Loader2 size={36} color={colors.text} />
                                </Spinner>
                            ) : (
                                isPlaying ? <Pause size={36} fill={colors.text} stroke={colors.text} /> : <Play size={36} fill={colors.text} stroke={colors.text} />
                            )}
                        </PlayButton>

                        <IconButton onClick={onSkipForward}>
                            <FastForward size={32} />
                        </IconButton>

                        {onNext && (
                            <IconButton onClick={onNext}>
                                <SkipForward size={32} />
                            </IconButton>
                        )}
                    </CenterControls>

                    <BottomControls>
                        <SliderContainer>
                            <StyledRange
                                type="range"
                                min="0"
                                max="100"
                                step="0.1"
                                value={progress}
                                onChange={handleSeekChange}
                            />
                        </SliderContainer>

                        <TimeRow>
                            <span>{formatDuration(Math.floor(currentTime))}</span>
                            <span>{formatDuration(Math.floor(duration))}</span>
                        </TimeRow>
                    </BottomControls>
                </Overlay>
            )}
        </AnimatePresence>
    );
};
