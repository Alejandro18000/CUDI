const fs = require('fs');

const master = JSON.parse(fs.readFileSync('cudi-products-master.json', 'utf8'));

// Format as JS module
const jsContent = `/**
 * ============================================================================
 * MÓDULO TRANSVERSAL 2: CATÁLOGO MAESTRO ÚNICO (modulos/catalogo-unico.js)
 * Catálogo Omnicanal Unificado CUDI v7.5
 * 90 Soluciones Certificadas (15 productos por categoría)
 * Apple Liquid Glassmorphism & Sincronización Total con IA y Demo App
 * Desarrollo 100% realizado por Sergio Alejandro Ospina Rocha
 * ============================================================================
 */
(function () {
    'use strict';

    const PRODUCTOS = ${JSON.stringify(master, null, 8)};

    window.CudiCatalog = {
        products: PRODUCTOS,
        getAll: function () {
            return PRODUCTOS;
        },
        getByCategory: function (catSlug) {
            if (!catSlug || catSlug === 'todos') return PRODUCTOS;
            return PRODUCTOS.filter(p => p.categorySlug === catSlug || p.category.toLowerCase().includes(catSlug.toLowerCase()));
        },
        getBySpecies: function (species) {
            if (!species || species === 'both' || species === 'todos') return PRODUCTOS;
            return PRODUCTOS.filter(p => p.species === species || p.species === 'both' || p.target_species === species);
        },
        getProductById: function (id) {
            return PRODUCTOS.find(p => p.id === id);
        },
        getProductBySlug: function (slug) {
            return PRODUCTOS.find(p => p.slug === slug);
        },
        getProductByUrl: function (url) {
            const clean = url.replace(/^.*\\//, '');
            return PRODUCTOS.find(p => p.url === clean || p.url.endsWith(clean));
        },
        getProductByName: function (name) {
            if (!name) return null;
            const norm = name.toLowerCase().trim();
            return PRODUCTOS.find(p => p.name.toLowerCase().trim() === norm || p.shortTitle.toLowerCase().trim() === norm || norm.includes(p.name.toLowerCase().trim()) || p.name.toLowerCase().trim().includes(norm));
        },
        getRelatedProducts: function (url, count = 3) {
            const current = this.getProductByUrl(url);
            if (!current) return PRODUCTOS.slice(0, count);
            return PRODUCTOS.filter(p => p.id !== current.id && p.categorySlug === current.categorySlug).slice(0, count);
        }
    };

    window.CUDI_PRODUCTS_MASTER = PRODUCTOS;
})();
`;

fs.writeFileSync('BOVEDA-PRIVADA-CUDI-TFM/codigo-fuente-editable/modulos/catalogo-unico.js', jsContent, 'utf8');
fs.writeFileSync('modulos/catalogo-unico.js', jsContent, 'utf8');
console.log('Synchronized modulos/catalogo-unico.js with master dataset!');
