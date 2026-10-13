const fs = require('fs');
const files = ['BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/app-demo.js', 'simulador-gemelo-digital-telemetria.html', 'simulador-solo-app.html'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const ids = [];
    const re = /id=['"](tab-[a-zA-Z0-9_-]+)['"]/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      ids.push(m[1]);
    }
    console.log(f, [...new Set(ids)]);
  }
});
