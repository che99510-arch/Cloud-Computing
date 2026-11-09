import { useState, useEffect } from 'react';

export default function EnvConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/api/config').then((r) => r.json()).then(setConfig).catch(() => null);
  }, []);

  const safeEnv = config?.environment || {
    NODE_ENV: 'production',
    APP_NAME: 'Cloud Project',
    PLATFORM: 'Google App Engine',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">Environment Configuration</h1>
        <p className="text-slate-500">Only safe, non-sensitive variables are displayed. Secrets are never exposed.</p>
      </div>

      {/* Safe vars */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-6">
        <h2 className="font-bold text-secondary text-lg mb-4 flex items-center gap-2">
          <span>✅</span> Safe Environment Variables
        </h2>
        <div className="space-y-3">
          {Object.entries(safeEnv).map(([key, val]) => (
            <div key={key} className="bg-slate-50 rounded-xl px-5 py-3 flex items-center justify-between font-mono">
              <span className="text-accent font-semibold text-sm">{key}</span>
              <span className="text-slate-700 text-sm">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden secrets notice */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-red-700 text-lg mb-3 flex items-center gap-2">
          <span>🔒</span> Hidden Sensitive Variables
        </h2>
        <p className="text-red-600 text-sm mb-3">The following variable types are intentionally hidden for security:</p>
        <ul className="space-y-2">
          {['API_KEY', 'DATABASE_PASSWORD', 'ACCESS_TOKEN', 'SERVICE_ACCOUNT_JSON'].map((key) => (
            <div key={key} className="bg-white border border-red-100 rounded-lg px-5 py-2.5 flex items-center justify-between font-mono">
              <span className="text-red-500 font-semibold text-sm">{key}</span>
              <span className="text-slate-400 text-sm">••••••••</span>
            </div>
          ))}
        </ul>
      </div>

      {/* .gitignore reminder */}
      <div className="bg-secondary rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><span>📄</span> .gitignore — Secrets Excluded</h3>
        <pre className="bg-black/30 rounded-lg p-4 text-sm font-mono text-green-300 overflow-x-auto">
{`.env
.env.local
.env.production
node_modules/
*.key
*.pem
service-account.json`}
        </pre>
      </div>
    </div>
  );
}
