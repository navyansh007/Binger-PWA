import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../constants/theme';
import type { Series } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';

interface ThumbnailCardProps {
    series: Series;
    isLarge?: boolean;
}

// Portrait Aspect Ratio (2:3 approx)
const CARD_WIDTH = '110px';
const CARD_HEIGHT = '160px';

const Container = styled(motion.div)`
  margin-right: ${spacing.sm};
  width: ${CARD_WIDTH};
  cursor: pointer;
  position: relative;
`;

const CardImage = styled.img`
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  border-radius: ${borderRadius.sm};
  background-color: ${colors.card};
  object-fit: cover;
  display: block; // Removes minimal inline spacing
`;

const NewBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
  background-color: ${colors.primary};
  padding: 2px 6px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const NewText = styled.span`
  color: ${colors.background};
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ series }) => {
    const navigate = useNavigate();
    const { lightImpact } = useHaptics();

    const handlePress = () => {
        lightImpact();
        navigate(`/series/${series.id}`);
    };

    const isNew = Math.random() < 0.3; // Mock "New" label logic

    return (
        <Container
            onClick={handlePress}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <CardImage
                src={series.thumbnail}
                alt={series.title}
                loading="lazy"
            />
            {isNew && (
                <NewBadge>
                    <NewText>NEW EPISODE</NewText>
                </NewBadge>
            )}
        </Container>
    );
};
