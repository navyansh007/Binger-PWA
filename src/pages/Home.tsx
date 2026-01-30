import styled from 'styled-components';
import { HomeFeed } from '../components/feed/HomeFeed';
import { colors, spacing, typography } from '../constants/theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Header = styled.header`
  padding: ${spacing.md};
  padding-top: ${spacing.lg};
  position: sticky;
  top: 0;
  background-color: ${colors.background}EE;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 10;
`;

const Logo = styled.h1`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xxl};
  letter-spacing: 2px;
  margin: 0;
  font-weight: 700;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Logo>BINGER</Logo>
      </Header>
      <HomeFeed />
    </Container>
  );
};

export default Home;
