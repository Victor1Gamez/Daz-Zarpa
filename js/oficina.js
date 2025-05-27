// Datos de las oficinas
const oficinasData = {
    1: {
        titulo: "Oficina Ejecutiva",
        descripcion: "Un espacio de trabajo elegante y profesional diseñado para ejecutivos y directivos. Combina estética y funcionalidad para crear un ambiente que inspira productividad y liderazgo.",
        especificaciones: [
            "Escritorio: 2.00 x 1.00 metros",
            "Mesa de juntas: 2.40 x 1.20 metros",
            "Biblioteca: 3.00 x 2.40 metros",
            "Sillón ejecutivo ergonómico",
            "Sistema de iluminación LED",
            "Gestión de cables integrada"
        ],
        materiales: [
            "Madera de nogal seleccionada",
            "Acabados en laca mate y brillante",
            "Herrajes de acero inoxidable",
            "Vidrio templado de 10mm",
            "Cuero genuino en sillería"
        ],
        precio: "$8,500 USD",
        imagenes: [
            "img/oficina1.jpg",
            "img/oficina1-2.jpg",
            "img/oficina1-3.jpg",
            "img/oficina1-4.jpg"
        ]
    },
    2: {
        titulo: "Estaciones de Trabajo",
        descripcion: "Solución modular y eficiente para equipos de trabajo. Diseñada para maximizar la colaboración mientras mantiene la privacidad individual y la organización del espacio.",
        especificaciones: [
            "Módulos de 1.50 x 1.50 metros",
            "Altura de separadores: 1.20 metros",
            "Cajoneras móviles",
            "Sistema de cableado oculto",
            "Paneles acústicos integrados",
            "Configuración flexible para 4-8 personas"
        ],
        materiales: [
            "MDF de alta densidad",
            "Melamina texturizada",
            "Aluminio anodizado",
            "Tela acústica en separadores",
            "Herrajes de alta resistencia"
        ],
        precio: "$5,800 USD",
        imagenes: [
            "img/oficina2.jpg",
            "img/oficina2-2.jpg",
            "img/oficina2-3.jpg",
            "img/oficina2-4.jpg"
        ]
    },
    3: {
        titulo: "Sala de Reuniones",
        descripcion: "Espacio diseñado para reuniones productivas y presentaciones profesionales. Combina tecnología y confort para facilitar la colaboración efectiva.",
        especificaciones: [
            "Mesa: 3.60 x 1.40 metros",
            "Capacidad: 10-12 personas",
            "Mueble multimedia integrado",
            "Sistema de conectividad",
            "Iluminación regulable",
            "Acústica optimizada"
        ],
        materiales: [
            "Madera de roble americano",
            "Acabados premium en laca",
            "Cristal templado",
            "Metal cromado",
            "Tapicería de alta resistencia"
        ],
        precio: "$7,200 USD",
        imagenes: [
            "img/oficina3.jpg",
            "img/oficina3-2.jpg",
            "img/oficina3-3.jpg",
            "img/oficina3-4.jpg"
        ]
    }
};

// Elementos del DOM
const modal = document.getElementById('oficina-modal');
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
        const oficinaId = button.getAttribute('data-oficina');
        openModal(oficinaId);
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
function openModal(oficinaId) {
    const oficina = oficinasData[oficinaId];
    
    // Actualizar contenido del modal
    modalTitle.textContent = oficina.titulo;
    modalDescription.textContent = oficina.descripcion;
    modalImage.src = oficina.imagenes[0];
    modalImage.alt = oficina.titulo;
    
    // Actualizar especificaciones
    modalSpecs.innerHTML = oficina.especificaciones
        .map(spec => `<li><i class="fas fa-check"></i>${spec}</li>`)
        .join('');
    
    // Actualizar materiales
    modalMaterials.innerHTML = oficina.materiales
        .map(material => `<li><i class="fas fa-circle"></i>${material}</li>`)
        .join('');
    
    // Actualizar precio
    modalPrice.textContent = oficina.precio;
    
    // Actualizar galería de miniaturas
    thumbnailGallery.innerHTML = oficina.imagenes
        .map(img => `<img src="${img}" alt="${oficina.titulo}" class="thumbnail">`)
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