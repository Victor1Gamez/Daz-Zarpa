// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Cerrar el menú móvil si está abierto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    const formData = new FormData(this);
    const formEntries = Object.fromEntries(formData.entries());
    
    // Por ahora solo mostraremos un mensaje de éxito
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    this.reset();
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elementos a observar para la animación
const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-content');
animatedElements.forEach(el => observer.observe(el));

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Validación del formulario en tiempo real
const inputs = contactForm.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
        }
    });
});

// Slider functionality
const slider = {
    slides: document.querySelectorAll('.slide'),
    currentSlide: 0,
    slideInterval: null,
    dots: [],

    init() {
        // Create dots
        const dotsContainer = document.querySelector('.slide-dots');
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });

        // Add event listeners for navigation buttons
        document.querySelector('.prev-slide').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-slide').addEventListener('click', () => this.nextSlide());

        // Start automatic slideshow
        this.startSlideshow();

        // Pause slideshow on hover
        document.querySelector('.hero').addEventListener('mouseenter', () => this.pauseSlideshow());
        document.querySelector('.hero').addEventListener('mouseleave', () => this.startSlideshow());
    },

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;
        if (this.currentSlide >= this.slides.length) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    },

    startSlideshow() {
        if (this.slideInterval) clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    pauseSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
};

// Initialize slider after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    slider.init();
});

// Carrito de Compras
let cart = [];
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Función para actualizar el total
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    totalAmount.textContent = `$${total.toFixed(2)} USD`;
}

// Función para renderizar los items del carrito
function renderCartItems() {
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price} USD</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Función para agregar al carrito
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartCount();
    updateTotal();
    renderCartItems();
}

// Función para remover del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateTotal();
    renderCartItems();
}

// Event listeners para el carrito
cartButton.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Event listener para los botones de comprar
document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.herraje-card');
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.precio').textContent.replace('$', '').replace(' USD', '');
        const image = card.querySelector('img').src;
        
        addToCart(name, price, image);
        
        // Animación de confirmación
        button.innerHTML = '<i class="fas fa-check"></i> Agregado';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar';
            button.style.backgroundColor = '';
        }, 2000);
    });
});

// Cerrar el carrito al hacer clic fuera
document.addEventListener('click', (e) => {
    if (cartModal.classList.contains('active') && 
        !cartModal.contains(e.target) && 
        !cartButton.contains(e.target)) {
        cartModal.classList.remove('active');
    }
}); 