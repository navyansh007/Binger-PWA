import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Plus, Star } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { type Series } from '../../data/mockData';
import { formatRating } from '../../utils/formatters';
import { HapticButton } from '../ui/HapticButton';

interface HeroSectionProps {
  series: Series;
  onPlay: () => void;
  onAddToList: () => void;
}

const Container = styled.div`
  height: 80vh; /* High impact hero */
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(to bottom, transparent 0%, ${colors.primary}AA 40%, ${colors.background} 100%);
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xxxl};
  margin: 0 0 ${spacing.sm} 0;
  line-height: 1.1;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  font-size: ${typography.fontSize.md};
  color: ${colors.textSecondary};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.accent};
  font-weight: 500;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

const Tag = styled.div`
  background-color: ${colors.glass};
  padding: 4px 12px;
  border-radius: ${borderRadius.sm};
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing.lg} 0;
  max-width: 600px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const HeroSection: React.FC<HeroSectionProps> = ({
  series,
  onPlay,
  onAddToList,
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <Container>
      <HeroImage
        src={series.thumbnail}
        alt={series.title}
        style={{ y }}
      />
      <GradientOverlay />
      <ContentContainer>
        <Title>{series.title}</Title>
        <MetaRow>
          <RatingContainer>
            <Star size={16} fill={colors.accent} stroke={colors.accent} />
            <span>{formatRating(series.rating)}</span>
          </RatingContainer>
          <span>{series.totalDuration}</span>
          <span>{series.episodeCount} Episodes</span>
        </MetaRow>

        <TagsContainer>
          {series.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>

        <Description>{series.description}</Description>

        <ButtonRow>
          <div style={{ width: 140 }}>
            <HapticButton onPress={onPlay} variant="primary" hapticType="medium">
              <ButtonContent>
                <Play size={20} fill={colors.primary} stroke={colors.primary} />
                <span>Play</span>
              </ButtonContent>
            </HapticButton>
          </div>

          <div style={{ width: 140 }}>
            <HapticButton onPress={onAddToList} variant="secondary" hapticType="light">
              <ButtonContent>
                <Plus size={20} />
                <span>My List</span>
              </ButtonContent>
            </HapticButton>
          </div>
        </ButtonRow>
      </ContentContainer>
    </Container>
  );
};
