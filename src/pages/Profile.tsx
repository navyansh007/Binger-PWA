import { motion } from 'framer-motion';
import {
    Bell,
    ChevronRight,
    Download,
    HelpCircle,
    Info,
    Settings,
    User
} from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../constants/theme';
import { useHaptics } from '../hooks/useHaptics';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding-bottom: 80px;
`;

const Header = styled.div`
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${colors.card};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.md};
  border: 2px solid ${colors.accent};
`;

const UserName = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xxl};
  margin: 0;
`;

const UserEmail = styled.p`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  margin: ${spacing.xs} 0 0 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.xl};
  margin-top: ${spacing.lg};
  padding-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.cardBorder};
  width: 100%;
  max-width: 400px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xxl};
  font-weight: bold;
`;

const StatLabel = styled.div`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin-top: ${spacing.xs};
`;

const MenuSection = styled.div`
  padding: ${spacing.md};
  max-width: 600px;
  margin: 0 auto;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${spacing.md};
  background-color: ${colors.card};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing.sm};
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.cardBorder};
  }
`;

const MenuIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.glass};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md};
`;

const MenuContent = styled.div`
  flex: 1;
`;

const MenuTitle = styled.div`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  font-weight: 500;
`;

const MenuSubtitle = styled.div`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin-top: 4px;
`;

interface MenuItemConfig {
    icon: React.ElementType;
    title: string;
    subtitle: string;
}

const menuItems: MenuItemConfig[] = [
    { icon: Download, title: 'Downloads', subtitle: 'Manage offline content' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage alerts' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: Info, title: 'About', subtitle: 'App version 1.0.0' },
];

export default function Profile() {
    const { lightImpact } = useHaptics();

    const handleMenuPress = (title: string) => {
        lightImpact();
        console.log(`Pressed: ${title}`);
    };

    return (
        <Container>
            <Header>
                <AvatarContainer
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    <User size={48} color={colors.accent} />
                </AvatarContainer>
                <UserName>Guest User</UserName>
                <UserEmail>Sign in for full experience</UserEmail>

                <StatsRow>
                    <StatItem>
                        <StatValue>12</StatValue>
                        <StatLabel>Watched</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>4</StatValue>
                        <StatLabel>In Progress</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>8</StatValue>
                        <StatLabel>My List</StatLabel>
                    </StatItem>
                </StatsRow>
            </Header>

            <MenuSection>
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <MenuItem onClick={() => handleMenuPress(item.title)}>
                            <MenuIcon>
                                <item.icon size={22} color={colors.accent} />
                            </MenuIcon>
                            <MenuContent>
                                <MenuTitle>{item.title}</MenuTitle>
                                <MenuSubtitle>{item.subtitle}</MenuSubtitle>
                            </MenuContent>
                            <ChevronRight size={20} color={colors.textMuted} />
                        </MenuItem>
                    </motion.div>
                ))}
            </MenuSection>
        </Container>
    );
}
