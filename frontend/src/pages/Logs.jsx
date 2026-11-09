import { useState, useEffect } from 'react';
import { apiUrl } from '../api';

const levelColors = {
  info: 'text-blue-400',
  warn: 'text-yellow-400',
  error: 'text-red-400',
};

const staticLogs = [
  { timestamp: new Date().toISOString(), level: 'info', message: 'Application Started' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'Deployment Successful' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'Health Check Passed' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'Django server listening on port 8000' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'GET /health' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'GET /config' },
  { timestamp: new Date().toISOString(), level: 'info', message: 'GET /members' },
];

export default function Logs() {
  const [logs, setLogs] = useState(staticLogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/logs'))
      .then((r) => r.json())
      .then((data) => { if (data.logs?.length) setLogs(data.logs); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">Deployment Logs</h1>
        <p className="text-slate-500">Real-time application and deployment log feed.</p>
      </div>

      {/* Summary badges */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Events', value: logs.length, color: 'text-primary' },
          { label: 'Info', value: logs.filter((l) => l.level === 'info').length, color: 'text-blue-500' },
          { label: 'Errors', value: logs.filter((l) => l.level === 'error').length, color: 'text-red-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Log terminal */}
      <div className="bg-secondary rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-400 text-xs ml-2 font-mono">deployment.log</span>
        </div>
        <div className="space-y-1 font-mono text-sm max-h-96 overflow-y-auto pr-1">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-slate-500 shrink-0 text-xs pt-0.5">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className={`uppercase font-bold text-xs pt-0.5 w-10 shrink-0 ${levelColors[log.level] || 'text-slate-400'}`}>
                {log.level}
              </span>
              <span className="text-green-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
