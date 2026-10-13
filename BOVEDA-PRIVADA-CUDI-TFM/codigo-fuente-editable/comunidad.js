/**
 * ==========================================================================
 * CUDI COMUNIDAD — RED SOCIAL MULTIESPECIE INTELIGENTE
 * Sincronización biométrica, perfiles exclusivos, agendador de encuentros IA
 * y dinamismo total de interacciones (Likes, Comentarios, Grupos, Eventos).
 * Desarrollado por Sergio Alejandro Ospina Rocha para el Ecosistema CUDI.
 * ==========================================================================
 */

const CUDI_SHARED_SOCIAL_KEY = 'cudi_community_shared_state_v1';

const CUDI_DEFAULT_SHARED_POSTS = [
    {
        id: 'post_cooper_1',
        petId: 'cooper',
        author: 'Cooper',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300&q=80',
        timeLoc: 'Hace 2 horas • Parque del Retiro',
        text: 'Disfrutando de un paseo matutino. ¡Mis niveles de energía están por las nubes según mi CUDI Smart Collar! 🦴✨',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        likes: 45,
        liked: true,
        commentsCount: 12
    },
    {
        id: 'post_bella_2',
        petId: 'bella',
        author: 'Bella',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=300&h=300&q=80',
        timeLoc: 'Hace 5 horas • Barcelona',
        text: '¿Quién más está listo para el fin de semana de juegos? La IA dice que soy un 98% compatible con Labradores hoy. ¡A jugar! 🎾',
        image: '',
        likes: 32,
        liked: false,
        commentsCount: 8
    },
    {
        id: 'post_luna_3',
        petId: 'luna',
        author: 'Luna',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=300&h=300&q=80',
        timeLoc: 'Hace 8 horas • Sierra de Guadarrama',
        text: '14 km recorridos hoy en la ruta pet-friendly con el Collar CUDI GPS. Batería al 91% y ritmo cardíaco estable en 74 bpm. ❄️🐺 ¿Quién se apunta al próximo encuentro?',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
        likes: 68,
        liked: false,
        commentsCount: 19
    }
];

function resolveCommunityPetPhoto(input, petType, petName) {
    if (typeof window.cudi_resolve_pet_photo === 'function') {
        return window.cudi_resolve_pet_photo(input, petType, petName);
    }
    const rawUrl = (input && typeof input === 'object') ? (input.photo || input.avatar || input.img || '') : String(input || '');
    const clean = rawUrl.trim();
    if (!clean || clean === 'undefined' || clean === 'null' || clean.includes('1513360309081-36f20ca480d0') || clean.includes('1524511751214-b0a50a01b1da')) {
        return (petType === 'gato' || (input && input.type === 'gato')) ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';
    }
    return clean;
}

function getSharedSocialState() {
    try {
        const raw = localStorage.getItem(CUDI_SHARED_SOCIAL_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.posts)) {
                parsed.posts.forEach(p => {
                    if (p) p.avatar = resolveCommunityPetPhoto(p.avatar, p.type, p.author);
                });
                return {
                    posts: parsed.posts,
                    followedIds: Array.isArray(parsed.followedIds) ? parsed.followedIds : []
                };
            }
        }
    } catch (e) {
        console.warn('Error reading shared social state', e);
    }
    const initial = {
        posts: JSON.parse(JSON.stringify(CUDI_DEFAULT_SHARED_POSTS)),
        followedIds: []
    };
    try {
        localStorage.setItem(CUDI_SHARED_SOCIAL_KEY, JSON.stringify(initial));
    } catch (e) {}
    return initial;
}

function saveSharedSocialState(state) {
    try {
        localStorage.setItem(CUDI_SHARED_SOCIAL_KEY, JSON.stringify(state));
        window.dispatchEvent(new CustomEvent('cudi:socialUpdated', { detail: state }));
    } catch (e) {
        console.warn('Error saving shared social state', e);
    }
}

