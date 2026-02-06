
import React from 'react';
import { Notification } from '../types';

interface NotificationsPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, isOpen, onClose, onMarkRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">Notifications</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="font-medium text-lg">No notifications yet</p>
              <p className="text-sm">We'll notify you about new model releases.</p>
            </div>
          ) : (
            notifications.map(n => (
              <div 
                key={n.id} 
                onClick={() => onMarkRead(n.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  n.isRead ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-blue-100 shadow-md ring-1 ring-blue-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{n.title}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{n.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{n.message}</p>
                {!n.isRead && (
                  <div className="mt-3 flex justify-end">
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-black uppercase">Unread</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button className="w-full py-4 text-blue-600 font-bold hover:text-blue-800 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
