export default function SummaryCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-900 flex items-baseline gap-2">
          {value}
          {trend && (
            <span className={`text-xs font-medium ${trend > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </h4>
      </div>
      <div className="text-gray-400">
        {icon}
      </div>
    </div>
  );
}
