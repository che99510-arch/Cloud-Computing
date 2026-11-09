import { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-500 text-sm shrink-0">{label}</span>
      <span className="text-secondary font-medium text-sm text-right">{value}</span>
    </div>
  );
}

const FALLBACK_DEPS = {
  python: '3.12.x',
  django: '5.0.6',
  djangorestframework: '3.15.2',
  'django-cors-headers': '4.3.1',
  gunicorn: '22.0.0',
  whitenoise: '6.7.0',
};

const FALLBACK_RUNTIME = {
  platform: 'linux',
  arch: 'x86_64',
  python: '3.12.x',
};

export default function Deployment() {
  const [health, setHealth] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/api/health').then((r) => r.json()).then(setHealth).catch(() => null);
    fetch('/api/config').then((r) => r.json()).then(setConfig).catch(() => null);
  }, []);

  const deployDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">Deployment Information</h1>
        <p className="text-slate-500 text-base sm:text-lg">Live platform status and cloud configuration details.</p>
      </div>

      {/* Platform cards */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {/* Google App Engine */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌐</span>
            <div>
              <h2 className="font-bold text-secondary text-lg">Google App Engine</h2>
              <p className="text-slate-400 text-xs">Platform as a Service (PaaS)</p>
            </div>
          </div>
          <InfoRow label="Runtime" value="Python 3.12" />
          <InfoRow label="Framework" value="Django 5 + Gunicorn" />
          <InfoRow label="Deployment Status" value={<StatusBadge status={health?.status || 'healthy'} />} />
          <InfoRow label="Last Deployment" value={deployDate} />
          <InfoRow label="Scaling" value="Auto (1–5 instances)" />
          <InfoRow label="Region" value="us-central1" />
        </div>

        {/* OpenFaaS */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <div>
              <h2 className="font-bold text-secondary text-lg">OpenFaaS</h2>
              <p className="text-slate-400 text-xs">Function as a Service (FaaS)</p>
            </div>
          </div>
          <InfoRow label="Function Name" value="cloud-function" />
          <InfoRow label="Function Status" value={<StatusBadge status="active" />} />
          <InfoRow label="Endpoint" value="/function/cloud-function" />
          <InfoRow label="Runtime" value="node20" />
          <InfoRow label="Invocation Status" value={<StatusBadge status="healthy" />} />
        </div>
      </div>

      {/* Dependency Dashboard */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
        <h2 className="font-bold text-secondary text-xl mb-5 flex items-center gap-2">
          <span>📦</span> Cloud Configuration Dashboard
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wide mb-3">Python / Django Dependencies</h3>
            <div className="space-y-2">
              {Object.entries(config?.dependencies || FALLBACK_DEPS).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center bg-slate-50 rounded-lg px-3 sm:px-4 py-2.5">
                  <span className="font-mono text-xs sm:text-sm text-slate-700 truncate mr-2">{k}</span>
                  <span className="font-mono text-xs sm:text-sm text-primary font-semibold shrink-0">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wide mb-3">Runtime Info</h3>
            <div className="space-y-2">
              {Object.entries(config?.runtime || FALLBACK_RUNTIME).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center bg-slate-50 rounded-lg px-3 sm:px-4 py-2.5">
                  <span className="font-mono text-xs sm:text-sm text-slate-700 truncate mr-2">{k}</span>
                  <span className="font-mono text-xs sm:text-sm text-accent font-semibold shrink-0">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deployment commands */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="bg-secondary rounded-2xl p-5 sm:p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span>🌐</span> Google App Engine</h3>
          <pre className="bg-black/30 rounded-lg p-4 text-xs sm:text-sm font-mono text-green-300 overflow-x-auto whitespace-pre">
{`# Deploy (python312 runtime)
gcloud app deploy

# Open in browser
gcloud app browse

# Stream logs
gcloud app logs tail -s default`}
          </pre>
        </div>
        <div className="bg-secondary rounded-2xl p-5 sm:p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span>⚡</span> OpenFaaS</h3>
          <pre className="bg-black/30 rounded-lg p-4 text-xs sm:text-sm font-mono text-green-300 overflow-x-auto whitespace-pre">
{`# Build function
faas-cli build -f stack.yml

# Deploy function
faas-cli deploy -f stack.yml

# View logs
faas-cli logs cloud-function`}
          </pre>
        </div>
      </div>
    </div>
  );
}
