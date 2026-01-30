import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import type { Series } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';
import { formatEpisodeCount } from '../../utils/formatters';

interface VideoPreviewCardProps {
    series: Series;
    isVisible: boolean;
    index: number;
}

const CardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${spacing.md};
  background-color: ${colors.card};
  cursor: pointer;
  transform: translateZ(0); /* Hardware acceleration */
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const VideoPreview = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent 0%, ${colors.primary}CC 50%, ${colors.primary} 100%);
  pointer-events: none;
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md};
  pointer-events: none;
`;

const Title = styled.h3`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  margin: 0 0 ${spacing.xs} 0;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

const Tag = styled.div`
  background-color: ${colors.glass};
  padding: 4px 8px;
  border-radius: ${borderRadius.sm};
`;

const TagText = styled.span`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs};
`;

const EpisodeCount = styled.span`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${colors.primaryLight};
`;

interface ProgressFillProps {
    $progress: number;
}

const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${(props: ProgressFillProps) => props.$progress}%;
  background-color: ${colors.accent};
`;

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
    series,
    isVisible,
    index,
}) => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { lightImpact } = useHaptics();

    const currentProgress = series.episodes.find(
        (ep) => ep.progress > 0 && ep.progress < 100
    )?.progress || 0;

    useEffect(() => {
        if (videoRef.current) {
            if (isVisible) {
                // Play needs to be silenced mostly if no interaction
                videoRef.current.muted = true;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented
                    });
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isVisible]);

    const handlePress = () => {
        lightImpact();
        navigate(`/series/${series.id}`);
    };

    return (
        <CardContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                delay: index * 0.1,
                damping: 20
            }}
            onClick={handlePress}
        >
            <ThumbnailImage
                src={series.thumbnail}
                alt={series.title}
                loading="lazy"
                style={{ opacity: isVisible ? 0 : 1 }}
            />

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    >
                        <VideoPreview
                            ref={videoRef}
                            src={series.previewVideo}
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <GradientOverlay />

            <ContentContainer>
                <Title>{series.title}</Title>
                <MetaRow>
                    <EpisodeCount>{formatEpisodeCount(series.episodeCount)}</EpisodeCount>
                    <TagsContainer>
                        {series.tags.slice(0, 2).map((tag) => (
                            <Tag key={tag}>
                                <TagText>{tag}</TagText>
                            </Tag>
                        ))}
                    </TagsContainer>
                </MetaRow>
            </ContentContainer>

            {currentProgress > 0 && (
                <ProgressBar>
                    <ProgressFill $progress={currentProgress} />
                </ProgressBar>
            )}
        </CardContainer>
    );
};
