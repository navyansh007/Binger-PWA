import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface HapticButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    hapticType?: 'light' | 'medium' | 'heavy' | 'selection';
}

interface StyledButtonProps {
    $variant: 'primary' | 'secondary' | 'ghost';
    $size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const getBackgroundColor = (variant: string, disabled?: boolean) => {
    if (disabled) return colors.textMuted;
    switch (variant) {
        case 'primary':
            return colors.accent;
        case 'secondary':
            return colors.glass;
        case 'ghost':
            return 'transparent';
        default:
            return colors.accent;
    }
};

const getPadding = (size: string) => {
    switch (size) {
        case 'sm':
            return `${spacing.sm} ${spacing.md}`;
        case 'lg':
            return `${spacing.md} ${spacing.xl}`;
        default:
            return `${parseInt(spacing.sm) + 4}px ${spacing.lg}`;
    }
};

const StyledButton = styled(motion.button) <StyledButtonProps>`
  background-color: ${props => getBackgroundColor(props.$variant, props.disabled)};
  border-radius: ${borderRadius.full};
  border: ${props => props.$variant === 'ghost' ? `1px solid ${colors.accent}` : 'none'};
  padding: ${props => getPadding(props.$size)};
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%; /* Default to full width behavior like RN often implies if container constrained, but let usage dictate */
  box-sizing: border-box;
  
  /* Text Styles */
  color: ${props => props.$variant === 'primary' ? colors.primary : colors.text};
  font-family: ${typography.fontFamily.body};
  font-weight: 500;
  font-size: ${props =>
        props.$size === 'sm' ? typography.fontSize.sm :
            props.$size === 'lg' ? typography.fontSize.lg :
                typography.fontSize.md};
  text-align: center;
`;

export const HapticButton: React.FC<HapticButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className,
    style,
    textStyle,
    hapticType = 'light',
}) => {
    const { lightImpact, mediumImpact, heavyImpact, selection } = useHaptics();

    const hapticFeedback = () => {
        switch (hapticType) {
            case 'medium':
                mediumImpact();
                break;
            case 'heavy':
                heavyImpact();
                break;
            case 'selection':
                selection();
                break;
            default:
                lightImpact();
        }
    };

    const handleClick = () => {
        if (!disabled) {
            hapticFeedback();
            onPress();
        }
    };

    return (
        <StyledButton
            $variant={variant}
            $size={size}
            disabled={disabled}
            className={className}
            style={style}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {typeof children === 'string' ? (
                <span style={textStyle}>{children}</span>
            ) : (
                children
            )}
        </StyledButton>
    );
};
