document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide-container');
    let currentSlide = 0;
    
    // Add slide counter to DOM
    const controls = document.createElement('div');
    controls.className = 'presentation-controls';
    controls.innerHTML = `
        <button id="prevBtn" title="Anterior (Flecha Izquierda)"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="slide-counter"><span id="currentSlideNum">1</span> / ${slides.length}</div>
        <button id="nextBtn" title="Siguiente (Flecha Derecha)"><i class="fa-solid fa-chevron-right"></i></button>
    `;
    document.body.appendChild(controls);

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideNum = document.getElementById('currentSlideNum');

    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index < 0) currentSlide = 0;
        else if (index >= slides.length) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Add active class to current
        slides[currentSlide].classList.add('active');
        
        // Update counter
        currentSlideNum.textContent = currentSlide + 1;
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentSlide === slides.length - 1 ? 'default' : 'pointer';
    }

    // Initialize first slide
    showSlide(0);

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault(); // Prevent scrolling on space
            showSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        }
    });

    // Touch events for mobile/tablets
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchEndX < touchStartX - minSwipeDistance) {
            // Swipe left -> Next slide
            showSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + minSwipeDistance) {
            // Swipe right -> Prev slide
            showSlide(currentSlide - 1);
        }
    }
});
