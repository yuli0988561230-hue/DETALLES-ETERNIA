-- ==============================================================================
-- DETALLES ETERNIA - ESQUEMA DE BASE DE DATOS PARA SUPABASE
-- Tabla de Prospectos (Leads) con Calificación (Scoring) y Temperatura
-- ==============================================================================

-- 1. Crear tabla de prospectos si no existe
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    city TEXT NOT NULL,
    occasion TEXT NOT NULL,
    flower_type TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    event_date TEXT NOT NULL,
    custom_details TEXT,
    
    -- Calificación y Priorización de Ventas
    score INTEGER NOT NULL DEFAULT 50, -- 0 a 100
    temperature TEXT NOT NULL DEFAULT 'warm' CHECK (temperature IN ('hot', 'warm', 'cold')),
    
    -- Estado en el embudo comercial
    status TEXT NOT NULL DEFAULT 'no_contactado' CHECK (status IN ('no_contactado', 'contactado', 'en_negociacion', 'cerrado_ganado', 'no_interesado')),
    seller_notes TEXT,
    last_contacted_at TIMESTAMP WITH TIME ZONE
);

-- 2. Habilitar Seguridad a Nivel de Fila (Row Level Security - RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Política para permitir que cualquier visitante de la landing page envíe su cotización
DROP POLICY IF EXISTS "Permitir insercion publica de prospectos" ON public.leads;
CREATE POLICY "Permitir insercion publica de prospectos"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Política para lectura y actualización desde el panel administrativo (con clave anon)
DROP POLICY IF EXISTS "Permitir lectura y gestion de prospectos" ON public.leads;
CREATE POLICY "Permitir lectura y gestion de prospectos"
ON public.leads
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 5. Índices de aceleración para consultas ordenadas por temperatura y fecha
CREATE INDEX IF NOT EXISTS idx_leads_score_desc ON public.leads (score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_temperature ON public.leads (temperature);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at_desc ON public.leads (created_at DESC);

-- 6. Insertar datos de prueba iniciales (opcional, para visualizar de inmediato)
INSERT INTO public.leads (full_name, whatsapp, city, occasion, flower_type, budget_range, event_date, custom_details, score, temperature, status, seller_notes)
VALUES
('María José Zambrano', '+593991234567', 'Lago Agrio', 'Matrimonio / Boda', 'Pack Boda (Bouquet Novia + Azahar + Recuerdos)', 'Más de $100', 'En 2 semanas', 'Boda en Hotel La Cascada, temática blanca y rosa pastel con listón aperlado.', 95, 'hot', 'no_contactado', '🔥 PRIORIDAD MÁXIMA: Llamar urgente hoy en la mañana.'),
('Carlos Mendoza', '+593987654321', 'Quito', 'Aniversario Especial', 'Flores Eternas de Listón (Ramo Buchón)', '$50 a $100', 'Esta semana', 'Ramo buchón de 50 rosas eternas rojas con luces LED cálidas y corona dorada.', 80, 'hot', 'no_contactado', 'Envío a Quito por Servientrega. Muy interesado.'),
('Valeria Paredes', '+593998877665', 'Guayaquil', 'Cumpleaños', 'Flores Eternas de Listón', '$25 a $50', 'Este mes', 'Bouquet mediano tonos lilas con mariposas.', 55, 'warm', 'contactado', 'Se envió catálogo por WhatsApp, esperando confirmación de colores.');
