/**
 * ==========================================================================
 * CUDI COMUNIDAD — RED SOCIAL MULTIESPECIE INTELIGENTE
 * Sincronización biométrica, perfiles exclusivos, agendador de encuentros IA
 * y dinamismo total de interacciones (Likes, Comentarios, Grupos, Eventos).
 * Desarrollado por Sergio Alejandro Ospina Rocha para el Ecosistema CUDI.
 * ==========================================================================
 */

const CUDI_COMMUNITY_PETS = {
    user: {
        id: "user",
        name: "Mimi",
        username: "@mimi_cudi",
        avatar: "avatar-mascota-perfil-gemelo-digital.png",
        cover: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200",
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
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600"
        ]
    },
    cooper: {
        id: "cooper",
        name: "Cooper",
        username: "@cooper_beagle",
        avatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
        cover: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=1200",
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
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600",
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600"
        ]
    },
    max: {
        id: "max",
        name: "Max",
        username: "@max_border",
        avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200",
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
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
            "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
        ]
    },
    cleo: {
        id: "cleo",
        name: "Cleo",
        username: "@cleo_podenca",
        avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400",
        cover: "https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?w=1200",
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
            "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600"
        ]
    },
    bella: {
        id: "bella",
        name: "Bella",
        username: "@bella_pugqueen",
        avatar: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400",
        cover: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200",
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
            "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600",
            "https://images.unsplash.com/photo-1524511751214-b0a50a01b1da?w=600",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
        ]
    },
    rex: {
        id: "rex",
        name: "Rex",
        username: "@rex_goldenpuppy",
        avatar: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400",
        cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200",
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
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600",
            "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600",
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
        ]
    },
    luna: {
        id: "luna",
        name: "Luna",
        username: "@luna_husky",
        avatar: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400",
        cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200",
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
            "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600",
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600"
        ]
    },
    simba: {
        id: "simba",
        name: "Simba",
        username: "@simba_pom",
        avatar: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400",
        cover: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200",
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
            "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600",
            "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600",
            "https://images.unsplash.com/photo-1524511751214-b0a50a01b1da?w=600"
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
    initCommunityInteractions();
    injectModals();

    window.addEventListener('cudi:sessionChanged', () => {
        initUserCommunitySync();
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
        // En modo no iniciado, usamos el candidato aleatorio para que se vea dinámico pero claramente en modo demo
        profile = (typeof cudi_get_random_pet_candidate === 'function') 
            ? cudi_get_random_pet_candidate() 
            : {
                name: 'Luna',
                photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
                breed: 'Husky Siberiano',
                age: '3 años',
                weight: '22',
                type: 'perro'
            };
        profile.isDemoPreview = true;
    } else {
        profile.isDemoPreview = false;
    }

    // Actualizar objeto user en memoria
    CUDI_COMMUNITY_PETS.user.name = profile.name;
    CUDI_COMMUNITY_PETS.user.username = `@${profile.name.toLowerCase().replace(/\s+/g, '_')}_cudi`;
    if (profile.photo) CUDI_COMMUNITY_PETS.user.avatar = profile.photo;
    if (profile.breed) CUDI_COMMUNITY_PETS.user.breed = profile.breed;
    if (profile.age) CUDI_COMMUNITY_PETS.user.age = isNaN(profile.age) ? profile.age : `${profile.age} años`;

    // 1. Sincronizar Tarjeta de Perfil Izquierda
    const sidebarLeft = document.querySelector('.social-sidebar-left');
    if (sidebarLeft) {
        const profileCard = sidebarLeft.querySelector('.post-card');
        if (profileCard) {
            profileCard.innerHTML = `
                <div style="position:relative; display:inline-block; margin-bottom:12px;">
                    <img src="${profile.photo || 'avatar-mascota-perfil-gemelo-digital.png'}" alt="${profile.name}" 
                         style="width:96px; height:96px; border-radius:50%; border:3.5px solid #0284c7; box-shadow:0 8px 24px rgba(2,132,199,0.2); object-fit:cover; cursor:pointer;"
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
                        <span onclick="openAuthModal()" style="display:inline-flex; align-items:center; gap:5px; background:#fef3c7; color:#92400e; padding:4px 10px; border-radius:12px; font-size:0.72rem; font-weight:700; cursor:pointer;" title="Haz clic para iniciar sesión">
                            <i class="fa-solid fa-lock"></i> Vista Demo • Iniciar Sesión
                        </span>
                    </div>
                ` : `
                    <div style="margin-bottom:14px;">
                        <span style="display:inline-flex; align-items:center; gap:5px; background:#dcfce7; color:#15803d; padding:4px 10px; border-radius:12px; font-size:0.72rem; font-weight:700;">
                            <i class="fa-solid fa-circle-check"></i> Sesión Sincronizada 24/7
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
                        <div style="font-weight:800; color:#0f172a; font-size:1.05rem;">${CUDI_COMMUNITY_PETS.user.following}</div>
                        <div style="font-size:0.68rem; color:#94a3b8; text-transform:uppercase; font-weight:700;">Siguiendo</div>
                    </div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button onclick="openPetProfile('user')" class="btn-profile-view" style="flex:1; background:#f0f9ff; color:#0284c7; border:1px solid #bae6fd; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.2s;">
                        <i class="fa-solid fa-id-card"></i> Ver Perfil
                    </button>
                    ${profile.isDemoPreview ? `
                        <button onclick="openAuthModal()" style="flex:1; background:#0284c7; color:white; border:none; display:flex; align-items:center; justify-content:center; gap:6px; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.2s;">
                            <i class="fa-solid fa-paw"></i> Iniciar
                        </button>
                    ` : `
                        <a href="mi-mascota.html" style="flex:1; background:#0284c7; color:white; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; padding:8px; border-radius:12px; font-weight:700; font-size:0.78rem; transition:all 0.2s;">
                            <i class="fa-solid fa-chart-line"></i> Panel
                        </a>
                    `}
                </div>
            `;
        }
    }

    // 2. Sincronizar Avatar de "Tú" en la barra de Stories
    const userStory = document.querySelector('.stories-container .story-item:first-child');
    if (userStory) {
        userStory.innerHTML = `
            <div class="story-avatar-wrap" onclick="openStoryCreator()" style="cursor:pointer;" title="Publicar historia de ${profile.name}">
                <img src="${profile.photo || 'avatar-mascota-perfil-gemelo-digital.png'}" alt="Tú">
                <span class="story-add-badge"><i class="fa-solid fa-plus"></i></span>
            </div>
            <span class="story-name">Tú</span>
        `;
    }
}

function initCommunityInteractions() {
    // 1. Stories Clicks
    const storyItems = document.querySelectorAll('.stories-container .story-item');
    storyItems.forEach((item, idx) => {
        if (idx === 0) return; // 'Tú' abre el creador de historias
        const nameEl = item.querySelector('.story-name');
        if (nameEl) {
            const petKey = nameEl.textContent.trim().toLowerCase();
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const targetKey = petKey === 'mimi' ? 'user' : petKey;
                openPetProfile(targetKey);
            });
        }
    });

    // 2. Botones de Seguir en Posts y Tarjetas
    document.querySelectorAll('.post-header button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFollowPostButton(btn);
        });
    });

    // 3. Post Author Clicks
    document.querySelectorAll('.post-header').forEach(header => {
        const titleEl = header.querySelector('h5');
        const imgEl = header.querySelector('.post-author-img');
        if (titleEl) {
            const name = titleEl.textContent.trim().split(' ')[0].toLowerCase();
            const clickHandler = () => openPetProfile(name);
            titleEl.style.cursor = 'pointer';
            titleEl.addEventListener('click', clickHandler);
            if (imgEl) {
                imgEl.style.cursor = 'pointer';
                imgEl.addEventListener('click', clickHandler);
            }
        }
    });

    // 4. Post Action Buttons (Like, Comment, Share)
    document.querySelectorAll('.post-actions').forEach(actionsBar => {
        const btns = actionsBar.querySelectorAll('.post-action-btn');
        if (btns.length >= 3) {
            // Like
            btns[0].addEventListener('click', () => handleLikePost(btns[0]));
            // Comment
            btns[1].addEventListener('click', () => toggleCommentsThread(actionsBar));
            // Share
            btns[2].addEventListener('click', () => handleSharePost());
        }
    });

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
                <img src="${CUDI_COMMUNITY_PETS.bella.avatar}" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
                <div style="background:#f8fafc; padding:8px 12px; border-radius:12px; flex:1;">
                    <strong style="color:#0f172a;">Bella:</strong> ¡Qué guapo estás hoy! Nosotros saldremos a las 18h al parque 🐾
                </div>
            </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
            <img src="${currentPet.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:1px solid #0284c7;">
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
        <img src="${currentPet.avatar}" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
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

    modal.innerHTML = `
        <div class="pet-profile-card-modal">
            <!-- Header con Portada y Botón Cerrar -->
            <div class="modal-cover-wrap" style="background-image: url('${pet.cover}');">
                <button class="modal-close-round" onclick="closePetProfile()"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-smart-tag"><i class="fa-solid fa-satellite-dish"></i> ${pet.collarStatus}</div>
            </div>

            <!-- Avatar y Cabecera Principal -->
            <div class="modal-body-content">
                <div class="modal-avatar-row">
                    <div class="modal-avatar-holder">
                        <img src="${pet.avatar}" alt="${pet.name}" class="modal-pet-avatar">
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
                                <img src="${img}" alt="Momento de ${pet.name}">
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
    pet.isFollowing = !pet.isFollowing;
    if (pet.isFollowing) {
        pet.followers++;
        btn.classList.add('following');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Siguiendo';
        showCudiCommunityToast(`¡Ahora sigues a ${pet.name}!`);
    } else {
        pet.followers--;
        btn.classList.remove('following');
        btn.innerHTML = '<i class="fa-solid fa-plus"></i> Seguir';
        showCudiCommunityToast(`Has dejado de seguir a ${pet.name}`);
    }
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
                    <span class="playdate-tag"><i class="fa-solid fa-bolt"></i> Match IA del 95%</span>
                    <h3 style="margin:6px 0 0; color:#0f172a;">Proponer Encuentro con ${pet.name}</h3>
                </div>
                <button class="modal-close-round" onclick="closePlaydateModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <div style="display:flex; align-items:center; gap:14px; background:#f8fafc; border-radius:16px; padding:12px; margin:16px 0;">
                <img src="${pet.avatar}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; border:2px solid #0284c7;">
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
                <h3 style="margin:0; color:#0f172a;"><i class="fa-solid fa-camera"></i> Publicar Estado de ${userPet.name}</h3>
                <button class="modal-close-round" onclick="closeStoryCreator()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div style="margin:15px 0;">
                <p style="font-size:0.85rem; color:#64748b; margin-bottom:12px;">Comparte qué está haciendo tu compañero hoy con la comunidad CUDI.</p>
                <textarea id="story-caption" class="playdate-input" rows="3" placeholder="¿Qué travesura o aventura hizo ${userPet.name} hoy?"></textarea>
            </div>
            <button onclick="submitNewStory()" class="btn-playdate-send">
                <i class="fa-solid fa-cloud-arrow-up"></i> Publicar en Mis Historias
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
    closeStoryCreator();
    const userStoryWrap = document.querySelector('.stories-container .story-item:first-child .story-avatar-wrap');
    if (userStoryWrap) {
        userStoryWrap.classList.add('active');
    }
    showCudiCommunityToast('¡Tu historia se ha publicado con éxito!');
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
