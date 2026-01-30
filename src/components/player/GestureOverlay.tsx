import { AnimatePresence, motion } from 'framer-motion';
import { FastForward, Rewind } from 'lucide-react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { colors, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface GestureOverlayProps {
    onTap: () => void;
    onDoubleTapLeft: () => void;
    onDoubleTapRight: () => void;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 5;
`;

const TouchZone = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Disable standard touch actions to handle custom taps */
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
`;

const SkipIndicator = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${colors.glass};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const SkipText = styled.span`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin-top: 4px;
`;

export const GestureOverlay: React.FC<GestureOverlayProps> = ({
    onTap,
    onDoubleTapLeft,
    onDoubleTapRight,
}) => {
    const { mediumImpact } = useHaptics();
    const lastTapTimeRef = useRef<{ left: number; right: number }>({ left: 0, right: 0 });
    const [leftIndicator, setLeftIndicator] = useState(false);
    const [rightIndicator, setRightIndicator] = useState(false);

    // Helper for generic double tap logic
    const handleTap = (
        side: 'left' | 'right',
        doubleTapAction: () => void,
        setIndicator: (v: boolean) => void
    ) => {
        const now = Date.now();
        const lastTime = lastTapTimeRef.current[side];
        const timeSince = now - lastTime;

        if (timeSince < 300) {
            // Double tap
            mediumImpact();
            doubleTapAction();
            setIndicator(true);
            setTimeout(() => setIndicator(false), 500);
            lastTapTimeRef.current[side] = 0;
        } else {
            // Single tap candidate
            lastTapTimeRef.current[side] = now;
            setTimeout(() => {
                // If no second tap ocurred within 300ms
                if (lastTapTimeRef.current[side] === now) {
                    onTap();
                }
            }, 300);
        }
    };

    return (
        <Container>
            <TouchZone onClick={() => handleTap('left', onDoubleTapLeft, setLeftIndicator)}>
                <AnimatePresence>
                    {leftIndicator && (
                        <SkipIndicator
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Rewind size={32} color={colors.text} fill={colors.text} />
                            <SkipText>10s</SkipText>
                        </SkipIndicator>
                    )}
                </AnimatePresence>
            </TouchZone>

            <TouchZone onClick={() => handleTap('right', onDoubleTapRight, setRightIndicator)}>
                <AnimatePresence>
                    {rightIndicator && (
                        <SkipIndicator
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <FastForward size={32} color={colors.text} fill={colors.text} />
                            <SkipText>10s</SkipText>
                        </SkipIndicator>
                    )}
                </AnimatePresence>
            </TouchZone>
        </Container>
    );
};
