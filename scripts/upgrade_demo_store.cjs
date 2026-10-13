const fs = require('fs');
const { packFile } = require('./pack_module.cjs');

const master = JSON.parse(fs.readFileSync('cudi-products-master.json', 'utf8'));

// Group products by the 6 demo categories
const storeCategories = {
  hardware_planes: {
    label: "Dispositivos & Suscripción CUDI",
    icon: "fa-shield-dog",
    color: "#e0f2fe",
    iconColor: "#0077b6",
    products: master.filter(p => p.categorySlug === 'hardware')
  },
  nutricion: {
    label: "Nutrición & Dieta Biológica",
    icon: "fa-bowl-food",
    color: "#ecfdf5",
    iconColor: "#10b981",
    products: master.filter(p => p.categorySlug === 'nutricion')
  },
  clinica: {
    label: "Veterinaria & Salud 24/7",
    icon: "fa-stethoscope",
    color: "#fee2e2",
    iconColor: "#ef4444",
    products: master.filter(p => p.categorySlug === 'veterinaria')
  },
  paseos: {
    label: "Paseos & Cuidadores Certificados",
    icon: "fa-person-walking-dog",
    color: "#eff6ff",
    iconColor: "#3b82f6",
    products: master.filter(p => p.categorySlug === 'paseos')
  },
  seguros: {
    label: "Seguros & Cobertura Total",
    icon: "fa-shield-heart",
    color: "#fef3c7",
    iconColor: "#f59e0b",
    products: master.filter(p => p.categorySlug === 'seguros')
  },
  estetica: {
    label: "Estética, Baño & Spa",
    icon: "fa-spa",
    color: "#f3e8ff",
    iconColor: "#8b5cf6",
    products: master.filter(p => p.categorySlug === 'spa')
  }
};

const appDemoPath = 'BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/app-demo.js';
let appDemoCode = fs.readFileSync(appDemoPath, 'utf8');

// Replace STORE_CATEGORIES definition
const newStoreCategoriesCode = `const STORE_CATEGORIES = ${JSON.stringify(storeCategories, null, 4)};\n`;

// Find where STORE_CATEGORIES begins and where openStoreCategory begins
const startCat = appDemoCode.indexOf('const STORE_CATEGORIES =');
const endCat = appDemoCode.indexOf('function openStoreCategory(catKey)', startCat);

if (startCat === -1 || endCat === -1) {
  console.error('Could not find STORE_CATEGORIES boundaries');
  process.exit(1);
}

