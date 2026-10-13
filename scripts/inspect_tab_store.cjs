const fs = require('fs');
const content = fs.readFileSync('simulador-gemelo-digital-telemetria.html', 'utf8');
const start = content.indexOf('id="tab-store"');
if (start !== -1) {
  console.log(content.slice(start + 1200, start + 5000));
}
