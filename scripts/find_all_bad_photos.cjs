const fs = require('fs');
const path = require('path');

const badIds = [
  'photo-1585846416120-3a7354ed7d39', // man in suit
  'photo-1563460716037-460b3dd14ba9', // broken 404
  'photo-1628009368231-7bb7cfcb0def', // woman petting cat
  'photo-1516734212186-a967f81ad0d7'  // person arms bathing dog
];

const matches = [];

function search(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.includes('.git') && !f.includes('node_modules') && !f.includes('tmp_')) search(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      badIds.forEach(id => {
        if (content.includes(id)) {
          matches.push({ file: full, badId: id });
        }
      });
    }
  });
}

search('.');
console.log('Total bad photo matches:', matches.length);
matches.forEach(m => console.log(`${m.file} -> ${m.badId}`));
