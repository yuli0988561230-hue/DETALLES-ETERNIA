import React, { useState } from 'react';
import { Sparkles, Heart, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  // Flores Eternas en Listón
  {
    id: 'eterna-1',
    category: 'eternas',
    title: 'Bouquet Amor Eterno (15 Rosas)',
    price: '$22.00',
    description: 'Elegante ramo de rosas hechas 100% a mano con listón de satén premium, envoltura coreana impermeable y lazo satinado.',
    features: ['15 Rosas de satén', 'Colores a tu elección', 'Tarjeta con dedicatoria', 'Envío nacional disponible'],
    emoji: '🌹✨',
    badge: 'Más Vendido'
  },
  {
    id: 'eterna-2',
    category: 'eternas',
    title: 'Ramo Buchón Luces & Corona (30 Rosas)',
    price: '$45.00',
    description: 'El clásico ramo buchón de impacto. Incluye micro-luces LED cálidas a batería, mariposas monarca decorativas y corona dorada.',
    features: ['30 Rosas de satén', 'Luces micro-LED incluidas', 'Corona dorada o plateada', 'Mariposas monarca 3D'],
    emoji: '👑💐',
    badge: 'Favorito Romántico'
  },
  {
    id: 'eterna-3',
    category: 'eternas',
    title: 'Ramo Buchón Imperial (100 Rosas)',
    price: '$95.00',
    description: 'El arreglo definitivo para propuestas de matrimonio y declaraciones memorables. Un volumen impresionante que dura para siempre.',
    features: ['100 Rosas de listón satinado', 'Luces LED cálidas', 'Corona imperial', 'Empaque rígido para viaje'],
    emoji: '💍🌹',
    badge: 'Edición Exclusiva'
  },
  {
    id: 'eterna-4',
    category: 'eternas',
    title: 'Caja Cilindro Rosas Eternas & Chocolates',
    price: '$35.00',
    description: 'Caja rígida cilíndrica de lujo con rosas eternas de satén en cúpula y compartimento para chocolates Ferrero Rocher.',
    features: ['Rosas de satén preservables', 'Caja sombrerera rígida', 'Chocolates opcionales', 'Ideal para envíos lejanos'],
    emoji: '🎁🍫',
    badge: 'Para Cumpleaños'
  },

  // Colección Matrimonios y Bodas
  {
    id: 'boda-1',
    category: 'bodas',
    title: 'Bouquet de Novia Eterno de Satén',
    price: '$55.00',
    description: 'Un bouquet de novia que no se marchita jamás. Elaborado en satén marfil o blanco puro con toques de pedrería fina y perlas.',
    features: ['Recuerdo para toda la vida', 'Mango ergonómico con encaje', 'Personalizado con el vestido', 'No mancha la tela nupcial'],
    emoji: '👰🤍',
    badge: 'Novias 2026'
  },
  {
    id: 'boda-2',
    category: 'bodas',
    title: 'Pack Boda Integral Eternia',
    price: '$140.00',
    description: 'El combo nupcial perfecto: Bouquet de novia de satén, 2 Azahares para novio y padrino, y 15 mini-recuerdos florales eternos.',
    features: ['Bouquet Novia de satén', '2 Azahares de solapa', '15 Recuerdos para mesa', 'Ahorro del 20% en pack'],
    emoji: '💒✨',
    badge: 'Recomendado Bodas'
  },
  {
    id: 'boda-3',
    category: 'bodas',
    title: 'Recuerdos de Matrimonio en Satén (x25)',
    price: '$65.00',
    description: 'Delicados detalles individuales de flores eternas en miniatura con tarjeta de agradecimiento personalizada para los invitados.',
    features: ['25 Unidades personalizadas', 'Tarjeta con nombres de novios', 'Colores del matrimonio', 'Empaque individual'],
    emoji: '🥂🌿',
    badge: 'Recuerdos'
  },

  // Flores Naturales Frescas
  {
    id: 'natural-1',
    category: 'naturales',
    title: 'Ramo Fresco Pasión (24 Rosas Naturales)',
    price: '$32.00',
    description: 'Rosas ecuatorianas de exportación cosechadas frescas. Follaje fino de eucalipto y envoltura de seda. (Disponible para Lago Agrio).',
    features: ['Rosas frescas de exportación', 'Aroma natural fresco', 'Follaje de eucalipto', 'Entrega inmediata local'],
    emoji: '🌷🌿',
    badge: 'Entrega en el Día'
  },
  {
    id: 'natural-2',
    category: 'naturales',
    title: 'Arreglo Silvestre Girasoles & Rosas',
    price: '$38.00',
    description: 'Combinación radiante de girasoles andinos frescos y rosas amarillas/blancas para aniversarios y graduaciones en Lago Agrio.',
    features: ['Girasoles frescos seleccionados', 'Base decorativa o florero', 'Tarjeta manuscrita', 'Zona Lago Agrio'],
    emoji: '🌻✨',
    badge: 'Muy Popular'
  }
];

export default function Catalog({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('eternas');

  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="catalogo" className="py-20 bg-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Catálogo Exclusivo
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Nuestras Colecciones
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Cada arreglo es confeccionado a mano con dedicación absoluta. Elige tu categoría preferida para conocer opciones y precios.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveCategory('eternas')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === 'eternas'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-rose-700 hover:bg-rose-100/50'
              }`}
            >
              🌸 Flores Eternas (Satén)
            </button>
            <button
              onClick={() => setActiveCategory('bodas')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === 'bodas'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-rose-700 hover:bg-rose-100/50'
              }`}
            >
              👰 Matrimonios & Bodas
            </button>
            <button
              onClick={() => setActiveCategory('naturales')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === 'naturales'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-rose-700 hover:bg-rose-100/50'
              }`}
            >
              🌿 Flores Naturales Frescas
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFDFB] rounded-3xl border border-rose-100/90 shadow-lg shadow-rose-950/5 hover:shadow-2xl hover:shadow-rose-950/10 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Header & Preview */}
              <div>
                <div className="h-48 bg-gradient-to-br from-rose-50 via-rose-100/50 to-amber-50/30 flex items-center justify-center relative p-6 border-b border-rose-100/60">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                    {product.emoji}
                  </span>
                  
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-rose-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-rose-200">
                    {product.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="text-2xl font-serif font-black text-rose-600 mb-3">
                    {product.price} <span className="text-xs font-sans font-medium text-slate-400">USD</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white py-3 px-4 rounded-2xl text-sm font-bold border border-rose-200 hover:border-transparent transition-all shadow-sm"
                >
                  <span>Cotizar / Personalizar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-white">¿Tienes en mente un modelo personalizado?</h4>
            <p className="text-sm text-rose-200">
              Personalizamos números de rosas, letras de iniciales, flores con luces, chocolates favoritos y combinaciones nupciales.
            </p>
          </div>
          <button
            onClick={() => onSelectProduct({ title: 'Modelo 100% Personalizado' })}
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-900 px-6 py-3.5 rounded-full text-sm font-extrabold shadow-lg transition-transform hover:scale-105"
          >
            Diseñar Arreglo a Medida ✨
          </button>
        </div>

      </div>
    </section>
  );
}
