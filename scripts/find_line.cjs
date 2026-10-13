const fs = require('fs');
const lines = fs.readFileSync('simulador-gemelo-digital-telemetria.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="tab-store"')) console.log('Line ' + (i+1) + ': ' + l.trim());
});
