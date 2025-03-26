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
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Save theme preference to localStorage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Terminal Mode Toggle
    const terminalModeToggle = document.getElementById('terminalModeToggle');
    
    terminalModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('terminal-mode');
        
        // Dramatic color change effect
        document.querySelector('.security-scanner').classList.add('active');
        setTimeout(() => {
            document.querySelector('.security-scanner').classList.remove('active');
        }, 1500);
    });
    
    // Matrix Rain Effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to display
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = characters.split('');
    
    // Column variables
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    
    // Initialize array of y positions (one per column)
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Matrix rain animation
    function drawMatrixRain() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color and font
        ctx.fillStyle = '#0077b6';
        ctx.font = `${fontSize}px monospace`;
        
        // For each column
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Move to next position or reset
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Start matrix animation
    setInterval(drawMatrixRain, 40);
    
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00b4d8' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00b4d8',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' }
                }
            }
        });
    }
    
    // Initialize the skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const percent = bar.getAttribute('data-percent') + '%';
        bar.style.setProperty('--percent', percent);
    });
    
    // Initialize Radar Chart for Skills
    const ctx2 = document.getElementById('skillsRadarChart').getContext('2d');
    
    new Chart(ctx2, {
        type: 'radar',
        data: {
            labels: ['Penetration Testing', 'Vulnerability Assessment', 'Security Development', 'AI Security', 'DevSecOps', 'Network Security'],
            datasets: [{
                label: 'Skills',
                data: [85, 90, 80, 75, 70, 88],
                backgroundColor: 'rgba(0, 180, 216, 0.2)',
                borderColor: 'rgba(0, 180, 216, 1)',
                pointBackgroundColor: 'rgba(0, 180, 216, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#8892b0'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#8892b0'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Initialize Network Diagram
    const networkDiagram = document.getElementById('networkDiagram');
    if (networkDiagram) {
        const nodeCount = 8;
        const nodes = [];
        
        // Create nodes
        const nodeLabels = ['Server', 'Firewall', 'Client', 'Database', 'Cloud', 'IoT Device', 'API Gateway', 'Load Balancer'];
        
        for (let i = 0; i < nodeCount; i++) {
            // Create node
            const node = document.createElement('div');
            node.classList.add('node');
            
            // Random position
            const posX = Math.random() * 80 + 10; // 10% to 90% width
            const posY = Math.random() * 80 + 10; // 10% to 90% height
            
            node.style.left = `${posX}%`;
            node.style.top = `${posY}%`;
            
            // Create label
            const label = document.createElement('div');
            label.classList.add('node-label');
            label.textContent = nodeLabels[i];
            label.style.left = `${posX}%`;
            label.style.top = `${posY - 5}%`;
            
            // Add to network
            networkDiagram.appendChild(node);
            networkDiagram.appendChild(label);
            
            // Store node position for connections
            nodes.push({ x: posX, y: posY });
        }
        
        // Create connections between nodes (each node connects to ~3 other nodes)
        for (let i = 0; i < nodeCount; i++) {
            const connectionsCount = Math.floor(Math.random() * 2) + 2; // 2-3 connections
            
            for (let j = 0; j < connectionsCount; j++) {
                // Connect to random node
                const targetIndex = Math.floor(Math.random() * nodeCount);
                if (targetIndex !== i) { // Don't connect to self
                    const connection = document.createElement('div');
                    connection.classList.add('node-connection');
                    
                    // Calculate connection position and angle
                    const startX = nodes[i].x;
                    const startY = nodes[i].y;
                    const endX = nodes[targetIndex].x;
                    const endY = nodes[targetIndex].y;
                    
                    // Calculate distance and angle
                    const dx = endX - startX;
                    const dy = endY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    // Position the connection
                    connection.style.width = `${distance}%`;
                    connection.style.left = `${startX}%`;
                    connection.style.top = `${startY}%`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    networkDiagram.appendChild(connection);
                }
            }
        }
    }
    
    // Initialize Advanced Terminal
    const advancedTerminal = document.getElementById('advanced-terminal');
    if (advancedTerminal) {
        const hackingOutput = [
            { type: 'command', text: 'nmap -sV --script=vuln target.com' },
            { type: 'result', text: 'Starting Nmap scan...' },
            { type: 'result', text: 'Scanning 65535 ports...' },
            { type: 'success', text: 'PORT   STATE SERVICE VERSION' },
            { type: 'success', text: '22/tcp open  ssh     OpenSSH 7.4' },
            { type: 'success', text: '80/tcp open  http    Apache 2.4.6' },
            { type: 'warning', text: 'Found potential XSS vulnerability on endpoint /search' },
            { type: 'error', text: 'Critical: SQL Injection vulnerability detected on /login' },
            { type: 'command', text: 'dirb http://target.com/' },
            { type: 'result', text: 'Scanning directories...' },
            { type: 'success', text: 'FOUND: /admin' },
            { type: 'success', text: 'FOUND: /backup' },
            { type: 'warning', text: 'Misconfigured access controls on /backup' },
            { type: 'command', text: 'gobuster dir -u http://target.com -w wordlist.txt' },
            { type: 'result', text: 'Scanning sensitive endpoints...' }
        ];
        
        // Add with delay to simulate typing
        let index = 0;
        function addNextOutput() {
            if (index < hackingOutput.length) {
                const outputItem = hackingOutput[index];
                const outputElement = document.createElement('div');
                outputElement.classList.add('terminal-output');
                
                if (outputItem.type === 'command') {
                    outputElement.innerHTML = `<span class="prompt">$</span> <span class="terminal-command">${outputItem.text}</span>`;
                } else {
                    outputElement.classList.add(`terminal-${outputItem.type}`);
                    outputElement.textContent = outputItem.text;
                }
                
                advancedTerminal.appendChild(outputElement);
                index++;
                
                // Scroll to bottom
                advancedTerminal.scrollTop = advancedTerminal.scrollHeight;
                
                // Schedule next output
                const delay = outputItem.type === 'command' ? 1000 : 300;
                setTimeout(addNextOutput, delay);
            }
        }
        
        // Start with delay after main terminal animation
        setTimeout(addNextOutput, 2000);
    }
    
    // Initialize Project Demo buttons
    const previewButtons = document.querySelectorAll('.preview-button');
    const demoModal = document.getElementById('demoModal');
    const demoTitle = document.getElementById('demoTitle');
    const demoBody = document.getElementById('demoBody');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get project title and prepare demo content
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            // Update modal content
            demoTitle.textContent = `${projectTitle} - Demo`;
            
            // Create appropriate demo content based on project
            let demoContent = '';
            
            if (projectTitle.includes('Content Access')) {
                demoContent = `
                    <div class="demo-terminal">
                        <div class="demo-line">$ python access_manager.py --auth</div>
                        <div class="demo-output">Initializing role-based access control system...</div>
                        <div class="demo-output success">Successfully loaded 50 user profiles</div>
                        <div class="demo-output">Analyzing access patterns...</div>
                        <div class="demo-output success">Reduced unauthorized access attempts by 40%</div>
                        <div class="demo-line">$ cat access_log.txt</div>
                        <div class="demo-output">[2024-03-12 09:15:23] User admin: Access GRANTED to /admin/console</div>
                        <div class="demo-output">[2024-03-12 09:16:45] User guest: Access DENIED to /admin/console</div>
                        <div class="demo-output">[2024-03-12 09:18:12] User analyst: Access GRANTED to /reports/security</div>
                    </div>
                    <p>This project implements a sophisticated role-based access control system that significantly reduced unauthorized access by implementing proper authentication and authorization mechanisms.</p>
                `;
            } else if (projectTitle.includes('Ethical Hacking')) {
                demoContent = `
                    <div class="demo-terminal">
                        <div class="demo-line">$ sudo burpsuite --project ecommerce_pentest</div>
                        <div class="demo-output">Starting Burp Suite Professional...</div>
                        <div class="demo-output">Setting target scope to ecommerce.target.com</div>
                        <div class="demo-output warning">Found 15 critical vulnerabilities:</div>
                        <div class="demo-output error">- SQL Injection on /products?id=</div>
                        <div class="demo-output error">- XSS vulnerability in search function</div>
                        <div class="demo-output error">- Insecure direct object references</div>
                        <div class="demo-line">$ cat recommendations.md</div>
                        <div class="demo-output success">Implemented parameterized queries: Reduced SQL injections by 100%</div>
                        <div class="demo-output success">Added Content Security Policy: Mitigated XSS attacks</div>
                        <div class="demo-output success">Overall security posture improved by 60%</div>
                    </div>
                    <p>This ethical hacking project identified and remediated critical vulnerabilities in an e-commerce platform, significantly enhancing its security posture.</p>
                `;
            } else if (projectTitle.includes('Anomaly Detection')) {
                demoContent = `
                    <div class="demo-terminal">
                        <div class="demo-line">$ python anomaly_detection.py --data network_traffic.pcap</div>
                        <div class="demo-output">Loading machine learning model...</div>
                        <div class="demo-output">Processing 1.2GB of network traffic...</div>
                        <div class="demo-output warning">Unusual pattern detected: Potential port scan from 192.168.1.105</div>
                        <div class="demo-output error">Anomaly detected: Excessive failed login attempts</div>
                        <div class="demo-output success">Automated response: Blocking source IP 203.0.113.42</div>
                        <div class="demo-line">$ tail -f /var/log/anomaly_report.log</div>
                        <div class="demo-output">Machine learning model accuracy: 94.8%</div>
                        <div class="demo-output">False positive rate: 1.2%</div>
                        <div class="demo-output success">System successfully identified 98.7% of simulated attack vectors</div>
                    </div>
                    <p>This advanced anomaly detection system leverages machine learning algorithms to identify unusual patterns in network traffic and automatically responds to potential threats.</p>
                `;
            }
            
            demoBody.innerHTML = demoContent;
            
            // Show the modal
            demoModal.classList.add('show');
        });
    });
    
    // Close demo modal
    document.querySelector('.close-demo').addEventListener('click', () => {
        demoModal.classList.remove('show');
    });
    
    // Custom cursor options
    const cursorOptions = document.querySelectorAll('.cursor-option');
    
    cursorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            cursorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get cursor type
            const cursorType = this.getAttribute('data-cursor');
            
            // Remove all cursor classes
            document.body.classList.remove('cursor-default', 'cursor-terminal', 'cursor-shield', 'cursor-lock');
            
            // Add selected cursor class
            if (cursorType !== 'default') {
                document.body.classList.add(`cursor-${cursorType}`);
            }
        });
    });
    
    // Cursor trail effect
    const maxTrails = 10;
    const trails = [];
    
    // Create trail elements
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            alpha: 0
        });
    }
    
    // Update trail positions
    let trailIndex = 0;
    document.addEventListener('mousemove', (e) => {
        // Update current trail
        trails[trailIndex].x = e.clientX;
        trails[trailIndex].y = e.clientY;
        trails[trailIndex].alpha = 1;
        
        // Move to next trail
        trailIndex = (trailIndex + 1) % maxTrails;
    });
    
    // Animation loop for trails
    function animateTrails() {
        trails.forEach(trail => {
            // Fade out
            trail.alpha *= 0.92;
            
            // Update position and opacity
            trail.element.style.left = `${trail.x}px`;
            trail.element.style.top = `${trail.y}px`;
            trail.element.style.opacity = trail.alpha;
        });
        
        requestAnimationFrame(animateTrails);
    }
    
    animateTrails();
    
    // Initial security scan animation when page loads
    setTimeout(() => {
        document.querySelector('.security-scanner').classList.add('active');
        
        setTimeout(() => {
            document.querySelector('.security-scanner').classList.remove('active');
        }, 3000);
    }, 1000);

    // Initialize the new name effect instead of pixel effect
    initializeNameEffect();

    // Initialize cyber globe
    initializeCyberGlobe();

    // Initialize the cyber globe when scrolling to the about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeCyberGlobe();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }

    // Initialize cyber dashboard
    initializeCyberDashboard();

    // Add keyframes for node pulsing
    addNodePulsingKeyframes();

    // Click counter security feature
    initializeClickCounter();
});

