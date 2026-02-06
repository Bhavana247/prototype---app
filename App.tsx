
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import CarCard from './components/CarCard';
import CarDetails from './components/CarDetails';
import NotificationsPanel from './components/NotificationsPanel';
import { BMWModel, FilterState, Notification } from './types';
import { MOCK_MODELS, MOCK_NOTIFICATIONS } from './constants';

function App() {
  const [selectedCar, setSelectedCar] = useState<BMWModel | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    maxPrice: 30000000,
    minSpeed: 0,
    series: [],
    years: [],
    types: ['Car', 'Bike'],
    sortBy: 'popularity'
  });

  const filteredCars = useMemo(() => {
    let result = [...MOCK_MODELS];

    if (filters.searchQuery) {
      result = result.filter(model => 
        model.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        model.series.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    result = result.filter(model => model.basePrice <= filters.maxPrice);

    if (filters.series.length > 0) {
      result = result.filter(model => filters.series.includes(model.series));
    }

    if (filters.types.length > 0) {
      result = result.filter(model => filters.types.includes(model.type));
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.basePrice - b.basePrice;
        case 'price-desc': return b.basePrice - a.basePrice;
        case 'rating': return b.rating - a.rating;
        case 'speed': return b.specs.topSpeed - a.specs.topSpeed;
        default: return b.popularity - a.popularity;
      }
    });

    return result;
  }, [filters]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 selection:bg-[#0066b2] selection:text-white">
      <Navbar 
        notifications={notifications} 
        onShowNotifications={() => setShowNotifications(true)}
        onHome={() => setSelectedCar(null)}
      />

      <main className="container mx-auto px-4 md:px-8 pt-28 pb-32">
        {selectedCar ? (
          <CarDetails 
            car={selectedCar} 
            onBack={() => setSelectedCar(null)} 
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="w-full lg:w-72">
              <Filters filters={filters} setFilters={setFilters} />
            </aside>

            <section className="flex-1 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <h1 className="text-5xl font-black mb-3 tracking-tighter uppercase">BMW India <span className="text-[#0066b2]">Portfolio</span></h1>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Discover {filteredCars.length} models engineered for perfection.</p>
                </div>
                
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-gray-100 shadow-sm">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Search</span>
                   <span className="text-xs font-black text-[#0066b2] uppercase tracking-tighter">
                     {filters.searchQuery || 'Full Catalog'}
                   </span>
                </div>
              </div>

              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {filteredCars.map(car => (
                    <CarCard 
                      key={car.id} 
                      car={car} 
                      onSelect={(c) => setSelectedCar(c)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-32 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-sm border border-gray-100">
                  <svg className="w-24 h-24 mb-8 opacity-10" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <h3 className="text-2xl font-black mb-3 text-gray-900 uppercase tracking-tighter">No model found</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center max-w-xs px-4">
                    Try adjusting your criteria or currency range for the Indian market.
                  </p>
                  <button 
                    onClick={() => setFilters({
                      searchQuery: '',
                      maxPrice: 30000000,
                      minSpeed: 0,
                      series: [],
                      years: [],
                      types: ['Car', 'Bike'],
                      sortBy: 'popularity'
                    })}
                    className="mt-10 text-[#0066b2] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#0066b2] pb-1 hover:text-gray-900 hover:border-gray-900 transition-all"
                  >
                    Reset Showroom
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <NotificationsPanel 
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onMarkRead={markNotificationRead}
      />

      <footer className="bg-white text-gray-900 py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#000" stroke="#888" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="32" fill="#fff"/>
                <path d="M50 50 L50 18 A32 32 0 0 1 82 50 Z" fill="#0066b2"/>
                <path d="M50 50 L18 50 A32 32 0 0 1 50 82 Z" fill="#0066b2"/>
              </svg>
              <span className="font-brand text-xl font-black tracking-tighter uppercase">BMW <span className="text-[#0066b2]">India</span></span>
            </div>
            <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-tighter">
              Discover the pinnacle of Sheer Driving Pleasure. From the streets of New Delhi to the highways of Mumbai, experience German precision across India.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-900">Showroom</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">BMW Cars</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">BMW Motorrad</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">M Performance</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">BMW i Electric</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-900">Experience</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">Test Drive</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">Dealer Locator</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">BMW Excellence Club</a></li>
              <li><a href="#" className="hover:text-[#0066b2] transition-colors">Contact India</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-900">India News</h4>
             <p className="text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest">Subscribe for local launch events and exclusive test drives.</p>
             <div className="flex gap-2">
               <input type="email" placeholder="Email Address" className="flex-1 bg-gray-50 border-gray-100 rounded-sm p-4 text-[10px] uppercase font-bold tracking-widest focus:ring-1 focus:ring-[#0066b2]" />
               <button className="bg-[#0066b2] text-white px-6 py-4 rounded-sm hover:bg-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 mt-24 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <p>© 2024 BMW India. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-[#0066b2] transition-colors">Legal</a>
            <a href="#" className="hover:text-[#0066b2] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#0066b2] transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
