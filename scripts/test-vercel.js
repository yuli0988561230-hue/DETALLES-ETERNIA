const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const match = envContent.match(/^VERCEL_TOKEN=(.*)$/m);
const token = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;

if (!token || token.startsWith('tu_vercel') || token === '') {
  console.error('⚠️  Aún no has configurado tu VERCEL_TOKEN en el archivo .env.');
  console.error('👉 Obtén tu token en https://vercel.com/account/tokens');
  process.exit(1);
}

async function verifyVercel() {
  console.log('🔄 Conectando con Vercel API...');
  try {
    const res = await fetch('https://api.vercel.com/v2/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error(`❌ Error de autenticación en Vercel (Status ${res.status}): ${res.statusText}`);
      return;
    }

    const data = await res.json();
    console.log('✅ ¡Conexión exitosa con Vercel!');
    console.log(`👤 Usuario Vercel: ${data.user.username}`);
    console.log(`📧 Email: ${data.user.email}`);
  } catch (err) {
    console.error('❌ Error de red al contactar con Vercel:', err.message);
  }
}

verifyVercel();
