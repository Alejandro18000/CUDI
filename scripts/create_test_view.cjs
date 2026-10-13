const fs = require('fs');

let html = fs.readFileSync('simulador-solo-app.html', 'utf8');

// Switch screen from onboarding to main
html = html.replace('id="screen-onboarding" class="app-screen active onboarding-screen" style="display:block;"', 'id="screen-onboarding" class="app-screen onboarding-screen" style="display:none !important;"');
html = html.replace('id="screen-main" class="app-screen app-main"', 'id="screen-main" class="app-screen app-main active" style="display:block !important;"');

// Switch tab to store
html = html.replace('id="tab-dash" class="tab-view active"', 'id="tab-dash" class="tab-view" style="display:none !important;"');
html = html.replace('id="tab-store" class="tab-view"', 'id="tab-store" class="tab-view active" style="display:block !important;"');

// Ensure Store render executes
const injection = `
<script>
window.addEventListener('load', function() {
  if (typeof renderDemoStoreCatalog === 'function') {
    renderDemoStoreCatalog();
  }
});
</script>
`;
html = html.replace('</body>', injection + '</body>');

fs.writeFileSync('test_demo_view.html', html, 'utf8');
console.log('Created test_demo_view.html with Store active!');