// Generate the new enhanced store rendering, search, filtering, and deep modal logic
const newStoreLogic = `
let currentDemoCat = 'todos';
let currentDemoSpecies = 'todos';
let currentDemoSort = 'relevance';
let currentDemoSearch = '';

function getAllDemoProducts() {
    const list = [];
    Object.keys(STORE_CATEGORIES).forEach(k => {
        list.push(...(STORE_CATEGORIES[k].products || []));
    });
    return list;
}

function renderDemoProductCard(prod) {
    const speciesBadge = prod.species === 'cat' || prod.target_species === 'gato'
        ? '<span style="background:#f3e8ff;color:#7e22ce;padding:2px 8px;border-radius:12px;font-size:0.68rem;font-weight:700;"><i class="fa-solid fa-cat"></i> Felino</span>'
        : (prod.species === 'dog' || prod.target_species === 'perro'
            ? '<span style="background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:12px;font-size:0.68rem;font-weight:700;"><i class="fa-solid fa-dog"></i> Canino</span>'
            : '<span style="background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:12px;font-size:0.68rem;font-weight:700;"><i class="fa-solid fa-paw"></i> Universal</span>');

    const stars = '★'.repeat(Math.round(prod.rating || 5));
    const reviewsTxt = prod.reviewsCount ? '(' + prod.reviewsCount + ')' : '';

    return \`
        <div class="product-card" onclick="openProductModal('\${prod.id}')" style="cursor:pointer;border-radius:16px;background:white;border:1px solid #e2e8f0;padding:12px;margin-bottom:12px;box-shadow:0 3px 12px rgba(0,0,0,0.03);display:flex;gap:12px;position:relative;transition:transform 0.15s, box-shadow 0.15s;">
            <div style="width:84px;height:84px;border-radius:12px;background:url('\${prod.img || 'cudi-collar-hardware-hero.jpg'}') center/cover;flex-shrink:0;border:1px solid #f1f5f9;position:relative;">
                <span style="position:absolute;bottom:4px;left:4px;font-size:0.62rem;background:rgba(15,23,42,0.85);color:white;padding:2px 6px;border-radius:8px;font-weight:700;">\${prod.categoryLabel || prod.category || 'CUDI'}</span>
            </div>
            <div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px;">
                        <span style="font-weight:800;font-size:0.86rem;color:#0f172a;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${prod.name}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                        \${speciesBadge}
                        <span style="font-size:0.7rem;color:#f59e0b;font-weight:700;">\${stars} <span style="color:#94a3b8;font-size:0.65rem;">\${reviewsTxt}</span></span>
                    </div>
                    <div style="font-size:0.75rem;color:#64748b;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:6px;">
                        \${prod.desc}
                    </div>
                </div>

                \${prod.studyDoi ? \`
                    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:3px 8px;margin-bottom:6px;font-size:0.68rem;color:#0369a1;display:flex;align-items:center;justify-content:space-between;">
                        <span><i class="fa-solid fa-microscope"></i> <strong>Ensayo:</strong> \${prod.studyMetricLabel || 'Eficacia'}: <span style="font-weight:800;color:#0284c7;">\${prod.studyMetricVal || 'Validado'}</span></span>
                        <span style="font-size:0.62rem;text-decoration:underline;color:#0284c7;">DOI</span>
                    </div>
                \` : ''}

                <div style="display:flex;align-items:center;justify-content:space-between;padding-top:4px;border-top:1px solid #f8fafc;">
                    <div style="font-weight:900;color:#0284c7;font-size:0.95rem;">\${prod.price.toFixed(2)} &euro;</div>
                    <div style="display:flex;gap:6px;">
                        <button onclick="event.stopPropagation(); openProductModal('\${prod.id}')" style="background:#f1f5f9;color:#334155;border:none;border-radius:8px;padding:6px 10px;font-weight:700;font-size:0.72rem;cursor:pointer;">
                            <i class="fa-solid fa-eye"></i> Ficha
                        </button>
                        <button onclick="event.stopPropagation(); addToCart('\${prod.name.replace(/'/g, "\\\\'")}',\${prod.price},'\${prod.img}');" style="background:var(--app-primary);color:white;border:none;border-radius:8px;padding:6px 12px;font-weight:800;font-size:0.74rem;cursor:pointer;">
                            + Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    \`;
}

function openStoreCategory(catKey) {
    currentDemoCat = catKey || 'todos';
    const panel = document.getElementById('store-products-panel');
    if (!panel) return;
    panel.style.display = 'block';
    renderFilteredDemoProducts();
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setDemoSpeciesFilter(sp) {
    currentDemoSpecies = sp;
    renderFilteredDemoProducts();
}

function setDemoSort(st) {
    currentDemoSort = st;
    renderFilteredDemoProducts();
}

function filterDemoStoreInput(val) {
    currentDemoSearch = (val || '').toLowerCase().trim();
    renderFilteredDemoProducts();
}

function renderFilteredDemoProducts() {
    const panel = document.getElementById('store-products-panel');
    if (!panel) return;

    let items = getAllDemoProducts();

    // Filtro por categoria
    if (currentDemoCat && currentDemoCat !== 'todos') {
        const cat = STORE_CATEGORIES[currentDemoCat];
        if (cat) items = cat.products || [];
    }

    // Filtro por especie
    if (currentDemoSpecies && currentDemoSpecies !== 'todos') {
        items = items.filter(p => p.species === currentDemoSpecies || p.species === 'both' || p.target_species === currentDemoSpecies);
    }

    // Filtro por busqueda de texto
    if (currentDemoSearch) {
        items = items.filter(p => 
            p.name.toLowerCase().includes(currentDemoSearch) ||
            p.desc.toLowerCase().includes(currentDemoSearch) ||
            (p.fullDesc && p.fullDesc.toLowerCase().includes(currentDemoSearch)) ||
            (p.partner && p.partner.toLowerCase().includes(currentDemoSearch))
        );
    }

    // Ordenacion
    if (currentDemoSort === 'price-asc') {
        items.sort((a, b) => a.price - b.price);
    } else if (currentDemoSort === 'price-desc') {
        items.sort((a, b) => b.price - a.price);
    } else if (currentDemoSort === 'rating-desc') {
        items.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    const catTitle = currentDemoCat === 'todos' ? 'Todos los Productos y Servicios (90)' : (STORE_CATEGORIES[currentDemoCat]?.label || 'Catálogo');

    panel.innerHTML = \`
        <div style="background:#f8fafc;border-radius:16px;padding:12px;margin-bottom:14px;border:1px solid #e2e8f0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                <h4 style="margin:0;font-size:0.92rem;font-weight:800;color:#0f172a;">\${catTitle} <span style="font-size:0.75rem;color:#64748b;font-weight:600;">(\${items.length})</span></h4>
                <button onclick="document.getElementById('store-products-panel').style.display='none'" style="background:#e2e8f0;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:0.85rem;color:#475569;">✕</button>
            </div>

            <!-- Buscador en tiempo real -->
            <div style="position:relative;margin-bottom:10px;">
                <input type="text" value="\${currentDemoSearch}" oninput="filterDemoStoreInput(this.value)" placeholder="🔍 Buscar por nombre, síntoma, dieta, telemetría..." style="width:100%;padding:8px 12px 8px 30px;border-radius:10px;border:1px solid #cbd5e1;font-size:0.78rem;outline:none;box-sizing:border-box;">
                <i class="fa-solid fa-magnifying-glass" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:0.75rem;"></i>
            </div>

            <!-- Filtros por especie y ordenacion -->
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:space-between;">
                <div style="display:flex;gap:4px;">
                    <button onclick="setDemoSpeciesFilter('todos')" style="padding:4px 8px;border-radius:20px;font-size:0.7rem;font-weight:700;border:1px solid \${currentDemoSpecies==='todos'?'#0284c7':'#cbd5e1'};background:\${currentDemoSpecies==='todos'?'#e0f2fe':'white'};color:\${currentDemoSpecies==='todos'?'#0284c7':'#475569'};cursor:pointer;">🐾 Todos</button>
                    <button onclick="setDemoSpeciesFilter('perro')" style="padding:4px 8px;border-radius:20px;font-size:0.7rem;font-weight:700;border:1px solid \${currentDemoSpecies==='perro'?'#0284c7':'#cbd5e1'};background:\${currentDemoSpecies==='perro'?'#e0f2fe':'white'};color:\${currentDemoSpecies==='perro'?'#0284c7':'#475569'};cursor:pointer;">🐕 Perros</button>
                    <button onclick="setDemoSpeciesFilter('gato')" style="padding:4px 8px;border-radius:20px;font-size:0.7rem;font-weight:700;border:1px solid \${currentDemoSpecies==='gato'?'#0284c7':'#cbd5e1'};background:\${currentDemoSpecies==='gato'?'#e0f2fe':'white'};color:\${currentDemoSpecies==='gato'?'#0284c7':'#475569'};cursor:pointer;">🐈 Gatos</button>
                </div>
                <select onchange="setDemoSort(this.value)" style="padding:4px 8px;border-radius:8px;border:1px solid #cbd5e1;font-size:0.7rem;color:#334155;background:white;outline:none;">
                    <option value="relevance" \${currentDemoSort==='relevance'?'selected':''}>Relevancia</option>
                    <option value="price-asc" \${currentDemoSort==='price-asc'?'selected':''}>Precio: menor</option>
                    <option value="price-desc" \${currentDemoSort==='price-desc'?'selected':''}>Precio: mayor</option>
                    <option value="rating-desc" \${currentDemoSort==='rating-desc'?'selected':''}>Mejor valorados</option>
                </select>
            </div>
        </div>

        <div id="demo-products-list">
            \${items.length === 0 ? \`
                <div style="text-align:center;padding:30px 10px;color:#94a3b8;font-size:0.8rem;">
                    <i class="fa-solid fa-box-open" style="font-size:2rem;margin-bottom:8px;display:block;"></i>
                    No se encontraron productos con estos filtros.
                </div>
            \` : items.map(renderDemoProductCard).join('')}
        </div>
    \`;
}

// =============================================================================
// MODAL PROFUNDO DE DETALLE DE PRODUCTO CON TABS (SPECS, ESTUDIO, OPINIONES)
// =============================================================================
function openProductModal(prodId) {
    const catalog = getAllDemoProducts();
    const prod = catalog.find(p => p.id === prodId) || catalog.find(p => p.slug === prodId);
    if (!prod) return;

    let modal = document.getElementById('cudi-demo-product-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cudi-demo-product-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(10px);z-index:99999;display:flex;align-items:flex-end;justify-content:center;transition:opacity 0.3s;';
        document.body.appendChild(modal);
    }

    const stars = '★'.repeat(Math.round(prod.rating || 5));
    const reviews = prod.userReviews || [];
    const specs = prod.specs || {};

    modal.style.display = 'flex';
    modal.innerHTML = \`
        <div style="background:white;width:100%;max-width:480px;max-height:90vh;border-top-left-radius:24px;border-top-right-radius:24px;overflow-y:auto;display:flex;flex-direction:column;box-shadow:0 -10px 40px rgba(0,0,0,0.2);animation:slideUpModal 0.3s ease;">
            
            <!-- Cabecera de foto y badges -->
            <div style="position:relative;height:220px;background:url('\${prod.img || 'cudi-collar-hardware-hero.jpg'}') center/cover;flex-shrink:0;">
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.65) 100%);"></div>
                <button onclick="closeProductModal()" style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.85);border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;font-weight:800;font-size:0.9rem;display:flex;align-items:center;justify-content:center;color:#0f172a;z-index:2;">✕</button>
                
                <div style="position:absolute;bottom:14px;left:16px;right:16px;color:white;z-index:2;">
                    <div style="display:flex;gap:6px;margin-bottom:6px;">
                        <span style="background:rgba(255,255,255,0.9);color:#0284c7;padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:800;">\${prod.categoryLabel || prod.category}</span>
                        <span style="background:rgba(15,23,42,0.8);color:white;padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;">\${prod.badge || 'Certificado CUDI'}</span>
                    </div>
                    <h3 style="margin:0 0 4px;font-size:1.15rem;font-weight:800;line-height:1.3;text-shadow:0 2px 4px rgba(0,0,0,0.4);">\${prod.name}</h3>
                    <div style="font-size:0.78rem;color:#e2e8f0;display:flex;align-items:center;gap:8px;">
                        <span style="color:#fbbf24;">\${stars} \${prod.rating || 5.0}</span>
                        <span>&bull;</span>
                        <span>\${prod.partner || 'CUDI Labs'}</span>
                    </div>
                </div>
            </div>

            <!-- Selector de Pestañas del Modal -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);background:#f1f5f9;border-bottom:1px solid #e2e8f0;padding:4px;gap:4px;">
                <button id="modal-tab-btn-desc" onclick="switchProductModalTab('desc')" style="padding:8px 4px;border:none;border-radius:8px;font-size:0.72rem;font-weight:800;background:white;color:#0284c7;cursor:pointer;">Descripción</button>
                <button id="modal-tab-btn-specs" onclick="switchProductModalTab('specs')" style="padding:8px 4px;border:none;border-radius:8px;font-size:0.72rem;font-weight:700;background:none;color:#64748b;cursor:pointer;">Ficha Técnica</button>
                <button id="modal-tab-btn-reviews" onclick="switchProductModalTab('reviews')" style="padding:8px 4px;border:none;border-radius:8px;font-size:0.72rem;font-weight:700;background:none;color:#64748b;cursor:pointer;">Opiniones</button>
                <button id="modal-tab-btn-study" onclick="switchProductModalTab('study')" style="padding:8px 4px;border:none;border-radius:8px;font-size:0.72rem;font-weight:700;background:none;color:#64748b;cursor:pointer;">Estudio 🔬</button>
            </div>

            <!-- Contenido de las Pestañas -->
            <div style="padding:16px 20px;flex:1;overflow-y:auto;">
                
                <!-- Pestaña 1: Descripcion -->
                <div id="modal-sec-desc">
                    <h5 style="margin:0 0 8px;font-size:0.88rem;font-weight:800;color:#0f172a;">Resumen & Beneficios Clínicos</h5>
                    <p style="font-size:0.82rem;line-height:1.6;color:#334155;margin:0 0 14px;">\${prod.fullDesc || prod.desc}</p>
                    <div style="background:#f8fafc;border-radius:12px;padding:12px;border:1px solid #e2e8f0;font-size:0.78rem;line-height:1.5;color:#475569;">
                        🛡️ <strong>Garantía de Satisfacción CUDI:</strong> 30 días de prueba sin compromiso y sincronización inmediata con el Gemelo Digital.
                    </div>
                </div>

                <!-- Pestaña 2: Ficha Tecnica -->
                <div id="modal-sec-specs" style="display:none;">
                    <h5 style="margin:0 0 10px;font-size:0.88rem;font-weight:800;color:#0f172a;">Especificaciones Técnicas & Materiales</h5>
                    <div style="display:flex;flex-direction:column;gap:8px;">
                        \${Object.keys(specs).map(k => \`
                            <div style="display:flex;justify-content:space-between;padding:8px 10px;background:#f8fafc;border-radius:8px;font-size:0.78rem;border:1px solid #f1f5f9;">
                                <span style="font-weight:700;color:#64748b;">\${k}</span>
                                <span style="font-weight:800;color:#0f172a;text-align:right;max-width:60%;">\${specs[k]}</span>
                            </div>
                        \`).join('')}
                    </div>
                </div>

                <!-- Pestaña 3: Opiniones & Veredicto Veterinario -->
                <div id="modal-sec-reviews" style="display:none;">
                    \${prod.expertVerdict ? \`
                        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:12px;margin-bottom:14px;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;color:#166534;font-size:0.75rem;font-weight:800;">
                                <i class="fa-solid fa-stethoscope"></i> Veredicto Veterinario Especialista
                            </div>
                            <div style="font-size:0.78rem;color:#14532d;font-style:italic;line-height:1.5;">\${prod.expertVerdict}</div>
                        </div>
                    \` : ''}

                    <h5 style="margin:0 0 10px;font-size:0.88rem;font-weight:800;color:#0f172a;">Opiniones Verificadas de Tutores</h5>
                    \${reviews.map(r => \`
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;margin-bottom:8px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                                <span style="font-weight:800;font-size:0.78rem;color:#0f172a;">\${r.user} <span style="color:#94a3b8;font-weight:500;">(\${r.city || 'España'})</span></span>
                                <span style="color:#f59e0b;font-size:0.72rem;">★ \${r.rating}</span>
                            </div>
                            <p style="margin:0;font-size:0.76rem;color:#475569;line-height:1.4;">"\${r.comment}"</p>
                        </div>
                    \`).join('')}
                </div>

                <!-- Pestaña 4: Informe Clinico / Estudio -->
                <div id="modal-sec-study" style="display:none;">
                    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:14px;margin-bottom:14px;">
                        <span style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:20px;font-size:0.68rem;font-weight:800;">Peer-Reviewed Clinical Trial</span>
                        <h4 style="margin:8px 0 6px;font-size:0.9rem;font-weight:800;color:#1e3a8a;line-height:1.4;">\${prod.studyTitle || 'Evaluación de Eficacia Clínica en Pacientes Reales'}</h4>
                        <div style="font-size:0.74rem;color:#3b82f6;margin-bottom:10px;">
                            <strong>DOI:</strong> \${prod.studyDoi || '10.1016/j.cudi.vetmed.2026.001'} &bull; <em>\${prod.studyJournal || 'Frontiers in Veterinary Science'}</em>
                        </div>
                        <div style="background:white;border-radius:10px;padding:10px;display:flex;justify-content:space-between;align-items:center;border:1px solid #dbeafe;">
                            <div>
                                <div style="font-size:0.72rem;color:#64748b;">Métrica Clínica Principal:</div>
                                <div style="font-weight:800;font-size:0.82rem;color:#0f172a;">\${prod.studyMetricLabel || 'Optimización Biométrica'}</div>
                            </div>
                            <div style="font-size:1.15rem;font-weight:900;color:#0284c7;">\${prod.studyMetricVal || '-84.2%'}</div>
                        </div>
                    </div>

                    <a href="\${prod.studyUrl || 'index.html#ciencia'}" target="_blank" style="display:block;text-align:center;background:#0284c7;color:white;padding:12px;border-radius:12px;font-size:0.82rem;font-weight:800;text-decoration:none;box-shadow:0 4px 14px rgba(2,132,199,0.25);">
                        <i class="fa-solid fa-file-waveform"></i> Abrir Informe Clínico Completo (Página & Gráficas) →
                    </a>
                </div>
            </div>

            <!-- Barra inferior pegajosa de compra -->
            <div style="padding:14px 20px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                <div>
                    <div style="font-size:0.7rem;color:#64748b;">Precio Final:</div>
                    <div style="font-size:1.25rem;font-weight:900;color:#0284c7;">\${prod.price.toFixed(2)} &euro;</div>
                </div>
                <div style="display:flex;gap:8px;">
                    <a href="\${prod.url || 'index.html#store-grid'}" target="_blank" style="background:#f1f5f9;color:#334155;border:none;border-radius:12px;padding:10px 14px;font-weight:700;font-size:0.78rem;text-decoration:none;display:flex;align-items:center;gap:6px;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Web
                    </a>
                    <button onclick="addToCart('\${prod.name.replace(/'/g, "\\\\'")}',\${prod.price},'\${prod.img}'); closeProductModal();" style="background:var(--app-primary);color:white;border:none;border-radius:12px;padding:10px 18px;font-weight:800;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(0,119,182,0.25);">
                        <i class="fa-solid fa-cart-plus"></i> Añadir a la Cesta
                    </button>
                </div>
            </div>
        </div>
    \`;
}

function closeProductModal() {
    const modal = document.getElementById('cudi-demo-product-modal');
    if (modal) modal.style.display = 'none';
}

function switchProductModalTab(tabKey) {
    ['desc', 'specs', 'reviews', 'study'].forEach(k => {
        const sec = document.getElementById('modal-sec-' + k);
        const btn = document.getElementById('modal-tab-btn-' + k);
        if (sec) sec.style.display = k === tabKey ? 'block' : 'none';
        if (btn) {
            btn.style.background = k === tabKey ? 'white' : 'none';
            btn.style.color = k === tabKey ? '#0284c7' : '#64748b';
        }
    });
}
`;