const CUDI_COMMUNITY_PETS = {
    user: {
        id: "user",
        name: "Mimi",
        username: "@mimi_cudi",
        avatar: "avatar-mascota-perfil-gemelo-digital.png",
        cover: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
        breed: "Mestizo Inteligente",
        species: "Perro / Gato",
        age: "2 años",
        weight: "8.2 kg",
        energy: "Moderada / Alta",
        location: "Madrid, España",
        bio: "Compañero oficial conectado a CUDI Smart Collar. Amante de los paseos al atardecer y las siestas al sol.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 78,
        activity: 94,
        battery: 92,
        match: 100,
        followers: 124,
        following: 56,
        isFollowing: false,
        badges: ["Pionero CUDI", "Gemelo Digital Activo", "Pet-Friendly"],
        gallery: [
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    cooper: {
        id: "cooper",
        name: "Cooper",
        username: "@cooper_beagle",
        avatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1200&q=80",
        breed: "Beagle Tricolor",
        species: "Canino",
        age: "3 años",
        weight: "12.5 kg",
        energy: "Muy Alta (Rastreador)",
        location: "Parque del Retiro, Madrid",
        bio: "Explorador profesional de senderos y olfateador de ardillas. Mis niveles de energía siempre al 100% según mi Smart Collar.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 84,
        activity: 96,
        battery: 88,
        match: 95,
        followers: 342,
        following: 128,
        isFollowing: false,
        badges: ["Rastreador Experto", "Amante del Frisbee", "Social Star"],
        gallery: [
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    max: {
        id: "max",
        name: "Max",
        username: "@max_border",
        avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
        breed: "Border Collie",
        species: "Canino",
        age: "2.5 años",
        weight: "18.0 kg",
        energy: "Extrema (Agility)",
        location: "Parc de la Ciutadella, Barcelona",
        bio: "Competidor de Agility y fan de las caminatas con Urban Pet Walkers. Puedo aprender un truco nuevo en 10 minutos.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 76,
        activity: 99,
        battery: 95,
        match: 98,
        followers: 512,
        following: 204,
        isFollowing: false,
        badges: ["Medalla Agility", "Paseo Seguro", "Alta Compatibilidad"],
        gallery: [
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    cleo: {
        id: "cleo",
        name: "Cleo",
        username: "@cleo_podenca",
        avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?auto=format&fit=crop&w=1200&q=80",
        breed: "Podenco & Mestizo Ágil",
        species: "Canino",
        age: "4 años",
        weight: "9.8 kg",
        energy: "Equilibrada",
        location: "Parque Juan Carlos I, Madrid",
        bio: "Adoptada y mimada al máximo. Fanática del queso suave y las carreras cortas. Paciente con perros tímidos.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 88,
        activity: 82,
        battery: 90,
        match: 89,
        followers: 189,
        following: 95,
        isFollowing: false,
        badges: ["Rescate Amoroso", "Guardián Tranquilo", "Compañero Fiel"],
        gallery: [
            "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    bella: {
        id: "bella",
        name: "Bella",
        username: "@bella_pugqueen",
        avatar: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
        breed: "Pug Negro Elegante",
        species: "Canino",
        age: "5 años",
        weight: "7.6 kg",
        energy: "Tranquila / Zen",
        location: "Eixample, Barcelona",
        bio: "Reina de las siestas, catadora certificada de EcoPet Organic y cliente VIP de ZenPet Spa. Amor en estado puro.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 90,
        activity: 70,
        battery: 84,
        match: 86,
        followers: 430,
        following: 110,
        isFollowing: false,
        badges: ["Cliente VIP Spa", "Gourmet BARF", "Snack Lover"],
        gallery: [
            "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    rex: {
        id: "rex",
        name: "Rex",
        username: "@rex_goldenpuppy",
        avatar: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
        breed: "Golden Retriever Cachorro",
        species: "Canino",
        age: "8 meses",
        weight: "22.0 kg",
        energy: "Juguetón / Curioso",
        location: "Parque del Oeste, Madrid",
        bio: "Todo el mundo es mi mejor amigo. Estoy aprendiendo comandos positivos y me fascina saltar en charcos.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 96,
        activity: 95,
        battery: 93,
        match: 94,
        followers: 275,
        following: 160,
        isFollowing: false,
        badges: ["Cachorro en Escuela", "Salto Olímpico", "Amigable 100%"],
        gallery: [
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    luna: {
        id: "luna",
        name: "Luna",
        username: "@luna_husky",
        avatar: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
        breed: "Husky Siberiano",
        species: "Canino",
        age: "3 años",
        weight: "20.4 kg",
        energy: "Muy Alta (Nieve y Senderos)",
        location: "Sierra de Guadarrama / Madrid",
        bio: "Espíritu libre, aullidos afinados y pasión por el frío. ¡La IA detectó un 95% de afinidad con tu compañero para correr!",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 74,
        activity: 98,
        battery: 91,
        match: 95,
        followers: 680,
        following: 190,
        isFollowing: false,
        badges: ["Ruta Aventuras", "Husky Vocal", "Match IA Destacado"],
        gallery: [
            "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    simba: {
        id: "simba",
        name: "Simba",
        username: "@simba_pom",
        avatar: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
        breed: "Pomerania Toy",
        species: "Canino",
        age: "1.5 años",
        weight: "3.2 kg",
        energy: "Vivaz",
        location: "Paseo de Gracia, Barcelona",
        bio: "Mini melena de león y porte real. Adoro que me lleven en mochila técnica y posar para las fotos.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 98,
        activity: 80,
        battery: 87,
        match: 82,
        followers: 395,
        following: 140,
        isFollowing: false,
        badges: ["Mochilero Técnico", "Top Model", "Higiene Perfecta"],
        gallery: [
            "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    },
    thor: {
        id: "thor",
        name: "Thor",
        username: "@thor_golden",
        avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&h=300&q=80",
        cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
        breed: "Golden Retriever",
        species: "Canino",
        age: "3.5 años",
        weight: "29.0 kg",
        energy: "Alta",
        location: "Parque del Retiro, Madrid",
        bio: "Extremadamente dulce y juguetón con cualquier perro o gato del parque. Amante del agua y certificado en terapia canina.",
        collarStatus: "Smart Collar GPS Activo",
        bpm: 72,
        activity: 92,
        battery: 94,
        match: 94,
        followers: 410,
        following: 145,
        isFollowing: false,
        badges: ["Amante del Agua", "Terapia Canina", "Social Star"],
        gallery: [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&h=600&q=80",
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=600&q=80"
        ]
    }
};

const CUDI_COMMUNITY_GROUPS = [
    {
        id: "g1",
        title: "Perros Urbanos & Agility Retiro",
        icon: "fa-dog",
        members: "1.4k miembros",
        desc: "Encuentros semanales para socialización, circuitos de agilidad urbana y rutas pet-friendly en Madrid.",
        isMember: false
    },
    {
        id: "g2",
        title: "Gatos Curiosos & Convivencia Multiespecie",
        icon: "fa-cat",
        members: "890 miembros",
        desc: "Consejos prácticos de etología, feromonas apaciguadoras y rutinas armónicas entre felinos y caninos.",
        isMember: true
    },
    {
        id: "g3",
        title: "Nutrición BARF & Salud Holística",
        icon: "fa-bowl-food",
        members: "1.2k miembros",
        desc: "Comunidad de tutores que alimentan con productos biológicos, suplementación y comparten recetas sanas.",
        isMember: false
    },
    {
        id: "g4",
        title: "Rutas Senderistas & Montaña Pet-Friendly",
        icon: "fa-mountain-sun",
        members: "2.3k miembros",
        desc: "Excursiones de fin de semana con monitores, prevención con telemetría GPS y botiquín de primeros auxilios.",
        isMember: false
    }
];

const CUDI_COMMUNITY_EVENTS = [
    {
        id: "e1",
        date: "20 ABRIL",
        time: "10:30 AM",
        title: "Paseo Grupal Retiro con Monitores CUDI",
        location: "Parque del Retiro (Puerta de Alcalá)",
        attendees: 38,
        isAttending: true
    },
    {
        id: "e2",
        date: "22 ABRIL",
        time: "17:00 PM",
        title: "Workshop de Socialización Positiva y Manejo",
        location: "Parc de la Ciutadella, Barcelona",
        attendees: 24,
        isAttending: false
    },
    {
        id: "e3",
        date: "26 ABRIL",
        time: "11:00 AM",
        title: "Jornada de Telemetría y Revisión de Smart Collar",
        location: "Clínica MediPet Express & Parque Central",
        attendees: 52,
        isAttending: false
    }
];

// INICIALIZACIÓN Y SINCRONIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    initUserCommunitySync();
    renderSyncedCommunityFeed();
    initCommunityInteractions();
    injectModals();

    window.addEventListener('cudi:sessionChanged', () => {
        initUserCommunitySync();
        renderSyncedCommunityFeed();
    });

    window.addEventListener('storage', (e) => {
        if (e.key === CUDI_SHARED_SOCIAL_KEY || e.key === 'cudi_pet_profile') {
            initUserCommunitySync();
            renderSyncedCommunityFeed();
        }
    });
});

function initUserCommunitySync() {
    let profile = null;
    const isSessionActive = (typeof cudi_is_session_active === 'function') 
        ? cudi_is_session_active() 
        : (localStorage.getItem('cudi_session_active') === 'true');

    try {
        const stored = localStorage.getItem('cudi_pet_profile');
        if (stored) profile = JSON.parse(stored);
    } catch (e) {
        console.warn('Error reading cudi_pet_profile', e);
    }

    if (!isSessionActive || !profile || !profile.name) {
        profile = (typeof cudi_get_random_pet_candidate === 'function') 
            ? cudi_get_random_pet_candidate() 
            : {
                name: 'Luna',
                photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&h=400&q=80',
                breed: 'Husky Siberiano',
                age: '3 años',
                weight: '22',
                type: 'perro'
            };
        profile.isDemoPreview = true;
    } else {
        profile.isDemoPreview = false;
    }

    // Sincronizar estado compartido de seguimientos
    const sharedState = getSharedSocialState();
    Object.keys(CUDI_COMMUNITY_PETS).forEach(k => {
        if (k !== 'user') {
            CUDI_COMMUNITY_PETS[k].isFollowing = sharedState.followedIds.includes(k);
        }
    });
    CUDI_COMMUNITY_PETS.user.following = 56 + sharedState.followedIds.length;

    // Actualizar objeto user en memoria con foto verificada
    profile.photo = resolveCommunityPetPhoto(profile, profile.type, profile.name);
    CUDI_COMMUNITY_PETS.user.name = profile.name;
    CUDI_COMMUNITY_PETS.user.username = `@${profile.name.toLowerCase().replace(/\s+/g, '_')}_cudi`;
    CUDI_COMMUNITY_PETS.user.avatar = profile.photo;
    if (profile.breed) CUDI_COMMUNITY_PETS.user.breed = profile.breed;
    if (profile.age) CUDI_COMMUNITY_PETS.user.age = isNaN(profile.age) ? profile.age : `${profile.age} años`;

    const fallbackImg = profile.type === 'gato' ? 'gato-explorando-seguro-collar-gps.png' : 'avatar-mascota-perfil-gemelo-digital.png';

    const quickPostAvatar = document.getElementById('quick-post-avatar');
    if (quickPostAvatar) {
        quickPostAvatar.onerror = function() { this.onerror = null; this.src = fallbackImg; };
        quickPostAvatar.src = profile.photo || fallbackImg;
    }

    // 1. Sincronizar Tarjeta de Perfil Izquierda
    const sidebarLeft = document.querySelector('.social-sidebar-left');
    if (sidebarLeft) {
        const profileCard = sidebarLeft.querySelector('.post-card');
        if (profileCard) {
            profileCard.innerHTML = `
                <div style="position:relative; display:inline-block; margin-bottom:12px; width:96px; height:96px;">
                    <img src="${profile.photo || fallbackImg}" alt="${profile.name}" 
                         onerror="this.onerror=null;this.src='${fallbackImg}';"
                         style="width:96px !important; height:96px !important; min-width:96px !important; max-width:96px !important; min-height:96px !important; max-height:96px !important; aspect-ratio:1/1 !important; border-radius:50% !important; border:3.5px solid #0284c7; box-shadow:0 8px 24px rgba(2,132,199,0.2); object-fit:cover !important; object-position:center !important; cursor:pointer; display:block;"
                         onclick="openPetProfile('user')">
                    <span style="position:absolute; bottom:2px; right:2px; background:${profile.isDemoPreview ? '#f59e0b' : '#10b981'}; width:18px; height:18px; border-radius:50%; border:2.5px solid white;" title="${profile.isDemoPreview ? 'Modo Demo' : 'Sesión Sincronizada'}"></span>
                </div>
                <h4 style="margin:0; color:#0f172a; font-size:1.15rem; font-weight:800; cursor:pointer;" onclick="openPetProfile('user')">
                    ${profile.name} ${profile.isDemoPreview ? '<i class="fa-solid fa-sparkles" style="color:#f59e0b; font-size:0.85rem;" title="Mascota Demo"></i>' : '<i class="fa-solid fa-circle-check" style="color:#0284c7; font-size:0.85rem;" title="Verificado"></i>'}
                </h4>
                <p style="font-size:0.82rem; color:#64748b; margin:4px 0 10px; font-weight:500;">
                    ${profile.breed || 'Mestizo'} • ${profile.age ? (isNaN(profile.age) ? profile.age : `${profile.age} años`) : 'Adulto'}
                </p>
                ${profile.isDemoPreview ? `
                    <div style="margin-bottom:14px;">
                        <span onclick="openAuthModal()" style="display:inline-flex; align-items:center; gap:5px; background:rgba(254,243,199,0.9); color:#92400e; padding:4px 10px; border-radius:12px; font-size:0.72rem; font-weight:700; cursor:pointer; border:1px solid #fde68a;" title="Haz clic para iniciar sesión">
                            <i class="fa-solid fa-lock"></i> Vista Demo • Iniciar Sesión
                        </span>
                    </div>
                ` : `
                    <div style="margin-bottom:14px;">
                        <span style="display:inline-flex; align-items:center; gap:5px; background:rgba(220,252,231,0.9); color:#15803d; padding:4px 10px; border-radius:12px; font-size:0.72rem; font-weight:700; border:1px solid #86efac;">
                            <i class="fa-solid fa-circle-check"></i> Sincronizado con App Demo
                        </span>
                    </div>
                `}
                <div style="display:flex; justify-content:space-around; border-top:1px solid #f1f5f9; padding-top:14px; margin-bottom:16px;">
                    <div>
                        <div style="font-weight:800; color:#0f172a; font-size:1.05rem;" id="user-followers-count">${CUDI_COMMUNITY_PETS.user.followers}</div>
                        <div style="font-size:0.68rem; color:#94a3b8; text-transform:uppercase; font-weight:700;">Seguidores</div>
                    </div>
                    <div style="width:1px; background:#e2e8f0; height:32px;"></div>
                    <div>
                        <div style="font-weight:800; color:#0f172a; font-size:1.05rem;" id="user-following-count">${CUDI_COMMUNITY_PETS.user.following}</div>
                        <div style="font-size:0.68rem; color:#94a3b8; text-transform:uppercase; font-weight:700;">Siguiendo</div>
                    </div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button onclick="openPetProfile('user')" class="btn-profile-view" style="flex:1; background:#f0f9ff; color:#0284c7; border:1px solid #bae6fd; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.2s;">
                        <i class="fa-solid fa-id-card"></i> Ver Perfil
                    </button>
                    ${profile.isDemoPreview ? `
                        <button onclick="openAuthModal()" style="flex:1; background:linear-gradient(135deg,#0284c7,#0ea5e9); color:white; border:none; display:flex; align-items:center; justify-content:center; gap:6px; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.2s;">
                            <i class="fa-solid fa-paw"></i> Iniciar
                        </button>
                    ` : `
                        <a href="simulador-gemelo-digital-telemetria.html" style="flex:1; background:linear-gradient(135deg,#0284c7,#10b981); color:white; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; transition:all 0.2s;">
                            <i class="fa-solid fa-mobile-screen"></i> App Demo
                        </a>
                    `}
                </div>
            `;
        }
    }

    // 2. Sincronizar Barra Completa de Stories (Tú + 8 mascotas de la comunidad)
    const storiesContainer = document.querySelector('.stories-container');
    if (storiesContainer) {
        const storyPetsOrder = ['max', 'cooper', 'cleo', 'bella', 'rex', 'luna', 'simba', 'thor'];
        storiesContainer.innerHTML = `
            <div class="story-item" onclick="openStoryCreator()" style="cursor:pointer;" title="Publicar historia de ${profile.name}">
                <div class="story-avatar-wrap">
                    <img src="${profile.photo || fallbackImg}" alt="Tú" onerror="this.onerror=null;this.src='${fallbackImg}';">
                    <span class="story-add-badge"><i class="fa-solid fa-plus"></i></span>
                </div>
                <span class="story-name">Tú (${profile.name})</span>
            </div>
            ${storyPetsOrder.map(key => {
                const pet = CUDI_COMMUNITY_PETS[key];
                if (!pet) return '';
                return `
                    <div class="story-item" onclick="openPetProfile('${pet.id}')" style="cursor:pointer;" title="Ver perfil de ${pet.name}">
                        <div class="story-avatar-wrap active">
                            <img src="${pet.avatar}" alt="${pet.name}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';">
                        </div>
                        <span class="story-name">${pet.name}</span>
                    </div>
                `;
            }).join('')}
        `;
    }
}

function renderSyncedCommunityFeed() {
    const feed = document.querySelector('.social-feed-center');
    if (!feed) return;

    const sharedState = getSharedSocialState();
    // Si estamos viendo Grupos o Eventos, no sobreescribir hasta volver al Feed
    if (feed.querySelector('.dynamic-view-panel')) return;

    // Preservar la primera tarjeta (barra rápida de publicar)
    const composerCard = feed.querySelector('.post-card:first-child');
    feed.querySelectorAll('article.post-card').forEach(a => a.remove());

    sharedState.posts.forEach(post => {
        const isFollowing = sharedState.followedIds.includes(post.petId);
        const safePostAvatar = resolveCommunityPetPhoto(post.avatar, post.type, post.author);
        const article = document.createElement('article');
        article.className = 'post-card';
        article.dataset.postId = post.id;
        article.innerHTML = `
            <div class="post-header">
                <img src="${safePostAvatar}" class="post-author-img" alt="${escapeHtml(post.author)}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" onclick="openPetProfile('${post.petId}')" style="cursor:pointer;">
                <div class="post-meta">
                    <h5 onclick="openPetProfile('${post.petId}')" style="cursor:pointer;">
                        ${escapeHtml(post.author)} ${post.verified ? '<i class="fa-solid fa-circle-check" style="color:var(--app-primary); font-size:0.8rem;"></i>' : ''}
                    </h5>
                    <span>${escapeHtml(post.timeLoc)}</span>
                </div>
                ${post.petId !== 'user' ? `
                    <button class="btn-follow-sync ${isFollowing ? 'following' : ''}" onclick="toggleSharedFollow('${post.petId}', this)" style="margin-left:auto; background:${isFollowing ? '#e0f2fe' : '#f1f5f9'}; border:none; padding:8px 15px; border-radius:50px; font-weight:700; font-size:0.8rem; color:#0284c7; cursor:pointer;">
                        ${isFollowing ? '<i class="fa-solid fa-check"></i> Siguiendo' : 'Seguir +'}
                    </button>
                ` : `
                    <span style="margin-left:auto; background:#dcfce7; color:#15803d; padding:5px 12px; border-radius:50px; font-weight:800; font-size:0.74rem;">
                        <i class="fa-solid fa-mobile-screen"></i> Tu Publicación
                    </span>
                `}
            </div>
            <div class="post-content">
                <p>${escapeHtml(post.text)}</p>
                ${post.image ? `<img src="${post.image}" class="post-image" alt="${escapeHtml(post.author)}" onerror="this.onerror=null;this.style.display='none';">` : ''}
            </div>
            <div class="post-actions">
                <button class="post-action-btn ${post.liked ? 'liked' : ''}" style="color:${post.liked ? '#ef4444' : '#64748b'};" onclick="handleSharedLikePost('${post.id}', this)">
                    <i class="fa-solid fa-heart"></i> ${post.likes}
                </button>
                <button class="post-action-btn" onclick="toggleCommentsThread(this.parentNode)">
                    <i class="fa-solid fa-comment"></i> ${post.commentsCount || 0}
                </button>
                <button class="post-action-btn" onclick="handleSharePost()">
                    <i class="fa-solid fa-share-nodes"></i> Compartir
                </button>
            </div>
        `;
        feed.appendChild(article);
    });
}

function handleSharedLikePost(postId, btn) {
    const state = getSharedSocialState();
    const post = state.posts.find(p => p.id === postId);
    if (!post) {
        handleLikePost(btn);
        return;
    }
    post.liked = !post.liked;
    post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));
    saveSharedSocialState(state);
    renderSyncedCommunityFeed();
}

function toggleSharedFollow(petId, btn) {
    const state = getSharedSocialState();
    const idx = state.followedIds.indexOf(petId);
    const petName = CUDI_COMMUNITY_PETS[petId]?.name || 'este compañero';
    if (idx >= 0) {
        state.followedIds.splice(idx, 1);
        showCudiCommunityToast(`Has dejado de seguir a ${petName}`);
    } else {
        state.followedIds.push(petId);
        showCudiCommunityToast(`¡Ahora sigues a ${petName} en la Web y en la App Demo! 🐾`);
    }
    saveSharedSocialState(state);
    initUserCommunitySync();
    renderSyncedCommunityFeed();
}

function initCommunityInteractions() {
    // 5. Botón Proponer Encuentro del Banner Lateral
    const matchBtn = document.querySelector('.liquid-glass-card .btn-premium-action');
    if (matchBtn) {
        matchBtn.addEventListener('click', () => {
            openPlaydateModal('luna');
        });
    }

    // 6. Mascotas cerca de ti clicks
    const nearList = document.querySelectorAll('.social-sidebar-right .post-card:nth-of-type(2) > div > div');
    nearList.forEach(item => {
        const nameEl = item.querySelector('div > div:first-child');
        const addBtn = item.querySelector('button');
        if (nameEl) {
            const petName = nameEl.textContent.trim().toLowerCase();
            item.style.cursor = 'pointer';
            nameEl.addEventListener('click', () => openPetProfile(petName));
            const img = item.querySelector('img');
            if (img) img.addEventListener('click', () => openPetProfile(petName));
        }
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                addBtn.style.background = '#10b981';
                showCudiCommunityToast('¡Solicitud de paseo enviada!');
            });
        }
    });

    // 7. Navegación lateral izquierda (Feed, Grupos, Mis Eventos)
    const navItems = document.querySelectorAll('.social-sidebar-left ul li');
    navItems.forEach((li, idx) => {
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            navItems.forEach(n => {
                n.style.background = 'transparent';
                n.style.fontWeight = '500';
            });
            li.style.background = 'rgba(255,255,255,0.85)';
            li.style.fontWeight = '700';

            if (idx === 0) showFeedView();
            else if (idx === 1) showGroupsView();
            else if (idx === 2) showEventsView();
        });
    });
}

// ==========================================
// VISTAS DEL FEED (PRINCIPAL, GRUPOS, EVENTOS)
// ==========================================
function showFeedView() {
    const feed = document.querySelector('.social-feed-center');
    if (!feed) return;
    feed.querySelectorAll('.dynamic-view-panel').forEach(p => p.remove());
    feed.querySelectorAll('.post-card').forEach(p => p.style.display = 'block');
    showCudiCommunityToast('Mostrando Feed Principal');
}

function showGroupsView() {
    const feed = document.querySelector('.social-feed-center');
    if (!feed) return;
    feed.querySelectorAll('.post-card').forEach(p => p.style.display = 'none');
    feed.querySelectorAll('.dynamic-view-panel').forEach(p => p.remove());

    const panel = document.createElement('div');
    panel.className = 'dynamic-view-panel';
    panel.innerHTML = `
        <div style="background:white; border-radius:24px; padding:24px; margin-bottom:20px; box-shadow:0 10px 30px rgba(0,0,0,0.04);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color:#0f172a;"><i class="fa-solid fa-users-rays" style="color:#0284c7;"></i> Grupos de la Comunidad CUDI</h3>
                <span style="font-size:0.8rem; background:#e0f2fe; color:#0369a1; padding:4px 10px; border-radius:20px; font-weight:700;">4 Activos</span>
            </div>
            <p style="color:#64748b; font-size:0.88rem; margin:0 0 20px;">Únete a grupos temáticos según la especie, raza o estilo de vida de tu compañero para organizar paseos y compartir consejos.</p>
            <div style="display:grid; grid-template-columns:1fr; gap:16px;">
                ${CUDI_COMMUNITY_GROUPS.map(g => `
                    <div style="border:1px solid #e2e8f0; border-radius:18px; padding:18px; display:flex; align-items:center; justify-content:space-between; gap:15px; background:#f8fafc; transition:all 0.2s;">
                        <div style="width:48px; height:48px; border-radius:14px; background:#e0f2fe; color:#0284c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; flex-shrink:0;">
                            <i class="fa-solid ${g.icon}"></i>
                        </div>
                        <div style="flex:1;">
                            <div style="font-weight:800; color:#0f172a; font-size:0.95rem;">${g.title}</div>
                            <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">${g.members}</div>
                            <div style="font-size:0.82rem; color:#475569; margin-top:6px; line-height:1.4;">${g.desc}</div>
                        </div>
                        <button onclick="toggleJoinGroup(this, '${g.id}')" style="background:${g.isMember ? '#e2e8f0' : '#0284c7'}; color:${g.isMember ? '#475569' : 'white'}; border:none; padding:8px 16px; border-radius:12px; font-weight:700; font-size:0.82rem; cursor:pointer; flex-shrink:0;">
                            ${g.isMember ? '<i class="fa-solid fa-check"></i> Unido' : 'Unirme +'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    feed.appendChild(panel);
}

function showEventsView() {
    const feed = document.querySelector('.social-feed-center');
    if (!feed) return;
    feed.querySelectorAll('.post-card').forEach(p => p.style.display = 'none');
    feed.querySelectorAll('.dynamic-view-panel').forEach(p => p.remove());

    const panel = document.createElement('div');
    panel.className = 'dynamic-view-panel';
    panel.innerHTML = `
        <div style="background:white; border-radius:24px; padding:24px; margin-bottom:20px; box-shadow:0 10px 30px rgba(0,0,0,0.04);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color:#0f172a;"><i class="fa-solid fa-calendar-check" style="color:#10b981;"></i> Próximos Encuentros y Quedadas</h3>
                <span style="font-size:0.8rem; background:#dcfce7; color:#15803d; padding:4px 10px; border-radius:20px; font-weight:700;">Verificados CUDI</span>
            </div>
            <p style="color:#64748b; font-size:0.88rem; margin:0 0 20px;">Eventos supervisados con puntos de hidratación, monitores certificados y geolocalización segura con Smart Collar.</p>
            <div style="display:flex; flex-direction:column; gap:16px;">
                ${CUDI_COMMUNITY_EVENTS.map(ev => `
                    <div style="border:1px solid #e2e8f0; border-radius:18px; padding:18px; display:flex; align-items:center; justify-content:space-between; gap:16px; background:#f8fafc;">
                        <div style="background:#0284c7; color:white; border-radius:14px; padding:12px 14px; text-align:center; min-width:70px; flex-shrink:0;">
                            <div style="font-size:0.7rem; font-weight:700; text-transform:uppercase;">${ev.date.split(' ')[1]}</div>
                            <div style="font-size:1.4rem; font-weight:800; line-height:1;">${ev.date.split(' ')[0]}</div>
                        </div>
                        <div style="flex:1;">
                            <div style="font-weight:800; color:#0f172a; font-size:0.98rem;">${ev.title}</div>
                            <div style="font-size:0.8rem; color:#64748b; margin-top:4px;"><i class="fa-solid fa-clock"></i> ${ev.time} • <i class="fa-solid fa-location-dot"></i> ${ev.location}</div>
                            <div style="font-size:0.75rem; color:#0284c7; font-weight:700; margin-top:6px;"><i class="fa-solid fa-paw"></i> ${ev.attendees} mascotas confirmadas</div>
                        </div>
                        <button onclick="toggleAttendEvent(this, '${ev.id}')" style="background:${ev.isAttending ? '#10b981' : '#0f172a'}; color:white; border:none; padding:10px 18px; border-radius:12px; font-weight:700; font-size:0.82rem; cursor:pointer; flex-shrink:0;">
                            ${ev.isAttending ? '<i class="fa-solid fa-circle-check"></i> Asistiré' : 'Apuntarme'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    feed.appendChild(panel);
}

function toggleJoinGroup(btn, id) {
    const group = CUDI_COMMUNITY_GROUPS.find(g => g.id === id);
    if (!group) return;
    group.isMember = !group.isMember;
    if (group.isMember) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Unido';
        btn.style.background = '#e2e8f0';
        btn.style.color = '#475569';
        showCudiCommunityToast(`¡Te has unido a "${group.title}"!`);
    } else {
        btn.innerHTML = 'Unirme +';
        btn.style.background = '#0284c7';
        btn.style.color = 'white';
        showCudiCommunityToast(`Has salido de "${group.title}".`);
    }
}

function toggleAttendEvent(btn, id) {
    const event = CUDI_COMMUNITY_EVENTS.find(e => e.id === id);
    if (!event) return;
    event.isAttending = !event.isAttending;
    if (event.isAttending) {
        event.attendees++;
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Asistiré';
        btn.style.background = '#10b981';
        showCudiCommunityToast(`¡Confirmada tu asistencia a "${event.title}"!`);
    } else {
        event.attendees--;
        btn.innerHTML = 'Apuntarme';
        btn.style.background = '#0f172a';
        showCudiCommunityToast(`Has cancelado tu asistencia.`);
    }
}

// ==========================================
// INTERACCIONES DEL FEED (LIKE, COMENTARIOS, SHARE)
// ==========================================
function handleLikePost(btn) {
    const heart = btn.querySelector('i');
    const isLiked = btn.classList.contains('liked');
    let text = btn.innerText.replace(/[^0-9]/g, '');
    let count = parseInt(text) || 0;

    if (isLiked) {
        btn.classList.remove('liked');
        btn.style.color = '#64748b';
        count = Math.max(0, count - 1);
    } else {
        btn.classList.add('liked');
        btn.style.color = '#ef4444';
        count++;
        // Pequeño pop animado
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }
    btn.innerHTML = `<i class="fa-solid fa-heart"></i> ${count}`;
}

function toggleFollowPostButton(btn) {
    const isFollowing = btn.classList.contains('following');
    if (isFollowing) {
        btn.classList.remove('following');
        btn.innerHTML = 'Seguir +';
        btn.style.background = '#f1f5f9';
        btn.style.color = 'var(--app-primary)';
        showCudiCommunityToast('Has dejado de seguir a este compañero');
    } else {
        btn.classList.add('following');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Siguiendo';
        btn.style.background = '#e0f2fe';
        btn.style.color = '#0284c7';
        showCudiCommunityToast('¡Ahora sigues a este compañero en la comunidad!');
    }
}

function toggleCommentsThread(actionsBar) {
    let thread = actionsBar.parentNode.querySelector('.comments-thread-box');
    if (thread) {
        thread.remove();
        return;
    }

    const currentPet = CUDI_COMMUNITY_PETS.user;
    thread = document.createElement('div');
    thread.className = 'comments-thread-box';
    thread.style.cssText = 'margin-top:15px; padding-top:15px; border-top:1px solid #f1f5f9;';
    thread.innerHTML = `
        <div class="existing-comments" style="margin-bottom:12px; font-size:0.82rem; color:#475569; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; gap:8px; align-items:flex-start;">
                <img src="${CUDI_COMMUNITY_PETS.bella.avatar}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
                <div style="background:#f8fafc; padding:8px 12px; border-radius:12px; flex:1;">
                    <strong style="color:#0f172a;">Bella:</strong> ¡Qué guapo estás hoy! Nosotros saldremos a las 18h al parque 🐾
                </div>
            </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
            <img src="${resolveCommunityPetPhoto(currentPet.avatar, currentPet.species, currentPet.name)}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:1px solid #0284c7;">
            <input type="text" placeholder="Escribe un comentario como ${currentPet.name}..." class="comment-input" 
                   style="flex:1; border:1px solid #e2e8f0; border-radius:20px; padding:8px 14px; font-size:0.82rem; outline:none; background:#f8fafc;">
            <button onclick="submitNewComment(this)" style="background:#0284c7; color:white; border:none; width:34px; height:34px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-paper-plane" style="font-size:0.8rem;"></i>
            </button>
        </div>
    `;
    actionsBar.parentNode.appendChild(thread);
    const input = thread.querySelector('.comment-input');
    input.focus();
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitNewComment(thread.querySelector('button'));
    });
}

function submitNewComment(btn) {
    const thread = btn.closest('.comments-thread-box');
    const input = thread.querySelector('.comment-input');
    const text = input.value.trim();
    if (!text) return;

    const list = thread.querySelector('.existing-comments');
    const currentPet = CUDI_COMMUNITY_PETS.user;

    const newComment = document.createElement('div');
    newComment.style.cssText = 'display:flex; gap:8px; align-items:flex-start; animation:fadeInUp 0.3s ease;';
    newComment.innerHTML = `
        <img src="${resolveCommunityPetPhoto(currentPet.avatar, currentPet.species, currentPet.name)}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
        <div style="background:#e0f2fe; padding:8px 12px; border-radius:12px; flex:1;">
            <strong style="color:#0369a1;">${currentPet.name}:</strong> ${escapeHtml(text)}
        </div>
    `;
    list.appendChild(newComment);
    input.value = '';
    showCudiCommunityToast('¡Comentario publicado!');
}

function handleSharePost() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
    }
    showCudiCommunityToast('¡Enlace de publicación copiado al portapapeles!');
}

// ==========================================
// MODAL DE PERFIL COMPLETO DE MASCOTA
// ==========================================
function openPetProfile(petKey) {
    const pet = CUDI_COMMUNITY_PETS[petKey] || CUDI_COMMUNITY_PETS.cooper;
    const modal = document.getElementById('cudi-pet-profile-modal');
    if (!modal) return;

    const safeAvatar = resolveCommunityPetPhoto(pet.avatar, pet.species, pet.name);

    modal.innerHTML = `
        <div class="pet-profile-card-modal">
            <!-- Header con Portada y Botón Cerrar -->
            <div class="modal-cover-wrap" style="background-image: url('${pet.cover}'), url('avatar-mascota-perfil-gemelo-digital.png');">
                <button class="modal-close-round" onclick="closePetProfile()"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-smart-tag"><i class="fa-solid fa-satellite-dish"></i> ${pet.collarStatus}</div>
            </div>

            <!-- Avatar y Cabecera Principal -->
            <div class="modal-body-content">
                <div class="modal-avatar-row">
                    <div class="modal-avatar-holder">
                        <img src="${safeAvatar}" alt="${pet.name}" class="modal-pet-avatar" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';">
                        <span class="modal-online-badge"></span>
                    </div>
                    <div class="modal-header-actions">
                        <button class="btn-profile-follow ${pet.isFollowing ? 'following' : ''}" onclick="toggleFollowModalPet('${pet.id}', this)">
                            ${pet.isFollowing ? '<i class="fa-solid fa-check"></i> Siguiendo' : '<i class="fa-solid fa-plus"></i> Seguir'}
                        </button>
                        <button class="btn-profile-chat" onclick="openChatWithPet('${pet.id}')" title="Enviar Mensaje">
                            <i class="fa-solid fa-comment-dots"></i>
                        </button>
                        <button class="btn-profile-meet" onclick="openPlaydateModal('${pet.id}')" title="Proponer Encuentro">
                            <i class="fa-solid fa-bolt"></i> Encuentro
                        </button>
                    </div>
                </div>

                <div class="modal-pet-identity">
                    <h2 class="modal-pet-name">${pet.name} <i class="fa-solid fa-circle-check verified-icon"></i></h2>
                    <div class="modal-pet-user">${pet.username} • <i class="fa-solid fa-location-dot"></i> ${pet.location}</div>
                    <div class="modal-pet-species-pill">${pet.breed} • ${pet.age} • ${pet.weight}</div>
                </div>

                <p class="modal-pet-bio">${pet.bio}</p>

                <!-- Gemelo Digital Biométrico -->
                <div class="modal-biometrics-grid">
                    <div class="bio-metric-chip">
                        <div class="bio-metric-icon" style="color:#ef4444;"><i class="fa-solid fa-heart-pulse pulse-heart"></i></div>
                        <div class="bio-metric-val">${pet.bpm} bpm</div>
                        <div class="bio-metric-lbl">Ritmo Cardíaco</div>
                    </div>
                    <div class="bio-metric-chip">
                        <div class="bio-metric-icon" style="color:#f59e0b;"><i class="fa-solid fa-bolt"></i></div>
                        <div class="bio-metric-val">${pet.activity}%</div>
                        <div class="bio-metric-lbl">Energía Hoy</div>
                    </div>
                    <div class="bio-metric-chip">
                        <div class="bio-metric-icon" style="color:#10b981;"><i class="fa-solid fa-battery-three-quarters"></i></div>
                        <div class="bio-metric-val">${pet.battery}%</div>
                        <div class="bio-metric-lbl">Collar CUDI</div>
                    </div>
                    <div class="bio-metric-chip">
                        <div class="bio-metric-icon" style="color:#0284c7;"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="bio-metric-val" style="color:#0284c7;">${pet.match}%</div>
                        <div class="bio-metric-lbl">Match IA</div>
                    </div>
                </div>

                <!-- Insignias de Comunidad -->
                <div class="modal-badges-row">
                    ${pet.badges.map(b => `<span class="pet-honor-badge"><i class="fa-solid fa-award"></i> ${b}</span>`).join('')}
                </div>

                <!-- Galería Exclusiva de la Mascota -->
                <div class="modal-gallery-section">
                    <h4 style="margin:0 0 10px; font-size:0.95rem; color:#0f172a;"><i class="fa-solid fa-images"></i> Galería de Momentos</h4>
                    <div class="modal-gallery-grid">
                        ${pet.gallery.map(img => `
                            <div class="gallery-photo-item">
                                <img src="${resolveCommunityPetPhoto(img)}" alt="Momento de ${pet.name}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePetProfile() {
    const modal = document.getElementById('cudi-pet-profile-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleFollowModalPet(petId, btn) {
    const pet = CUDI_COMMUNITY_PETS[petId];
    if (!pet) return;
    const state = getSharedSocialState();
    const idx = state.followedIds.indexOf(petId);
    if (idx >= 0) {
        state.followedIds.splice(idx, 1);
        pet.isFollowing = false;
        pet.followers = Math.max(0, pet.followers - 1);
        btn.classList.remove('following');
        btn.innerHTML = '<i class="fa-solid fa-plus"></i> Seguir';
        showCudiCommunityToast(`Has dejado de seguir a ${pet.name}`);
    } else {
        state.followedIds.push(petId);
        pet.isFollowing = true;
        pet.followers++;
        btn.classList.add('following');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Siguiendo';
        showCudiCommunityToast(`¡Ahora sigues a ${pet.name} en la Web y en la App Demo!`);
    }
    saveSharedSocialState(state);
    initUserCommunitySync();
    renderSyncedCommunityFeed();
}

// ==========================================
// MODAL DE PROPUESTA DE ENCUENTRO / PLAYDATE
// ==========================================
function openPlaydateModal(petId) {
    closePetProfile();
    const pet = CUDI_COMMUNITY_PETS[petId] || CUDI_COMMUNITY_PETS.luna;
    const modal = document.getElementById('cudi-playdate-modal');
    if (!modal) return;

    modal.innerHTML = `
        <div class="playdate-card-modal">
            <div class="playdate-header">
                <div>
                    <span class="playdate-tag"><i class="fa-solid fa-bolt"></i> Match IA del ${pet.match || 95}%</span>
                    <h3 style="margin:6px 0 0; color:#0f172a;">Proponer Encuentro con ${pet.name}</h3>
                </div>
                <button class="modal-close-round" onclick="closePlaydateModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <div style="display:flex; align-items:center; gap:14px; background:#f8fafc; border-radius:16px; padding:12px; margin:16px 0;">
                <img src="${resolveCommunityPetPhoto(pet.avatar, pet.species, pet.name)}" onerror="this.onerror=null;this.src='avatar-mascota-perfil-gemelo-digital.png';" style="width:50px !important; height:50px !important; min-width:50px !important; max-width:50px !important; min-height:50px !important; max-height:50px !important; aspect-ratio:1/1 !important; border-radius:50% !important; object-fit:cover !important; border:2px solid #0284c7;">
                <div>
                    <div style="font-weight:800; color:#0f172a;">${pet.name} (${pet.breed})</div>
                    <div style="font-size:0.75rem; color:#64748b;">${pet.location} • Nivel de energía compatible</div>
                </div>
            </div>

            <form id="playdate-form" onsubmit="submitPlaydate(event, '${pet.name}')" style="display:flex; flex-direction:column; gap:14px;">
                <div>
                    <label style="font-size:0.8rem; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Parque o Lugar Pet-Friendly</label>
                    <select class="playdate-input" required>
                        <option value="Parque del Retiro (Madrid)">Parque del Retiro (Área Canina Norte, Madrid)</option>
                        <option value="Parc de la Ciutadella (Barcelona)">Parc de la Ciutadella (Zona de Juegos, Barcelona)</option>
                        <option value="Parque Juan Carlos I (Madrid)">Parque Juan Carlos I (Madrid)</option>
                        <option value="Parque de María Luisa (Sevilla)">Parque de María Luisa (Sevilla)</option>
                        <option value="Ruta Verde Playa Canina">Playa Canina / Sendero Natural</option>
                    </select>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="font-size:0.8rem; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Fecha Sugerida</label>
                        <input type="date" class="playdate-input" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div>
                        <label style="font-size:0.8rem; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Hora Sugerida</label>
                        <input type="time" class="playdate-input" value="18:00" required>
                    </div>
                </div>

                <div>
                    <label style="font-size:0.8rem; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Mensaje para el tutor de ${pet.name}</label>
                    <textarea class="playdate-input" rows="2" placeholder="¡Hola! Me encantaría que nuestras mascotas den un paseo juntas..." required></textarea>
                </div>

                <button type="submit" class="btn-playdate-send">
                    <i class="fa-solid fa-paper-plane"></i> Enviar Invitación de Encuentro
                </button>
            </form>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePlaydateModal() {
    const modal = document.getElementById('cudi-playdate-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function submitPlaydate(e, petName) {
    e.preventDefault();
    closePlaydateModal();
    showCudiCommunityToast(`¡Invitación enviada a ${petName}! Su tutor recibirá la alerta en la app.`);
}

// ==========================================
// MENSAJERÍA RÁPIDA ENTRE TUTORES
// ==========================================
function openChatWithPet(petId) {
    closePetProfile();
    const pet = CUDI_COMMUNITY_PETS[petId] || CUDI_COMMUNITY_PETS.cooper;
    showCudiCommunityToast(`Abriendo chat seguro con el tutor de ${pet.name}...`);
    // Abrir Cudi AI con contexto del tutor
    if (typeof openCudiAiWithQuery === 'function') {
        openCudiAiWithQuery(`Quiero coordinar un paseo seguro con el tutor de ${pet.name} (${pet.breed})`);
    }
}

function openStoryCreator() {
    const userPet = CUDI_COMMUNITY_PETS.user;
    const modal = document.getElementById('cudi-story-creator-modal');
    if (!modal) return;

    modal.innerHTML = `
        <div class="playdate-card-modal">
            <div class="playdate-header">
                <h3 style="margin:0; color:#0f172a;"><i class="fa-solid fa-camera" style="color:#0284c7;"></i> Publicar en Comunidad & App Demo</h3>
                <button class="modal-close-round" onclick="closeStoryCreator()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div style="margin:15px 0;">
                <p style="font-size:0.85rem; color:#64748b; margin-bottom:12px;">Tu publicación de <strong>${userPet.name}</strong> aparecerá al instante en la Comunidad Web y en la pestaña Social de la App Demo.</p>
                <textarea id="story-caption" class="playdate-input" rows="3" placeholder="¿Qué travesura o aventura hizo ${userPet.name} hoy?"></textarea>
            </div>
            <button onclick="submitNewStory()" class="btn-playdate-send">
                <i class="fa-solid fa-cloud-arrow-up"></i> Publicar y Sincronizar 🐾
            </button>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeStoryCreator() {
    const modal = document.getElementById('cudi-story-creator-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function submitNewStory() {
    const captionEl = document.getElementById('story-caption');
    const text = (captionEl ? captionEl.value.trim() : '') || `¡Paseo increíble hoy con mi Smart Collar CUDI activo al 100%! 🐾✨`;
    const userPet = CUDI_COMMUNITY_PETS.user;

    const state = getSharedSocialState();
    state.posts.unshift({
        id: 'post_user_' + Date.now(),
        petId: 'user',
        author: userPet.name || 'Mi Mascota',
        verified: true,
        avatar: userPet.avatar || 'avatar-mascota-perfil-gemelo-digital.png',
        timeLoc: 'Justo ahora • Desde CUDI Web & App',
        text: text,
        image: '',
        likes: 1,
        liked: true,
        commentsCount: 0
    });
    saveSharedSocialState(state);

    closeStoryCreator();
    renderSyncedCommunityFeed();
    const userStoryWrap = document.querySelector('.stories-container .story-item:first-child .story-avatar-wrap');
    if (userStoryWrap) {
        userStoryWrap.classList.add('active');
    }
    showCudiCommunityToast('¡Publicación sincronizada con la Comunidad y la App Demo!');
}

// INYECCIÓN DE CONTENEDORES MODALES
function injectModals() {
    if (!document.getElementById('cudi-pet-profile-modal')) {
        const pModal = document.createElement('div');
        pModal.id = 'cudi-pet-profile-modal';
        pModal.className = 'cudi-community-modal-overlay';
        pModal.onclick = (e) => { if (e.target === pModal) closePetProfile(); };
        document.body.appendChild(pModal);
    }

    if (!document.getElementById('cudi-playdate-modal')) {
        const pdModal = document.createElement('div');
        pdModal.id = 'cudi-playdate-modal';
        pdModal.className = 'cudi-community-modal-overlay';
        pdModal.onclick = (e) => { if (e.target === pdModal) closePlaydateModal(); };
        document.body.appendChild(pdModal);
    }

    if (!document.getElementById('cudi-story-creator-modal')) {
        const scModal = document.createElement('div');
        scModal.id = 'cudi-story-creator-modal';
        scModal.className = 'cudi-community-modal-overlay';
        scModal.onclick = (e) => { if (e.target === scModal) closeStoryCreator(); };
        document.body.appendChild(scModal);
    }
}

function showCudiCommunityToast(msg) {
    if (typeof showCudiToast === 'function') {
        showCudiToast(msg);
        return;
    }
    let toast = document.querySelector('.cudi-community-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'cudi-community-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${escapeHtml(msg)}`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3200);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
