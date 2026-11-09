export default function StatusBadge({ status }) {
  const isHealthy = status === 'healthy' || status === 'active' || status === 'deployed';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        isHealthy ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
      {status}
    </span>
  );
}
