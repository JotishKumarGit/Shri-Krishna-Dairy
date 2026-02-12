// ==================== Initialize AOS Animation ====================
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
});

// ==================== Navbar Scroll Effect ====================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Scroll to Top Button ====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Active Menu Link on Scroll ====================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== Contact Form Handling with WhatsApp ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `*New Enquiry from Shri Krishna Dairy Website*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email || 'Not provided')}%0A` +
        `*Subject:* ${encodeURIComponent(subject)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/919243441283?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    contactForm.reset();
    showNotification('Redirecting to WhatsApp...', 'success');
});

// ==================== Newsletter Form Handling ====================
const newsletterForm = document.querySelector('.newsletter-dairy-form');

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = this.querySelector('.form-control-newsletter').value;

    const whatsappMessage = `*Newsletter Subscription Request*%0A%0A` +
        `I would like to subscribe to Shri Krishna Dairy newsletter.%0A` +
        `*Email:* ${encodeURIComponent(email)}`;

    const whatsappURL = `https://wa.me/919243441283?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    this.reset();
    showNotification('Thank you for subscribing!', 'success');
});

// ==================== Notification Function ====================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Mobile Menu Enhancement ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const offcanvas = document.getElementById('navbarOffcanvas');

if (navbarToggler && offcanvas) {
    offcanvas.addEventListener('shown.bs.offcanvas', function () {
        const navItems = this.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    });

    document.addEventListener('click', function (e) {
        const isClickInsideOffcanvas = offcanvas.contains(e.target);
        const isClickOnToggler = navbarToggler.contains(e.target);

        if (!isClickInsideOffcanvas && !isClickOnToggler && offcanvas.classList.contains('show')) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    });

    const closeBtn = offcanvas.querySelector('.btn-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const navItems = offcanvas.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                }, index * 30);
            });
        });
    }
}

// ==================== Gallery Lightbox Effect ====================
const galleryItems = document.querySelectorAll('.gallery-dairy-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const imgSrc = this.querySelector('img').src;
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Gallery Image">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
            </div>
        `;

        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(93, 78, 55, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;

        const content = overlay.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease;
        `;

        const img = content.querySelector('img');
        img.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 15px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;

        const closeBtn = content.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -50px;
            right: 0;
            background: #f4a460;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 22px;
            color: white;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;

        closeBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'rotate(90deg)';
        });

        closeBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'rotate(0deg)';
        });

        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        });

        closeBtn.addEventListener('click', function () {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
    });
});

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// ==================== Form Validation ====================
const inputs = document.querySelectorAll('.form-control-dairy');

inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#10b981';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '#f4a460';
    });
});

// Phone validation
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    phoneInput.addEventListener('blur', function () {
        if (this.value.length < 10) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#10b981';
        }
    });
}

// Email validation
const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#ef4444';
        } else if (this.value) {
            this.style.borderColor = '#10b981';
        }
    });
});

// ==================== Parallax Effect for Hero ====================
window.addEventListener('scroll', function () {
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.scrollY;

    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ==================== Product Card Animation ====================
const productCards = document.querySelectorAll('.product-dairy-card');

productCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== Service Card Animation ====================
const serviceCards = document.querySelectorAll('.service-dairy-card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    serviceObserver.observe(card);
});

// ==================== Preloader ====================
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ==================== Console Welcome Message ====================
console.log('%c Welcome to Shri Krishna Dairy! ',
    'background: linear-gradient(135deg, #ffd700 0%, #f4a460 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log('%c Pure & Natural Dairy Products 🐄 ',
    'color: #f4a460; font-size: 14px; font-weight: bold;'
);

// ==================== Custom Cursor Effect ====================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor-dairy';
cursor.style.cssText = `
    width: 25px;
    height: 25px;
    border: 2px solid #f4a460;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', function (e) {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', function () {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
});

document.addEventListener('mouseup', function () {
    cursor.style.width = '25px';
    cursor.style.height = '25px';
});

// Hide custom cursor on mobile
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}

// Enquiry modal js

document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let whatsappMessage =
        `*New Dairy Enquiry*%0A%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Subject:* ${subject}%0A
*Message:* ${message}`;

    let whatsappURL = "https://wa.me/919243441283?text=" + whatsappMessage;

    window.open(whatsappURL, "_blank");
});



// ==================== End of JavaScript ====================