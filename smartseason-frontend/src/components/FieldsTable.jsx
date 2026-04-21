import StatusBadge from './StatusBadge';
import { FiClock } from 'react-icons/fi';

export default function FieldsTable({ fields, onFieldClick }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Fields Directory</h3>
        <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{fields.length} places</span>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-3 font-medium">Field Name</th>
            <th className="px-6 py-3 font-medium">Crop</th>
            <th className="px-6 py-3 font-medium">Agent</th>
            <th className="px-6 py-3 font-medium">Stage</th>
            <th className="px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {fields.map(field => (
            <tr key={field.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <button 
                  onClick={() => onFieldClick(field)}
                  className="flex items-center gap-2 group text-left"
                >
                  <div>
                    <div className="font-medium text-gray-900 group-hover:underline">{field.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Planted {new Date(field.plantingDate).toLocaleDateString()}</div>
                  </div>
                  <FiClock className="text-gray-300 group-hover:text-gray-900 transition-colors" size={14} />
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{field.cropType}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-medium border border-gray-200">
                    {field.agent?.name?.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{field.agent?.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  {field.currentStage}
                </span>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={field.status} />
              </td>
            </tr>
          ))}
          {fields.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">No places found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
