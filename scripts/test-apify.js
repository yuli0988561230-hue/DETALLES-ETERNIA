const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ Error: Archivo .env no encontrado.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/^APIFY_API_TOKEN=(.*)$/m);
const token = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;

if (!token || token.startsWith('tu_apify') || token === '') {
  console.error('⚠️  Aún no has configurado tu APIFY_API_TOKEN en el archivo .env.');
  console.error('👉 Por favor abre el archivo .env y coloca tu token de https://console.apify.com/account/integrations');
  process.exit(1);
}

async function verifyApify() {
  console.log('🔄 Conectando con Apify...');
  try {
    const res = await fetch('https://api.apify.com/v2/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error(`❌ Error de autenticación en Apify (Status ${res.status}):`, errData.error?.message || res.statusText);
      return;
    }

    const { data } = await res.json();
    console.log('✅ ¡Conexión exitosa con Apify!');
    console.log(`👤 Usuario: ${data.username || data.name || data.id}`);
    console.log(`📧 Email: ${data.email}`);
    console.log(`💳 Plan: ${data.plan?.name || 'Free / Starter'}`);
    console.log('🚀 Listo para ejecutar actores de scraping y estudio de mercado.');
  } catch (err) {
    console.error('❌ Error de red al contactar con Apify:', err.message);
  }
}

verifyApify();
