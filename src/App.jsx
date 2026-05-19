import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TableView from './pages/TableView';
import { FaBars } from 'react-icons/fa';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

function App() {
  const { setSidebarOpen } = useContext(AppContext);

  return (
    <Router>
      <div className="flex h-screen w-full bg-darker overflow-hidden text-gray-200 relative">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Top Bar */}
          <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-darker z-20">
            <button onClick={() => setSidebarOpen(true)} className="text-white text-xl p-1 hover:text-neonBlue transition-colors">
              <FaBars />
            </button>
            <h1 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonGreen">
              CodeTrack
            </h1>
            <div className="w-8"></div>
          </header>

          <main className="flex-1 h-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/table" element={<TableView />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App;