function initializeNameEffect() {
    const nameContainer = document.getElementById('name-container');
    if (!nameContainer) return;

    const letters = nameContainer.querySelectorAll('.grain-letter');
    
    // Clear any existing event listeners
    nameContainer.removeEventListener('mouseenter', handleMouseEnter);
    nameContainer.removeEventListener('mouseleave', handleMouseLeave);
    
    // Add new event listeners
    nameContainer.addEventListener('mouseenter', handleMouseEnter);
    nameContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize letter styling
    letters.forEach(letter => {
        letter.classList.remove('active');
        letter.style.transition = 'transform 0.25s ease, color 0.25s ease, text-shadow 0.25s ease';
    });
    
    let scanInterval;
    let scanEffect;
    
    function handleMouseEnter() {
        // Create container for the scan effect if it doesn't exist
        if (!document.querySelector('.scan-effect-container')) {
            nameContainer.style.position = 'relative';
            
            // Create scan container
            scanEffect = document.createElement('div');
            scanEffect.className = 'scan-effect-container';
            scanEffect.style.position = 'absolute';
            scanEffect.style.top = '0';
            scanEffect.style.left = '0';
            scanEffect.style.width = '100%';
            scanEffect.style.height = '100%';
            scanEffect.style.overflow = 'hidden';
            scanEffect.style.pointerEvents = 'none';
            scanEffect.style.zIndex = '1';
            nameContainer.appendChild(scanEffect);
            
            // Create scanner beam
            const beam = document.createElement('div');
            beam.className = 'scanner-beam';
            beam.style.position = 'absolute';
            beam.style.top = '0';
            beam.style.left = '-15%';
            beam.style.width = '15%';
            beam.style.height = '100%';
            beam.style.background = getBeamGradient();
            beam.style.pointerEvents = 'none';
            beam.style.opacity = '0.7';
            beam.style.mixBlendMode = 'overlay';
            scanEffect.appendChild(beam);
            
            // Create scan line
            const scanLine = document.createElement('div');
            scanLine.className = 'scan-line';
            scanLine.style.position = 'absolute';
            scanLine.style.top = '0';
            scanLine.style.left = '0';
            scanLine.style.width = '1px';
            scanLine.style.height = '100%';
            scanLine.style.background = getScanColor();
            scanLine.style.boxShadow = `0 0 8px ${getScanColor()}`;
            scanLine.style.opacity = '0.8';
            scanLine.style.pointerEvents = 'none';
            scanEffect.appendChild(scanLine);
            
            // Animate grid appearing
            gsap.to(letters, {
                color: getActiveColor(),
                duration: 0.3,
                stagger: 0.02,
                ease: "power1.out"
            });
            
            // Add slight hover scale to all letters
            gsap.to(letters, {
                scale: 1.02,
                textShadow: `0 0 6px ${getScanColor(0.3)}`,
                duration: 0.3,
                ease: "power1.out"
            });
        }
        
        // Animate the scan beam and line across the name
        startScanAnimation();
    }
    
    function startScanAnimation() {
        // Get the current beam and line
        const beam = document.querySelector('.scanner-beam');
        const scanLine = document.querySelector('.scan-line');
        
        if (!beam || !scanLine) return;
        
        // Clear any existing interval
        clearInterval(scanInterval);
        
        // Reset position
        gsap.set(beam, { left: '-15%' });
        gsap.set(scanLine, { left: '0%' });
        
        // Create scan animation
        const timeline = gsap.timeline({ repeat: -1 });
        
        // Animate beam and line across the name
        timeline.to(beam, {
            left: '100%',
            duration: 1.5,
            ease: "power1.inOut"
        });
        
        timeline.to(scanLine, {
            left: '100%',
            duration: 1.5,
            ease: "power1.inOut"
        }, 0);
        
        // Highlight letters as the beam passes over them
        scanInterval = setInterval(() => {
            const beamPosition = parseFloat(beam.style.left);
            
            letters.forEach((letter, index) => {
                const letterRect = letter.getBoundingClientRect();
                const containerRect = nameContainer.getBoundingClientRect();
                const letterLeftPercent = ((letterRect.left - containerRect.left) / containerRect.width) * 100;
                const letterRightPercent = ((letterRect.right - containerRect.left) / containerRect.width) * 100;
                
                // Check if beam is overlapping the letter with a narrower highlight zone
                if (beamPosition >= letterLeftPercent - 5 && beamPosition <= letterRightPercent + 5) {
                    gsap.to(letter, {
                        scale: 1.08,
                        color: getHighlightColor(),
                        textShadow: `0 0 8px ${getScanColor()}`,
                        duration: 0.15,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(letter, {
                        scale: 1.02,
                        color: getActiveColor(),
                        textShadow: `0 0 6px ${getScanColor(0.3)}`,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }, 30);
    }
    
    function handleMouseLeave() {
        // Clear scan interval
        clearInterval(scanInterval);
        
        // Stop animation
        gsap.killTweensOf('.scanner-beam');
        gsap.killTweensOf('.scan-line');
        
        // Remove scan effect elements with fade
        const scanEffect = document.querySelector('.scan-effect-container');
        if (scanEffect) {
            gsap.to(scanEffect, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => scanEffect.remove()
            });
        }
        
        // Reset letter styles with staggered timing
        letters.forEach((letter, index) => {
            gsap.to(letter, {
                scale: 1,
                color: '',
                textShadow: 'none',
                delay: index * 0.01,
                duration: 0.2,
                ease: "power2.in"
            });
        });
    }
    
    function getBeamGradient() {
        const color = getScanColor();
        return `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`;
    }
    
    function getScanColor(alpha = 1) {
        const isDark = !document.body.classList.contains('light-theme');
        const isTerminal = document.body.classList.contains('terminal-mode');
        
        if (isTerminal) {
            return `rgba(90, 180, 120, ${alpha})`;
        } else if (isDark) {
            return `rgba(100, 255, 218, ${alpha})`;
        } else {
            return `rgba(0, 119, 182, ${alpha})`;
        }
    }
    
    function getActiveColor() {
        const isDark = !document.body.classList.contains('light-theme');
        const isTerminal = document.body.classList.contains('terminal-mode');
        
        if (isTerminal) {
            return '#90f090';
        } else if (isDark) {
            return '#64ffda';
        } else {
            return '#0077b6';
        }
    }
    
    function getHighlightColor() {
        const isDark = !document.body.classList.contains('light-theme');
        const isTerminal = document.body.classList.contains('terminal-mode');
        
        if (isTerminal) {
            return '#9eff9e';
        } else if (isDark) {
            return '#a8ffea';
        } else {
            return '#40a0ff';
        }
    }
}

// Update effects when theme changes
document.getElementById('themeToggle').addEventListener('click', function() {
    // Reinitialize name effect when theme changes
    initializeNameEffect();
});

document.getElementById('terminalModeToggle').addEventListener('click', function() {
    // Reinitialize name effect when terminal mode changes
    initializeNameEffect();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize name effect when window is resized
    initializeNameEffect();
});

// Initialize cyber globe
function initializeCyberGlobe() {
    // Create data stream animations dynamically
    const dataStreams = document.querySelector('.data-streams');
    if (!dataStreams) return;
    
    // Remove existing streams
    while (dataStreams.firstChild) {
        dataStreams.removeChild(dataStreams.firstChild);
    }
    
    // Create 10 random data streams
    for (let i = 0; i < 10; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        
        // Random properties
        const width = Math.random() * 2 + 1; // 1-3px
        const height = Math.random() * 60 + 20; // 20-80px
        const top = Math.random() * 80 + 10; // 10-90%
        const left = Math.random() * 80 + 10; // 10-90%
        const delay = Math.random() * 5; // 0-5s
        const duration = Math.random() * 3 + 2; // 2-5s
        
        // Apply styles
        stream.style.width = `${width}px`;
        stream.style.height = `${height}px`;
        stream.style.top = `${top}%`;
        stream.style.left = `${left}%`;
        stream.style.animationDelay = `${delay}s`;
        stream.style.animationDuration = `${duration}s`;
        
        dataStreams.appendChild(stream);
    }
    
    // Animate stats
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(value => {
        const targetValue = value.textContent;
        value.textContent = '0';
        
        if (targetValue.includes('%')) {
            // Percentage animation
            animateValue(value, 0, parseInt(targetValue), 2000);
        } else if (targetValue.includes('/')) {
            // Fraction animation (24/7)
            setTimeout(() => {
                value.textContent = targetValue;
            }, 1000);
        } else {
            // Number animation
            animateValue(value, parseInt(value.textContent), parseInt(targetValue), 2000);
        }
    });
}

// Function to animate a value from start to end
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (obj.textContent.includes('%')) {
            obj.textContent = `${value}%`;
        } else {
            obj.textContent = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Cyber Dashboard Initialization and Animation
function initializeCyberDashboard() {
    // Initialize the security score meter ring
    const metricRing = document.querySelector('.metric-ring');
    if (metricRing) {
        const value = parseInt(metricRing.getAttribute('data-value'));
        const meterFill = metricRing.querySelector('.meter-fill');
        const circumference = 2 * Math.PI * 40; // 40 is the radius
        
        // Set the stroke-dasharray to the circumference
        meterFill.style.strokeDasharray = circumference;
        
        // Calculate the stroke-dashoffset based on the percentage
        const offset = circumference - (value / 100) * circumference;
        
        // Animate the fill
        setTimeout(() => {
            meterFill.style.strokeDashoffset = offset;
        }, 500);
    }
    
    // Create and animate network nodes
    createNetworkVisualization();
    
    // Initialize dashboard views
    initializeDashboardViews();
    
    // Add interactivity to dashboard controls
    const controlButtons = document.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            controlButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get the icon of the selected button to determine view
            const iconClass = button.querySelector('i').className;
            if (iconClass.includes('chart-line')) {
                switchDashboardView('metrics');
            } else if (iconClass.includes('globe')) {
                switchDashboardView('global');
            } else if (iconClass.includes('lock')) {
                switchDashboardView('security');
            }
        });
    });
    
    // Add refresh button functionality
    const refreshButton = document.querySelector('.refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            const icon = refreshButton.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = '';
                updateDashboardData();
            }, 500);
        });
    }
}

