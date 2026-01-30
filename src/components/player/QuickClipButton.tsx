import { AnimatePresence, motion } from 'framer-motion';
import { Link, Scissors, Share2, X } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { formatDuration } from '../../utils/formatters';

interface QuickClipButtonProps {
    currentTime: number;
    seriesTitle: string;
    episodeTitle: string;
}

const FloatingButton = styled.button`
  position: absolute;
  right: ${spacing.md};
  bottom: 140px; /* Above bottom controls */
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.accent};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  width: 90%;
  max-width: 340px;
  background-color: ${colors.glass};
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${colors.cardBorder};
  padding: ${spacing.lg};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.text};
  padding: 4px;
`;

const ModalTitle = styled.h3`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  text-align: center;
  margin: 0 0 ${spacing.md} 0;
`;

const ClipInfo = styled.div`
  background-color: rgba(0,0,0,0.2);
  border-radius: ${borderRadius.md};
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const ClipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ClipLabel = styled.span`
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.sm};
`;

const ClipValue = styled.span`
  color: ${colors.text};
  font-weight: 500;
  font-size: ${typography.fontSize.sm};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const ShareOption = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  color: ${colors.text};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255,255,255,0.2);
  }
`;

export const QuickClipButton: React.FC<QuickClipButtonProps> = ({
    currentTime,
    seriesTitle,
    episodeTitle,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { success, lightImpact } = useHaptics();

    const clipStart = Math.max(0, currentTime - 30);
    const clipEnd = currentTime + 30;

    const handlePress = () => {
        lightImpact();
        setIsModalVisible(true);
    };

    const handleShare = async () => {
        success();
        const shareData = {
            title: `${seriesTitle} Clip`,
            text: `Check out this clip from "${seriesTitle}" - ${episodeTitle} (${formatDuration(Math.floor(clipStart))} - ${formatDuration(Math.floor(clipEnd))})`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            // Fallback
            alert(`Shared: ${shareData.text}`);
        }
        setIsModalVisible(false);
    };

    const handleCopyLink = () => {
        success();
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        setIsModalVisible(false);
    };

    return (
        <>
            <FloatingButton onClick={handlePress}>
                <Scissors size={24} color={colors.primary} />
            </FloatingButton>

            <AnimatePresence>
                {isModalVisible && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ModalContent
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <CloseButton onClick={() => setIsModalVisible(false)}>
                                <X size={24} />
                            </CloseButton>

                            <ModalTitle>Share Clip</ModalTitle>

                            <ClipInfo>
                                <ClipRow>
                                    <ClipLabel>Series</ClipLabel>
                                    <ClipValue>{seriesTitle}</ClipValue>
                                </ClipRow>
                                <ClipRow>
                                    <ClipLabel>Episode</ClipLabel>
                                    <ClipValue>{episodeTitle}</ClipValue>
                                </ClipRow>
                                <ClipRow>
                                    <ClipLabel>Duration</ClipLabel>
                                    <ClipValue>60 seconds</ClipValue>
                                </ClipRow>
                                <ClipRow>
                                    <ClipLabel>Time Range</ClipLabel>
                                    <ClipValue>
                                        {formatDuration(Math.floor(clipStart))} - {formatDuration(Math.floor(clipEnd))}
                                    </ClipValue>
                                </ClipRow>
                            </ClipInfo>

                            <ButtonRow>
                                <ShareOption onClick={handleCopyLink}>
                                    <Link size={20} />
                                    <span>Copy Link</span>
                                </ShareOption>

                                <ShareOption onClick={handleShare}>
                                    <Share2 size={20} />
                                    <span>Share</span>
                                </ShareOption>
                            </ButtonRow>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </>
    );
};
