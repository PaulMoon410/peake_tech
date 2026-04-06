
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { AlertsProvider } from './context/AlertsContext';
import { IncidentsProvider } from './context/IncidentsContext';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

function Sidebar() {
  return (
    <nav className="sidebar" style={{width: 220, background: '#222b31', color: 'white', height: '100vh', position: 'fixed', left: 0, top: 0, padding: '2rem 1rem'}}>
      <h2 style={{fontSize: '1.3rem', marginBottom: '2rem'}}>Cyber Infra</h2>
      <ul style={{listStyle: 'none', padding: 0, lineHeight: 2}}>
        <li><Link to="/cyber/threat-monitoring" style={{color: 'inherit', textDecoration: 'none'}}>Threat Monitoring</Link></li>
        <li><Link to="/cyber/incident-response" style={{color: 'inherit', textDecoration: 'none'}}>Incident Response</Link></li>
        <li><Link to="/cyber/asset-inventory" style={{color: 'inherit', textDecoration: 'none'}}>Asset Inventory</Link></li>
        <li><Link to="/cyber/user-management" style={{color: 'inherit', textDecoration: 'none'}}>User Management</Link></li>
        <li><Link to="/cyber/system-health" style={{color: 'inherit', textDecoration: 'none'}}>System Health</Link></li>
      </ul>
      <div style={{position: 'absolute', bottom: 20, left: 20, fontSize: '0.9rem', opacity: 0.7}}>Powered by Peake Technologies</div>
    </nav>
  );
}

function Placeholder({ title, description }) {
  return (
    <div style={{marginLeft: 240, padding: '2rem'}}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div style={{marginTop: '2rem', color: '#888'}}>Feature coming soon...</div>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AlertsProvider>
          <IncidentsProvider>
            <Router basename="/cyber">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/threat-monitoring" element={<Dashboard />} />
                <Route path="/incident-response" element={<Placeholder title="Incident Response" description="Track incidents, update statuses, and access response playbooks." />} />
                <Route path="/asset-inventory" element={<Placeholder title="Asset Inventory" description="Browse and manage your infrastructure assets and devices." />} />
                <Route path="/user-management" element={<Placeholder title="User Management" description="Manage team members, roles, and access permissions." />} />
                <Route path="/system-health" element={<Placeholder title="System Health" description="Monitor uptime, performance, and patch status of your systems." />} />
                <Route path="*" element={<Placeholder title="Not Found" description="The page you are looking for does not exist." />} />
              </Routes>
            </Router>
          </IncidentsProvider>
        </AlertsProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
