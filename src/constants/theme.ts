export const colors = {
    // Primary palette
    primary: '#2D0909',
    primaryLight: '#4A1515',
    primaryDark: '#1A0505',

    // Accent
    accent: '#C5A059',
    accentLight: '#D4B77A',
    accentDark: '#A88A48',

    // Text
    text: '#FFF5E1',
    textSecondary: 'rgba(255, 245, 225, 0.7)',
    textMuted: 'rgba(255, 245, 225, 0.5)',

    // Backgrounds
    background: '#0D0303',
    glass: 'rgba(45, 9, 9, 0.7)',
    card: 'rgba(45, 9, 9, 0.85)',
    cardBorder: 'rgba(197, 160, 89, 0.2)',

    // Utility
    success: '#4CAF50',
    error: '#FF5252',
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.6)',
};

export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
};

export const borderRadius = {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
};

export const typography = {
    fontFamily: {
        header: "'Poppins', sans-serif",
        body: "'Inter', sans-serif",
    },
    fontSize: {
        xs: '10px',
        sm: '12px',
        md: '14px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px',
        hero: '40px',
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

export const theme = {
    colors,
    spacing,
    borderRadius,
    typography,
    // Shadows adapted for web CSS
    shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.25)',
        md: '0 4px 8px rgba(0,0,0,0.3)',
        lg: '0 8px 16px rgba(0,0,0,0.4)',
        glow: `0 0 12px ${colors.accent}`,
    }
};

export type Theme = typeof theme;

// Styled-components default theme extension
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}
