import React from 'react';
import { Transaction, Language } from '../types';
import { translations } from '../utils/translations';
import { Calendar, MapPin, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  language: Language;
  onViewDetails: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  language,
  onViewDetails 
}) => {
  const t = translations[language];

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'planned':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'ongoing':
        return 'text-yellow-600';
      case 'planned':
        return 'text-blue-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="shadow-neumorphic rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.recentTransactions}</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="shadow-neumorphic-flat rounded-xl p-4 hover:shadow-neumorphic-hover transition-all cursor-pointer"
            onClick={() => onViewDetails(transaction)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  {transaction.projectName}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{transaction.department}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">
                      {format(transaction.date, 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{transaction.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(transaction.status)}
                    <span className={getStatusColor(transaction.status)}>
                      {t[transaction.status]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(transaction.amountSpent)}
                </p>
                <p className="text-xs text-gray-500">
                  of {formatCurrency(transaction.budgetAllocated)}
                </p>
                <div className="mt-2">
                  <div className="w-20 h-2 shadow-neumorphic-inset rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      style={{ width: `${(transaction.amountSpent / transaction.budgetAllocated) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
