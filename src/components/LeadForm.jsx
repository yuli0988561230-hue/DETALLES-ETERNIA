import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, CheckCircle2, MessageCircle, Heart, MapPin, Calendar, DollarSign, Gift } from 'lucide-react';
import { calculateLeadScore } from '../lib/scoring';
import { saveLead } from '../lib/supabase';

const CITIES = [
  'Lago Agrio (Sucumbíos)',
  'Quito (Pichincha)',
  'Guayaquil (Guayas)',
  'Cuenca (Azuay)',
  'Ambato (Tungurahua)',
  'Santo Domingo',
  'Machala (El Oro)',
  'Loja',
  'Ibarra (Imbabura)',
  'Manta / Portoviejo (Manabí)',
  'Shushufindi / Joya de los Sachas / Coca',
  'Otra Ciudad del Ecuador',
  '🌎 Pido desde el Extranjero (EE.UU., España, etc.) para entregar en Ecuador'
];

export default function LeadForm({ selectedProduct }) {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    city: 'Lago Agrio (Sucumbíos)',
    occasion: 'Matrimonio / Boda',
    flowerType: selectedProduct?.title || 'Flores Eternas de Listón (Ramo Buchón)',
    budgetRange: '$50 a $100',
    eventDate: 'Esta semana',
    customDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  // Sincronizar producto seleccionado desde el catálogo
  React.useEffect(() => {
    if (selectedProduct?.title) {
      setFormData(prev => ({
        ...prev,
        flowerType: selectedProduct.title
      }));
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Calcular calificación y temperatura del prospecto
    const { score, temperature, priorityLabel } = calculateLeadScore({
      occasion: formData.occasion,
      flowerType: formData.flowerType,
      budgetRange: formData.budgetRange,
      eventDate: formData.eventDate
    });

    // 2. Preparar objeto para guardar en Supabase
    const leadPayload = {
      full_name: formData.fullName,
      whatsapp: formData.whatsapp,
      city: formData.city,
      occasion: formData.occasion,
      flower_type: formData.flowerType,
      budget_range: formData.budgetRange,
      event_date: formData.eventDate,
      custom_details: formData.customDetails,
      score,
      temperature,
      status: 'no_contactado',
      seller_notes: `[Auto-Score: ${score} pts | ${priorityLabel}]`
    };

    try {
      await saveLead(leadPayload);

      // Lanzar confeti de celebración
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmittedLead({
        ...leadPayload,
        priorityLabel
      });
    } catch (error) {
      console.error('Error al guardar prospecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = import.meta.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+593900000000';
    const cleanPhone = phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `¡Hola Detalles Eternia! 🌸 Vengo de su página web.\n\n` +
      `Mi nombre es *${formData.fullName}* y me encuentro en *${formData.city}*.\n` +
      `📌 *Ocasión:* ${formData.occasion}\n` +
      `💐 *Arreglo de interés:* ${formData.flowerType}\n` +
      `💵 *Presupuesto aprox:* ${formData.budgetRange}\n` +
      `📅 *Fecha requerida:* ${formData.eventDate}\n` +
      (formData.customDetails ? `✍️ *Detalles:* ${formData.customDetails}\n\n` : '\n') +
      `¿Podrían confirmarme disponibilidad y coordinar mi pedido?`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="cotizar" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#FFFDFB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-rose-600" />
            Cotizador Personalizado
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Diseña y Cotiza Tu Arreglo Soñado
          </h2>
          <p className="mt-2 text-slate-600 text-base">
            Cuéntanos la ocasión y tus preferencias. Nuestro equipo te responderá de inmediato con la propuesta ideal para tu presupuesto.
          </p>
        </div>

        {/* Success Card or Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-100 shadow-rose-950/5 relative overflow-hidden">
          
          {submittedLead ? (
            /* Pantalla de Éxito */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  ¡Gracias, {submittedLead.full_name}!
                </h3>
                <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
                  Hemos registrado tu solicitud con prioridad. Tu detalle ha sido clasificado por nuestro sistema y un asesor de ventas te contactará a tu WhatsApp: <strong>{submittedLead.whatsapp}</strong>.
                </p>
              </div>

              {/* Summary Pill */}
              <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-100 max-w-md mx-auto text-left text-xs sm:text-sm space-y-1.5 text-slate-700">
                <p>📍 <strong>Destino:</strong> {submittedLead.city}</p>
                <p>💐 <strong>Arreglo:</strong> {submittedLead.flower_type}</p>
                <p>📅 <strong>Fecha:</strong> {submittedLead.event_date}</p>
                <p>💵 <strong>Rango:</strong> {submittedLead.budget_range}</p>
              </div>

              {/* WhatsApp direct chat button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar mensaje directo por WhatsApp</span>
                </button>

                <button
                  onClick={() => setSubmittedLead(null)}
                  className="px-6 py-3.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
                >
                  Hacer otra cotización
                </button>
              </div>
            </div>
          ) : (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ej. María Pérez"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Número de WhatsApp (Ecuador) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Ej. 0987654321 o +593987654321"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ciudad */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Ciudad de Entrega / Despacho *</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm bg-white"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Ocasión */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Ocasión Especial *</span>
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm bg-white"
                  >
                    <option value="Matrimonio / Boda">👰 Matrimonio / Boda</option>
                    <option value="Propuesta de Matrimonio">💍 Propuesta de Matrimonio</option>
                    <option value="Aniversario Especial">❤️ Aniversario de Pareja</option>
                    <option value="Cumpleaños / Fecha Especial">🎂 Cumpleaños / Sorpresa</option>
                    <option value="Graduación">🎓 Graduación</option>
                    <option value="Solo por Amor / Detalle">✨ Solo por Amor / Detalle Espontáneo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Tipo de Arreglo */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Tipo de Arreglo
                  </label>
                  <select
                    name="flowerType"
                    value={formData.flowerType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm bg-white"
                  >
                    <option value="Flores Eternas de Listón (Ramo Buchón)">Flores Eternas de Listón (Satén)</option>
                    <option value="Flores Naturales Frescas">Flores Naturales Frescas</option>
                    <option value="Pack Boda Completo (Bouquet + Azahar + Recuerdos)">Pack Boda Completo</option>
                    <option value="Bouquet de Novia Eterno">Bouquet de Novia Eterno</option>
                    <option value="Caja Personalizada con Chocolates">Caja con Chocolates</option>
                    <option value="Arreglo 100% Personalizado">Arreglo a Medida</option>
                  </select>
                </div>

                {/* Presupuesto */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                    <span>Presupuesto Aproximado</span>
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm bg-white"
                  >
                    <option value="Menos de $25">Económico (Menos de $25)</option>
                    <option value="$25 a $50">Estándar ($25 a $50)</option>
                    <option value="$50 a $100">Premium ($50 a $100)</option>
                    <option value="Más de $100">Exclusivo / Bodas (Más de $100)</option>
                  </select>
                </div>

                {/* Fecha / Urgencia */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>¿Para cuándo lo necesitas?</span>
                  </label>
                  <select
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm bg-white"
                  >
                    <option value="Próximas 48 horas (Urgente)">⚡ Próximas 48 horas (Urgente)</option>
                    <option value="Esta semana">📅 Esta misma semana</option>
                    <option value="Este mes">🗓️ En este mes</option>
                    <option value="En 1 a 3 meses">💍 En 1 a 3 meses</option>
                    <option value="Más de 3 meses / Explorando">🔍 Más de 3 meses / Cotizando</option>
                  </select>
                </div>
              </div>

              {/* Detalles personalizados */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Colores preferidos, dedicatoria o detalles adicionales (Opcional)
                </label>
                <textarea
                  name="customDetails"
                  rows={3}
                  value={formData.customDetails}
                  onChange={handleChange}
                  placeholder="Ej. Me gustaría en tonos rosado pastel y perla, con luces LED cálidas y una dedicatoria que diga 'Feliz Aniversario mi amor'."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all resize-none"
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white py-4 px-6 rounded-2xl font-bold text-base shadow-lg shadow-rose-600/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Registrando cotización...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Cotización y Priorizar Mi Pedido</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                🔒 Tus datos están protegidos. Te responderemos directamente a tu WhatsApp en pocos minutos.
              </p>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
