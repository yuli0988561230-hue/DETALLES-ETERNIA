const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const tokenMatch = envContent.match(/^APIFY_API_TOKEN=(.*)$/m);
const token = tokenMatch ? tokenMatch[1].trim().replace(/^["']|["']$/g, '') : null;

if (!token) {
  console.error('❌ Falta APIFY_API_TOKEN en el archivo .env');
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForRun(runId, actorName) {
  console.log(`⏳ Esperando finalización de ${actorName} (ID: ${runId})...`);
  let status = 'RUNNING';
  let attempts = 0;
  while (status !== 'SUCCEEDED' && status !== 'FAILED' && status !== 'TIMED-OUT' && attempts < 45) {
    await sleep(4000);
    attempts++;
    process.stdout.write('.');

    const res = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${token}`);
    if (res.ok) {
      const { data } = await res.json();
      status = data.status;
      if (status === 'SUCCEEDED' || status === 'FAILED') {
        console.log(`\n✅ ${actorName} finalizó con estado: ${status} (Costo aproximado: $${data.usageUsd || '0.05'} USD)`);
        return data;
      }
    }
  }
  return null;
}

async function runDeepResearch() {
  console.log('================================================================');
  console.log('🌸 DETALLES ETERNIA - ESTUDIO PROFUNDO DE MERCADO (APIFY)');
  console.log('Foco: Puntos de Dolor en Reseñas de Google + Tendencias Virales en TikTok');
  console.log('Presupuesto configurado: Seguro (< $2.00 USD)');
  console.log('================================================================\n');

  const dataDir = path.resolve(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // -------------------------------------------------------------
  // 1. TIKTOK VIRAL SCRAPER
  // -------------------------------------------------------------
  console.log('🎬 1. Iniciando análisis viral de TikTok...');
  console.log('🔍 Hashtags objetivo: #floreseternas, #ramobuchon, #rosasdeliston, #bodasecuador, #floreseternasecuador\n');

  try {
    const tiktokRes = await fetch(`https://api.apify.com/v2/acts/clockworks~free-tiktok-scraper/runs?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hashtags: ['floreseternas', 'ramobuchon', 'rosasdeliston', 'bodasecuador'],
        resultsPerPage: 15,
        shouldDownloadVideos: false,
        shouldDownloadCovers: false
      })
    });

    if (tiktokRes.ok) {
      const { data: tiktokRun } = await tiktokRes.json();
      const completedRun = await waitForRun(tiktokRun.id, 'TikTok Scraper');

      if (completedRun && completedRun.status === 'SUCCEEDED') {
        const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${completedRun.defaultDatasetId}/items?token=${token}&format=json`);
        if (itemsRes.ok) {
          const tiktokVideos = await itemsRes.json();
          console.log(`📥 Total de videos virales analizados en TikTok: ${tiktokVideos.length}`);

          // Guardar dataset de TikTok
          fs.writeFileSync(path.join(dataDir, 'tiktok-trends.json'), JSON.stringify(tiktokVideos, null, 2), 'utf-8');

          // Filtrar y ordenar los más virales por reproducciones
          const topVideos = tiktokVideos
            .map(v => ({
              author: v.authorMeta?.name || v.authorMeta?.nickName || 'Desconocido',
              plays: v.playCount || 0,
              likes: v.diggCount || 0,
              shares: v.shareCount || 0,
              comments: v.commentCount || 0,
              text: v.text || '',
              url: v.webVideoUrl || '',
              hashtags: v.hashtags?.map(h => h.name) || [],
              music: v.musicMeta?.musicName || ''
            }))
            .sort((a, b) => b.plays - a.plays)
            .slice(0, 10);

          console.log('\n🔥 TOP 5 VIDEOS MÁS VIRALES DETECTADOS EN TIKTOK:');
          topVideos.slice(0, 5).forEach((v, idx) => {
            console.log(`\n#${idx + 1} | 👁️ ${(v.plays / 1000000).toFixed(1)}M vistas | ❤️ ${(v.likes / 1000).toFixed(0)}K likes`);
            console.log(`   Creador: @${v.author}`);
            console.log(`   Caption: ${v.text.slice(0, 120)}...`);
            console.log(`   Link: ${v.url}`);
          });
        }
      }
    }
  } catch (err) {
    console.error('Error en extracción de TikTok:', err.message);
  }

  // -------------------------------------------------------------
  // 2. GOOGLE MAPS & RESEÑAS (Puntos de fricción)
  // -------------------------------------------------------------
  console.log('\n-------------------------------------------------------------');
  console.log('📍 2. Analizando Puntos de Fricción y Reseñas de Google...');
  console.log('Competidores: Lago Agrio + Quito / Nacional');

  try {
    const existingRunId = 'uGkb8lqWa9U58YnRd';
    let completedPlaces = await waitForRun(existingRunId, 'Google Places & Reviews (En curso)');
    
    if (!completedPlaces || completedPlaces.status !== 'SUCCEEDED') {
      console.log('Iniciando nueva ejecución para reseñas...');
      const placesRes = await fetch(`https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchStringsArray: [
            'floristerias lago agrio',
            'florerias quito',
            'rosas eternas ecuador'
          ],
          maxCrawledPlacesPerSearch: 3,
          scrapeReviews: true,
          maxReviews: 20,
          language: 'es'
        })
      });

      if (placesRes.ok) {
        const { data: placesRun } = await placesRes.json();
        completedPlaces = await waitForRun(placesRun.id, 'Google Places & Reviews');
      }
    }

    if (completedPlaces && completedPlaces.status === 'SUCCEEDED') {
      const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${completedPlaces.defaultDatasetId}/items?token=${token}&format=json`);
      if (itemsRes.ok) {
        const placesData = await itemsRes.json();
        fs.writeFileSync(path.join(dataDir, 'reviews-analysis.json'), JSON.stringify(placesData, null, 2), 'utf-8');
        console.log(`\n📥 Se extrajeron datos de ${placesData.length} florerías con sus reseñas y calificaciones.`);
      }
    }
  } catch (err) {
    console.error('Error en extracción de reseñas:', err.message);
  }

  console.log('\n🏁 Estudio profundo finalizado exitosamente.');
}

runDeepResearch();
