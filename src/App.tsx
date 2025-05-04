import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MangaListPage from './pages/MangaListPage';
import MangaDetailPage from './pages/MangaDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';
import './App.css';
import './styles/variables.css';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/manga" element={<Layout><MangaListPage /></Layout>} />
          <Route path="/manga/:mangaId" element={<Layout><MangaDetailPage /></Layout>} />
          <Route path="/subscription" element={<Layout><SubscriptionPage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
        </Routes>
    </Router>
  );
}

export default App;