// Initialize the dashboard views
function initializeDashboardViews() {
    const dashboard = document.querySelector('.cyber-dashboard');
    if (!dashboard) return;
    
    // Create view containers if they don't exist
    let metricsView = dashboard.querySelector('.dashboard-view.metrics-view');
    let globalView = dashboard.querySelector('.dashboard-view.global-view');
    let securityView = dashboard.querySelector('.dashboard-view.security-view');
    
    // Get existing dashboard content to use as metrics view
    const dashboardContent = dashboard.querySelector('.dashboard-content');
    
    if (!metricsView && dashboardContent) {
        // Use existing content as metrics view
        metricsView = document.createElement('div');
        metricsView.className = 'dashboard-view metrics-view active';
        dashboardContent.parentNode.insertBefore(metricsView, dashboardContent);
        metricsView.appendChild(dashboardContent);
    }
    
    if (!globalView) {
        // Create global view
        globalView = document.createElement('div');
        globalView.className = 'dashboard-view global-view';
        globalView.innerHTML = `
            <div class="global-map">
                <div class="map-container">
                    <div class="world-map"></div>
                    <div class="map-points"></div>
                </div>
                <div class="global-stats">
                    <div class="stat-group">
                        <div class="global-stat">
                            <div class="stat-title">Active Threats</div>
                            <div class="stat-number">24</div>
                            <div class="stat-trend positive">-6%</div>
                        </div>
                        <div class="global-stat">
                            <div class="stat-title">Protected Regions</div>
                            <div class="stat-number">18</div>
                            <div class="stat-trend positive">+2</div>
                        </div>
                    </div>
                    <div class="region-list">
                        <div class="region-item">
                            <div class="region-name">North America</div>
                            <div class="region-bar">
                                <div class="region-fill" style="width: 95%"></div>
                            </div>
                            <div class="region-value">95%</div>
                        </div>
                        <div class="region-item">
                            <div class="region-name">Europe</div>
                            <div class="region-bar">
                                <div class="region-fill" style="width: 92%"></div>
                            </div>
                            <div class="region-value">92%</div>
                        </div>
                        <div class="region-item">
                            <div class="region-name">Asia</div>
                            <div class="region-bar">
                                <div class="region-fill" style="width: 87%"></div>
                            </div>
                            <div class="region-value">87%</div>
                        </div>
                        <div class="region-item">
                            <div class="region-name">South America</div>
                            <div class="region-bar">
                                <div class="region-fill" style="width: 80%"></div>
                            </div>
                            <div class="region-value">80%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dashboard.insertBefore(globalView, dashboard.querySelector('.network-visual'));
        
        // Create map points
        createMapPoints(globalView.querySelector('.map-points'));
    }
    
    if (!securityView) {
        // Create security view
        securityView = document.createElement('div');
        securityView.className = 'dashboard-view security-view';
        securityView.innerHTML = `
            <div class="security-layers">
                <div class="layer-controls">
                    <div class="layer-button active" data-layer="network">Network</div>
                    <div class="layer-button" data-layer="application">Application</div>
                    <div class="layer-button" data-layer="data">Data</div>
                </div>
                <div class="layer-visual">
                    <div class="layer-container network-layer active">
                        <div class="hexagon-grid"></div>
                        <div class="shield-wrapper">
                            <div class="security-shield">
                                <div class="shield-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="layer-info">
                        <div class="layer-title">Network Security</div>
                        <div class="layer-description">Firewall, IDS/IPS, VPN, network segmentation, and traffic monitoring systems are active and fully operational.</div>
                        <div class="layer-status">
                            <div class="status-item">
                                <div class="status-label">Firewall Status:</div>
                                <div class="status-value">Active</div>
                            </div>
                            <div class="status-item">
                                <div class="status-label">Last Updated:</div>
                                <div class="status-value">5 minutes ago</div>
                            </div>
                            <div class="status-item">
                                <div class="status-label">Protected Ports:</div>
                                <div class="status-value">124/124</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dashboard.insertBefore(securityView, dashboard.querySelector('.network-visual'));
        
        // Add layer button functionality
        const layerButtons = securityView.querySelectorAll('.layer-button');
        layerButtons.forEach(button => {
            button.addEventListener('click', () => {
                layerButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const layer = button.getAttribute('data-layer');
                updateSecurityLayer(securityView, layer);
            });
        });
        
        // Create hexagon grid for security view
        createHexagonGrid(securityView.querySelector('.hexagon-grid'));
    }
    
    // Initially show metrics view
    switchDashboardView('metrics');
}

