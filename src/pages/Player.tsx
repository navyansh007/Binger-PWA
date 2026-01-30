import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { QuickClipButton } from '../components/player/QuickClipButton';
import { VideoPlayer } from '../components/player/VideoPlayer';
import { colors } from '../constants/theme';
import { getSeriesById } from '../data/mockData';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.black};
  overflow: hidden;
`;

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.black};
  color: ${colors.textMuted};
  font-size: 18px;
`;

export default function Player() {
    const { episodeId } = useParams<{ episodeId: string }>();
    const [searchParams] = useSearchParams();
    const seriesId = searchParams.get('seriesId');
    const navigate = useNavigate();

    const series = getSeriesById(seriesId || '');
    const episode = series?.episodes.find((ep) => ep.id === episodeId);

    if (!series || !episode) {
        return (
            <NotFoundContainer>
                Episode not found
            </NotFoundContainer>
        );
    }

    const currentIndex = series.episodes.findIndex((ep) => ep.id === episodeId);
    const hasNext = currentIndex < series.episodes.length - 1;
    const hasPrevious = currentIndex > 0;

    const handleClose = () => {
        navigate(-1);
    };

    const handleNext = () => {
        if (hasNext) {
            const nextEpisode = series.episodes[currentIndex + 1];
            navigate(`/player/${nextEpisode.id}?seriesId=${series.id}`, { replace: true });
        }
    };

    const handlePrevious = () => {
        if (hasPrevious) {
            const prevEpisode = series.episodes[currentIndex - 1];
            navigate(`/player/${prevEpisode.id}?seriesId=${series.id}`, { replace: true });
        }
    };

    // Convert progress (0-100) to seconds
    const initialPosition = (episode.progress / 100) * episode.duration;

    return (
        <Container>
            <VideoPlayer
                videoUrl={episode.videoUrl}
                title={series.title}
                episodeTitle={episode.title}
                onClose={handleClose}
                onNext={hasNext ? handleNext : undefined}
                onPrevious={hasPrevious ? handlePrevious : undefined}
                initialPosition={initialPosition}
            />

            <QuickClipButton
                currentTime={initialPosition}
                seriesTitle={series.title}
                episodeTitle={episode.title}
            />
        </Container>
    );
}
