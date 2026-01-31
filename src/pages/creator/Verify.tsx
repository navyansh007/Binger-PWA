import { ArrowLeft, CloudUpload, FileText } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Header = styled.div`
  padding: ${spacing.md};
  padding-top: ${spacing.lg};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.cardBorder};
`;

const BackButton = styled.button`
  padding: ${spacing.sm};
  margin-right: ${spacing.sm};
  background: none;
  border: none;
  color: ${colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  font-weight: 700;
  margin: 0;
`;

const Content = styled.div`
  padding: ${spacing.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Label = styled.label`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin-bottom: ${spacing.xs};
  display: block;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  background-color: ${colors.card};
  border-radius: ${borderRadius.md};
  padding: ${spacing.md};
  border: 1px solid ${colors.cardBorder};
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const StyledTextArea = styled.textarea`
  background: transparent;
  border: none;
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
  width: 100%;
  outline: none;
  resize: none;
  min-height: 80px;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const FilePicker = styled.div`
  background-color: ${colors.card};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  border: 1px dashed ${colors.cardBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.cardBorder}40;
  }
`;

const FileTextLabel = styled.span`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: 14px;
`;

const InfoBox = styled.div`
  background-color: ${colors.accent}20;
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  border-left: 4px solid ${colors.accent};
  margin-bottom: ${spacing.lg};
`;

const InfoText = styled.p`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin: 0;
  line-height: 1.5;
`;

export default function VerifyCreator() {
    const navigate = useNavigate();
    const { upgradeToCreator, user } = useAuth();
    const { success, error: hapticError } = useHaptics();

    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState('');
    const [idProof, setIdProof] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePickFile = () => {
        // Mock file pick
        setIdProof('id_proof_doc.pdf');
        success();
    };

    const handleSubmit = async () => {
        if (!name || !bio || !idProof) {
            hapticError();
            alert('Please fill name, bio and upload ID proof.');
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            await upgradeToCreator({ name, bio });
            success();
            alert('Verification Successful! Welcome to the Binger Creator Program!');

            // Replace current history entry to prevent going back to verify page
            navigate('/creator/dashboard', { replace: true });
        } catch (e) {
            hapticError();
            alert('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </BackButton>
                <Title>Become a Creator</Title>
            </Header>

            <Content>
                <InfoBox>
                    <InfoText>
                        Start your journey as a Binger Creator. Upload your ID to get verified instantly and start sharing your stories with the world.
                    </InfoText>
                </InfoBox>

                <Section>
                    <Label>Creator Name</Label>
                    <InputWrapper>
                        <StyledInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Display Name"
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Bio / About</Label>
                    <InputWrapper>
                        <StyledTextArea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Identity Proof (Govt ID)</Label>
                    <FilePicker onClick={handlePickFile}>
                        {idProof ? (
                            <FileText size={32} color={colors.accent} />
                        ) : (
                            <CloudUpload size={32} color={colors.accent} />
                        )}
                        <FileTextLabel>{idProof || "Tap to upload (PDF/JPG)"}</FileTextLabel>
                    </FilePicker>
                </Section>

                <div style={{ height: 40 }} />

                <PremiumButton
                    title={loading ? "Verifying..." : "Submit for Verification"}
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={loading}
                />
            </Content>
        </Container>
    );
}