// Switch between dashboard views
function switchDashboardView(viewName) {
    const views = document.querySelectorAll('.dashboard-view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    const activeView = document.querySelector(`.dashboard-view.${viewName}-view`);
    if (activeView) {
        activeView.classList.add('active');
        
        // Special animations for different views
        if (viewName === 'global') {
            animateGlobalView();
        } else if (viewName === 'security') {
            animateSecurityView();
        }
    }
}

// Create and animate points on the global map
function createMapPoints(container) {
    if (!container) return;
    
    // Clear existing points
    container.innerHTML = '';
    
    // Define major tech centers
    const locations = [
        { x: 25, y: 35, size: 4, pulse: true },  // North America West
        { x: 32, y: 32, size: 3, pulse: false }, // North America Central
        { x: 38, y: 33, size: 4, pulse: true },  // North America East
        { x: 48, y: 31, size: 4, pulse: true },  // Europe West
        { x: 54, y: 30, size: 3, pulse: false }, // Europe East
        { x: 69, y: 35, size: 4, pulse: true },  // Asia East
        { x: 64, y: 41, size: 3, pulse: false }, // Asia South
        { x: 45, y: 53, size: 3, pulse: true },  // Australia
        { x: 42, y: 48, size: 2, pulse: false }  // South America
    ];
    
    // Create points
    locations.forEach(loc => {
        const point = document.createElement('div');
        point.className = 'map-point';
        if (loc.pulse) point.classList.add('pulse');
        
        point.style.left = `${loc.x}%`;
        point.style.top = `${loc.y}%`;
        point.style.width = `${loc.size}px`;
        point.style.height = `${loc.size}px`;
        
        container.appendChild(point);
        
        // Create random connections
        if (Math.random() > 0.3) {
            const randomTarget = locations[Math.floor(Math.random() * locations.length)];
            if (randomTarget !== loc) {
                const connection = document.createElement('div');
                connection.className = 'map-connection';
                
                // Calculate line length and angle
                const dx = randomTarget.x - loc.x;
                const dy = randomTarget.y - loc.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                
                connection.style.left = `${loc.x}%`;
                connection.style.top = `${loc.y}%`;
                connection.style.width = `${length}%`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                container.appendChild(connection);
            }
        }
    });
}

// Animate the global view elements
function animateGlobalView() {
    // Animate map points with a delayed sequence
    const points = document.querySelectorAll('.map-point');
    points.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'scale(0)';
        
        setTimeout(() => {
            point.style.opacity = '1';
            point.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    // Animate connections with delay
    const connections = document.querySelectorAll('.map-connection');
    connections.forEach((connection, index) => {
        connection.style.opacity = '0';
        connection.style.width = '0';
        
        setTimeout(() => {
            connection.style.opacity = '0.5';
            connection.style.width = connection.getAttribute('data-length') || connection.style.width;
        }, 500 + index * 100);
    });
    
    // Animate region bars
    const regionBars = document.querySelectorAll('.region-fill');
    regionBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 800 + index * 150);
    });
}

