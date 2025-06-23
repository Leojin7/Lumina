import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import Contacts from './pages/Contacts';
import Files from './pages/Files';
import ChatWithLumina from './pages/chat';
import Processing from './pages/process';
import ImageAnalysis from './pages/Image';
import PluginMarketplace from './pages/PluginMarketplace';
import PrivacyControls from './pages/privacy';
import AuthPage from './pages/AuthPage';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderOn = ["/auth"];

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && <Header />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="pt-4"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/files" element={<Files />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/chat" element={<ChatWithLumina />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/image-analysis" element={<ImageAnalysis />} />
            <Route path="/plugins" element={<PluginMarketplace />} />
            <Route path="/privacy" element={<PrivacyControls />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
