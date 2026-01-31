import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface PremiumButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ElementType;
    style?: React.CSSProperties;
    className?: string; // Add className prop for styled-components capability
}

const ButtonContainer = styled(motion.button) <{ $variant: string }>`
  height: 50px;
  width: 100%;
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${props => props.$variant === 'outline' ? `1px solid ${colors.accent}` : 'none'};
  background: ${props => {
        if (props.$variant === 'primary') return `linear-gradient(135deg, ${colors.accent} 0%, #FFD700 50%, ${colors.accent} 100%)`;
        if (props.$variant === 'outline') return 'rgba(0,0,0,0.3)';
        return 'transparent';
    }};
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${props => props.$variant === 'primary' && css`
    box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
    &:hover {
        box-shadow: 0 6px 20px rgba(197, 160, 89, 0.5);
    }
  `}
`;

const ContentWrapper = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${spacing.sm};
  width: 100%;
  height: 100%;
`;

const ButtonText = styled.span<{ $variant: string }>`
  color: ${props => props.$variant === 'primary' ? colors.background : colors.text};
  font-family: 'Poppins', sans-serif;
  font-size: ${typography.fontSize.md};
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

export const PremiumButton: React.FC<PremiumButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon: Icon,
    style,
    className,
}) => {
    const { selection } = useHaptics();

    const handleClick = () => {
        if (!disabled && !loading) {
            selection();
            onPress();
        }
    };

    const isPrimary = variant === 'primary';

    return (
        <ButtonContainer
            onClick={handleClick}
            disabled={disabled || loading}
            style={style}
            $variant={variant}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className={className}
        >
            <ContentWrapper $variant={variant}>
                {loading ? (
                    <Loader2
                        size={20}
                        color={isPrimary ? colors.background : colors.accent}
                        className="animate-spin"
                        style={{ animation: 'spin 1s linear infinite' }}
                    />
                ) : (
                    <>
                        {Icon && (
                            <Icon
                                size={20}
                                color={isPrimary ? colors.background : colors.text}
                            />
                        )}
                        <ButtonText $variant={variant}>{title}</ButtonText>
                    </>
                )}
            </ContentWrapper>
        </ButtonContainer>
    );
};
