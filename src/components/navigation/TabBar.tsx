import { motion } from 'framer-motion';
import { Bookmark, Home, Search, User } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderRadius, colors, spacing } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface TabConfig {
    name: string;
    label: string;
    icon: React.ElementType;
    path: string;
}

const tabConfig: TabConfig[] = [
    { name: 'home', label: 'Home', icon: Home, path: '/' },
    { name: 'search', label: 'Search', icon: Search, path: '/search' },
    { name: 'mylist', label: 'My List', icon: Bookmark, path: '/mylist' },
    { name: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

const Container = styled(motion.nav)`
  position: fixed;
  bottom: ${spacing.sm};
  left: ${spacing.lg};
  right: ${spacing.lg};
  height: 64px;
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${colors.cardBorder};
  background-color: ${colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  height: 100%;
`;

const TabIconContainer = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
`;

interface TabLabelProps {
    $focused: boolean;
}

const TabLabel = styled.span<TabLabelProps>`
  color: ${(props: TabLabelProps) => (props.$focused ? colors.accent : colors.textMuted)};
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  margin-top: 2px;
  font-weight: 500;
  transition: color 0.3s ease;
`;

export const TabBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selection } = useHaptics();

    return (
        <Container
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.3 }}
        >
            {tabConfig.map((tab) => {
                const isFocused = location.pathname === tab.path;

                const handlePress = () => {
                    selection();
                    navigate(tab.path);
                };

                return (
                    <TabButton key={tab.name} onClick={handlePress}>
                        <TabIconContainer
                            animate={{
                                scale: isFocused ? 1.1 : 1,
                                backgroundColor: isFocused ? `${colors.accent}20` : 'transparent',
                            }}
                            transition={{ type: 'spring', damping: 15 }}
                        >
                            <tab.icon
                                size={24}
                                color={isFocused ? colors.accent : colors.textMuted}
                                strokeWidth={isFocused ? 2.5 : 2}
                            />
                        </TabIconContainer>
                        <TabLabel $focused={isFocused}>{tab.label}</TabLabel>
                    </TabButton>
                );
            })}
        </Container>
    );
};
