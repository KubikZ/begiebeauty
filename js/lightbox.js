document.addEventListener('DOMContentLoaded', () => {
	const zoomablePhotos = document.querySelectorAll('.photo[data-full]');
	if (!zoomablePhotos.length) return;

	const overlay = document.createElement('div');
	overlay.className = 'lightbox-overlay';

	const image = document.createElement('img');
	image.className = 'lightbox-image';
	image.alt = '';

	const closeButton = document.createElement('button');
	closeButton.className = 'lightbox-close';
	closeButton.setAttribute('aria-label', 'Zamknij powiększenie');
	closeButton.innerHTML = '&times;';

	overlay.append(image, closeButton);
	document.body.appendChild(overlay);

	function openLightbox(src) {
		image.src = src;
		overlay.classList.add('is-open');
		document.body.classList.add('lightbox-locked');
	}

	function closeLightbox() {
		overlay.classList.remove('is-open');
		document.body.classList.remove('lightbox-locked');
	}

	zoomablePhotos.forEach((photo) => {
		photo.classList.add('is-zoomable');
		photo.setAttribute('role', 'button');
		photo.setAttribute('tabindex', '0');
		photo.setAttribute('aria-label', 'Powiększ zdjęcie');

		photo.addEventListener('click', () => openLightbox(photo.dataset.full));
		photo.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openLightbox(photo.dataset.full);
			}
		});
	});

	overlay.addEventListener('click', closeLightbox);
	closeButton.addEventListener('click', (event) => {
		event.stopPropagation();
		closeLightbox();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeLightbox();
	});
});
