import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/theme';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string; // Allow styled-components extension
    style?: React.CSSProperties;
    colors?: string[];
    as?: React.ElementType;
}

const StyledText = styled.span<{ $gradientColors: string[] }>`
  background: linear-gradient(to right, ${props => props.$gradientColors.join(', ')});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* Fallback */
  display: inline-block;
`;

export const GradientText: React.FC<GradientTextProps> = ({
    children,
    className,
    style,
    colors: gradientColors = [colors.accent, colors.accentLight, colors.accent],
    as = 'span'
}) => {
    return (
        <StyledText
            as={as}
            className={className}
            style={style}
            $gradientColors={gradientColors}
        >
            {children}
        </StyledText>
    );
};
