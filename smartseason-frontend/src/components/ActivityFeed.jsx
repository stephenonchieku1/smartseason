import { formatDistanceToNow } from 'date-fns';

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-between">
        Activity Log
      </h3>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {index !== activities.length - 1 && (
              <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-gray-200" />
            )}
            <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 flex items-center justify-center text-gray-600 text-xs font-medium z-10 border border-gray-200">
              {activity.agent?.name?.charAt(0)}
            </div>
            <div className="flex-1 pb-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-900">{activity.agent?.name}</span> updated{' '}
                <span className="font-medium text-gray-900">{activity.field?.name}</span> to{' '}
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-200 ml-1">{activity.stage}</span>
              </p>
              {activity.notes && (
                <p className="text-sm text-gray-500 mt-2 bg-gray-50 rounded-lg p-3 border border-gray-100">"{activity.notes}"</p>
              )}
              <p className="text-[11px] text-gray-400 mt-2">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-100 rounded-xl">No recent activity</div>
        )}
      </div>
    </div>
  );
}
