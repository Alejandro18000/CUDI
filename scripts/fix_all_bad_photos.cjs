const fs = require('fs');
const path = require('path');

const replacements = [
  // 1. Man in suit -> Pure pet food hero / nutrition
  {
    target: 'https://images.unsplash.com/photo-1585846416120-3a7354ed7d39?auto=format&fit=crop&w=1200&q=85',
    replaceWith: 'cudi-nutricion-organica-hero.jpg'
  },
  {
    target: 'https://images.unsplash.com/photo-1585846416120-3a7354ed7d39',
    replaceWith: 'cudi-nutricion-organica-hero.jpg'
  },
  {
    target: 'photo-1585846416120-3a7354ed7d39',
    replaceWith: 'photo-1589924691995-400dc9ecc119'
  },

  // 2. Broken 404 image -> Pet food bowl
  {
    target: 'https://images.unsplash.com/photo-1563460716037-460b3dd14ba9?auto=format&fit=crop&w=1200&q=85',
    replaceWith: 'cudi-nutricion-organica-hero.jpg'
  },
  {
    target: 'https://images.unsplash.com/photo-1563460716037-460b3dd14ba9',
    replaceWith: 'cudi-nutricion-organica-hero.jpg'
  },
  {
    target: 'photo-1563460716037-460b3dd14ba9',
    replaceWith: 'photo-1568640347023-a616a30bc3bd'
  },

  // 3. Woman petting cat -> Pure veterinary clinic hero
  {
    target: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=85',
    replaceWith: 'cudi-veterinaria-clinica-hero.jpg'
  },
  {
    target: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def',
    replaceWith: 'cudi-veterinaria-clinica-hero.jpg'
  },
  {
    target: 'photo-1628009368231-7bb7cfcb0def',
    replaceWith: 'photo-1576201836106-db1758fd1c97'
  },

  // 4. Arms bathing dog -> Pure spa hero
  {
    target: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85',
    replaceWith: 'cudi-estetica-spa-hero.jpg'
  },
  {
    target: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7',
    replaceWith: 'cudi-estetica-spa-hero.jpg'
  },
  {
    target: 'photo-1516734212186-a967f81ad0d7',
    replaceWith: 'photo-1574158622682-e40e69881006'
  }
];

let filesModified = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacements.forEach(r => {
    if (content.includes(r.target)) {
      content = content.split(r.target).join(r.replaceWith);
    }
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.includes('.git') && !f.includes('node_modules') && !f.includes('tmp_')) walk(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json')) {
      processFile(full);
    }
  });
}

walk('.');
console.log(`\nReplacement complete! ${filesModified} files modified.`);
