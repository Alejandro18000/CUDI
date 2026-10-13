const fs = require('fs');
const files = fs.readdirSync('tmp_photos').filter(f => f.endsWith('.jpg'));
let html = '<!DOCTYPE html><html><body style="background:#111; color:#fff; font-family:sans-serif; padding:20px;">'
  + '<h1>Photo Audit (34 Unsplash Images)</h1><div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:15px;">';
files.forEach(f => {
  html += '<div style="border:1px solid #444; padding:8px; border-radius:8px; text-align:center;">'
    + '<img src="' + f + '" style="width:100%; height:160px; object-fit:cover; border-radius:4px;" />'
    + '<p style="font-size:11px; word-break:break-all;">' + f + '</p></div>';
});
html += '</div></body></html>';
fs.writeFileSync('tmp_photos/contact_sheet.html', html);
console.log('Created tmp_photos/contact_sheet.html');
