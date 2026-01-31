import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { colors, spacing, typography } from '../../constants/theme';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';

const BackgroundImage = styled.div`
  min-height: 100vh;
  background-image: url(${HERO_IMAGE});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ContentContainer = styled.div`
  background: linear-gradient(to top, ${colors.background} 60%, transparent 100%);
  padding: ${spacing.xl};
  padding-bottom: ${spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-family: ${typography.fontFamily.header};
  font-size: 42px;
  color: ${colors.text};
  text-align: center;
  margin-bottom: ${spacing.sm};
  font-weight: 700;
  margin-top: 0;
`;

const Subtitle = styled.p`
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.lg};
  color: ${colors.textSecondary};
  text-align: center;
  margin-bottom: ${spacing.xl};
  line-height: 1.5;
  margin-top: 0;
  max-width: 400px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <BackgroundImage>
            <ContentContainer>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <Title>BINGER</Title>
                    <Subtitle>
                        Stream unlimited movies, series, and originals anytime, anywhere.
                    </Subtitle>
                </motion.div>

                <ButtonContainer>
                    <PremiumButton
                        title="Get Started"
                        onPress={() => navigate('/auth/signup')}
                        variant="primary"
                    />

                    <PremiumButton
                        title="I have an account"
                        onPress={() => navigate('/auth/login')}
                        variant="outline"
                    />
                </ButtonContainer>
            </ContentContainer>
        </BackgroundImage>
    );
}
