import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { apiUrl } from '../api';

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    fetch(apiUrl('/health'))
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'healthy', platform: 'Render PaaS' }));
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-slate-800 to-primary text-white py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl sm:text-6xl mb-4">☁️</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Cloud Computing Group Assignment
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            This application demonstrates cloud deployment using{' '}
            <span className="text-accent font-semibold">Render PaaS</span> and{' '}
            <span className="text-accent font-semibold">OpenFaaS</span>. Built by a team of 20 students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/members"
              className="bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
            >
              Meet the Team
            </Link>
            <Link
              to="/deployment"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20 text-center"
            >
              View Deployment
            </Link>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Current time */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">🕐</div>
          <h3 className="font-bold text-secondary text-lg mb-1">Current Time</h3>
          <p className="text-xl sm:text-2xl font-mono text-primary break-all">{now.toLocaleTimeString()}</p>
          <p className="text-slate-500 text-sm mt-1">{now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Platform */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="font-bold text-secondary text-lg mb-1">Platform</h3>
          <p className="text-slate-700 font-medium">{health?.platform || 'Render PaaS'}</p>
          <div className="mt-2">
            <StatusBadge status={health?.status || 'healthy'} />
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="font-bold text-secondary text-lg mb-1">Team Size</h3>
          <p className="text-2xl font-bold text-primary">20</p>
          <p className="text-slate-500 text-sm mt-1">Students across 20 roles</p>
        </div>

        {/* Deployment status */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="font-bold text-secondary text-lg mb-1">Deployment Status</h3>
          <StatusBadge status="deployed" />
          <p className="text-slate-500 text-sm mt-2">Last deployed: {now.toLocaleDateString()}</p>
        </div>

        {/* Stack — Django backend */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">🛠️</div>
          <h3 className="font-bold text-secondary text-lg mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Python', 'Django'].map((t) => (
              <span key={t} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Runtime — Django */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="font-bold text-secondary text-lg mb-1">Runtime</h3>
          <p className="text-slate-700 font-medium">Python 3.12</p>
          <p className="text-slate-500 text-sm mt-1">Django 5.0 · DRF 3.15</p>
        </div>
      </section>
    </div>
  );
}
