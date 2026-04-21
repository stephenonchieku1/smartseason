import { useState } from 'react';
import api from '../utils/api';

export default function UpdateFieldModal({ field, onClose, onUpdated }) {
  const [stage, setStage] = useState(field.currentStage);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const stages = ['PLANTED', 'GROWING', 'READY', 'HARVESTED'];
  // Only allow moving forward
  const currentIndex = stages.indexOf(field.currentStage);
  const availableStages = stages.slice(currentIndex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/fields/${field.id}/update`, { stage, notes });
      onUpdated();
      onClose();
    } catch (err) {
      alert('Error updating field');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Update Field</h3>
        <p className="text-sm text-gray-500 mb-6">Status entry for {field.name}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Stage</label>
            <select 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 cursor-pointer transition-all"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              {availableStages.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Observation Notes</label>
            <textarea 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 placeholder-gray-400 text-sm transition-all"
              rows="3"
              placeholder="e.g., crop looking healthy..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex gap-3 mt-8">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-gray-900 text-white rounded-xl font-medium py-2.5 hover:bg-black transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
