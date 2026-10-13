const https = require('https');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('cudi-products-master.json', 'utf8'));

// Extract all unique unsplash photo IDs
const photoMap = new Map();
data.forEach(p => {
  const list = [p.img, ...(p.gallery || [])];
  list.forEach(u => {
    if (typeof u === 'string' && u.includes('photo-')) {
      const match = u.match(/photo-[a-zA-Z0-9_-]+/);
      if (match) {
        const id = match[0];
        if (!photoMap.has(id)) photoMap.set(id, []);
        photoMap.get(id).push(p.id + ' (' + p.name + ')');
      }
    }
  });
});

console.log('Total unique Unsplash photos:', photoMap.size);

async function inspectPhoto(id) {
  return new Promise(resolve => {
    const req = https.get('https://unsplash.com/photos/' + id, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
        const desc = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
        const ogDesc = (html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
        resolve({ id, title: title.trim(), desc: desc.trim() || ogDesc.trim() });
      });
    });
    req.on('error', err => resolve({ id, error: err.message }));
    req.setTimeout(6000, () => { req.destroy(); resolve({ id, error: 'timeout' }); });
  });
}

(async () => {
  for (let [id, prods] of photoMap.entries()) {
    const res = await inspectPhoto(id);
    console.log(`=== ${id} (used in ${prods.length} places) ===`);
    console.log(`Prods: ${prods[0]}`);
    console.log(`Title: ${res.title}`);
    console.log(`Desc: ${res.desc}`);
    console.log('--------------------------------------------------');
  }
})();
