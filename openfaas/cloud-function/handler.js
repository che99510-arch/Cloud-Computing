'use strict';

module.exports = async (event, context) => {
  const path = event.path || '/';
  const method = event.method || 'GET';

  const members = [
    { id: 1,  name: 'Che Manasseh',          role: 'OpenFaaS Administrator' },
    { id: 2,  name: 'Nikobfayum Rayan',      role: 'Project Manager' },
    { id: 3,  name: 'Obi Kelly Rolema',      role: 'Frontend Developer' },
    { id: 4,  name: 'Ngefi Precious-Noel',   role: 'Backend Developer' },
    { id: 5,  name: 'Awah Lum Mirriele',     role: 'DevOps Engineer' },
    { id: 6,  name: 'Kwendi Godlove',        role: 'Deployment Engineer' },
    { id: 7,  name: 'Tefu Freddy',           role: 'Security Engineer' },
    { id: 8,  name: 'Afrisoh Caleb',         role: 'QA Engineer' },
    { id: 9,  name: 'Tita Amaboh Herman',    role: 'Logging & Monitoring Engineer' },
    { id: 10, name: 'Mbacham Michael Sergio',role: 'Research Lead' },
    { id: 11, name: 'Atengang Christian S.', role: 'Google Cloud Administrator' },
    { id: 12, name: 'Acham Larry',           role: 'Cloud Architect' },
    { id: 13, name: 'Ian Daniel',            role: 'UI/UX Designer' },
    { id: 14, name: 'Ileka Perry',           role: 'Testing Engineer' },
    { id: 15, name: 'Nahsang Lilian',        role: 'Documentation Lead' },
    { id: 16, name: 'Tatah Jude',            role: 'GitHub Administrator' },
    { id: 17, name: 'Njingang Divine Kecha', role: 'Environment Config Lead' },
    { id: 18, name: 'Levi Tebit Sani',       role: 'Technical Writer' },
    { id: 19, name: 'Ngum Lewis Joan',       role: 'Release Manager' },
    { id: 20, name: 'Bateh Kenndy',          role: 'Scrum Coordinator' },
  ];

  let body;

  if (path === '/health' || path === '/') {
    body = {
      status: 'healthy',
      platform: 'OpenFaaS',
      function: 'cloud-function',
      timestamp: new Date().toISOString(),
    };
  } else if (path === '/members') {
    body = { count: members.length, members };
  } else {
    body = { error: 'Not found', path };
  }

  return context
    .status(200)
    .headers({ 'Content-Type': 'application/json' })
    .succeed(JSON.stringify(body));
};
