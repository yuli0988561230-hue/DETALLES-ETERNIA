import React from 'react';
import { Heart, MapPin, Phone, Mail, Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Detalles Eternia" className="w-10 h-10 rounded-full object-cover border border-rose-300" />
              <span className="font-serif text-2xl font-bold text-white">Detalles Eternia</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Taller artesanal de arreglos florales eternos a base de listón de satén y flores naturales frescas. Diseñamos emociones que perduran para siempre.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-300">
              <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
              <span>Lago Agrio (Nueva Loja), Sucumbíos — Ecuador</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalogo" className="hover:text-rose-400 transition-colors">Flores Eternas de Satén</a></li>
              <li><a href="#catalogo" className="hover:text-rose-400 transition-colors">Flores Naturales Frescas</a></li>
              <li><a href="#catalogo" className="hover:text-rose-400 transition-colors">Colección Bodas & Matrimonios</a></li>
              <li><a href="#envios" className="hover:text-rose-400 transition-colors">Cobertura y Envíos Nacionales</a></li>
              <li><a href="#faqs" className="hover:text-rose-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Admin & Payment Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Medios de Pago</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transferencias directas Banco Pichincha, Banco Guayaquil, Deuna y PeYa.
            </p>
            
            <div className="pt-4 border-t border-slate-900">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors py-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Panel Comercial / Ventas (CRM)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom legal */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Detalles Eternia. Todos los derechos reservados. Lago Agrio, Ecuador.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Hecho con <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" /> para enamorar en todo el Ecuador.
          </p>
        </div>

      </div>
    </footer>
  );
}
