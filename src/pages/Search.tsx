import { Film, Search as SearchIcon, XCircle } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import { VideoPreviewCard } from '../components/feed/VideoPreviewCard';
import { borderRadius, colors, spacing, typography } from '../constants/theme';
import { mockSeries } from '../data/mockData';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  padding-bottom: 80px; /* Tab bar spacing */
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
  margin: 0 0 ${spacing.md} 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.card};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.cardBorder};
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md};
  margin-left: ${spacing.sm};
  outline: none;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const ResultsContainer = styled.div`
  flex: 1;
  padding: 0 ${spacing.md};
  max-width: 800px;
  margin: 0 auto;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: ${colors.textMuted};
  gap: ${spacing.sm};
`;

const NoResultsText = styled.div`
  font-size: ${typography.fontSize.lg};
`;

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSeries = searchQuery.length > 0
        ? mockSeries.filter(
            (s) =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : [];

    return (
        <Container>
            <Header>
                <Title>Search</Title>
                <SearchContainer>
                    <SearchIcon size={20} color={colors.textMuted} />
                    <SearchInput
                        placeholder="Search series, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery.length > 0 && (
                        <XCircle
                            size={20}
                            color={colors.textMuted}
                            onClick={() => setSearchQuery('')}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </SearchContainer>
            </Header>

            <ResultsContainer>
                {searchQuery.length === 0 ? (
                    <NoResults>
                        <SearchIcon size={48} />
                        <NoResultsText>Search for your favorite series</NoResultsText>
                    </NoResults>
                ) : filteredSeries.length === 0 ? (
                    <NoResults>
                        <Film size={48} />
                        <NoResultsText>No results found</NoResultsText>
                    </NoResults>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                        {filteredSeries.map((item, index) => (
                            <VideoPreviewCard
                                key={item.id}
                                series={item}
                                isVisible={false}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </ResultsContainer>
        </Container>
    );
}
