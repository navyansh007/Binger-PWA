import { ArrowLeft, CloudUpload, Video } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
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

const UploadBox = styled.div`
  height: 200px;
  background-color: ${colors.card};
  border-radius: ${borderRadius.lg};
  border: 1px dashed ${colors.cardBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.cardBorder}40;
  }
`;

const MockProgressBar = styled.div<{ $progress: number }>`
  height: 6px;
  width: ${props => props.$progress}%;
  background-color: ${colors.accent};
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const ProgressContainer = styled.div`
  height: 6px;
  width: 100%;
  background-color: ${colors.cardBorder};
  border-radius: 3px;
  overflow: hidden;
  margin-top: ${spacing.md};
`;

export default function UploadVideo() {
    const navigate = useNavigate();
    const { success, error: hapticError, selection } = useHaptics();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePickVideo = () => {
        setVideoFile('my_awesome_video.mp4');
        selection();
    };

    const handleUpload = async () => {
        if (!title || !videoFile) {
            hapticError();
            alert('Please add title and select a video.');
            return;
        }

        setUploading(true);
        let currentProgress = 0;

        // Simulate upload
        const interval = setInterval(() => {
            currentProgress += Math.random() * 10;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);

                success();
                alert('Upload Complete! Your video is now live.');
                navigate(-1);
            }
            setProgress(currentProgress);
        }, 300);
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </BackButton>
                <Title>Upload Video</Title>
            </Header>

            <Content>
                <Section>
                    <Label>Video File</Label>
                    <UploadBox onClick={handlePickVideo}>
                        <Video
                            size={48}
                            color={videoFile ? colors.accent : colors.textMuted}
                        />
                        <Label>{videoFile || "Tap to select video"}</Label>
                    </UploadBox>
                </Section>

                <Section>
                    <Label>Title</Label>
                    <InputWrapper>
                        <StyledInput
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Video Title"
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Description</Label>
                    <InputWrapper>
                        <StyledTextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's this video about?"
                        />
                    </InputWrapper>
                </Section>

                {uploading && (
                    <Section>
                        <Label>Uploading... {Math.round(progress)}%</Label>
                        <ProgressContainer>
                            <MockProgressBar $progress={progress} />
                        </ProgressContainer>
                    </Section>
                )}

                <PremiumButton
                    title={uploading ? "Uploading..." : "Publish Video"}
                    onPress={handleUpload}
                    loading={uploading}
                    icon={CloudUpload}
                />
            </Content>
        </Container>
    );
}
