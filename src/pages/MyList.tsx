import { Bookmark } from 'lucide-react';
import styled from 'styled-components';
import { VideoPreviewCard } from '../components/feed/VideoPreviewCard';
import { colors, spacing, typography } from '../constants/theme';
import { getContinueWatching } from '../data/mockData';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding-bottom: 80px;
`;

const Header = styled.div`
  padding: ${spacing.md};
  position: sticky;
  top: 0;
  background-color: ${colors.background};
  z-index: 10;
`;

const Title = styled.h1`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xxl};
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  margin: ${spacing.xs} 0 0 0;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 ${spacing.md};
  max-width: 800px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${colors.card};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.md};
`;

const EmptyTitle = styled.h2`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl};
  margin: 0 0 ${spacing.sm} 0;
`;

const EmptyText = styled.p`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  text-align: center;
  max-width: 280px;
  margin: 0;
`;

export default function MyList() {
    const myList = getContinueWatching();

    return (
        <Container>
            <Header>
                <Title>My List</Title>
                <Subtitle>{myList.length} series in your list</Subtitle>
            </Header>

            <Content>
                {myList.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>
                            <Bookmark size={36} color={colors.textMuted} />
                        </EmptyIcon>
                        <EmptyTitle>Your list is empty</EmptyTitle>
                        <EmptyText>
                            Add series to your list to keep track of what you want to watch
                        </EmptyText>
                    </EmptyState>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                        {myList.map((item, index) => (
                            <VideoPreviewCard
                                key={item.id}
                                series={item}
                                isVisible={false}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </Content>
        </Container>
    );
}
