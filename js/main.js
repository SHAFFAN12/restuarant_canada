/* ==========================================================================
   RESTAURANT CANADA BEST — OFFICIAL JS INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Drawer Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on any link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Sticky Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Dynamic Category Filtering (Menu Page)
    const filterButtons = document.querySelectorAll('.menu-category-btn');
    const foodCards = document.querySelectorAll('.food-card');

    if (filterButtons.length > 0 && foodCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const selectedCategory = button.getAttribute('data-filter');
                
                // Animate and filter cards
                foodCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                            card.classList.remove('hidden');
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.classList.add('hidden');
                        }
                    }, 250);
                });
            });
        });
    }

    // 4. Contact Form Submission (Mock Handler with Premium Toast Alert)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }
            
            // Show premium success toast
            showToast(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`, 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Toast Alert Helper Function
    function showToast(message, type = 'success') {
        // Remove existing toast if present
        const existingToast = document.querySelector('.toast-alert');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-alert toast-${type}`;
        
        // Custom styling for Toast Alert
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.padding = '16px 24px';
        toast.style.borderRadius = '6px';
        toast.style.color = '#FFFFFF';
        toast.style.fontFamily = "'Poppins', sans-serif";
        toast.style.fontSize = '0.95rem';
        toast.style.fontWeight = '500';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '10px';
        toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        
        // Colors based on type
        if (type === 'success') {
            toast.style.backgroundColor = '#2E7D32'; // Green
            toast.innerHTML = `<span>✔️</span> ${message}`;
        } else {
            toast.style.backgroundColor = '#C62828'; // Red
            toast.innerHTML = `<span>⚠️</span> ${message}`;
        }
        
        document.body.appendChild(toast);
        
        // Trigger entrance animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
});
