import { format } from 'date-fns';

export default function FieldHistoryModal({ field, onClose }) {
  // Sort updates by date ascending (oldest first) to show the "story"
  const sortedUpdates = [...(field.updates || [])].sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-[32px] border border-white/20 p-0 w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 pb-6 flex justify-between items-start bg-white border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-gray-900 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Field Activity Log</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{field.name}</h3>
            <p className="text-sm text-gray-500 mt-1 font-medium">{field.cropType} • Started {format(new Date(field.plantingDate), 'MMMM d, yyyy')}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Timeline Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {sortedUpdates.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-gray-400 font-medium">No activity records found.</p>
            </div>
          ) : (
            <div className="relative pl-10 space-y-10">
              {/* The "Life Line" */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gray-900 via-gray-200 to-gray-50"></div>

              {sortedUpdates.map((update, index) => (
                <div key={update.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[35px] top-1 w-[22px] h-[22px] rounded-full border-4 bg-white z-10 flex items-center justify-center shadow-sm ${index === sortedUpdates.length - 1 ? 'border-gray-900' : 'border-gray-100'}`}>
                    {index === sortedUpdates.length - 1 && <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>}
                  </div>

                  {/* Update Card */}
                  <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${index === sortedUpdates.length - 1 ? 'ring-2 ring-gray-900/5' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          update.stage === 'HARVESTED' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {update.stage}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <span className="text-[11px] font-semibold text-gray-400">
                          {format(new Date(update.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-300 px-2 py-0.5 rounded bg-gray-50">
                        {format(new Date(update.createdAt), 'h:mm a')}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">
                        {update.notes || "No observations recorded for this stage."}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-[10px] text-white font-bold">
                          {update.agent?.name?.charAt(0)}
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                          {update.agent?.name}
                        </span>
                      </div>
                      {index === 0 && <span className="text-[9px] font-black text-gray-200 uppercase italic">Original Planting</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-12 py-3 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-gray-200 active:scale-95"
          >
            Close Logbook
          </button>
        </div>
      </div>
    </div>
  );
}