// Create hexagon grid for security layer
function createHexagonGrid(container) {
    if (!container) return;
    
    // Clear existing hexagons
    container.innerHTML = '';
    
    // Create hexagons
    const hexCount = 36; // 6x6 grid
    for (let i = 0; i < hexCount; i++) {
        const hex = document.createElement('div');
        hex.className = 'security-hexagon';
        
        // Calculate row and column (in a 6x6 grid)
        const row = Math.floor(i / 6);
        const col = i % 6;
        
        // Position with offset for hex grid pattern
        hex.style.left = `${col * 12 + (row % 2) * 6}%`;
        hex.style.top = `${row * 10}%`;
        
        // Add slight random size variation
        const sizeVar = 0.9 + Math.random() * 0.2;
        hex.style.transform = `scale(${sizeVar})`;
        
        container.appendChild(hex);
    }
}

// Update security layer view
function updateSecurityLayer(view, layerName) {
    if (!view) return;
    
    const layerVisual = view.querySelector('.layer-visual');
    const layerContainer = layerVisual.querySelector('.layer-container.active');
    if (layerContainer) {
        layerContainer.classList.remove('active');
    }
    
    // Update layer info
    const layerTitle = view.querySelector('.layer-title');
    const layerDescription = view.querySelector('.layer-description');
    const statusItems = view.querySelectorAll('.status-item');
    
    // Get or create the new layer container
    let newLayerContainer = layerVisual.querySelector(`.${layerName}-layer`);
    if (!newLayerContainer) {
        newLayerContainer = document.createElement('div');
        newLayerContainer.className = `layer-container ${layerName}-layer`;
        
        // Add appropriate visuals based on layer type
        if (layerName === 'application') {
            newLayerContainer.innerHTML = `
                <div class="app-blocks"></div>
                <div class="shield-wrapper">
                    <div class="security-shield">
                        <div class="shield-icon">
                            <i class="fas fa-code-branch"></i>
                        </div>
                    </div>
                </div>
            `;
            
            // Create application blocks
            setTimeout(() => {
                createAppBlocks(newLayerContainer.querySelector('.app-blocks'));
            }, 10);
            
        } else if (layerName === 'data') {
            newLayerContainer.innerHTML = `
                <div class="data-encryption"></div>
                <div class="shield-wrapper">
                    <div class="security-shield">
                        <div class="shield-icon">
                            <i class="fas fa-database"></i>
                        </div>
                    </div>
                </div>
            `;
            
            // Create data encryption visualization
            setTimeout(() => {
                createDataEncryption(newLayerContainer.querySelector('.data-encryption'));
            }, 10);
        }
        
        layerVisual.appendChild(newLayerContainer);
    }
    
    // Show the selected layer
    newLayerContainer.classList.add('active');
    
    // Update layer information text
    if (layerName === 'network') {
        layerTitle.textContent = 'Network Security';
        layerDescription.textContent = 'Firewall, IDS/IPS, VPN, network segmentation, and traffic monitoring systems are active and fully operational.';
        
        if (statusItems.length >= 3) {
            statusItems[0].querySelector('.status-label').textContent = 'Firewall Status:';
            statusItems[0].querySelector('.status-value').textContent = 'Active';
            
            statusItems[1].querySelector('.status-label').textContent = 'Last Updated:';
            statusItems[1].querySelector('.status-value').textContent = '5 minutes ago';
            
            statusItems[2].querySelector('.status-label').textContent = 'Protected Ports:';
            statusItems[2].querySelector('.status-value').textContent = '124/124';
        }
    } else if (layerName === 'application') {
        layerTitle.textContent = 'Application Security';
        layerDescription.textContent = 'Web application firewalls, input validation, authentication systems, and session management are secured and monitored.';
        
        if (statusItems.length >= 3) {
            statusItems[0].querySelector('.status-label').textContent = 'WAF Status:';
            statusItems[0].querySelector('.status-value').textContent = 'Active';
            
            statusItems[1].querySelector('.status-label').textContent = 'Auth System:';
            statusItems[1].querySelector('.status-value').textContent = 'Multi-Factor';
            
            statusItems[2].querySelector('.status-label').textContent = 'Vulnerabilities:';
            statusItems[2].querySelector('.status-value').textContent = '0 detected';
        }
    } else if (layerName === 'data') {
        layerTitle.textContent = 'Data Security';
        layerDescription.textContent = 'End-to-end encryption, data masking, and secure storage protocols are implemented for all sensitive information.';
        
        if (statusItems.length >= 3) {
            statusItems[0].querySelector('.status-label').textContent = 'Encryption:';
            statusItems[0].querySelector('.status-value').textContent = 'AES-256';
            
            statusItems[1].querySelector('.status-label').textContent = 'Data Integrity:';
            statusItems[1].querySelector('.status-value').textContent = 'Verified';
            
            statusItems[2].querySelector('.status-label').textContent = 'Backup Status:';
            statusItems[2].querySelector('.status-value').textContent = 'Current (1h ago)';
        }
    }
    
    // Animate the new layer
    animateSecurityView();
}

