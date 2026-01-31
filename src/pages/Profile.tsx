import { motion } from 'framer-motion';
import {
  BarChart2,
  Bell,
  CheckCircle,
  ChevronRight,
  Download,
  HelpCircle,
  Info,
  LogOut,
  Settings,
  Star,
  User
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PremiumButton } from '../components/ui/PremiumButton';
import { borderRadius, colors, spacing, typography } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useHaptics } from '../hooks/useHaptics';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding-bottom: 100px;
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

const VerifiedBadge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  background-color: ${colors.accent + '20'};
  padding: 2px 8px;
  border-radius: 12px;
`;

const VerifiedText = styled.span`
  color: ${colors.accent};
  font-size: 10px;
  font-weight: bold;
  margin-left: 4px;
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

const MenuItem = styled.button<{ $isDestructive?: boolean }>`
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

const MenuTitle = styled.div<{ $isDestructive?: boolean }>`
  color: ${props => props.$isDestructive ? colors.error : colors.text};
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
  isDestructive?: boolean;
  action?: () => void;
}

export default function Profile() {
  const navigate = useNavigate();
  const { lightImpact } = useHaptics();
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut();
      navigate('/auth/login');
    }
  };

  const handleCreatorAction = () => {
    lightImpact();
    if (user?.isCreator) {
      navigate('/creator/dashboard');
    } else {
      navigate('/creator/verify');
    }
  };

  const menuItems: MenuItemConfig[] = [
    { icon: Download, title: 'Downloads', subtitle: 'Manage offline content' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage alerts' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: Info, title: 'About', subtitle: 'App version 1.0.0' },
    { icon: LogOut, title: 'Log Out', subtitle: 'Sign out of your account', isDestructive: true, action: handleLogout },
  ];

  const handleMenuPress = (item: MenuItemConfig) => {
    lightImpact();
    if (item.action) {
      item.action();
    } else {
      console.log(`Pressed: ${item.title}`);
    }
  };

  return (
    <Container>
      <Header>
        <AvatarContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <User size={48} color={user?.isCreator ? colors.accent : colors.textMuted} />
        </AvatarContainer>
        <UserName>{user?.name || 'Guest User'}</UserName>
        <UserEmail>{user?.email || 'Sign in for full experience'}</UserEmail>

        {user?.isCreator && (
          <VerifiedBadge>
            <CheckCircle size={12} color={colors.accent} />
            <VerifiedText>VERIFIED CREATOR</VerifiedText>
          </VerifiedBadge>
        )}

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: spacing.lg }}
        >
          <PremiumButton
            title={user?.isCreator ? "Creator Studio" : "Become a Creator"}
            icon={user?.isCreator ? BarChart2 : Star}
            onPress={handleCreatorAction}
            variant={user?.isCreator ? "outline" : "primary"}
          />
        </motion.div>

        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <MenuItem
              onClick={() => handleMenuPress(item)}
              $isDestructive={item.isDestructive}
            >
              <MenuIcon>
                <item.icon size={22} color={item.isDestructive ? colors.error : colors.accent} />
              </MenuIcon>
              <MenuContent>
                <MenuTitle $isDestructive={item.isDestructive}>{item.title}</MenuTitle>
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
