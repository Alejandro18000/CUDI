const fs = require('fs');

let html = fs.readFileSync('simulador-gemelo-digital-telemetria.html', 'utf8');

// Switch screen from onboarding to main
html = html.replace('id="screen-onboarding" class="app-screen active onboarding-screen"', 'id="screen-onboarding" class="app-screen onboarding-screen" style="display:none !important;"');
html = html.replace('id="screen-main" class="app-screen app-main"', 'id="screen-main" class="app-screen app-main active" style="display:flex !important; flex-direction:column; height:100%;"');

// Switch tab to store
html = html.replace('id="tab-dash" class="tab-view active"', 'id="tab-dash" class="tab-view" style="display:none !important;"');
html = html.replace('id="tab-store" class="tab-view"', 'id="tab-store" class="tab-view active" style="display:block !important;"');

const injection = `
<script>
window.addEventListener('load', function() {
  setTimeout(function() {
    if (typeof renderDemoStoreCatalog === 'function') {
      renderDemoStoreCatalog();
    }
    // Also open product modal to verify 4-tab modal
    setTimeout(function() {
      if (typeof openProductModal === 'function') {
        openProductModal('cudi-smart-collar-ultra');
        setTimeout(function() {
          if (typeof switchProductModalTab === 'function') {
            switchProductModalTab('study');
          }
        }, 300);
      }
    }, 500);
  }, 300);
});
</script>
`;

html = html.replace('</body>', injection + '</body>');
fs.writeFileSync('test_sim_modal.html', html, 'utf8');
console.log('Created test_sim_modal.html');
