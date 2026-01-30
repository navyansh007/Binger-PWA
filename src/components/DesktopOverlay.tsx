import { Smartphone } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../constants/theme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.colors.text};
  padding: 24px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.header};
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 24px;
  color: ${theme.colors.accent};
`;

const Message = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: 1.25rem;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${theme.colors.textSecondary};
`;

const IconWrapper = styled.div`
  margin-bottom: 32px;
  color: ${theme.colors.accent};
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

export const DesktopOverlay = () => {
    return (
        <OverlayContainer>
            <IconWrapper>
                <Smartphone size={64} />
            </IconWrapper>
            <Title>Mobile Experience Only</Title>
            <Message>
                Binger is designed as a Progressive Web App for mobile devices.
                <br /><br />
                For the verified experience, please open this URL on your phone
                and tap <strong>"Add to Home Screen"</strong>.
            </Message>
        </OverlayContainer>
    );
};
