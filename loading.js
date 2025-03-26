// Check if this is the first visit and if the page was refreshed
const hasVisited = localStorage.getItem('hasVisited');
const isRefreshed = sessionStorage.getItem('isRefreshed');

if (!hasVisited && !isRefreshed) {
    // First visit - show loading screen
    document.addEventListener('DOMContentLoaded', () => {
        const loader = document.querySelector('.loader');
        const content = document.querySelector('.content');
        
        // Show loader and hide content initially
        loader.style.display = 'flex';
        content.style.display = 'none';
        
        // After 3 seconds, hide loader and show content
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loader.style.display = 'none';
                content.style.display = 'block';
                content.style.opacity = '1';
                content.style.transition = 'opacity 0.5s ease';
                
                // Mark as visited
                localStorage.setItem('hasVisited', 'true');
                // Mark as refreshed to prevent showing on refresh
                sessionStorage.setItem('isRefreshed', 'true');
            }, 500);
        }, 3000);
    });
} else {
    // Not first visit or refreshed - hide loader immediately
    document.addEventListener('DOMContentLoaded', () => {
        const loader = document.querySelector('.loader');
        const content = document.querySelector('.content');
        
        loader.style.display = 'none';
        content.style.display = 'block';
        content.style.opacity = '1';
    });
}

// Clear the refreshed state when the tab is closed
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('isRefreshed');
});

document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    // Create brand container
    const brandContainer = document.createElement('div');
    brandContainer.className = 'brand-container';
    
    // Create brand logo
    const brandLogo = document.createElement('div');
    brandLogo.className = 'brand-logo';
    brandLogo.innerHTML = `
        <div class="logo-shield">
            <div class="shield-content">JSH</div>
        </div>
    `;
    
    // Create brand tagline
    const brandTagline = document.createElement('div');
    brandTagline.className = 'brand-tagline';
    brandTagline.innerHTML = 'Securing Digital Assets';
    
    // Add elements to brand container
    brandContainer.appendChild(brandLogo);
    brandContainer.appendChild(brandTagline);
    
    // Create security status container
    const securityStatus = document.createElement('div');
    securityStatus.className = 'security-status';
    securityStatus.innerHTML = `
        <div class="status-item">
            <div class="status-icon shield"></div>
            <div class="status-text">Security Protocols Active</div>
        </div>
        <div class="status-item">
            <div class="status-icon lock"></div>
            <div class="status-text">Encryption Enabled</div>
        </div>
        <div class="status-item">
            <div class="status-icon network"></div>
            <div class="status-text">Network Secured</div>
        </div>
    `;
    
    // Create loading progress
    const loadingProgress = document.createElement('div');
    loadingProgress.className = 'loading-progress';
    loadingProgress.innerHTML = `
        <div class="progress-bar"></div>
        <div class="progress-text">Initializing Security Systems</div>
    `;
    
    // Add all elements to loading screen
    loadingScreen.appendChild(brandContainer);
    loadingScreen.appendChild(securityStatus);
    loadingScreen.appendChild(loadingProgress);
    
    // Add loading screen to body
    document.body.appendChild(loadingScreen);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Progress animation
    let progress = 0;
    const progressBar = loadingProgress.querySelector('.progress-bar');
    const progressText = loadingProgress.querySelector('.progress-text');
    
    const progressTexts = [
        'Initializing Security Systems',
        'Loading Security Protocols',
        'Verifying Network Security',
        'Configuring Firewall Rules',
        'Establishing Secure Connection',
        'System Ready'
    ];
    
    function updateProgress() {
        if (progress < 100) {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            
            // Update progress text based on progress
            const textIndex = Math.floor(progress / 20);
            if (textIndex < progressTexts.length) {
                progressText.textContent = progressTexts[textIndex];
            }
            
            setTimeout(updateProgress, 30);
        } else {
            // Loading complete
            setTimeout(() => {
                loadingScreen.classList.add('slide-up');
                setTimeout(() => {
                    document.body.style.overflow = '';
                    loadingScreen.remove();
                }, 1000);
            }, 500);
        }
    }
    
    // Start the progress animation
    setTimeout(updateProgress, 500);
}); 