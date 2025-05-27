// Datos de las cocinas
const cocinasData = {
    1: {
        titulo: "Cocina Moderna Minimalista",
        descripcion: "Una cocina que combina la elegancia del minimalismo con la funcionalidad moderna. Diseñada para maximizar el espacio y crear un ambiente limpio y ordenado.",
        imagenes: [
            "img/cocina1.jpg",
            "img/cocina1-2.jpg",
            "img/cocina1-3.jpg",
            "img/cocina1-4.jpg"
        ],
        especificaciones: [
            "Dimensiones: 4.5m x 3m",
            "Altura de gabinetes: 2.4m",
            "Isla central: 2.4m x 1.2m",
            "Iluminación LED integrada",
            "Sistema de cierre suave en cajones y puertas",
            "Ventilación optimizada"
        ],
        materiales: [
            "Gabinetes en MDF hidrófugo",
            "Superficies en cuarzo blanco",
            "Tiradores de acero inoxidable",
            "Zócalos en aluminio anodizado",
            "Bisagras y rieles de primera calidad"
        ],
        precio: "Desde $8,000 USD"
    },
    2: {
        titulo: "Cocina Contemporánea",
        descripcion: "Diseño sofisticado que combina funcionalidad y estilo. La isla central actúa como punto focal y área de reunión, mientras los gabinetes hasta el techo maximizan el almacenamiento.",
        imagenes: [
            "img/cocina2.jpg",
            "img/cocina2-2.jpg",
            "img/cocina2-3.jpg",
            "img/cocina2-4.jpg"
        ],
        especificaciones: [
            "Dimensiones: 5m x 4m",
            "Altura de gabinetes: 2.7m",
            "Isla central: 3m x 1.4m",
            "Sistema de organización interno",
            "Iluminación ambiental y funcional",
            "Electrodomésticos integrados"
        ],
        materiales: [
            "Gabinetes en madera de roble",
            "Superficies en granito negro",
            "Detalles en vidrio templado",
            "Hardware premium importado",
            "Acabados anti-huellas"
        ],
        precio: "Desde $12,000 USD"
    },
    3: {
        titulo: "Cocina Industrial",
        descripcion: "Una cocina que combina el estilo industrial con la funcionalidad profesional. Ideal para quienes buscan un espacio de trabajo robusto y eficiente con un toque moderno.",
        imagenes: [
            "img/cocina3.jpg",
            "img/cocina3-2.jpg",
            "img/cocina3-3.jpg",
            "img/cocina3-4.jpg"
        ],
        especificaciones: [
            "Dimensiones: 6m x 4m",
            "Altura de gabinetes: 2.5m",
            "Isla de trabajo: 3.5m x 1.5m",
            "Sistema de ventilación industrial",
            "Iluminación de alto rendimiento",
            "Zonas de trabajo especializadas"
        ],
        materiales: [
            "Gabinetes en acero inoxidable",
            "Superficies de trabajo en acero",
            "Detalles en madera maciza",
            "Sistemas de fijación reforzados",
            "Acabados resistentes al calor"
        ],
        precio: "Desde $15,000 USD"
    }
};

// Funcionalidad del modal
const modal = document.getElementById('cocina-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-main-image');
const modalDetails = document.querySelector('.modal-details');
const thumbnailGallery = document.querySelector('.thumbnail-gallery');

// Función para cargar los detalles de la cocina en el modal
function loadKitchenDetails(kitchenId) {
    const kitchen = cocinasData[kitchenId];
    
    // Actualizar contenido del modal
    modalDetails.querySelector('h2').textContent = kitchen.titulo;
    modalDetails.querySelector('.descripcion').textContent = kitchen.descripcion;
    modalImage.src = kitchen.imagenes[0];
    modalImage.alt = kitchen.titulo;
    
    // Actualizar especificaciones
    const especificacionesList = modalDetails.querySelector('.especificaciones ul');
    especificacionesList.innerHTML = kitchen.especificaciones
        .map(spec => `<li>${spec}</li>`)
        .join('');
    
    // Actualizar materiales
    const materialesList = modalDetails.querySelector('.materiales ul');
    materialesList.innerHTML = kitchen.materiales
        .map(material => `<li>${material}</li>`)
        .join('');
    
    // Ocultar sección de precio pero mantener visible el botón de presupuesto
    const precioSection = modalDetails.querySelector('.precio');
    precioSection.style.display = 'none';
    
    // Asegurar que el botón de presupuesto esté visible
    const ctaButton = modalDetails.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.style.display = 'inline-block';
    }
    
    // Cargar galería de imágenes
    modalImage.src = kitchen.imagenes[0];
    modalImage.alt = kitchen.titulo;
    
    // Cargar miniaturas
    thumbnailGallery.innerHTML = kitchen.imagenes
        .map((img, index) => `
            <img src="${img}" 
                alt="Vista ${index + 1}" 
                class="thumbnail" 
                onclick="changeMainImage('${img}')">
        `).join('');
}

// Función para cambiar la imagen principal
function changeMainImage(src) {
    modalImage.src = src;
}

// Event listeners
document.querySelectorAll('.ver-detalles').forEach(button => {
    button.addEventListener('click', () => {
        const kitchenId = button.dataset.cocina;
        loadKitchenDetails(kitchenId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Prevenir que el click en el contenido del modal cierre el modal
modal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
}); 