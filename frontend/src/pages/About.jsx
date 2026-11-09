export default function About() {
  const sections = [
    {
      icon: '🎯',
      title: 'Purpose of the Project',
      content:
        'This project demonstrates modern cloud deployment techniques by deploying a full-stack web application to two distinct cloud platforms: Google App Engine (PaaS) and OpenFaaS (FaaS). It serves as a hands-on exploration of cloud-native architecture for university students.',
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
        'Platform as a Service (PaaS) provides a managed environment to deploy full applications (e.g., Google App Engine). Function as a Service (FaaS) runs individual functions in response to events, with no server management — ideal for event-driven, stateless workloads (e.g., OpenFaaS).',
    },
    {
      icon: '🌐',
      title: 'Google App Engine',
      content:
        "Google App Engine is a fully managed PaaS offering from Google Cloud. It supports Python, Node.js, Java, Go, and more. Developers push code and App Engine handles scaling, load balancing, patching, and infrastructure. This project uses the python312 runtime with Django and Gunicorn.",
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
