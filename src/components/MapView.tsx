import React from 'react';
import { Transaction, Language } from '../types';
import { translations } from '../utils/translations';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  transactions: Transaction[];
  language: Language;
}

export const MapView: React.FC<MapViewProps> = ({ transactions, language }) => {
  const t = translations[language];

  // Group transactions by location
  const locationData = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.location]) {
      acc[transaction.location] = {
        count: 0,
        totalAmount: 0,
        projects: []
      };
    }
    acc[transaction.location].count++;
    acc[transaction.location].totalAmount += transaction.amountSpent;
    acc[transaction.location].projects.push(transaction.projectName);
    return acc;
  }, {} as Record<string, { count: number; totalAmount: number; projects: string[] }>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  return (
    <div className="shadow-neumorphic rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Geographic Distribution</h3>
      
      {/* Map Placeholder */}
      <div className="shadow-neumorphic-inset rounded-xl p-8 mb-4 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=400&fit=crop"
            alt="Malaysia Map"
            className="opacity-30 object-cover w-full h-full"
          />
        </div>
        <div className="relative z-10">
          <p className="text-center text-gray-600 text-sm">Interactive Map View</p>
          <p className="text-center text-xs text-gray-500 mt-1">Click on locations for details</p>
        </div>
      </div>

      {/* Location List */}
      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {Object.entries(locationData).map(([location, data]) => (
          <div 
            key={location}
            className="shadow-neumorphic-flat rounded-xl p-3 hover:shadow-neumorphic-hover transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="shadow-neumorphic-pressed rounded-lg p-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{location}</p>
                  <p className="text-xs text-gray-600">{data.count} projects</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  {formatCurrency(data.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
