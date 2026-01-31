import { ArrowLeft, UserPlus } from 'lucide-react';
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

export default function Signup() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const { success, error: hapticError } = useHaptics();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            hapticError();
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await signUp();
            success();
            alert('Account Created! Welcome to Binger.');
            // Immediate navigation
            navigate('/');
        } catch (e) {
            hapticError();
            alert('Could not create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
            </BackButton>

            <HeaderText>Create Account</HeaderText>
            <SubText>Start your journey with Binger.</SubText>

            <InputContainer>
                <InputWrapper>
                    <Label>Full Name</Label>
                    <StyledInput
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputWrapper>

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
                title={loading ? 'Creating Account...' : 'Sign Up'}
                onPress={handleSignup}
                loading={loading}
                icon={UserPlus}
                style={{ marginTop: spacing.md }}
            />
        </Container>
    );
}
