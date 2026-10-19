const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const match = envContent.match(/^APIFY_API_TOKEN=(.*)$/m);
const token = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;

if (!token || token.startsWith('tu_apify') || token === '') {
  console.error('❌ Error: Falta APIFY_API_TOKEN en el archivo .env');
  process.exit(1);
}

const ACTOR_ID = 'compass~crawler-google-places';

const runInput = {
  searchStringsArray: [
    'floristerias en lago agrio sucumbios',
    'flores eternas arreglos ecuador'
  ],
  maxCrawledPlacesPerSearch: 5,
  language: 'es',
  scrapeReviews: false,
  scrapePhotos: false
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runMarketResearch() {
  console.log('🚀 Iniciando Actor de Apify para estudio de mercado...');
  console.log('🔍 Búsquedas objetivo:', runInput.searchStringsArray.join(' | '));
  console.log('⚡ Límite configurado: 5 por categoría (optimizado para rapidez y bajo consumo)\n');

  try {
    // 1. Iniciar el actor
    const startRes = await fetch(`https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(runInput)
    });

    if (!startRes.ok) {
      const err = await startRes.text();
      throw new Error(`Error al iniciar actor (${startRes.status}): ${err}`);
    }

    const { data: runData } = await startRes.json();
    const runId = runData.id;
    const defaultDatasetId = runData.defaultDatasetId;
    console.log(`⏳ Tarea de Apify iniciada con ID: ${runId}`);
    console.log(`📦 Dataset asociado: ${defaultDatasetId}`);
    console.log('🔄 Esperando a que el actor recolecte los datos de competidores...');

    // 2. Polling de finalización
    let status = runData.status;
    let attempts = 0;
    while (status !== 'SUCCEEDED' && status !== 'FAILED' && status !== 'TIMED-OUT' && attempts < 40) {
      await sleep(4000);
      attempts++;
      process.stdout.write('.');

      const checkRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${token}`);
      if (checkRes.ok) {
        const { data: currentRun } = await checkRes.json();
        status = currentRun.status;
      }
    }

    console.log(`\n🏁 Estado final de la tarea: ${status}`);

    if (status !== 'SUCCEEDED') {
      console.warn(`⚠️ La tarea terminó con estado: ${status}`);
    }

    // 3. Descargar los resultados del dataset
    console.log('📥 Descargando datos de competidores...');
    const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${token}&format=json`);
    
    if (!itemsRes.ok) {
      throw new Error(`Error al obtener dataset (${itemsRes.status})`);
    }

    const items = await itemsRes.json();
    console.log(`✅ ¡Se obtuvieron ${items.length} registros de competidores!`);

    // 4. Guardar archivo local
    const dataDir = path.resolve(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'competidores-apify.json');
    fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
    console.log(`📁 Datos guardados exitosamente en: data/competidores-apify.json\n`);

    // 5. Imprimir resumen
    console.log('================ RESUMEN DE COMPETIDORES ================');
    items.forEach((item, idx) => {
      console.log(`${idx + 1}. ${item.title || item.name || 'Sin nombre'}`);
      if (item.categoryName) console.log(`   Categoría: ${item.categoryName}`);
      if (item.address) console.log(`   Dirección: ${item.address}`);
      if (item.phone) console.log(`   Teléfono: ${item.phone}`);
      if (item.website) console.log(`   Web: ${item.website}`);
      if (item.totalScore) console.log(`   Calificación: ⭐ ${item.totalScore} (${item.reviewsCount || 0} reseñas)`);
      console.log('---------------------------------------------------------');
    });

  } catch (error) {
    console.error('❌ Error durante el estudio de mercado con Apify:', error.message);
  }
}

runMarketResearch();
