import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '../../constants/theme';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const CardContainer = styled.div`
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${colors.cardBorder};
  background-color: ${colors.glass};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 16px;
`;

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    style,
}) => {
    return (
        <CardContainer className={className} style={style}>
            {children}
        </CardContainer>
    );
};
