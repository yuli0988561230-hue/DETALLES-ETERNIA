import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes('tu-proyecto') &&
  !supabaseAnonKey.includes('tu_supabase');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Prospectos semilla de demostración para cuando aún no se conecte Supabase
const SEED_LEADS = [
  {
    id: 'lead-1',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    full_name: 'María José Zambrano',
    whatsapp: '+593991234567',
    city: 'Lago Agrio',
    occasion: 'Matrimonio / Boda',
    flower_type: 'Pack Boda Completo (Bouquet + Azahar + Recuerdos)',
    budget_range: 'Más de $100',
    event_date: 'En 2 semanas',
    custom_details: 'Boda en Hotel La Cascada. Temática rosa pastel y blanco perla con flores de listón satinado.',
    score: 95,
    temperature: 'hot',
    status: 'no_contactado',
    seller_notes: '🔥 PRIORIDAD MÁXIMA: Quiere cotizar 40 recuerdos para invitados.'
  },
  {
    id: 'lead-2',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    full_name: 'Carlos Mendoza',
    whatsapp: '+593987654321',
    city: 'Quito',
    occasion: 'Propuesta de Matrimonio',
    flower_type: 'Flores Eternas de Listón (Ramo Buchón 50 rosas)',
    budget_range: '$50 a $100',
    event_date: 'Esta semana',
    custom_details: 'Rosas rojas de satén con luces LED micro cálidas y corona dorada. Despacho por Servientrega.',
    score: 85,
    temperature: 'hot',
    status: 'no_contactado',
    seller_notes: 'Interesado en pagar con transferencia Banco Pichincha hoy mismo.'
  },
  {
    id: 'lead-3',
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    full_name: 'Valeria Paredes',
    whatsapp: '+593998877665',
    city: 'Guayaquil',
    occasion: 'Cumpleaños / Fecha Especial',
    flower_type: 'Flores Eternas de Listón (Bouquet mediano)',
    budget_range: '$25 a $50',
    event_date: 'Este mes',
    custom_details: 'Bouquet lila con mariposas monarca decorativas.',
    score: 55,
    temperature: 'warm',
    status: 'contactado',
    seller_notes: 'Se envió catálogo por WhatsApp, esperando confirmación de dedicatoria.'
  }
];

const LOCAL_STORAGE_KEY = 'detalles_eternia_leads_cache';

function getLocalLeads() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_LEADS;
  }
}

function setLocalLeads(leads) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Error guardando en localStorage:', e);
  }
}

/**
 * Guarda un prospecto en Supabase o en el almacén local
 */
export async function saveLead(leadData) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) throw error;
      return { success: true, data, source: 'supabase' };
    } catch (err) {
      console.warn('Fallo Supabase, guardando en respaldo local:', err.message);
    }
  }

  // Respaldo local
  const current = getLocalLeads();
  const newLead = {
    ...leadData,
    id: `lead-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  setLocalLeads([newLead, ...current]);
  return { success: true, data: [newLead], source: 'local' };
}

/**
 * Obtiene la lista de prospectos ordenados por Score (Prioridad)
 */
export async function fetchLeads() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('score', { ascending: false });

      if (!error && data) {
        return { data, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Fallo al consultar Supabase, usando respaldo local:', err.message);
    }
  }

  const local = getLocalLeads();
  // Ordenar por score descendente
  local.sort((a, b) => (b.score || 0) - (a.score || 0));
  return { data: local, source: 'local' };
}

/**
 * Actualiza el estado o notas de un prospecto
 */
export async function updateLead(id, updates) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select();

      if (!error) return { success: true, data, source: 'supabase' };
    } catch (err) {
      console.warn('Fallo actualización en Supabase, aplicando local:', err.message);
    }
  }

  const local = getLocalLeads();
  const updated = local.map(l => (l.id === id ? { ...l, ...updates } : l));
  setLocalLeads(updated);
  return { success: true, data: updated, source: 'local' };
}
