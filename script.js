document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Image data (20 items, alternating between two images)
    const images = [];
    for (let i = 0; i < 20; i++) {
        images.push({
            id: i,
            url: i % 2 === 0 ? 'img1.png' : 'img2.png',
            alt: `Nature Photo ${i + 1}`
        });
    }

    let currentIndex = 0;

    // Initialize Gallery
    function initGallery() {
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `<img src="${img.url}" alt="${img.alt}" loading="lazy">`;
            item.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(item);
        });
    }

    // Open Lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Update Lightbox Image
    function updateLightboxImage() {
        lightboxImg.src = images[currentIndex].url;
        lightboxImg.alt = images[currentIndex].alt;
    }

    // Navigation
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    initGallery();
});
