import StatusBadge from './StatusBadge';

export default function FieldCard({ field, onUpdateClick, onHistoryClick }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <button 
              onClick={() => onHistoryClick(field)}
              className="text-lg font-semibold text-gray-900 hover:underline text-left block"
            >
              {field.name}
            </button>
            <p className="text-xs text-gray-500 mt-1">{field.cropType} • Planted {new Date(field.plantingDate).toLocaleDateString()}</p>
          </div>
          <StatusBadge status={field.status} />
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-medium">Stage</span>
            <span className="text-xs font-semibold text-gray-900 bg-white px-2 py-0.5 rounded-md border border-gray-200 shadow-sm">{field.currentStage}</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-black h-full rounded-full" 
              style={{ 
                width: field.currentStage === 'PLANTED' ? '25%' : 
                       field.currentStage === 'GROWING' ? '50%' : 
                       field.currentStage === 'READY' ? '75%' : '100%' 
              }}
            ></div>
          </div>
        </div>

        {field.updates?.length > 0 && (
          <div className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3 border-l-2 border-gray-300">
            "{field.updates[field.updates.length - 1].notes || 'No recent notes'}"
            <div className="text-[10px] text-gray-400 mt-1.5">
              Updated {new Date(field.updates[field.updates.length - 1].createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 mt-auto flex gap-3">
        <button 
          onClick={() => onHistoryClick(field)}
          className="flex-1 bg-white text-gray-700 font-medium py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
        >
          History
        </button>
        <button 
          onClick={() => onUpdateClick(field)}
          disabled={field.currentStage === 'HARVESTED'}
          className="flex-[2] bg-gray-900 text-white font-medium py-2 rounded-xl text-sm hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {field.currentStage === 'HARVESTED' ? 'Harvested' : 'Update Status'}
        </button>
      </div>
    </div>
  );
}
