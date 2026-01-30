import { useEffect, useRef, useState } from 'react';

interface UseAutoplayOptions {
    viewabilityThreshold?: number; // 0-1 for IntersectionObserver
}

export const useAutoplay = (options: UseAutoplayOptions = {}) => {
    const { viewabilityThreshold = 0.5 } = options;
    const [visibleItems, setVisibleItems] = useState<string[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);

    // We keep track of registered elements to unobserve them later if needed
    const elementsRef = useRef<Map<string, Element>>(new Map());

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('data-id');
                    if (id) {
                        if (entry.isIntersecting) {
                            setVisibleItems((prev) => {
                                if (!prev.includes(id)) return [...prev, id];
                                return prev;
                            });
                        } else {
                            setVisibleItems((prev) => prev.filter((itemId) => itemId !== id));
                        }
                    }
                });
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: viewabilityThreshold,
            }
        );

        return () => {
            observer.current?.disconnect();
        };
    }, [viewabilityThreshold]);

    const register = (id: string) => (element: HTMLDivElement | null) => {
        if (element) {
            if (!elementsRef.current.has(id)) {
                elementsRef.current.set(id, element);
                element.setAttribute('data-id', id);
                observer.current?.observe(element);
            }
        } else {
            // Element unmounted
            const el = elementsRef.current.get(id);
            if (el) {
                observer.current?.unobserve(el);
                elementsRef.current.delete(id);
            }
        }
    };

    const isItemVisible = (id: string) => visibleItems.includes(id);

    return {
        isItemVisible,
        register,
    };
};
