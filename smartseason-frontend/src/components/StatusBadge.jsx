export default function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-gray-100 text-gray-700',
    'At Risk': 'bg-white text-gray-900 border border-gray-300',
    Active: 'bg-gray-900 text-white',
  };

  const currentStyle = styles[status] || 'bg-gray-50 text-gray-600 border border-gray-200';

  return (
    <span className={`px-2.5 py-1 inline-flex text-[11px] font-medium rounded-full ${currentStyle}`}>
      {status}
    </span>
  );
}
