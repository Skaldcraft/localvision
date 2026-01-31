import React from 'react';
import LightBulbIcon from './icons/LightBulbIcon';

const Header: React.FC = () => {
  return (
    <header className="py-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-1">
          <LightBulbIcon className="w-8 h-8 text-cyan-600" />
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900">
            LocalVision
          </h1>
        </div>
        <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">AI Market Intelligence</p>
      </div>
    </header>
  );
};

export default Header;