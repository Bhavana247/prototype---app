
import React from 'react';
import { BMWModel } from '../types';

interface CarCardProps {
  car: BMWModel;
  onSelect: (car: BMWModel) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelect }) => {
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div 
      onClick={() => onSelect(car)}
      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {car.isNew && (
            <span className="bg-[#0066b2] text-white text-[9px] font-black px-2 py-1 shadow-lg uppercase tracking-widest">New</span>
          )}
          <span className="bg-white text-gray-900 text-[9px] font-black px-2 py-1 shadow-lg uppercase tracking-widest border border-gray-100">
            {car.type}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0066b2] transition-colors uppercase tracking-tight">{car.name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-gray-900">{car.rating}</span>
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
        </div>

        <p className="text-gray-400 text-xs font-medium line-clamp-2 mb-6 leading-relaxed uppercase tracking-tighter">
          {car.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="block text-[8px] uppercase font-black text-gray-400 tracking-widest">Starting Price</span>
            <span className="text-xl font-black text-gray-900 tracking-tighter">{formatINR(car.basePrice)}</span>
          </div>
          <div className="text-right">
             <span className="block text-[8px] uppercase font-black text-gray-400 tracking-widest">0-100</span>
             <span className="text-base font-black text-[#0066b2]">{car.specs.acceleration}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
