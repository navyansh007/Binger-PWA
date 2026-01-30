import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { getSeriesById, type Series } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';

interface StoryThreadsProps {
    relatedUniverseIds: string[];
}

const Container = styled.div`
  margin-top: ${spacing.xl};
  padding: 0 ${spacing.lg} ${spacing.lg};
`;

const Header = styled.div`
  margin-bottom: ${spacing.md};
`;

const Title = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  margin: 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.sm};
  margin: 4px 0 0 0;
`;

const ThreadsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.lg} 0;
  overflow-x: auto;
`;

const NodeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const ThreadNode = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.full};
  overflow: hidden;
  border: 2px solid ${colors.cardBorder};
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    border-color: ${colors.accent};
  }
`;

const NodeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ConnectionLine = styled.div`
  height: 2px;
  width: 40px;
  background-color: ${colors.cardBorder};
  margin-top: -30px; /* Align with center of node (node height 80 + text offset) */
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.accent};
  filter: blur(12px);
  z-index: 1;
`;

const NodeTitle = styled.div`
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.xs};
  margin-top: ${spacing.sm};
  text-align: center;
  max-width: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StoryThreads: React.FC<StoryThreadsProps> = ({
    relatedUniverseIds,
}) => {
    const navigate = useNavigate();
    const { lightImpact } = useHaptics();

    const relatedSeries = relatedUniverseIds
        .map((id) => getSeriesById(id))
        .filter((s): s is Series => s !== undefined);

    if (relatedSeries.length === 0) return null;

    const handleNodePress = (series: Series) => {
        lightImpact();
        navigate(`/series/${series.id}`);
    };

    return (
        <Container>
            <Header>
                <Title>Connected Universe</Title>
                <Subtitle>Explore related stories</Subtitle>
            </Header>

            <ThreadsContainer>
                {relatedSeries.map((series, index) => (
                    <React.Fragment key={series.id}>
                        {index > 0 && <ConnectionLine />}
                        <NodeWrapper onClick={() => handleNodePress(series)}>
                            <GlowEffect
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    delay: index * 0.1,
                                    damping: 15,
                                }}
                            >
                                <ThreadNode>
                                    <NodeImage src={series.thumbnail} alt={series.title} />
                                </ThreadNode>
                            </motion.div>
                            <NodeTitle title={series.title}>{series.title}</NodeTitle>
                        </NodeWrapper>
                    </React.Fragment>
                ))}
            </ThreadsContainer>
        </Container>
    );
};
