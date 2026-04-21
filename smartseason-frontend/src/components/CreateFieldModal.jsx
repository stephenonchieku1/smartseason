import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function CreateFieldModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [cropType, setCropType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agents, setAgents] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setFetching(true);
        const { data } = await api.get('/users');
        console.log('Fetched users:', data);
        // Robust filter: check for 'agent' case-insensitively
        const filtered = data.filter(u => u.role?.toLowerCase() === 'agent');
        setAgents(filtered);
      } catch (err) {
        console.error('Error fetching agents:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchAgents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agentId) return alert('Please select an agent');
    
    setLoading(true);
    try {
      await api.post('/fields', {
        name,
        cropType,
        plantingDate,
        currentStage: 'PLANTED',
        agentId
      });
      onCreated();
      onClose();
    } catch (err) {
      console.error('Error creating field:', err);
      alert('Error creating field');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-semibold text-gray-900">Add New Place/Activity</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-6">Create a new field and assign it to an agent.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Field Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. North Pasture"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop Type</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 transition-all text-sm"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="e.g. Corn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Planting Date</label>
            <input 
              type="date" 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 transition-all text-sm"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assign Agent</label>
            <select 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50 hover:bg-gray-50 text-gray-900 cursor-pointer transition-all text-sm"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            >
              <option value="" disabled>{fetching ? 'Loading agents...' : 'Select an agent...'}</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
              {!fetching && agents.length === 0 && (
                <option disabled>No agents found in system</option>
              )}
            </select>
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
              disabled={loading || fetching}
              className="flex-1 bg-gray-900 text-white rounded-xl font-medium py-2.5 hover:bg-black transition-colors disabled:opacity-50 text-sm flex justify-center items-center gap-2"
            >
              {loading ? 'Creating...' : (
                <>
                  <span>+</span> Add Place
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
