import React, { useState } from 'react';
import { Transaction, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  X, Calendar, MapPin, Building2, Hash, Star, 
  MessageSquare, Send, Shield, ExternalLink 
} from 'lucide-react';
import { format } from 'date-fns';

interface ProjectDetailsProps {
  transaction: Transaction | null;
  language: Language;
  onClose: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  transaction, 
  language, 
  onClose 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const t = translations[language];

  if (!transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const progress = (transaction.amountSpent / transaction.budgetAllocated) * 100;

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#E0E5EC] rounded-2xl shadow-neumorphic max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {transaction.projectName}
              </h2>
              <p className="text-sm text-gray-600">{transaction.department}</p>
            </div>
            <button
              onClick={onClose}
              className="shadow-neumorphic rounded-xl p-2 hover:shadow-neumorphic-hover transition-all"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="shadow-neumorphic-inset rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{t.date}</span>
              </div>
              <p className="text-gray-800 font-semibold">
                {format(transaction.date, 'dd MMMM yyyy')}
              </p>
            </div>

            <div className="shadow-neumorphic-inset rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{t.location}</span>
              </div>
              <p className="text-gray-800 font-semibold">{transaction.location}</p>
            </div>

            <div className="shadow-neumorphic-inset rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Contractor</span>
              </div>
              <p className="text-gray-800 font-semibold">{transaction.contractor}</p>
            </div>

            <div className="shadow-neumorphic-inset rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Category</span>
              </div>
              <p className="text-gray-800 font-semibold">{transaction.category}</p>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="shadow-neumorphic rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.budget}</span>
                <span className="font-bold text-gray-800">
                  {formatCurrency(transaction.budgetAllocated)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.spent}</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(transaction.amountSpent)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.remaining}</span>
                <span className="font-bold text-blue-600">
                  {formatCurrency(transaction.budgetAllocated - transaction.amountSpent)}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="h-4 shadow-neumorphic-inset rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="shadow-neumorphic rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Blockchain Verification</span>
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">{t.transactionHash}</p>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
                    {transaction.transactionHash}
                  </code>
                  <button className="shadow-neumorphic rounded-lg p-1 hover:shadow-neumorphic-hover">
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Network</p>
                <p className="text-sm text-gray-800">Polygon Mainnet</p>
              </div>
            </div>
          </div>

          {/* Citizen Feedback */}
          <div className="shadow-neumorphic rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.feedback}</h3>
            
            {/* Rating */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{t.rating}</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="shadow-neumorphic rounded-lg p-2 hover:shadow-neumorphic-hover transition-all"
                  >
                    <Star 
                      className={`w-5 h-5 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{t.comment}</p>
              <div className="shadow-neumorphic-inset rounded-xl p-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleSubmitFeedback}
              className="shadow-neumorphic rounded-xl px-6 py-2 flex items-center space-x-2 hover:shadow-neumorphic-hover transition-all"
            >
              <Send className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{t.submitFeedback}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
