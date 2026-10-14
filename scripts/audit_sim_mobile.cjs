const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/sergi/.gemini/antigravity/brain/07e5fa21-4213-4de0-a034-d282eacfb57f';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function auditSimulator() {
  const fileRelPath = 'simulador-gemelo-digital-telemetria.html';
  const fullPath = path.resolve(fileRelPath).replace(/\\/g, '/');
  const port = 9299;

  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=390,844',
    'file:///' + fullPath
  ]);

  try {
    await new Promise(r => setTimeout(r, 2200));
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await listRes.json();
    const target = pages.find(p => p.url.includes('simulador')) || pages[0];
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
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    await new Promise(r => setTimeout(r, 1000));

    // Fill onboarding if present and switch to store tab
    await send('Runtime.evaluate', {
      expression: `
        (function() {
          if (typeof appDemoAutoFill === 'function') appDemoAutoFill();
          if (typeof proceedToDashboard === 'function') proceedToDashboard();
          if (typeof switchTab === 'function') {
            const storeNav = document.querySelector('.nav-item[onclick*="store"]');
            switchTab('store', storeNav);
          }
        })()
      `
    });

    await new Promise(r => setTimeout(r, 1200));

    // Capture Store Tab on mobile
    let scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'audit_sim_store_mobile_390.png'), Buffer.from(scr.data, 'base64'));
    console.log('Saved audit_sim_store_mobile_390.png');

    // Open first category 'todos' and open a product modal
    await send('Runtime.evaluate', {
      expression: `
        (function() {
          if (typeof openStoreCategory === 'function') openStoreCategory('todos');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'audit_sim_store_catalog_open_390.png'), Buffer.from(scr.data, 'base64'));
    console.log('Saved audit_sim_store_catalog_open_390.png');

    // Open product modal
    await send('Runtime.evaluate', {
      expression: `
        (function() {
          if (typeof openProductModal === 'function') openProductModal('SKU-COLLAR-GPS-01');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'audit_sim_product_modal_390.png'), Buffer.from(scr.data, 'base64'));
    console.log('Saved audit_sim_product_modal_390.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

auditSimulator().catch(console.error);
