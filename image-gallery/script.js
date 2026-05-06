document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalImages = galleryItems.length;

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            currentIndex = parseInt(item.getAttribute('data-index'));
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling underneath
            
            // Re-trigger animation by removing and adding class or cloning (simple approach: clone node if we need animation every time)
            // But CSS transition takes care of the entry.
        });
    });

    // Update lightbox image source
    function updateLightboxImage() {
        // Add a tiny fade effect when switching images
        lightboxImg.style.opacity = 0;
        
        setTimeout(() => {
            const selectedImg = galleryItems[currentIndex].querySelector('img');
            lightboxImg.src = selectedImg.src;
            lightboxImg.alt = selectedImg.alt;
            
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = 1;
                lightboxImg.style.transition = 'opacity 0.3s ease';
            };
        }, 150); // Small delay to let opacity transition finish before changing src
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Navigate to previous image
    function showPrev() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    }

    // Navigate to next image
    function showNext() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateLightboxImage();
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent modal close
        showPrev();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent modal close
        showNext();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
