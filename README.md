# 🐾 CUDI Ecosystem — Plataforma IoT de Salud Predictiva, Gemelo Digital e IA Veterinaria

> **🌐 Demo Interactiva en Vivo:** **[https://alejandro18000.github.io/cudi-bienestar-animal/](https://alejandro18000.github.io/cudi-bienestar-animal/)**  
> **📱 Simulador de App & Gemelo Digital:** **[Probar Simulador en Vivo](https://alejandro18000.github.io/cudi-bienestar-animal/simulador-gemelo-digital-telemetria.html)**

---

## 🚀 Descripción Ejecutiva del Proyecto

**CUDI (Cuidado Integral Multiespecie)** es una plataforma web y ecosistema IoT de salud predictiva para perros y gatos que integra:

1. **Gemelo Digital Biométrico en Tiempo Real (`Simulador IoT`)**: Monitorización continua de frecuencia cardíaca (BPM), variabilidad cardíaca (HRV), frecuencia respiratoria (RPM), temperatura basal, calidad de sueño y radar GPS con geocercas activas.
2. **Motor de Inteligencia Artificial Híbrido (`WebLLM WebGPU + Motor Experto RAG`)**: Asistente clínico conversacional que ejecuta inferencia neural directamente en el navegador mediante `Qwen2.5-0.5B-Instruct` sobre WebGPU con respaldo determinista instantáneo y lectura en tiempo real de la telemetría de la mascota.
3. **Ecosistema Omnicanal Unificado (`Web + App Demo + Marketplace + Comunidad`)**: Sincronización reactiva en vivo de perfil de mascota, carrito de compras omnicanal, reservas veterinarias 24/7 y red social local para tutores.
4. **Simulador Financiero SaaS & Hardware (`Unit Economics`)**: Cuadro de mando interactivo de proyecciones financieras a 5 años (LTV/CAC, Churn, EBITDA, VAN y TIR) con modelado dinámico de escenarios.
5. **Telemetría de Marketing (`Google Marketing Platform — GA4 + GTM`)**: Instrumentación de comercio electrónico (`add_to_cart`, `begin_checkout`, `purchase`), eventos biométricos y consola de auditoría de `dataLayer` en tiempo real.

---

## 🏗️ Arquitectura Modular de Producción

El proyecto sigue una arquitectura modular desacoplada en español con compilación y ofuscación de producción:

```text
CUDI/
├── index.html                                 # Portal principal del ecosistema CUDI
├── simulador-gemelo-digital-telemetria.html   # Simulador interactivo App + Gemelo Digital IoT
├── simulador-financiero.html                  # Simulador interactivo de Unit Economics y SaaS
├── analitica-marketing-google.html            # Hub de telemetría Google Marketing Platform (GA4/GTM)
│
├── estilos/                                   # Hojas de estilo modulares minificadas
│   ├── variables-y-base.css                   # Tokens de diseño, tipografía y reset global
│   ├── componentes-transversales.css          # Navbar, buscador, carrito, migas de pan y widgets
│   ├── paginas-y-tienda.css                   # Secciones, marketplace, fichas y páginas internas
│   ├── responsivo-movil.css                   # Adaptación móvil integral (320px - 1024px)
│   ├── demo-gemelo-digital.css                # Estilos del simulador móvil y Gemelo Digital
│   ├── asistente-ia.css                       # Interfaz del asistente CUDI Bio-Neural AI
│   └── simulador-financiero.css               # Estilos del dashboard financiero
│
├── modulos/                                   # Módulos JavaScript de producción (Ofuscados)
│   ├── estado-compartido.js                   # Bus de estado reactivo (CudiState: mascota, carrito, idioma)
│   ├── catalogo-unico.js                      # Fuente única de verdad de productos y artículos clínicos
│   ├── internacionalizacion.js                # Diccionario y motor multilingüe reactivo (ES / CA / EN)
│   ├── nucleo-transversal.js                  # Orquestador transversal de UX, SEO y sincronización
│   ├── proteccion-propiedad-intelectual.js    # Escudo activo de protección de activos y anti-inspección
│   ├── demo-gemelo-digital.js                 # Lógica de telemetría, gráficos y onboarding de la App
│   ├── comunidad-social.js                    # Red social de tutores, rutas GPS y quedadas
│   ├── asistente-ia.js                        # Motor híbrido WebLLM (Qwen2.5 WebGPU) + RAG Clínico
│   ├── analitica-marketing.js                 # Telemetría GA4, GTM dataLayer y atribución UTM
│   └── simulador-financiero.js                # Motor de cálculo financiero y gráficos Chart.js
│
└── recursos/                                  # Activos visuales y multimedia clasificados
    ├── imagenes/                              # Marca, mascotas, productos, artículos y diagramas
    └── videos/                                # Demos audiovisuales del ecosistema
```

---

## 🛡️ Aviso de Propiedad Intelectual y Seguridad

**© 2026 CUDI Ecosystem — Todos los derechos reservados (All Rights Reserved).**

Este repositorio contiene únicamente la **compilación pública de producción (código minificado y ofuscado)** destinada a demostración interactiva de portafolio profesional.
- La documentación estratégica, memorias técnicas, modelos financieros en bruto y el código fuente original comentado se encuentran alojados en un entorno privado fuera de este repositorio público.
- Queda estrictamente prohibida la copia, reproducción, ingeniería inversa, extracción de activos visuales o redistribución total o parcial de este proyecto sin autorización expresa del autor.
