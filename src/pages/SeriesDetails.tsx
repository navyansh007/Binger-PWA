import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { EpisodeList, HeroSection, StoryThreads } from '../components/series';
import { colors, spacing } from '../constants/theme';
import { getSeriesById } from '../data/mockData';
import { useHaptics } from '../hooks/useHaptics';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const BackButton = styled.button`
  position: fixed;
  top: ${spacing.md};
  left: ${spacing.md};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${colors.glass};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
  backdrop-filter: blur(4px);
  color: ${colors.text};
`;

const Content = styled.div`
  padding-bottom: ${spacing.xxl};
`;

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${colors.textMuted};
  font-size: 18px;
`;

export default function SeriesDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { lightImpact, success } = useHaptics();

    const series = getSeriesById(id || '');

    if (!series) {
        return (
            <Container>
                <BackButton onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </BackButton>
                <NotFoundContainer>
                    Series not found
                </NotFoundContainer>
            </Container>
        );
    }

    const handlePlay = () => {
        lightImpact();
        const firstUnwatched = series.episodes.find((ep) => ep.progress < 100);
        const episodeToPlay = firstUnwatched || series.episodes[0];
        navigate(`/player/${episodeToPlay.id}?seriesId=${series.id}`);
    };

    const handleAddToList = () => {
        success();
        // Simulate toast or feedback
        alert('Added to list!');
    };

    const currentEpisode = series.episodes.find(
        (ep) => ep.progress > 0 && ep.progress < 100
    );

    return (
        <Container>
            <BackButton onClick={() => {
                lightImpact();
                navigate(-1);
            }}>
                <ArrowLeft size={24} strokeWidth={2.5} />
            </BackButton>

            <HeroSection
                series={series}
                onPlay={handlePlay}
                onAddToList={handleAddToList}
            />

            <Content>
                <EpisodeList
                    episodes={series.episodes}
                    seriesId={series.id}
                    currentEpisodeId={currentEpisode?.id}
                />

                {series.relatedUniverses.length > 0 && (
                    <StoryThreads relatedUniverseIds={series.relatedUniverses} />
                )}
            </Content>
        </Container>
    );
}