// Create application blocks visualization
function createAppBlocks(container) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create app blocks
    const blockCount = 15;
    const types = ['api', 'web', 'auth', 'db', 'cache'];
    
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.className = 'app-block';
        
        // Random type
        const type = types[Math.floor(Math.random() * types.length)];
        block.classList.add(`app-${type}`);
        
        // Random position with bias toward center
        const centerBias = 0.5;
        const x = 30 + (Math.random() * 40); // 30-70%
        const y = 20 + (Math.random() * 60); // 20-80%
        
        block.style.left = `${x}%`;
        block.style.top = `${y}%`;
        
        // Add icon based on type
        let icon = '';
        switch(type) {
            case 'api': icon = 'fa-plug'; break;
            case 'web': icon = 'fa-globe'; break;
            case 'auth': icon = 'fa-key'; break;
            case 'db': icon = 'fa-database'; break;
            case 'cache': icon = 'fa-memory'; break;
        }
        
        block.innerHTML = `<i class="fas ${icon}"></i>`;
        container.appendChild(block);
        
        // Create connections between blocks
        if (i > 0 && Math.random() > 0.3) {
            const prevBlocks = container.querySelectorAll('.app-block');
            const randomBlock = prevBlocks[Math.floor(Math.random() * (prevBlocks.length - 1))];
            
            const connection = document.createElement('div');
            connection.className = 'app-connection';
            
            // Get positions
            const rect1 = block.getBoundingClientRect();
            const rect2 = randomBlock.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Calculate relative positions
            const x1 = (rect1.left + rect1.width/2 - containerRect.left) / containerRect.width * 100;
            const y1 = (rect1.top + rect1.height/2 - containerRect.top) / containerRect.height * 100;
            const x2 = (rect2.left + rect2.width/2 - containerRect.left) / containerRect.width * 100;
            const y2 = (rect2.top + rect2.height/2 - containerRect.top) / containerRect.height * 100;
            
            // Calculate length and angle
            const dx = x2 - x1;
            const dy = y2 - y1;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            connection.style.left = `${x1}%`;
            connection.style.top = `${y1}%`;
            connection.style.width = `${length}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            
            container.appendChild(connection);
        }
    }
}

// Create data encryption visualization
function createDataEncryption(container) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create data blocks
    const rowCount = 6;
    const colCount = 8;
    
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            const dataBlock = document.createElement('div');
            dataBlock.className = 'data-block';
            
            // Position in grid
            dataBlock.style.left = `${j * 12.5}%`;
            dataBlock.style.top = `${i * 16.6}%`;
            
            // Random animation delay
            const delay = Math.random() * 2;
            dataBlock.style.animationDelay = `${delay}s`;
            
            // Add binary/hex content
            dataBlock.innerHTML = getRandomHexString();
            
            container.appendChild(dataBlock);
        }
    }
    
    // Create encryption flow
    const flow = document.createElement('div');
    flow.className = 'encryption-flow';
    container.appendChild(flow);
}

// Generate random hex string for data blocks
function getRandomHexString() {
    const chars = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Animate the security view
function animateSecurityView() {
    // Animate selected layer's elements
    const activeLayer = document.querySelector('.layer-container.active');
    if (!activeLayer) return;
    
    if (activeLayer.classList.contains('network-layer')) {
        // Animate hexagons
        const hexagons = activeLayer.querySelectorAll('.security-hexagon');
        hexagons.forEach((hex, index) => {
            hex.style.opacity = '0';
            
            setTimeout(() => {
                hex.style.opacity = '1';
            }, index * 10);
        });
    } else if (activeLayer.classList.contains('application-layer')) {
        // Animate app blocks
        const blocks = activeLayer.querySelectorAll('.app-block');
        blocks.forEach((block, index) => {
            block.style.opacity = '0';
            block.style.transform = 'scale(0)';
            
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'scale(1)';
            }, index * 50);
        });
        
        // Animate connections with delay
        const connections = activeLayer.querySelectorAll('.app-connection');
        connections.forEach((connection, index) => {
            connection.style.opacity = '0';
            
            setTimeout(() => {
                connection.style.opacity = '1';
            }, 500 + index * 50);
        });
    } else if (activeLayer.classList.contains('data-layer')) {
        // Animate data blocks
        const blocks = activeLayer.querySelectorAll('.data-block');
        blocks.forEach((block, index) => {
            block.style.opacity = '0';
            
            setTimeout(() => {
                block.style.opacity = '1';
            }, index * 15);
        });
    }
    
    // Animate shield
    const shield = activeLayer.querySelector('.security-shield');
    if (shield) {
        shield.style.transform = 'scale(0)';
        
        setTimeout(() => {
            shield.style.transform = 'scale(1)';
        }, 300);
    }
}

// Update dashboard data randomly
function updateDashboardData() {
    // Update metrics
    const metrics = document.querySelectorAll('.row-value');
    metrics.forEach(metric => {
        // Only update numeric values
        if (metric.textContent.match(/^\d+$/)) {
            const currentValue = parseInt(metric.textContent);
            // Random small change
            const newValue = Math.max(0, currentValue + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
            metric.textContent = newValue;
        }
    });
    
    // Update log entries
    const logEntries = document.querySelector('.log-entries');
    if (logEntries) {
        // Create a new log entry
        const newEntry = document.createElement('div');
        newEntry.className = 'log-entry';
        
        // Random log type
        const logType = Math.random() > 0.2 ? 'secure' : 'warning';
        
        // Random log message
        const messages = {
            secure: [
                'System integrity verified',
                'Firewall rules updated',
                'Authentication successful',
                'Backup completed',
                'Patches installed'
            ],
            warning: [
                'Unusual login attempt',
                'Port scan detected',
                'Resource usage spike',
                'Configuration change',
                'Update pending'
            ]
        };
        
        const randomMessage = messages[logType][Math.floor(Math.random() * messages[logType].length)];
        
        newEntry.innerHTML = `
            <div class="log-time">Now</div>
            <div class="log-icon ${logType}"><i class="fas fa-${logType === 'secure' ? 'check-circle' : 'exclamation-triangle'}"></i></div>
            <div class="log-message">${randomMessage}</div>
        `;
        
        // Insert at the top and remove oldest if more than 4
        logEntries.insertBefore(newEntry, logEntries.firstChild);
        if (logEntries.children.length > 4) {
            logEntries.removeChild(logEntries.lastChild);
        }
        
        // Update other log times
        const times = logEntries.querySelectorAll('.log-time');
        const timeValues = ['Now', '5m', '12m', '25m'];
        times.forEach((time, index) => {
            time.textContent = timeValues[index] || '30m+';
        });
    }
    
    // Refresh network visualization
    createNetworkVisualization(true);
}

// Create and animate the network nodes visualization
function createNetworkVisualization(refresh = false) {
    const container = document.querySelector('.network-nodes');
    if (!container) return;
    
    // Clear existing nodes if refreshing
    if (refresh) {
        container.innerHTML = '';
    }
    
    // Don't recreate if already initialized and not refreshing
    if (container.children.length > 0 && !refresh) return;
    
    // Number of nodes to create
    const nodeCount = 12;
    const connectionCount = 15;
    
    // Create nodes
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        // Random size (slightly varied)
        const size = 3 + Math.random() * 4;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        
        // Random animation
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 3;
        node.style.animation = `pulse-node ${duration}s infinite ${delay}s`;
        
        container.appendChild(node);
        nodes.push({node, x, y});
    }
    
    // Create connections between random nodes
    for (let i = 0; i < connectionCount; i++) {
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        
        // Avoid connecting to self
        if (nodeA === nodeB) continue;
        
        const connection = document.createElement('div');
        connection.className = 'network-connection';
        
        // Calculate position and dimensions
        const x1 = nodeA.x;
        const y1 = nodeA.y;
        const x2 = nodeB.x;
        const y2 = nodeB.y;
        
        // Calculate length and angle
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        
        // Set position and dimensions
        connection.style.width = `${length}%`;
        connection.style.left = `${x1}%`;
        connection.style.top = `${y1}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        container.appendChild(connection);
    }
    
    // Add blinking activity
    setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)].node;
        randomNode.style.opacity = '1';
        randomNode.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            randomNode.style.opacity = '0.5';
            randomNode.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
}

