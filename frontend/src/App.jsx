import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import Deployment from './pages/Deployment';
import EnvConfig from './pages/EnvConfig';
import Logs from './pages/Logs';
import About from './pages/About';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="/config" element={<EnvConfig />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
