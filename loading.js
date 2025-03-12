document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    // Create loading content
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="counter">0</div>
            <div class="loading-circle"></div>
            <div class="loading-circle"></div>
            <div class="loading-circle"></div>
        </div>
        <div class="loading-status">LOADING</div>
        <div class="cyber-dots">
            <div class="cyber-dot"></div>
            <div class="cyber-dot"></div>
            <div class="cyber-dot"></div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Counter animation
    const counter = loadingScreen.querySelector('.counter');
    let count = 0;
    
    function updateCounter() {
        counter.textContent = count;
        if (count === 100) {
            // Add slide-up animation class
            loadingScreen.classList.add('slide-up');
            
            // Remove loading screen after animation
            setTimeout(() => {
                document.body.style.overflow = '';
                loadingScreen.remove();
            }, 1000);
            return;
        }
        
        // Increment counter with dynamic speed
        const increment = Math.floor(Math.random() * 3) + 1;
        count = Math.min(100, count + increment);
        
        // Add dynamic delay based on progress
        const delay = count < 90 ? 30 : 100;
        setTimeout(updateCounter, delay);
    }
    
    // Start the counter animation
    setTimeout(updateCounter, 500);
}); 