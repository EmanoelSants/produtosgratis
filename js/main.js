// Toggle Menu
function toggleMenu() {
    var menuList = document.getElementById('menu-list');
    menuList.classList.toggle('active');
}

// Smooth Scrolling for Menu Links
document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }

            // Fechar o menu após o clique em dispositivos móveis
            document.getElementById('hamburger-input').checked = false;
            document.getElementById('menu-list').classList.remove('active');
        }
    });
});

// Funcionalidade dos Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const indicators = card.querySelectorAll('.indicator');
        const images = card.querySelectorAll('.card-image');
        const prevButton = card.querySelector('.carousel-button.prev');
        const nextButton = card.querySelector('.carousel-button.next');
        
        let currentIndex = 0;

        function showImage(index) {
            const carouselImages = card.querySelector('.carousel-images');
            const offset = -index * 100;
            carouselImages.style.transform = `translateX(${offset}%)`;
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        function currentImage(index) {
            currentIndex = index;
            showImage(currentIndex);
        }

        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);
        indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => currentImage(i));
        });

        showImage(currentIndex);
    });
});

// Produtos Configurações

document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        thumbnails.forEach(thumb => thumb.classList.remove('active-thumbnail'));
        thumbnails[currentIndex].classList.add('active-thumbnail');
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = thumbnails[currentIndex].src;
            mainImage.style.opacity = '1';
        }, 200); // Tempo correspondente à transição CSS
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();
});

//Botão de envio

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = "/forms/frete.html";
        } else {
            alert('Erro no envio do formulário.');
        }
    }).catch(error => {
        alert('Erro no envio do formulário.');
    });
});







