import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TableView from './pages/TableView';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-darker overflow-hidden text-gray-200">
        <Sidebar />
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
    </Router>
  )
}

export default App;
