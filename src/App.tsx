import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DesktopOverlay } from './components/DesktopOverlay';
import { TabBar } from './components/navigation/TabBar';
import { theme } from './constants/theme';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Welcome from './pages/auth/Welcome';
import CreatorDashboard from './pages/creator/Dashboard';
import UploadVideo from './pages/creator/Upload';
import VerifyCreator from './pages/creator/Verify';
import Home from './pages/Home';
import MyList from './pages/MyList';
import Player from './pages/Player';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SeriesDetails from './pages/SeriesDetails';

const AppContent = () => {
  const location = useLocation();
  // Hide tab bar on player, auth, and creator pages
  const hideTabBar =
    location.pathname.startsWith('/player') ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/creator');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/player/:episodeId" element={<Player />} />

        {/* Auth Routes */}
        <Route path="/auth/welcome" element={<Welcome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Creator Routes */}
        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/creator/upload" element={<UploadVideo />} />
        <Route path="/creator/verify" element={<VerifyCreator />} />
      </Routes>
      {!hideTabBar && <TabBar />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <DesktopOverlay />
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
