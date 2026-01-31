import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThumbnailCard } from '../../components/series/ThumbnailCard';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { mockSeries } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';

// Mock uploaded videos (using existing mock data for demo)
const myVideos = mockSeries.slice(0, 4);

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding-bottom: 100px;
`;

const Header = styled.div`
  padding: ${spacing.md};
  padding-top: ${spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin: 0;
  margin-top: 4px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.text};
  padding: ${spacing.xs};
  border-radius: 50%;
  
  &:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }
`;

const StatsGrid = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${spacing.md};
  gap: ${spacing.md};
`;

const StatCard = styled.div`
  flex: 1;
  background-color: ${colors.card};
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.cardBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.span`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: 12px;
`;

const SectionTitle = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.lg};
  margin: ${spacing.md};
  margin-bottom: ${spacing.sm};
  font-weight: 600;
`;

const UploadFAB = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${colors.accent};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(229, 9, 20, 0.4);
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0 ${spacing.md};
  
  @media (min-width: 768px) {
     grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
`;

const VideoItem = styled.div`
  aspect-ratio: 2/3;
`;

export default function CreatorDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { selection } = useHaptics();

    return (
        <Container>
            <Header>
                <div>
                    <Title>Creator Studio</Title>
                    <Subtitle>Welcome back, {user?.name}</Subtitle>
                </div>
                <CloseButton onClick={() => navigate('/')}>
                    <X size={24} />
                </CloseButton>
            </Header>

            <StatsGrid>
                <StatCard>
                    <StatValue>12.5K</StatValue>
                    <StatLabel>Total Views</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>854</StatValue>
                    <StatLabel>Subscribers</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{myVideos.length}</StatValue>
                    <StatLabel>Videos</StatLabel>
                </StatCard>
            </StatsGrid>

            <SectionTitle>Your Content</SectionTitle>

            <VideoGrid>
                {myVideos.map((item) => (
                    <VideoItem key={item.id}>
                        <ThumbnailCard series={item} />
                    </VideoItem>
                ))}
            </VideoGrid>

            <UploadFAB onClick={() => {
                selection();
                navigate('/creator/upload');
            }}>
                <Plus size={30} color={colors.background} />
            </UploadFAB>
        </Container>
    );
}
