import React from 'react';
import { Sparkles, MapPin, Truck, ShieldCheck, Lock } from 'lucide-react';

export default function Navbar({ onOpenAdmin, onScrollToForm }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFB]/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>Taller matriz en <strong>Lago Agrio, Sucumbíos</strong></span>
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-300" />
          <span>Envíos seguros a todo el <strong>Ecuador</strong> vía Servientrega y Cooperativas</span>
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-300 shadow-md group-hover:scale-105 transition-transform bg-white shrink-0">
            <img src="/logo.jpeg" alt="Detalles Eternia" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 group-hover:text-rose-700 transition-colors">
              Detalles Eternia
            </span>
            <p className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold -mt-1">
              Flores Eternas & Naturales
            </p>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#catalogo" className="hover:text-rose-600 transition-colors">Catálogo</a>
          <a href="#bodas" className="hover:text-rose-600 transition-colors">Bodas & Matrimonios</a>
          <a href="#envios" className="hover:text-rose-600 transition-colors">Envíos Nacionales</a>
          <a href="#faqs" className="hover:text-rose-600 transition-colors">Preguntas</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToForm}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Cotizar Arreglo</span>
          </button>

          {/* Admin / CRM Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Panel de Ventas (Admin)"
            className="p-2.5 rounded-full text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200/80 transition-colors"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
