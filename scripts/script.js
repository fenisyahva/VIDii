const itemsContainer = document.querySelector('.container');
const images = document.querySelectorAll('.list-image');
const descriptions = document.querySelectorAll('.description-list');
let currentIndex = 0;

const addHiddenClass = function(firstClass, secondClass, hiddenClass) {
    document.querySelectorAll(firstClass)
        .forEach(item => item.classList.remove(hiddenClass));
    document.querySelector(secondClass).classList.add(hiddenClass);
}

const showImageAndDescription = function(index) {
    images.forEach(image => image.classList.add('hidden-image'));
    images[index].classList.remove('hidden-image');
    descriptions.forEach(desc => desc.classList.add('hidden-image'));
    descriptions[index].classList.remove('hidden-image');
}

itemsContainer.addEventListener('click', function (e) {
    const clickedImg = e.target;
    if (clickedImg.classList.contains('list-image')) {
        currentIndex = Array.from(images).indexOf(clickedImg);
        showImageAndDescription(currentIndex);
        addHiddenClass('.pikachu-images', `.list-image__${clickedImg.dataset.img}`, 'hidden-image')
        addHiddenClass('.description-list', `.descrption-${clickedImg.dataset.img}`, 'hidden-image')
        const textContent = document.querySelector(`.desc-${clickedImg.dataset.img}`);
        textContent.textContent = '';

        const titleContent = document.querySelector(`.desc-title__${clickedImg.dataset.img}`);
        titleContent.textContent = '';

        if (titleContent.classList.contains('desc-title__pichu')) {
            typeTitle('Pichu:', titleContent);
        }
        if (titleContent.classList.contains('desc-title__pikachu')) {
            typeTitle('Pikachu:', titleContent);
        }
        if (titleContent.classList.contains('desc-title__raichu')) {
            typeTitle('Raichu:', titleContent);
        }

        function typeTitle(title, element) {
            let i = 0;
            function typeWriter() {
                if (i < title.length) {
                    element.textContent += title[i];
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            typeWriter();
        }

        if (textContent.classList.contains('desc-pichu')) {
            typeText('Pichu is a small, electric-type Pokémon.', textContent);
        }
        if (textContent.classList.contains('desc-pikachu')) {
            typeText('Pikachu is a popular, electric-type Pokémon that evolves from Pichu. blablabalbalbala blabalbalalb blabalbaa', textContent);
        }
        if (textContent.classList.contains('desc-raichu')) {
            typeText('Raichu is the evolved form of Pikachu and is known for its powerful electric attacks.', textContent);
        }

        function typeText(text, element) {
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            typeWriter();
        }

    }
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft') {
        currentIndex = (currentIndex + 1) % images.length;
        showImageAndDescription(currentIndex);
        const selectedImage = images[currentIndex];
        selectedImage.click();
    } else if (e.code === 'ArrowRight') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImageAndDescription(currentIndex);
        const selectedImage = images[currentIndex];
        selectedImage.click();
    }
});

