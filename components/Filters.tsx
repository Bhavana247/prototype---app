
import React from 'react';
import { FilterState, ModelType } from '../types';
import { SERIES_LIST } from '../constants';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleType = (t: ModelType) => {
    const current = filters.types;
    if (current.includes(t)) {
      updateFilter('types', current.filter(item => item !== t));
    } else {
      updateFilter('types', [...current, t]);
    }
  };

  const toggleSeries = (s: string) => {
    const current = filters.series;
    if (current.includes(s)) {
      updateFilter('series', current.filter(item => item !== s));
    } else {
      updateFilter('series', [...current, s]);
    }
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full lg:w-72 space-y-8 bg-white p-6 rounded-sm shadow-sm border border-gray-100 sticky top-24">
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-900">Search Models</h3>
        <input 
          type="text" 
          placeholder="M3, S 1000 RR..." 
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
          value={filters.searchQuery}
          onChange={(e) => updateFilter('searchQuery', e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-900">Category</h3>
        <div className="flex gap-2">
          {(['Car', 'Bike'] as ModelType[]).map(t => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                filters.types.includes(t) 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-900">Max Price (INR)</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="1000000" 
            max="30000000" 
            step="500000"
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066b2]"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value))}
          />
          <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
            <span>₹10L</span>
            <span className="text-[#0066b2]">{formatINR(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-900">Series</h3>
        <div className="grid grid-cols-2 gap-2">
          {SERIES_LIST.map(s => (
            <button
              key={s}
              onClick={() => toggleSeries(s)}
              className={`px-3 py-2 rounded-sm text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                filters.series.includes(s) 
                  ? 'bg-[#0066b2] text-white border-[#0066b2]' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

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
        className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
