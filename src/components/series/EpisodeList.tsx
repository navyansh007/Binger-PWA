import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import type { Episode } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';
import { formatDuration } from '../../utils/formatters';

interface EpisodeListProps {
    episodes: Episode[];
    seriesId: string;
    currentEpisodeId?: string;
}

const Container = styled.div`
  margin-top: ${spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spacing.lg};
  margin-bottom: ${spacing.md};
`;

const Title = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  font-weight: 600;
  margin: 0;
`;

const SeeAllText = styled.button`
  background: none;
  border: none;
  color: ${colors.accent};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  padding: 0;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${spacing.md};
  padding: 0 ${spacing.lg} ${spacing.lg} ${spacing.lg};
  
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for mobile feel */
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  scroll-snap-type: x mandatory;
`;

interface EpisodeCardProps {
    $isActive: boolean;
}

const EpisodeCard = styled.div<EpisodeCardProps>`
  min-width: 160px;
  width: 160px;
  border-radius: ${borderRadius.md};
  overflow: hidden;
  border: ${props => props.$isActive ? `2px solid ${colors.accent}` : '2px solid transparent'};
  cursor: pointer;
  scroll-snap-align: start;
  background-color: ${colors.card};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DurationBadge = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2px 4px;
  border-radius: ${borderRadius.sm};
  font-size: 10px;
  color: ${colors.text};
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${colors.primaryLight};
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${colors.accent};
`;

const InfoContainer = styled.div`
  padding: ${spacing.sm};
`;

const EpisodeNumber = styled.div`
  color: ${colors.textMuted};
  font-size: ${typography.fontSize.xs};
  margin-bottom: 2px;
`;

const EpisodeTitle = styled.div`
  color: ${colors.text};
  font-size: ${typography.fontSize.sm};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EpisodeList: React.FC<EpisodeListProps> = ({
    episodes,
    seriesId,
    currentEpisodeId,
}) => {
    const navigate = useNavigate();
    const { lightImpact } = useHaptics();

    const handleEpisodePress = (episode: Episode) => {
        lightImpact();
        navigate(`/player/${episode.id}?seriesId=${seriesId}`);
    };

    return (
        <Container>
            <Header>
                <Title>Episodes</Title>
                <SeeAllText>See All</SeeAllText>
            </Header>

            <ScrollContainer>
                {episodes.map((episode, index) => {
                    const isActive = episode.id === currentEpisodeId;
                    return (
                        <motion.div
                            key={episode.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <EpisodeCard
                                $isActive={isActive}
                                onClick={() => handleEpisodePress(episode)}
                            >
                                <ThumbnailContainer>
                                    <Thumbnail src={episode.thumbnail} loading="lazy" />

                                    {episode.progress === 0 && (
                                        <PlayOverlay>
                                            <PlayCircle size={32} color={colors.text} />
                                        </PlayOverlay>
                                    )}

                                    <DurationBadge>
                                        {formatDuration(episode.duration)}
                                    </DurationBadge>

                                    {episode.progress > 0 && (
                                        <ProgressBar>
                                            <ProgressFill $progress={episode.progress} />
                                        </ProgressBar>
                                    )}
                                </ThumbnailContainer>

                                <InfoContainer>
                                    <EpisodeNumber>Episode {index + 1}</EpisodeNumber>
                                    <EpisodeTitle title={episode.title}>{episode.title}</EpisodeTitle>
                                </InfoContainer>
                            </EpisodeCard>
                        </motion.div>
                    );
                })}
            </ScrollContainer>
        </Container>
    );
};
