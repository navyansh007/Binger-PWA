import { ArrowLeft, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.card};
  border-radius: 20px;
  margin-bottom: ${spacing.xl};
  border: none;
  cursor: pointer;
  color: ${colors.text};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.cardBorder};
  }
`;

const HeaderText = styled.h1`
  font-family: ${typography.fontFamily.header};
  font-size: 32px;
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
  margin-top: 0;
  font-weight: 700;
`;

const SubText = styled.p`
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.xxl};
  margin-top: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
`;

const InputWrapper = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  padding: ${spacing.md};
  border: 1px solid ${colors.cardBorder};
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
  outline: none;
  width: 100%;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const Label = styled.label`
  color: ${colors.textMuted};
  font-size: 12px;
  margin-bottom: 4px;
  font-family: ${typography.fontFamily.body};
  display: block;
`;

export default function Login() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { success, error: hapticError } = useHaptics();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            hapticError();
            alert('Please fill in both email and password.');
            return;
        }

        setLoading(true);
        try {
            // Validate credentials
            const isValid = await signIn(email, password);

            if (isValid) {
                success();
                // Immediate navigation to tabs (home)
                navigate('/');
            } else {
                hapticError();
                alert('Invalid email or password.');
            }
        } catch (e) {
            hapticError();
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
            </BackButton>

            <HeaderText>Let's sign you in.</HeaderText>
            <SubText>Welcome back to Binger.</SubText>

            <InputContainer>
                <InputWrapper>
                    <Label>Email</Label>
                    <StyledInput
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label>Password</Label>
                    <StyledInput
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </InputWrapper>
            </InputContainer>

            <PremiumButton
                title={loading ? 'Signing in...' : 'Sign In'}
                onPress={handleLogin}
                loading={loading}
                icon={LogIn}
                style={{ marginTop: spacing.md }}
            />
        </Container>
    );
}
