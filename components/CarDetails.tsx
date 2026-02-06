
import React, { useState, useEffect } from 'react';
import { BMWModel } from '../types';
import Viewer360 from './Viewer360';
import { getCarInsights } from '../services/geminiService';

interface CarDetailsProps {
  car: BMWModel;
  onBack: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack }) => {
  const [insights, setInsights] = useState<string>('Analyzing Indian market performance...');
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getCarInsights(car);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [car]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0066b2] mb-10 transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Return to Showroom
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <Viewer360 
            exteriorImage={car.image} 
            interiorImage={car.interiorImage} 
            carName={car.name} 
          />
          
          <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066b2]/5 rounded-bl-full -mr-16 -mt-16"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0066b2]" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Expert India Perspective</h3>
            </div>
            
            <div className={`text-gray-500 text-sm leading-relaxed italic ${loadingInsights ? 'animate-pulse' : ''}`}>
              "{insights}"
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[8px] uppercase tracking-widest font-black text-gray-400">Gemini Pro Analysis</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/600px-BMW.svg.png" className="h-6 opacity-20" alt="BMW" />
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#0066b2] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest">{car.series}</span>
              <span className="text-gray-400 font-black uppercase text-[9px] tracking-widest">{car.type}</span>
            </div>
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter uppercase">{car.name}</h1>
            <p className="text-lg text-gray-400 leading-relaxed font-medium uppercase tracking-tighter">{car.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 border border-gray-100">
              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{car.type === 'Bike' ? 'Displacement' : 'Engine'}</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">{car.specs.engine}</span>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Max Power</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">{car.specs.horsepower} <span className="text-xs text-gray-400">HP</span></span>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">0-100 KM/H</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">{car.specs.acceleration} <span className="text-xs text-gray-400">SEC</span></span>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Top Speed</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">{car.specs.topSpeed} <span className="text-xs text-gray-400">KM/H</span></span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-900">Premium Color Range</h3>
            <div className="flex flex-wrap gap-6">
              {car.colors.map(color => (
                <div key={color} className="group relative">
                  <div className={`w-14 h-14 rounded-full border border-gray-200 shadow-sm cursor-pointer transition-all hover:scale-110 hover:shadow-lg`} 
                       style={{ backgroundColor: color.toLowerCase().includes('black') ? '#1a1a1a' : 
                                               color.toLowerCase().includes('white') ? '#fdfdfd' :
                                               color.toLowerCase().includes('red') ? '#c00' :
                                               color.toLowerCase().includes('green') ? '#1e302e' :
                                               color.toLowerCase().includes('blue') ? '#003366' : '#888' }}>
                  </div>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-gray-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <span className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Ex-Showroom Price</span>
              <span className="text-5xl font-black text-gray-900 tracking-tighter">{formatINR(car.basePrice)}</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-[#0066b2] text-white px-12 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl">
                Configure Yours
              </button>
              <button className="flex-1 md:flex-none p-5 border border-gray-200 hover:bg-gray-50 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
