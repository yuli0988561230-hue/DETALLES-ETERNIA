import React from 'react';
import { Truck, ShieldCheck, Box, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ShippingSection() {
  return (
    <section id="envios" className="py-20 bg-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            Logística Nacional Garantizada
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            ¿Cómo enviamos desde Lago Agrio a todo el Ecuador?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            El mayor temor de comprar flores por internet es que lleguen maltratadas o marchitas. Nuestras <strong>flores eternas en satén</strong> y nuestro <strong>empaque estructurado</strong> eliminan ese riesgo por completo.
          </p>
        </div>

        {/* 3 Pillars of Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-rose-100/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">1. Empaque Rígido Anti-Golpes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cada ramo viaja fijado en una caja rígida de cartón corrugado reforzado con base inmovilizadora. No se aplasta ni sufre fricción durante el viaje.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-rose-100/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">2. Satén Que No Se Marchita</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A diferencia de las flores naturales que se deshidratan con el calor del viaje, nuestras flores de listón de satén mantienen su color, brillo y forma intactos por años.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-rose-100/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">3. Dos Vías de Entrega Rápida</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Servientrega:</strong> Entrega a la puerta de tu casa u oficina (24 a 48 hrs). <br />
              <strong>Cooperativas de Transporte:</strong> Retiro en terminal terrestre de tu ciudad (el mismo día o al día siguiente).
            </p>
          </div>

        </div>

        {/* Coverage Banner */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-block px-3 py-1 bg-amber-400 text-slate-900 text-xs font-bold uppercase rounded-full">
              🇪🇨 Cobertura en las 24 Provincias
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              Enviamos a Quito, Guayaquil, Cuenca, Ambato y todo rincón del país.
            </h3>
            <p className="text-rose-100 text-sm leading-relaxed">
              Y si te encuentras en <strong>Lago Agrio</strong> (Nueva Loja), realizamos entregas personales inmediatas en salones de eventos, hoteles como La Cascada, domicilios o sorpresas de cumpleaños.
            </p>
            <div className="pt-2 text-xs text-amber-200 flex items-center gap-2">
              <span>🌎</span>
              <span><strong>¿Estás en EE.UU., España o fuera de Ecuador?</strong> Te enviamos foto y video en HD de tu arreglo antes de entregarlo para tu completa tranquilidad.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
