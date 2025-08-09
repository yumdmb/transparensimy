import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { TransactionList } from './components/TransactionList';
import { DepartmentChart } from './components/DepartmentChart';
import { ProjectDetails } from './components/ProjectDetails';
import { MapView } from './components/MapView';
import { Language, Transaction } from './types';
import { translations } from './utils/translations';
import { mockTransactions } from './utils/mockData';
import { 
  Wallet, TrendingUp, Briefcase, Activity,
  Filter, Download, BarChart3, PieChart
} from 'lucide-react';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | Transaction['status']>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  
  const t = translations[language];

  // Calculate stats
  const stats = useMemo(() => {
    const totalBudget = mockTransactions.reduce((sum, t) => sum + t.budgetAllocated, 0);
    const totalSpent = mockTransactions.reduce((sum, t) => sum + t.amountSpent, 0);
    const activeProjects = mockTransactions.filter(t => t.status === 'ongoing').length;
    const efficiency = ((totalSpent / totalBudget) * 100).toFixed(1);
    
    return { totalBudget, totalSpent, activeProjects, efficiency };
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = transaction.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || transaction.department === filterDepartment;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchTerm, filterStatus, filterDepartment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  const departments = [...new Set(mockTransactions.map(t => t.department))];

  return (
    <div className="min-h-screen bg-[#E0E5EC]">
      <Header 
        language={language}
        setLanguage={setLanguage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'en' ? 'Transparent Government Spending' : 'Perbelanjaan Kerajaan yang Telus'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Track and verify every ringgit spent on public projects'
              : 'Jejak dan sahkan setiap ringgit yang dibelanjakan untuk projek awam'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title={t.totalBudget}
            value={formatCurrency(stats.totalBudget)}
            icon={Wallet}
            trend={5.2}
            color="blue"
          />
          <StatsCard
            title={t.totalSpent}
            value={formatCurrency(stats.totalSpent)}
            icon={TrendingUp}
            trend={-2.1}
            color="green"
          />
          <StatsCard
            title={t.activeProjects}
            value={stats.activeProjects.toString()}
            icon={Briefcase}
            trend={12.5}
            color="yellow"
          />
          <StatsCard
            title={t.efficiency}
            value={`${stats.efficiency}%`}
            icon={Activity}
            trend={3.8}
            color="red"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="shadow-neumorphic rounded-xl px-4 py-2 bg-[#E0E5EC] text-gray-700 outline-none"
            >
              <option value="all">{t.all} Status</option>
              <option value="completed">{t.completed}</option>
              <option value="ongoing">{t.ongoing}</option>
              <option value="planned">{t.planned}</option>
            </select>
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="shadow-neumorphic rounded-xl px-4 py-2 bg-[#E0E5EC] text-gray-700 outline-none"
          >
            <option value="all">{t.all} Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <button className="shadow-neumorphic rounded-xl px-4 py-2 flex items-center space-x-2 hover:shadow-neumorphic-hover transition-all ml-auto">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">{t.exportData}</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Transaction List */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionList
              transactions={filteredTransactions}
              language={language}
              onViewDetails={setSelectedTransaction}
            />
            
            {/* Project Status Chart */}
            <div className="shadow-neumorphic rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.projectStatus}</h3>
              <div className="grid grid-cols-3 gap-4">
                {['completed', 'ongoing', 'planned'].map((status) => {
                  const count = mockTransactions.filter(t => t.status === status).length;
                  const percentage = ((count / mockTransactions.length) * 100).toFixed(1);
                  const colors = {
                    completed: 'from-green-400 to-green-600',
                    ongoing: 'from-yellow-400 to-yellow-600',
                    planned: 'from-blue-400 to-blue-600'
                  };
                  
                  return (
                    <div key={status} className="text-center">
                      <div className="shadow-neumorphic-pressed rounded-xl p-4 mb-2">
                        <div className={`h-20 bg-gradient-to-br ${colors[status]} rounded-lg flex items-center justify-center`}>
                          <span className="text-2xl font-bold text-white">{count}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 font-semibold">{t[status]}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            <DepartmentChart language={language} />
            <MapView transactions={filteredTransactions} language={language} />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 shadow-neumorphic rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="shadow-neumorphic-pressed rounded-xl p-4 mb-3 inline-block">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{t.transparency}</h4>
              <p className="text-sm text-gray-600 mt-1">100% on-chain verification</p>
            </div>
            <div>
              <div className="shadow-neumorphic-pressed rounded-xl p-4 mb-3 inline-block">
                <PieChart className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{t.accountability}</h4>
              <p className="text-sm text-gray-600 mt-1">Real-time tracking</p>
            </div>
            <div>
              <div className="shadow-neumorphic-pressed rounded-xl p-4 mb-3 inline-block">
                <Activity className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{t.efficiency}</h4>
              <p className="text-sm text-gray-600 mt-1">Smart contract automation</p>
            </div>
          </div>
        </div>
      </main>

      {/* Project Details Modal */}
      {selectedTransaction && (
        <ProjectDetails
          transaction={selectedTransaction}
          language={language}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}

export default App;
