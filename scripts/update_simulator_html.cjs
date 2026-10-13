const fs = require('fs');

const files = ['simulador-gemelo-digital-telemetria.html', 'simulador-solo-app.html'];

const fullCatalogBtn = `
                                <button class="store-cat-btn" onclick="openStoreCategory('todos')" style="background:linear-gradient(135deg,#e0f2fe,#bae6fd);border:1px solid #7dd3fc;margin-bottom:12px;padding:12px;">
                                    <div class="cat-icon" style="background:#0284c7;"><i class="fa-solid fa-layer-group"></i></div>
                                    <div><div style="font-weight:900;font-size:0.88rem;color:#0369a1;">Catálogo Completo (90 Productos)</div><div style="font-size:0.72rem;color:#0284c7;">Con buscador, filtros, opiniones y ensayos clínicos</div></div>
                                    <i class="fa-solid fa-chevron-right" style="color:#0284c7;margin-left:auto;"></i>
                                </button>
`;

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let html = fs.readFileSync(f, 'utf8');
  if (!html.includes("openStoreCategory('todos')")) {
    html = html.replace(
      `<p style="font-size:0.75rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Servicios disponibles</p>`,
      `<p style="font-size:0.75rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Servicios y Catálogo Omnicanal</p>${fullCatalogBtn}`
    );
    fs.writeFileSync(f, html, 'utf8');
    console.log(`Updated ${f} with full catalog button`);
  }
});
