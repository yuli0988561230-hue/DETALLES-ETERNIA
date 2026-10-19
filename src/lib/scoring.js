/**
 * Algoritmo de Scoring y Calificación de Prospectos para Detalles Eternia
 * Permite al agente de ventas clasificar automáticamente la temperatura de compra.
 */

export function calculateLeadScore({ occasion, flowerType, budgetRange, eventDate }) {
  let score = 0;

  // 1. Ocasión del Evento (Peso: hasta 35 pts)
  switch (occasion) {
    case 'Matrimonio / Boda':
      score += 35; // Ticket más alto y necesidad de múltiples arreglos
      break;
    case 'Propuesta de Matrimonio':
    case 'Aniversario Especial':
      score += 25; // Alta carga emocional y disposición a pagar
      break;
    case 'Cumpleaños / Fecha Especial':
    case 'Graduación':
      score += 15;
      break;
    default:
      score += 5;
      break;
  }

  // 2. Presupuesto Estimado (Peso: hasta 35 pts)
  switch (budgetRange) {
    case 'Más de $100':
      score += 35; // Paquetes de Boda o Ramos Buchones de 100 rosas
      break;
    case '$50 a $100':
      score += 25; // Ramos Buchones medianos con luces y corona
      break;
    case '$25 a $50':
      score += 15; // Bouquets medianos
      break;
    case 'Menos de $25':
      score += 5;
      break;
    default:
      score += 10;
      break;
  }

  // 3. Urgencia / Fecha del Evento (Peso: hasta 30 pts)
  switch (eventDate) {
    case 'Próximas 48 horas (Urgente)':
      score += 30; // Decisión inmediata, alta probabilidad de cierre
      break;
    case 'Esta semana':
      score += 20;
      break;
    case 'Este mes':
      score += 15;
      break;
    case 'En 1 a 3 meses':
      score += 10;
      break;
    case 'Más de 3 meses / Explorando':
    default:
      score += 5;
      break;
  }

  // Asegurar rango 0 - 100
  score = Math.min(100, Math.max(0, score));

  // Determinar Temperatura
  let temperature = 'warm';
  let priorityLabel = 'Prioridad Media';
  let recommendedAction = 'Contactar dentro de las próximas 2 a 4 horas.';

  if (score >= 70) {
    temperature = 'hot';
    priorityLabel = '🔥 PRIORIDAD ALTA';
    recommendedAction = '¡Llamar o escribir de inmediato por WhatsApp! Alta intención de compra.';
  } else if (score < 45) {
    temperature = 'cold';
    priorityLabel = 'Prioridad Normal';
    recommendedAction = 'Enviar catálogo por WhatsApp en horas de menor tráfico.';
  }

  return {
    score,
    temperature,
    priorityLabel,
    recommendedAction
  };
}