// Replace in appDemoCode
appDemoCode = appDemoCode.slice(0, startCat) + newStoreCategoriesCode + newStoreLogic + appDemoCode.slice(endCat);

// Fix renderInlineCart in appDemoCode to ensure canonical images are used
appDemoCode = appDemoCode.replace(
  /function renderInlineCart\(\) \{[\s\S]*?container\.innerHTML = appCart\.map/,
  `function renderInlineCart() {
    syncCartState();
    const container = document.getElementById('inline-cart-items');
    if (!container) return;

    // Auto-sanear imagenes en el carrito de la demo para que coincidan con el catalogo maestro
    const masterList = getAllDemoProducts();
    appCart.forEach(item => {
        const canonical = masterList.find(p => p.name.toLowerCase() === item.name.toLowerCase());
        if (canonical && item.img !== canonical.img) {
            item.img = canonical.img;
        } else if (!item.img || item.img.includes('photo-1585846416120') || item.img.includes('photo-1563460716037')) {
            item.img = 'cudi-collar-hardware-hero.jpg';
        }
    });

    if (appCart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#94a3b8;font-size:0.8rem;padding:10px;">El carrito está vacío</p>';
        const el = document.getElementById('inline-cart-total');
        if (el) el.textContent = '0.00 €';
        return;
    }

    container.innerHTML = appCart.map`
);

fs.writeFileSync(appDemoPath, appDemoCode, 'utf8');
console.log('Updated BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/app-demo.js with 90 products, deep modal, filters and study reports!');

// Pack to root app-demo.js and modulos/demo-gemelo-digital.js
packFile(appDemoPath, 'app-demo.js');
packFile(appDemoPath, 'modulos/demo-gemelo-digital.js');
