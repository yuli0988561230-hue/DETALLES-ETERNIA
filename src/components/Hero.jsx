import React from 'react';
import { Sparkles, Heart, ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';

export default function Hero({ onScrollToForm, onScrollToCatalog }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-[#FFFDFB] via-rose-50/40 to-[#FAF7F2]">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Flores Eternas en Listón de Satén & Naturales Frescas</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Detalles que perduran <br />
              <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                para toda la eternidad.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Especialistas en <strong>ramos buchones de flores eternas</strong>, arreglos para <strong>bodas y fechas especiales</strong>. Desde nuestro taller en <strong>Lago Agrio</strong> despachamos arreglos impecables a cualquier rincón del Ecuador sin temor a que se marchiten.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onScrollToForm}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-rose-600/25 hover:shadow-xl hover:shadow-rose-600/35 transition-all transform hover:-translate-y-0.5"
              >
                <span>Cotizar Mi Ramo Ideal</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onScrollToCatalog}
                className="flex items-center justify-center gap-2 bg-white hover:bg-rose-50/60 text-slate-800 border border-slate-300/80 hover:border-rose-300 px-7 py-4 rounded-full text-base font-semibold transition-all"
              >
                <span>Explorar Colecciones</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-rose-100/80 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                  <Heart className="w-4 h-4 fill-rose-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Artesanal</h4>
                  <p className="text-[11px] text-slate-500">Pétalo por pétalo</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Envíos Nacionales</h4>
                  <p className="text-[11px] text-slate-500">Caja anti-golpes</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Garantía Total</h4>
                  <p className="text-[11px] text-slate-500">Llegan perfectas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-4 shadow-2xl border border-rose-100 shadow-rose-900/10">
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-tr from-rose-950 via-rose-900 to-rose-700 flex items-center justify-center text-white p-8 text-center">
                  
                  {/* Subtle floral pattern background */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div className="relative z-10 space-y-4">
                    <div className="inline-block px-3 py-1 bg-amber-400 text-slate-900 font-extrabold text-[11px] uppercase tracking-widest rounded-full shadow-sm">
                      ✨ El Más Solicitado
                    </div>
                    <div className="text-6xl drop-shadow-md">🌹👑</div>
                    <h3 className="font-serif text-3xl font-bold">
                      Ramo Buchón Real
                    </h3>
                    <p className="text-sm text-rose-100 max-w-xs mx-auto">
                      50 a 100 rosas eternas de satén fino con micro-luces LED cálidas, mariposas monarca y corona imperial.
                    </p>
                    <div className="pt-2 text-2xl font-serif font-black text-amber-300">
                      Desde $35.00 USD
                    </div>
                  </div>
                </div>

                {/* Floating pill badge bottom-right */}
                <div className="absolute -bottom-4 right-6 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                    ⭐
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-800">4.9/5 en satisfacción</p>
                  </div>
                </div>
              </div>

              {/* Floating pill badge top-left */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm py-2 px-3.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Despachos activos desde Lago Agrio</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
