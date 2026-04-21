import { useState, useEffect } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import FieldCard from '../components/FieldCard';
import UpdateFieldModal from '../components/UpdateFieldModal';
import FieldHistoryModal from '../components/FieldHistoryModal';
import { FiGrid, FiAlertCircle, FiCheckCircle, FiActivity, FiCheck } from 'react-icons/fi';

export default function AgentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState(null);
  const [historyField, setHistoryField] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard/agent');
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 font-sans selection:bg-gray-200 selection:text-gray-900">
      <div className="max-w-7xl mx-auto">
        <Navbar title="Agent Console" />
        
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-2">
          <SummaryCard 
            title="Total Assigned" 
            value={data?.summary?.total || 0} 
            icon={<FiGrid size={22} strokeWidth={2} />} 
          />
          <SummaryCard 
            title="Active" 
            value={data?.summary?.active || 0} 
            icon={<FiActivity size={22} strokeWidth={2} />} 
          />
          <SummaryCard 
            title="At Risk" 
            value={data?.summary?.atRisk || 0} 
            icon={<FiAlertCircle size={22} strokeWidth={2} />} 
          />
          <SummaryCard 
            title="Completed" 
            value={data?.summary?.completed || 0} 
            icon={<FiCheckCircle size={22} strokeWidth={2} />} 
          />
        </div>

        <div className="px-6 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-medium">Performance Today</p>
              <h4 className="text-3xl font-bold flex items-baseline gap-2">
                {data?.summary?.updatesToday || 0}
                <span className="text-sm font-normal text-gray-400">observations logged today</span>
              </h4>
            </div>
            <FiCheck size={32} className="text-gray-700" />
          </div>
        </div>

        <div className="px-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">Assigned Places</h2>
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{data?.fields?.length || 0} places</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.fields?.map(field => (
                <FieldCard 
                  key={field.id} 
                  field={field} 
                  onUpdateClick={setSelectedField} 
                  onHistoryClick={setHistoryField}
                />
              ))}
              {data?.fields?.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-2xl">
                  No places found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedField && (
        <UpdateFieldModal 
          field={selectedField} 
          onClose={() => setSelectedField(null)} 
          onUpdated={fetchDashboard} 
        />
      )}

      {historyField && (
        <FieldHistoryModal 
          field={historyField} 
          onClose={() => setHistoryField(null)} 
        />
      )}
    </div>
  );
}
