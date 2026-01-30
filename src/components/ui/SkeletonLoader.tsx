import React from 'react';
import styled, { keyframes } from 'styled-components';
import { borderRadius, colors } from '../../constants/theme';

interface SkeletonLoaderProps {
    width?: string | number;
    height: string | number;
    radius?: string; // string for web css
    className?: string;
    style?: React.CSSProperties;
}

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Container = styled.div<{ $width: string | number, $height: string | number, $radius: string }>`
  width: ${props => typeof props.$width === 'number' ? `${props.$width}px` : props.$width};
  height: ${props => typeof props.$height === 'number' ? `${props.$height}px` : props.$height};
  border-radius: ${props => props.$radius};
  background-color: ${colors.primary};
  overflow: hidden;
  position: relative;
`;

const ShimmerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(197, 160, 89, 0.2) 50%, /* accent color low opacity */
    transparent 100%
  );
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    width = '100%',
    height,
    radius = borderRadius.md,
    className,
    style,
}) => {
    return (
        <Container
            $width={width}
            $height={height}
            $radius={radius}
            className={className}
            style={style}
        >
            <ShimmerOverlay />
        </Container>
    );
};
