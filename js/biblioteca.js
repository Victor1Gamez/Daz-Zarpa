// Datos de las bibliotecas
const bibliotecasData = {
    1: {
        titulo: "Biblioteca Clásica",
        descripcion: "Una biblioteca elegante que combina la tradición con la funcionalidad moderna. Perfecta para espacios amplios y hogares con un estilo clásico.",
        especificaciones: [
            "Altura: 2.80 metros",
            "Ancho: 3.50 metros",
            "Profundidad: 45 centímetros",
            "Capacidad: 500+ libros",
            "Iluminación LED integrada",
            "Sistema de anclaje reforzado"
        ],
        materiales: [
            "Madera de roble macizo",
            "Acabados en barniz natural",
            "Herrajes de bronce envejecido",
            "Vidrio templado en vitrinas",
            "Estantes ajustables reforzados"
        ],
        precio: "$6,500 USD",
        imagenes: [
            "img/biblioteca1.jpg",
            "img/biblioteca1-2.jpg",
            "img/biblioteca1-3.jpg",
            "img/biblioteca1-4.jpg"
        ]
    },
    2: {
        titulo: "Biblioteca Moderna",
        descripcion: "Diseño contemporáneo que maximiza el espacio y ofrece versatilidad. Ideal para espacios multifuncionales y oficinas en casa.",
        especificaciones: [
            "Altura: 2.40 metros",
            "Ancho: 3.00 metros",
            "Profundidad: 40 centímetros",
            "Espacio de trabajo integrado",
            "Conexiones eléctricas ocultas",
            "Sistema modular expandible"
        ],
        materiales: [
            "MDF de alta densidad",
            "Acabados en laca mate",
            "Herrajes de acero inoxidable",
            "Paneles deslizantes",
            "Iluminación LED regulable"
        ],
        precio: "$4,800 USD",
        imagenes: [
            "img/biblioteca2.jpg",
            "img/biblioteca2-2.jpg",
            "img/biblioteca2-3.jpg",
            "img/biblioteca2-4.jpg"
        ]
    },
    3: {
        titulo: "Biblioteca Minimalista",
        descripcion: "Un diseño limpio y flotante que crea la ilusión de más espacio. Perfecta para apartamentos modernos y espacios reducidos.",
        especificaciones: [
            "Altura: 2.20 metros",
            "Ancho: 2.80 metros",
            "Profundidad: 35 centímetros",
            "Sistema de montaje oculto",
            "Almacenamiento invisible",
            "Diseño modular adaptable"
        ],
        materiales: [
            "MDF y madera de pino",
            "Acabados en pintura mate",
            "Herrajes ocultos",
            "Sistema push-to-open",
            "Soportes de acero reforzado"
        ],
        precio: "$3,900 USD",
        imagenes: [
            "img/biblioteca3.jpg",
            "img/biblioteca3-2.jpg",
            "img/biblioteca3-3.jpg",
            "img/biblioteca3-4.jpg"
        ]
    }
};

// Elementos del DOM
const modal = document.getElementById('biblioteca-modal');
const modalImage = document.getElementById('modal-main-image');
const modalTitle = document.querySelector('.modal-details h2');
const modalDescription = document.querySelector('.modal-details .descripcion');
const modalSpecs = document.querySelector('.especificaciones ul');
const modalMaterials = document.querySelector('.materiales ul');
const modalPrice = document.querySelector('.precio p');
const closeModal = document.querySelector('.close-modal');
const thumbnailGallery = document.querySelector('.thumbnail-gallery');

// Event Listeners
document.querySelectorAll('.ver-detalles').forEach(button => {
    button.addEventListener('click', () => {
        const bibliotecaId = button.getAttribute('data-biblioteca');
        openModal(bibliotecaId);
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Funciones
function openModal(bibliotecaId) {
    const biblioteca = bibliotecasData[bibliotecaId];
    
    // Actualizar contenido del modal
    modalTitle.textContent = biblioteca.titulo;
    modalDescription.textContent = biblioteca.descripcion;
    modalImage.src = biblioteca.imagenes[0];
    modalImage.alt = biblioteca.titulo;
    
    // Actualizar especificaciones
    modalSpecs.innerHTML = biblioteca.especificaciones
        .map(spec => `<li><i class="fas fa-check"></i>${spec}</li>`)
        .join('');
    
    // Actualizar materiales
    modalMaterials.innerHTML = biblioteca.materiales
        .map(material => `<li><i class="fas fa-circle"></i>${material}</li>`)
        .join('');
    
    // Ocultar sección de precio
    const precioSection = document.querySelector('.precio');
    precioSection.style.display = 'none';
    
    // Actualizar galería de miniaturas
    thumbnailGallery.innerHTML = biblioteca.imagenes
        .map(img => `<img src="${img}" alt="${biblioteca.titulo}" class="thumbnail">`)
        .join('');
    
    // Event listeners para las miniaturas
    thumbnailGallery.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            modalImage.src = thumb.src;
            modalImage.alt = thumb.alt;
        });
    });
    
    // Mostrar modal
    modal.classList.add('active');
}

// Prevenir que el scroll de la página cuando el modal está abierto
modal.addEventListener('wheel', (e) => {
    if (e.target.closest('.modal-content')) {
        e.stopPropagation();
    }
}); 