import React, { useState } from 'react';
import { ChevronDown, Star, MessageSquareQuote, CreditCard } from 'lucide-react';

const FAQS = [
  {
    q: '¿Con cuánto tiempo de anticipación debo hacer mi pedido?',
    a: 'Para ramos de flores eternas de 15 a 50 rosas, recomendamos de 2 a 4 días de anticipación debido a la confección artesanal pétalo a pétalo. Para ramos buchones gigantes (100 rosas) o bodas completas, recomendamos de 1 a 2 semanas. En Lago Agrio también atendemos pedidos exprés de flores naturales sujetas a disponibilidad.'
  },
  {
    q: '¿Qué métodos de pago aceptan en Ecuador?',
    a: 'Aceptamos transferencias y depósitos bancarios en Banco Pichincha, Banco Guayaquil, Banco del Pacífico, aplicaciones móviles Deuna y transferencias interbancarias directas. Los pedidos se reservan con un abono del 50% y el saldo se cancela al momento del despacho con foto/video de confirmación.'
  },
  {
    q: '¿Cómo garantizan que las flores lleguen perfectas a otra provincia?',
    a: 'Utilizamos cajas de cartón corrugado rígido diseñadas especialmente para floristería de impacto, con soporte interno que inmoviliza el mango del ramo para que los pétalos de satén no rocen las paredes de la caja. Te enviamos foto y video del arreglo empaquetado antes de ser entregado a Servientrega o la cooperativa.'
  },
  {
    q: '¿Puedo personalizar el color de las rosas, luces y dedicatoria?',
    a: '¡Por supuesto! Es una de nuestras mayores especialidades. Puedes elegir rosas rojas, fucsias, rosa pastel, blancas, negras, doradas, lilas o combinadas. Incluimos coronas decorativas, mariposas monarca 3D, luces micro-LED cálidas a batería y tarjeta con tu dedicatoria personalizada.'
  },
  {
    q: '¿Ofrecen servicio para bodas y matrimonios en Lago Agrio?',
    a: 'Sí, elaboramos ramos de novia eternos de satén (ideales para conservar como reliquia matrimonial), azahares para el novio y padrinos, centros de mesa y recuerdos para invitados. Coordinamos con recepciones y salones de eventos en Lago Agrio como Hotel La Cascada y Zafiro Club.'
  }
];

export default function TestimonialsFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faqs" className="py-20 bg-[#FAF7F2] border-t border-rose-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials snippet */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
              Experiencias Reales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
              Lo que dicen quienes ya sorprendieron con Eternia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic">
                "Pedí un ramo buchón de 50 rosas eternas con luces para enviarlo desde Lago Agrio a Quito para mi novia. Llegó perfecto por Servientrega, en su caja intacto. ¡Quedó enamorada!"
              </p>
              <div className="text-xs font-bold text-slate-900">
                — Fernando G. <span className="text-slate-400 font-normal">(Quito)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic">
                "Mi ramo de novia en flores de listón de satén fue lo más hermoso de mi boda. Lo mejor es que hoy adorna mi sala como un recuerdo que nunca morirá."
              </p>
              <div className="text-xs font-bold text-slate-900">
                — Andrea M. <span className="text-slate-400 font-normal">(Lago Agrio)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic">
                "La atención por WhatsApp es súper rápida y personalizada. Me ayudaron a elegir los tonos y le agregaron chocolates Ferrero. 100% recomendados."
              </p>
              <div className="text-xs font-bold text-slate-900">
                — Christian T. <span className="text-slate-400 font-normal">(Guayaquil)</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Preguntas Frecuentes
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Todo lo que necesitas saber sobre confección, pagos y tiempos de despacho.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-rose-100/80 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-rose-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-rose-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
