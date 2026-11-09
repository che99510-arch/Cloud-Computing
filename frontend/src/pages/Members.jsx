import { useState, useEffect } from 'react';

const roleColors = {
  'Project Manager': 'bg-purple-100 text-purple-800',
  'Cloud Architect': 'bg-blue-100 text-blue-800',
  'Backend Developer': 'bg-green-100 text-green-800',
  'Frontend Developer': 'bg-yellow-100 text-yellow-800',
  'DevOps Engineer': 'bg-orange-100 text-orange-800',
  'Deployment Engineer': 'bg-cyan-100 text-cyan-800',
  'Security Engineer': 'bg-red-100 text-red-800',
  'QA Engineer': 'bg-pink-100 text-pink-800',
  'Documentation Lead': 'bg-indigo-100 text-indigo-800',
  'UI/UX Designer': 'bg-fuchsia-100 text-fuchsia-800',
  'Testing Engineer': 'bg-rose-100 text-rose-800',
  'GitHub Administrator': 'bg-slate-100 text-slate-800',
  'OpenFaaS Administrator': 'bg-teal-100 text-teal-800',
  'Google Cloud Administrator': 'bg-sky-100 text-sky-800',
  'Environment Config Lead': 'bg-lime-100 text-lime-800',
  'Logging & Monitoring Engineer': 'bg-amber-100 text-amber-800',
  'Research Lead': 'bg-violet-100 text-violet-800',
  'Technical Writer': 'bg-emerald-100 text-emerald-800',
  'Release Manager': 'bg-blue-100 text-blue-900',
  'Scrum Coordinator': 'bg-orange-100 text-orange-900',
};

function avatarInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function avatarColor(id) {
  const colors = ['bg-primary', 'bg-accent', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500',
    'bg-pink-500', 'bg-indigo-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'];
  return colors[(id - 1) % colors.length];
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/members')
      .then((r) => r.json())
      .then((data) => { setMembers(data.members); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">Group Members</h1>
        <p className="text-slate-500 text-lg">Meet the 20 students behind this cloud deployment project.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-lg">Loading members...</div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-lg">No members found. Is the Django server running?</div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 rounded-full ${avatarColor(m.id)} flex items-center justify-center text-white text-xl font-bold mb-4`}>
                {avatarInitials(m.name)}
              </div>
              <h3 className="font-bold text-secondary text-base mb-0.5">{m.name}</h3>
              <p className="text-xs text-slate-400 mb-2">{m.studentId}</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${roleColors[m.role] || 'bg-slate-100 text-slate-700'}`}>
                {m.role}
              </span>
              <p className="text-slate-500 text-sm leading-relaxed">{m.contribution}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
