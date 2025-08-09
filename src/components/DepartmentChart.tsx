import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { departments } from '../utils/mockData';

interface DepartmentChartProps {
  language: Language;
}

export const DepartmentChart: React.FC<DepartmentChartProps> = ({ language }) => {
  const t = translations[language];

  const data = departments.map(dept => ({
    name: language === 'en' ? dept.name : dept.nameMs,
    value: dept.totalSpent,
    percentage: ((dept.totalSpent / dept.totalBudget) * 100).toFixed(1)
  }));

  const COLORS = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="shadow-neumorphic rounded-xl p-3 bg-[#E0E5EC]">
          <p className="text-sm font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-xs text-gray-600">
            RM {(payload[0].value / 1000000000).toFixed(2)}B
          </p>
          <p className="text-xs text-gray-500">{payload[0].payload.percentage}% of budget</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="shadow-neumorphic rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.spendingByDepartment}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-xs text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
