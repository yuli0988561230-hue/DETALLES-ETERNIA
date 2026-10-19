const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');

console.log('====================================================');
console.log('🌸 DETALLES ETERNIA - DIAGNÓSTICO DE VARIABLES (.env)');
console.log('====================================================\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ Error: El archivo .env no existe en la raíz del proyecto.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split(/\r?\n/);
const parsedEnv = {};

for (const line of envLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx !== -1) {
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    parsedEnv[key] = val;
  }
}

const requiredKeys = [
  { key: 'APIFY_API_TOKEN', label: 'Apify API Token (Estudio de Mercado)', placeholderPrefix: 'tu_apify' },
  { key: 'GITHUB_TOKEN', label: 'GitHub Token (Control de versiones)', placeholderPrefix: 'tu_github' },
  { key: 'GITHUB_USERNAME', label: 'GitHub Username', placeholderPrefix: 'tu_usuario' },
  { key: 'VERCEL_TOKEN', label: 'Vercel Token (Despliegue automático)', placeholderPrefix: 'tu_vercel' },
  { key: 'NEXT_PUBLIC_WHATSAPP_PHONE', label: 'Teléfono WhatsApp Pedidos', placeholderPrefix: '+593900' }
];

let allConfigured = true;

requiredKeys.forEach(({ key, label, placeholderPrefix }) => {
  const val = parsedEnv[key];
  if (!val || val.startsWith(placeholderPrefix) || val === '') {
    console.log(`⏳ [PENDIENTE]  ${label} (${key})`);
    allConfigured = false;
  } else {
    const masked = val.length > 8 ? `${val.slice(0, 4)}...${val.slice(-4)}` : '****';
    console.log(`✅ [LISTO]      ${label} (${key}) -> ${masked}`);
  }
});

console.log('\n----------------------------------------------------');
if (allConfigured) {
  console.log('🎉 ¡Todas las credenciales esenciales están configuradas!');
} else {
  console.log('💡 Abre el archivo .env y reemplaza los valores de prueba con tus credenciales reales.');
}
console.log('====================================================\n');
