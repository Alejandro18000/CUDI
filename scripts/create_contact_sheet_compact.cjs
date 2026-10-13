const fs = require('fs');
const files = fs.readdirSync('tmp_photos').filter(f => f.endsWith('.jpg'));
// Let's create two pages or a 6-column grid so all 34 fit in one compact height
let html = '<!DOCTYPE html><html><body style="background:#111; color:#fff; font-family:sans-serif; margin:10px;">'
  + '<h1>Photo Audit (All 34 Unsplash Images)</h1>'
  + '<div style="display:grid; grid-template-columns:repeat(6, 1fr); gap:8px;">';
files.forEach(f => {
  html += '<div style="border:1px solid #444; padding:4px; border-radius:6px; text-align:center; background:#1c1c1e;">'
    + '<img src="' + f + '" style="width:100%; height:110px; object-fit:cover; border-radius:3px;" />'
    + '<p style="font-size:9px; word-break:break-all; margin:4px 0 0;">' + f.replace('.jpg', '') + '</p></div>';
});
html += '</div></body></html>';
fs.writeFileSync('tmp_photos/contact_sheet_all.html', html);
console.log('Created tmp_photos/contact_sheet_all.html');