// Add keyframes for node pulsing if not already in CSS
function addNodePulsingKeyframes() {
    if (!document.querySelector('#node-pulse-keyframes')) {
        const style = document.createElement('style');
        style.id = 'node-pulse-keyframes';
        style.innerHTML = `
            @keyframes pulse-node {
                0%, 100% {
                    opacity: 0.5;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Click counter security feature
function initializeClickCounter() {
    let clickCount = 0;
    const clickThreshold = 20;
    let alertShown = false;
    let alertTimeout;
    
    // Create alert element
    const securityAlert = document.createElement('div');
    securityAlert.className = 'security-alert';
    securityAlert.innerHTML = `
        <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="alert-content">
            <div class="alert-title">Suspicious Activity Detected</div>
            <div class="alert-message">Rapid clicking detected: <span class="click-count">0</span> clicks</div>
            <div class="alert-details">Behavioral analysis suggests potential automated activity.</div>
        </div>
        <div class="alert-close"><i class="fas fa-times"></i></div>
    `;
    document.body.appendChild(securityAlert);
    
    // Counter display
    const clickCounter = document.createElement('div');
    clickCounter.className = 'click-counter';
    clickCounter.innerHTML = `<span class="click-number">0</span> clicks`;
    document.body.appendChild(clickCounter);
    
    const counterDisplay = clickCounter.querySelector('.click-number');
    const alertCountDisplay = securityAlert.querySelector('.click-count');
    
    // Close button functionality
    securityAlert.querySelector('.alert-close').addEventListener('click', function() {
        securityAlert.classList.remove('active');
        setTimeout(() => {
            alertShown = false;
        }, 300);
        clearTimeout(alertTimeout);
    });
    
    // Listen for clicks anywhere on the document
    document.addEventListener('click', function(e) {
        // Ignore clicks on the alert itself
        if (e.target.closest('.security-alert') || e.target.closest('.click-counter')) {
            return;
        }
        
        clickCount++;
        counterDisplay.textContent = clickCount;
        
        // Show counter after 5 clicks
        if (clickCount >= 5) {
            clickCounter.classList.add('visible');
        }
        
        // Update counter in the alert
        alertCountDisplay.textContent = clickCount;
        
        // Show correct alert based on count
        if (clickCount >= 20) {
            // Force refresh the alert if already shown but severity changes
            if (alertShown) {
                securityAlert.classList.remove('active', 'warning', 'critical');
                setTimeout(() => {
                    updateAlertSeverity();
                    securityAlert.classList.add('active');
                }, 10);
            } else {
                updateAlertSeverity();
                securityAlert.classList.add('active');
                alertShown = true;
            }
            
            // Reset the timeout
            clearTimeout(alertTimeout);
            alertTimeout = setTimeout(() => {
                securityAlert.classList.remove('active');
                setTimeout(() => {
                    alertShown = false;
                }, 300);
            }, 7000);
        }
    });
    
    function updateAlertSeverity() {
        const alertTitle = securityAlert.querySelector('.alert-title');
        const alertDetails = securityAlert.querySelector('.alert-details');
        
        // Remove all classes first
        securityAlert.classList.remove('warning', 'critical');
        
        if (clickCount >= 50) {
            alertTitle.textContent = 'CRITICAL: Potential Breach Attempt';
            alertDetails.textContent = 'Behavior consistent with automated attack patterns. IP logged.';
            securityAlert.classList.add('critical');
        } else if (clickCount >= 35) {
            alertTitle.textContent = 'WARNING: Suspicious Activity';
            alertDetails.textContent = 'Unusual interaction pattern detected. Security monitoring enabled.';
            securityAlert.classList.add('warning');
        } else {
            alertTitle.textContent = 'Suspicious Activity Detected';
            alertDetails.textContent = 'Behavioral analysis suggests potential automated activity.';
        }
    }
}

// Initialize all functions
function initializePage() {
    // ... existing code ...
    
    initializeClickCounter(); // Initialize the click counter
    
    // ... existing code ...
}