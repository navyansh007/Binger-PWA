import { useCallback } from 'react';

export const useHaptics = () => {
    const vibrate = useCallback((pattern: number | number[]) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }, []);

    const selection = useCallback(() => vibrate(10), [vibrate]);
    const lightImpact = useCallback(() => vibrate(20), [vibrate]);
    const mediumImpact = useCallback(() => vibrate(40), [vibrate]);
    const heavyImpact = useCallback(() => vibrate(60), [vibrate]);
    const success = useCallback(() => vibrate([50, 50]), [vibrate]);
    const error = useCallback(() => vibrate([50, 100, 50]), [vibrate]);

    return {
        selection,
        lightImpact,
        mediumImpact,
        heavyImpact,
        success,
        error,
    };
};
