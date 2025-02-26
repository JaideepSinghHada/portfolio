// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-cursor-active');
    // Create custom cursor element
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
    
    // Variables for cursor position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Latency factor (higher = more lag, lower = less lag)
    // Adjust this value to change the smoothness
    const latency = 0.1;
    
    // Update mouse position on mouse move
    document.addEventListener("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
        // Calculate new position with latency
        cursorX += (mouseX - cursorX) * latency;
        cursorY += (mouseY - cursorY) * latency;
        
        // Apply the position to the custom cursor
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;
        
        // Request next frame
        requestAnimationFrame(animateCursor);
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hexagon, input, textarea, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
        });
    });
    
    // Start the animation loop
    animateCursor();

    // Terminal typing effect
    const terminalText = document.getElementById('typing-text');
    const responseText = document.getElementById('response-text');
    const commands = [  
        'whoami',
        'ls -la projects/',
        'cat skills.txt',
        'sudo hack --ethical'

    ];
    const responses = [
        'Jaideep Singh Hada - Cybersecurity Analyst',
        'Content-Access-Management.py | Ecommerce-Pentest-Report.pdf | Anomaly-Detection-System',
        'Penetration Testing | Vulnerability Assessment | Security Development | AI Security',
        'Access granted. Welcome to my portfolio!'
        
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let waitTime = 1000;
    
    function typeTerminal() {
        const currentCommand = commands[commandIndex];
        const currentResponse = responses[commandIndex];
        
        // Type command
        if (!isDeleting && charIndex <= currentCommand.length) {
            terminalText.textContent = currentCommand.substring(0, charIndex);
            charIndex++;
            setTimeout(typeTerminal, typingSpeed);
        } 
        // Wait after typing command
        else if (!isDeleting && charIndex > currentCommand.length) {
            setTimeout(() => {
                responseText.textContent = currentResponse;
                setTimeout(() => {
                    isDeleting = true;
                    typeTerminal();
                }, waitTime * 2);
            }, waitTime);
        }
        // Clear command
        else if (isDeleting && charIndex > 0) {
            terminalText.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeTerminal, typingSpeed / 2);
        }
        // Move to next command
        else if (isDeleting && charIndex === 0) {
            responseText.textContent = '';
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeTerminal, typingSpeed);
        }
    }
    
    // Start typing animation
    typeTerminal();
    
    // Navigation Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('nav');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Update active link
            navLinksItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Change navigation style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-links a[href="#${id}"]`).classList.add('active');
            }
        });
    });
    
    // Generate Hexagon Grid
    const hexagonGrid = document.querySelector('.hexagon-grid');
    if (hexagonGrid) {
        const gridWidth = hexagonGrid.offsetWidth;
        const gridHeight = hexagonGrid.offsetHeight;
        const hexCount = 15; // Number of hexagons to create
        
        for (let i = 0; i < hexCount; i++) {
            const hexagon = document.createElement('div');
            hexagon.classList.add('hexagon');
            
            // Random position within the grid
            const posX = Math.random() * gridWidth;
            const posY = Math.random() * gridHeight;
            
            // Random size between 40px and 80px
            const size = Math.random() * 40 + 40;
            
            // Random opacity
            const opacity = Math.random() * 0.08 + 0.02;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            hexagon.style.left = `${posX}px`;
            hexagon.style.top = `${posY}px`;
            hexagon.style.width = `${size}px`;
            hexagon.style.height = `${size}px`;
            hexagon.style.backgroundColor = `rgba(0, 180, 216, ${opacity})`;
            hexagon.style.animationDelay = `${delay}s`;
            
            hexagonGrid.appendChild(hexagon);
        }
    }
    
    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !email || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message or clear form
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Initial check and add scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Add CSS for revealed sections if not already in the CSS file
    const style = document.createElement('style');
    style.innerHTML = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});