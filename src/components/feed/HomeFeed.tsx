import React from 'react';
import styled from 'styled-components';
import { colors, spacing, typography } from '../../constants/theme';
import { getContinueWatching, getTrending, mockSeries, type Series } from '../../data/mockData';
import { useAutoplay } from '../../hooks/useAutoplay';
import { VideoPreviewCard } from './VideoPreviewCard';

const Container = styled.div`
  width: 100%;
  padding-bottom: 100px; /* Space for TabBar */
`;

const SectionHeader = styled.div`
  padding: ${spacing.md};
  padding-bottom: ${spacing.sm};
`;

const SectionTitle = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  margin: 0;
  font-weight: 600;
`;

const SectionSubtitle = styled.p`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm};
  margin: ${spacing.xs} 0 0 0;
`;

const CardWrapper = styled.div`
  padding: 0 ${spacing.md};
`;

interface FeedItem {
    id: string;
    type: 'header' | 'series';
    title?: string;
    subtitle?: string;
    series?: Series;
}

export const HomeFeed: React.FC = () => {
    const { isItemVisible, register } = useAutoplay({ viewabilityThreshold: 0.6 });

    const continueWatching = getContinueWatching();
    const trending = getTrending();

    const feedData: FeedItem[] = [
        ...(continueWatching.length > 0
            ? [
                { id: 'header-continue', type: 'header' as const, title: 'Continue Watching', subtitle: 'Pick up where you left off' },
                ...continueWatching.map((s) => ({ id: `continue-${s.id}`, type: 'series' as const, series: s })),
            ]
            : []),
        { id: 'header-trending', type: 'header' as const, title: 'Trending Now', subtitle: 'What everyone is watching' },
        ...trending.map((s) => ({ id: `trending-${s.id}`, type: 'series' as const, series: s })),
        { id: 'header-all', type: 'header' as const, title: 'All Series', subtitle: 'Explore our collection' },
        ...mockSeries.map((s) => ({ id: `all-${s.id}`, type: 'series' as const, series: s })),
    ];

    return (
        <Container>
            {feedData.map((item, index) => {
                if (item.type === 'header') {
                    return (
                        <SectionHeader key={item.id}>
                            <SectionTitle>{item.title}</SectionTitle>
                            {item.subtitle && <SectionSubtitle>{item.subtitle}</SectionSubtitle>}
                        </SectionHeader>
                    );
                }

                if (item.type === 'series' && item.series) {
                    return (
                        <CardWrapper
                            key={item.id}
                            ref={register(item.id)}
                        >
                            <VideoPreviewCard
                                series={item.series}
                                isVisible={isItemVisible(item.id)}
                                index={index}
                            />
                        </CardWrapper>
                    );
                }

                return null;
            })}
        </Container>
    );
};
