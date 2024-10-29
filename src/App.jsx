import '../src/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { NavbarComponent } from './components/NavbarComponent';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirección para rutas no definidas */}
      </Routes>
    </Router>
  );
}

export default App;
