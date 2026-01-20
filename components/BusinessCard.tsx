
import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onClick: (id: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden card-hover border border-zinc-100/50 cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(business.id)}
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {business.category}
          </span>
        </div>
      </div>
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-semibold text-zinc-900">{business.name}</h3>
          <div className="flex items-center bg-zinc-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-500 text-xs mr-1">★</span>
            <span className="text-[11px] font-bold text-zinc-600">{business.rating}</span>
          </div>
        </div>
        
        {/* Exibição do Endereço */}
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {business.address}
        </p>

        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-6 font-light flex-grow">{business.description}</p>
        
        <div className="flex justify-between items-center pt-5 border-t border-zinc-50">
          <div className="flex items-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
            {business.location}
          </div>
          <span className="text-zinc-900 font-semibold text-sm">{business.price}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
