import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DesktopOverlay } from './components/DesktopOverlay';
import { TabBar } from './components/navigation/TabBar';
import { theme } from './constants/theme';
import Home from './pages/Home';
import MyList from './pages/MyList';
import Player from './pages/Player';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SeriesDetails from './pages/SeriesDetails';

const AppContent = () => {
  const location = useLocation();
  // Hide tab bar on player page to allow full screen immersion
  const hideTabBar = location.pathname.startsWith('/player');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/player/:episodeId" element={<Player />} />
      </Routes>
      {!hideTabBar && <TabBar />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DesktopOverlay />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
