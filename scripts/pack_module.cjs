const fs = require('fs');

function packFile(sourcePath, targetPath) {
  const code = fs.readFileSync(sourcePath, 'utf8');
  const b64 = Buffer.from(code, 'utf8').toString('base64');
  const wrapped = `/* © 2026 CUDI ECOSYSTEM — PROPIEDAD INTELECTUAL PROTEGIDA. PROHIBIDA SU COPIA, EXTRACCION O DISTRIBUCION. */\n!function(_0x7e4a){try{var _0x5c2b=Uint8Array.from(atob(_0x7e4a),function(_0x2d){return _0x2d.charCodeAt(0)});(0,eval)(new TextDecoder("utf-8").decode(_0x5c2b))}catch(_0xe){console.error(_0xe)}}("${b64}");\n`;
  fs.writeFileSync(targetPath, wrapped, 'utf8');
  console.log(`Packed ${sourcePath} -> ${targetPath} (${code.length} bytes -> ${wrapped.length} bytes)`);
}

module.exports = { packFile };

if (require.main === module) {
  const [,, src, dst] = process.argv;
  if (src && dst) packFile(src, dst);
}
