const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/sergi/.gemini/antigravity/brain/07e5fa21-4213-4de0-a034-d282eacfb57f';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function auditPage(fileRelPath, width, height, label, scrollSel, customEval) {
  const fullPath = path.resolve(fileRelPath).replace(/\\/g, '/');
  const port = 9250 + Math.floor(Math.random() * 50);

  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    'file:///' + fullPath
  ]);

  try {
    await new Promise(r => setTimeout(r, 2200));
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await listRes.json();
    const target = pages.find(p => p.url.includes(path.basename(fileRelPath))) || pages[0];
    if (!target) throw new Error('No target page found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (msg) => {
          const data = JSON.parse(msg.data);
          if (data.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: true
    });

    await new Promise(r => setTimeout(r, 800));

    if (customEval) {
      await send('Runtime.evaluate', { expression: customEval });
      await new Promise(r => setTimeout(r, 800));
    }

    if (scrollSel) {
      await send('Runtime.evaluate', {
        expression: `
          const el = document.querySelector('${scrollSel}');
          if (el) el.scrollIntoView();
        `
      });
      await new Promise(r => setTimeout(r, 500));
    }

    // Check overflow and widths
    const overflowRes = await send('Runtime.evaluate', {
      expression: `
        (function() {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const badEls = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > winW + 3) {
              badEls.push({
                tag: el.tagName,
                cls: el.className ? String(el.className).slice(0, 50) : '',
                id: el.id,
                right: Math.round(r.right),
                w: Math.round(r.width)
              });
            }
          });
          return JSON.stringify({ docW, winW, hasOverflow: docW > winW, badCount: badEls.length, topBad: badEls.slice(0, 5) });
        })()
      `
    });

    const info = JSON.parse(overflowRes.result.value);
    console.log(`[AUDIT] ${label} (${width}x${height}): docW=${info.docW}, winW=${info.winW}, hasOverflow=${info.hasOverflow}`);
    if (info.hasOverflow) {
      console.log(`   Overflowing elements (${info.badCount}):`, JSON.stringify(info.topBad));
    }

    const scr = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = path.join(brainDir, `audit_mobile_${label}_${width}.png`);
    fs.writeFileSync(outPath, Buffer.from(scr.data, 'base64'));
    console.log(`   Saved screenshot: ${outPath}`);

    ws.close();
  } finally {
    edge.kill();
  }
}

async function run() {
  console.log('=== RUNNING COMPREHENSIVE MOBILE LAYOUT AUDIT ===\n');

  // 1. Product page at 390px (iPhone) and 360px (Android)
  await auditPage('producto-vitality-mix.html', 390, 844, 'product_top', null);
  await auditPage('producto-vitality-mix.html', 390, 844, 'product_specs', '.apple-section-specs');
  await auditPage('producto-vitality-mix.html', 360, 780, 'product_360', null);

  // 2. Study page at 390px and 360px
  await auditPage('estudio-ecopet-organic-barf-integral.html', 390, 844, 'study_top', null);
  await auditPage('estudio-ecopet-organic-barf-integral.html', 390, 844, 'study_chart', '.study-chart-stage-card');
  await auditPage('estudio-ecopet-organic-barf-integral.html', 360, 780, 'study_360', null);

  // 3. Index store grid at 390px and 360px
  await auditPage('index.html', 390, 844, 'index_store', '.ecommerce-grid');
  await auditPage('index.html', 360, 780, 'index_store_360', '.ecommerce-grid');

  console.log('\nAudit run completed successfully!');
}

run().catch(console.error);
