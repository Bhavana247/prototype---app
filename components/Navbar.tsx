
import React from 'react';
import { Notification } from '../types';

interface NavbarProps {
  notifications: Notification[];
  onShowNotifications: () => void;
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ notifications, onShowNotifications, onHome }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div 
          onClick={onHome}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {/* Official BMW Logo SVG */}
          <svg className="w-12 h-12 transition-transform group-hover:scale-105" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#000" stroke="#888" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="32" fill="#fff"/>
            <path d="M50 50 L50 18 A32 32 0 0 1 82 50 Z" fill="#0066b2"/>
            <path d="M50 50 L18 50 A32 32 0 0 1 50 82 Z" fill="#0066b2"/>
            <text x="50" y="14" fontSize="10" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial">B</text>
            <text x="86" y="54" fontSize="10" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial" transform="rotate(90, 86, 50)">M</text>
            <text x="14" y="54" fontSize="10" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial" transform="rotate(-90, 14, 50)">W</text>
          </svg>
          
          <span className="font-brand text-xl font-black tracking-tighter text-gray-900">
            ULTIMATE <span className="text-[#0066b2]">EXPERIENCE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-semibold text-[13px] uppercase tracking-widest text-gray-600">
          <button onClick={onHome} className="hover:text-[#0066b2] transition-colors border-b-2 border-transparent hover:border-[#0066b2] py-1">Showroom</button>
          <a href="#" className="hover:text-[#0066b2] transition-colors border-b-2 border-transparent hover:border-[#0066b2] py-1">Motorrad</a>
          <a href="#" className="hover:text-[#0066b2] transition-colors border-b-2 border-transparent hover:border-[#0066b2] py-1">Electric</a>
          <a href="#" className="hover:text-[#0066b2] transition-colors border-b-2 border-transparent hover:border-[#0066b2] py-1">Finance</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onShowNotifications}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-[#0066b2] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>
          
          <div className="hidden sm:block">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#0066b2] transition-all">
              Book India Test Drive
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
