export default function About() {
  const sections = [
    {
      icon: '🎯',
      title: 'Purpose of the Project',
      content:
        'This project demonstrates modern cloud deployment techniques by deploying a full-stack web application to two distinct cloud platforms: Render (Platform as a Service) and OpenFaaS (Function as a Service). It serves as a hands-on exploration of cloud-native architecture for university students.',
    },
    {
      icon: '☁️',
      title: 'Why Cloud Deployment Matters',
      content:
        'Cloud deployment enables applications to scale elastically, reduces infrastructure management overhead, improves availability, and supports rapid iteration. It is foundational to modern software engineering and DevOps practices.',
    },
    {
      icon: '⚖️',
      title: 'PaaS vs FaaS',
      content:
        'Platform as a Service (PaaS) provides a managed environment to deploy full applications (e.g., Render). Function as a Service (FaaS) runs individual functions in response to events, with no server management — ideal for event-driven, stateless workloads (e.g., OpenFaaS).',
    },
    {
      icon: '🌐',
      title: 'Render — PaaS Platform',
      content:
        'Render is a fully managed cloud platform that supports Python, Node.js, Docker and static sites. Developers connect their GitHub repository and Render automatically builds, deploys and serves the application. This project uses Render to host the Django REST API backend and the React frontend static site.',
    },
    {
      icon: '⚡',
      title: 'OpenFaaS',
      content:
        'OpenFaaS (Open Function as a Service) is an open-source FaaS framework that runs on Kubernetes or Docker Swarm. It allows developers to package any process or container as a serverless function. The faas-cli tool provides simple build, deploy, and monitoring workflows.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">About the Project</h1>
        <p className="text-slate-500 text-lg">A university Cloud Computing group assignment demonstrating PaaS and FaaS deployment.</p>
      </div>

      <div className="space-y-6">
        {sections.map(({ icon, title, content }) => (
          <div key={title} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <h2 className="font-bold text-secondary text-xl mb-3 flex items-center gap-2">
              <span>{icon}</span> {title}
            </h2>
            <p className="text-slate-600 leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      {/* Team info */}
      <div className="mt-8 bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white text-center">
        <p className="text-2xl font-bold mb-2">👥 20 Students</p>
        <p className="text-blue-100">Collaborating across frontend, backend, cloud infra, DevOps, security, documentation, and QA roles.</p>
      </div>
    </div>
  );
}
