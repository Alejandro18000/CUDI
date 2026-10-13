const fs = require('fs');
const content = fs.readFileSync('BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/app-demo.js', 'utf8');

// Find all category keys
const re = /"([a-zA-Z0-9_-]+)":\s*\{\s*"label":\s*"([^"]+)"/g;
let m;
while ((m = re.exec(content)) !== null) {
  console.log(`Key: ${m[1]} -> Label: ${m[2]}`);
}
