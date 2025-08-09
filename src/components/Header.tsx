import React from 'react';
import { Globe, Wallet, Search, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  searchTerm, 
  setSearchTerm 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-[#E0E5EC] shadow-neumorphic-flat">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl shadow-neumorphic-pressed flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-xs text-gray-600 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="shadow-neumorphic-inset rounded-xl px-4 py-2 flex items-center space-x-2 min-w-[300px]">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-1"
                />
              </div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
              className="shadow-neumorphic rounded-xl px-4 py-2 flex items-center space-x-2 hover:shadow-neumorphic-hover transition-all"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {language === 'en' ? 'BM' : 'EN'}
              </span>
            </button>

            {/* Wallet Connection */}
            <button className="shadow-neumorphic rounded-xl px-4 py-2 flex items-center space-x-2 hover:shadow-neumorphic-hover transition-all">
              <Wallet className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">{t.connected}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden shadow-neumorphic rounded-xl p-2 hover:shadow-neumorphic-hover transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="shadow-neumorphic-inset rounded-xl px-4 py-2 flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-1"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
                className="shadow-neumorphic rounded-xl px-4 py-2 flex items-center space-x-2 flex-1"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {language === 'en' ? 'BM' : 'EN'}
                </span>
              </button>
              <button className="shadow-neumorphic rounded-xl px-4 py-2 flex items-center space-x-2 flex-1">
                <Wallet className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{t.connected}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
