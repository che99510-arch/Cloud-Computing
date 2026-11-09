'use strict';

module.exports = async (event, context) => {
  const path = event.path || '/';
  const method = event.method || 'GET';

  const members = [
    { id: 1, name: 'Alice Johnson', role: 'Project Manager' },
    { id: 2, name: 'Brian Williams', role: 'Cloud Architect' },
    // ... (see backend for full list)
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
