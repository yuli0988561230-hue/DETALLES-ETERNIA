const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const match = envContent.match(/^GITHUB_TOKEN=(.*)$/m);
const token = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;

if (!token || token.startsWith('tu_github') || token === '') {
  console.error('⚠️  Aún no has configurado tu GITHUB_TOKEN en el archivo .env.');
  console.error('👉 Obtén tu token en https://github.com/settings/tokens (permisos: repo, workflow)');
  process.exit(1);
}

async function verifyGitHub() {
  console.log('🔄 Conectando con GitHub API...');
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Detalles-Eternia-Setup'
      }
    });

    if (!res.ok) {
      console.error(`❌ Error de autenticación en GitHub (Status ${res.status}): ${res.statusText}`);
      return;
    }

    const data = await res.json();
    console.log('✅ ¡Conexión exitosa con GitHub!');
    console.log(`👤 Usuario GitHub: ${data.login} (${data.name || 'Sin nombre público'})`);
    console.log(`🔗 Perfil: ${data.html_url}`);
  } catch (err) {
    console.error('❌ Error de red al contactar con GitHub:', err.message);
  }
}

verifyGitHub();
