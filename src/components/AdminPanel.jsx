import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sun, 
  Snowflake, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Search, 
  RefreshCw, 
  Lock, 
  ArrowLeft, 
  ShieldAlert, 
  UserCheck, 
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { fetchLeads, updateLead } from '../lib/supabase';

export default function AdminPanel({ onBackToLanding }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('eternia_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterTemp, setFilterTemp] = useState('all'); // all, hot, warm, cold
  const [filterStatus, setFilterStatus] = useState('all'); // all, no_contactado, contactado
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSource, setDataSource] = useState('local');

  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'eternia2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('eternia_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('eternia_admin_auth');
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchLeads();
      setLeads(res.data || []);
      setDataSource(res.source || 'local');
    } catch (err) {
      console.error('Error cargando prospectos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (leadId, newStatus) => {
    await updateLead(leadId, { 
      status: newStatus,
      last_contacted_at: new Date().toISOString()
    });
    // Actualizar estado local
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const handleNotesChange = async (leadId, notes) => {
    await updateLead(leadId, { seller_notes: notes });
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, seller_notes: notes } : l));
  };

  // Filtrado de prospectos
  const filteredLeads = leads.filter(l => {
    if (filterTemp !== 'all' && l.temperature !== filterTemp) return false;
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = l.full_name?.toLowerCase().includes(q);
      const matchCity = l.city?.toLowerCase().includes(q);
      const matchPhone = l.whatsapp?.includes(q);
      if (!matchName && !matchCity && !matchPhone) return false;
    }
    return true;
  });

  // Métricas
  const totalLeads = leads.length;
  const hotLeadsCount = leads.filter(l => l.temperature === 'hot').length;
  const pendingContactCount = leads.filter(l => l.status === 'no_contactado').length;
  const contactedCount = leads.filter(l => l.status !== 'no_contactado').length;
  const contactRate = totalLeads > 0 ? Math.round((contactedCount / totalLeads) * 100) : 0;

  // Si no está autenticado, mostrar pantalla de bloqueo
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-white">
          <div className="w-14 h-14 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Panel de Ventas — Detalles Eternia
          </h2>
          <p className="text-slate-400 text-xs text-center mb-6">
            Acceso exclusivo para el agente comercial y administración.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Contraseña de Acceso
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa la contraseña..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all text-sm"
              />
            </div>

            {authError && (
              <p className="text-rose-400 text-xs flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-4 h-4" />
                Contraseña incorrecta. Intenta nuevamente.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-rose-600/30 text-sm"
            >
              Ingresar al Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la tienda</span>
            </button>
            <span className="text-[11px] text-slate-500">Clave por defecto: eternia2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
      
      {/* Top Navbar */}
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/80 sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-xs font-semibold bg-slate-700/80 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl transition-colors border border-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Tienda</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-white">Detalles Eternia</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 font-extrabold uppercase px-2 py-0.5 rounded-full border border-rose-500/30">
                CRM Comercial
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Lago Agrio, Ecuador • Base de datos: <span className="font-mono text-amber-400">{dataSource === 'supabase' ? 'Supabase Conectado' : 'Almacén Local'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadLeads}
            disabled={loading}
            title="Refrescar prospectos"
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors border border-slate-600"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-2 rounded-xl hover:bg-rose-950/40 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Prospectos</span>
              <UserCheck className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-black text-white">{totalLeads}</div>
            <p className="text-[11px] text-slate-500 mt-1">Registrados en la plataforma</p>
          </div>

          <div className="bg-gradient-to-br from-rose-950/40 via-slate-800 to-slate-800 border border-rose-500/40 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                Leads Calientes
              </span>
            </div>
            <div className="text-3xl font-black text-rose-400">{hotLeadsCount}</div>
            <p className="text-[11px] text-rose-300/70 mt-1">Alta urgencia & presupuesto</p>
          </div>

          <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Por Contactar
              </span>
            </div>
            <div className="text-3xl font-black text-amber-400">{pendingContactCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">Pendientes de primera llamada</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Tasa de Contacto
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-400">{contactRate}%</div>
            <p className="text-[11px] text-slate-500 mt-1">{contactedCount} de {totalLeads} atendidos</p>
          </div>

        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Temperature Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-700/80 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterTemp('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTemp === 'all' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({totalLeads})
            </button>
            <button
              onClick={() => setFilterTemp('hot')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTemp === 'hot' ? 'bg-rose-600 text-white shadow' : 'text-rose-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Calientes ({hotLeadsCount})</span>
            </button>
            <button
              onClick={() => setFilterTemp('warm')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTemp === 'warm' ? 'bg-amber-600 text-white shadow' : 'text-amber-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Tibios</span>
            </button>
            <button
              onClick={() => setFilterTemp('cold')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTemp === 'cold' ? 'bg-sky-600 text-white shadow' : 'text-sky-400 hover:text-white'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" />
              <span>Fríos</span>
            </button>
          </div>

          {/* Status Filter & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none"
            >
              <option value="all">Estado: Todos</option>
              <option value="no_contactado">Solo Pendientes (No contactados)</option>
              <option value="contactado">Solo Contactados</option>
              <option value="en_negociacion">En Negociación</option>
              <option value="cerrado_ganado">Venta Concretada</option>
            </select>

            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, ciudad..."
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500"
              />
            </div>
          </div>

        </div>

        {/* Priority Instructions for Sales Agent */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <strong>Instrucción para el Agente Comercial:</strong> Los prospectos están ordenados con prioridad automática. 
            Llama primero a los marcados en <span className="text-rose-400 font-bold">🔥 CALIENTE</span> (son bodas, aniversarios inminentes o presupuestos mayores a $50). 
            Usa el botón de WhatsApp para contactarlos con el mensaje preparado.
          </div>
        </div>

        {/* Leads Cards Grid */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800 text-slate-400">
              <p className="text-base font-semibold">No se encontraron prospectos con los filtros actuales.</p>
              <p className="text-xs text-slate-500 mt-1">Los nuevos clientes aparecerán aquí automáticamente en cuanto coticen en la web.</p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isHot = lead.temperature === 'hot';
              const isWarm = lead.temperature === 'warm';
              const isContacted = lead.status !== 'no_contactado';

              const cleanPhone = lead.whatsapp ? lead.whatsapp.replace(/\D/g, '') : '';
              const whatsappMessage = encodeURIComponent(
                `¡Hola ${lead.full_name}! 🌸 Te saluda el equipo de Detalles Eternia desde Lago Agrio.\n\n` +
                `Recibimos tu solicitud para tu *${lead.occasion}* (${lead.flower_type}). Nos encantaría coordinar contigo para que tu arreglo quede perfecto.\n\n` +
                `¿Tienes un momento para revisar los detalles del diseño?`
              );

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl p-6 transition-all border ${
                    isHot
                      ? 'bg-slate-800/95 border-rose-500/50 shadow-lg shadow-rose-950/20'
                      : isWarm
                      ? 'bg-slate-800/80 border-amber-500/30'
                      : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Left: Lead Identity & Scoring Badge */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        
                        {/* Temperature Tag */}
                        {isHot ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md shadow-rose-600/30">
                            <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                            <span>🔥 CALIENTE ({lead.score} pts)</span>
                          </span>
                        ) : isWarm ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Sun className="w-3.5 h-3.5" />
                            <span>🌤️ TIBIO ({lead.score} pts)</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                            <Snowflake className="w-3.5 h-3.5" />
                            <span>❄️ FRÍO ({lead.score} pts)</span>
                          </span>
                        )}

                        {/* Status Tag */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          lead.status === 'no_contactado'
                            ? 'bg-rose-950/60 text-rose-300 border border-rose-700/60'
                            : lead.status === 'contactado'
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-700/60'
                            : lead.status === 'cerrado_ganado'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60'
                            : 'bg-blue-950/60 text-blue-300 border border-blue-700/60'
                        }`}>
                          {lead.status === 'no_contactado' ? '⏳ No Contactado' :
                           lead.status === 'contactado' ? '📞 Contactado' :
                           lead.status === 'en_negociacion' ? '💬 En Negociación' :
                           lead.status === 'cerrado_ganado' ? '🏆 Venta Concretada' : lead.status}
                        </span>

                        <span className="text-xs text-slate-400">
                          {new Date(lead.created_at).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>

                      {/* Name & Contact */}
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <span>{lead.full_name}</span>
                          <span className="text-sm font-normal text-slate-400">({lead.city})</span>
                        </h3>
                        <p className="text-sm font-mono text-emerald-400 mt-0.5">
                          WhatsApp: {lead.whatsapp}
                        </p>
                      </div>

                      {/* Details Pills */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                          <span className="text-rose-400">💐</span> {lead.flower_type}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                          <span className="text-amber-400">❤️</span> {lead.occasion}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {lead.budget_range}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" /> {lead.event_date}
                        </span>
                      </div>

                      {/* Custom details if any */}
                      {lead.custom_details && (
                        <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 italic">
                          "{lead.custom_details}"
                        </p>
                      )}
                    </div>

                    {/* Right: Actions & Notes */}
                    <div className="space-y-3 shrink-0 lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-700/80 pt-4 lg:pt-0 lg:pl-6">
                      
                      {/* WhatsApp Call Button */}
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          if (lead.status === 'no_contactado') {
                            handleStatusChange(lead.id, 'contactado');
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-emerald-900/30"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Abrir WhatsApp con Mensaje</span>
                      </a>

                      {/* Status Selector */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Actualizar Estado Comercial:
                        </label>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-rose-500"
                        >
                          <option value="no_contactado">⏳ No Contactado</option>
                          <option value="contactado">📞 Contactado</option>
                          <option value="en_negociacion">💬 En Negociación</option>
                          <option value="cerrado_ganado">🏆 Venta Concretada</option>
                          <option value="no_interesado">✖️ No Interesado</option>
                        </select>
                      </div>

                      {/* Rep Notes */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Notas del Vendedor:
                        </label>
                        <input
                          type="text"
                          defaultValue={lead.seller_notes || ''}
                          onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                          placeholder="Ej. Pagará mañana por Pichincha..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-rose-500"
                        />
                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
