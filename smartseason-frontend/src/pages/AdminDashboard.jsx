import { useState, useEffect } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import FieldsTable from '../components/FieldsTable';
import ActivityFeed from '../components/ActivityFeed';
import CreateFieldModal from '../components/CreateFieldModal';
import FieldHistoryModal from '../components/FieldHistoryModal';
import { FiGrid, FiAlertCircle, FiCheckCircle, FiActivity, FiTrendingUp, FiMapPin } from 'react-icons/fi';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [historyField, setHistoryField] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard/admin');
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
        <Navbar title="Coordinator Console" />
        
        <div className="px-6 flex justify-between items-center mt-2 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gray-900 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-black transition-colors text-sm flex items-center gap-2"
          >
            <span>+</span> Add Place/Activity
          </button>
        </div>

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard 
            title="Total Fields" 
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

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-900 rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-medium">Monitoring Velocity</p>
              <h4 className="text-3xl font-bold flex items-baseline gap-2">
                {data?.summary?.updatesToday || 0}
                <span className="text-sm font-normal text-gray-400">updates today</span>
              </h4>
            </div>
            <FiTrendingUp size={32} className="text-gray-700" />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-medium">Dominant Crop</p>
              <h4 className="text-3xl font-bold text-gray-900">{data?.summary?.topCrop || 'N/A'}</h4>
            </div>
            <FiMapPin size={32} className="text-gray-100" />
          </div>
        </div>

        <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FieldsTable fields={data?.fields || []} onFieldClick={setHistoryField} />
          </div>
          <div>
            <ActivityFeed activities={data?.recentActivity || []} />
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateFieldModal 
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchDashboard}
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
