const itemsContainer = document.querySelector('.container');
const images = document.querySelectorAll('.list-image');
const descriptions = document.querySelectorAll('.description-list');
const raichuImg = document.querySelector('.list-image__raichu')
const firstText = document.querySelector('.first-text')
const angryPikachu = document.querySelector('.list-image__angryPikachu')

let currentIndex = 0;

const addHiddenClass = function (firstClass, secondClass, hiddenClass) {
    document.querySelectorAll(firstClass)
        .forEach(item => item.classList.remove(hiddenClass));
    document.querySelector(secondClass).classList.add(hiddenClass);
}

const showImageAndDescription = function (index) {
    images.forEach(image => image.classList.add('hidden-image'));
    images[index].classList.remove('hidden-image');
    descriptions.forEach(desc => desc.classList.add('hidden-image'));
    descriptions[index].classList.remove('hidden-image');
}

const textAndTitle = {
    pichuTitle: 'Pichu:',
    pichuText: 'Pichu are very small, plump, yellow rodent-like Pokémon. ' +
        'It bears a similar appearance to its evolved form Pikachu, but varies in a number of ways. ' +
        'Pichu evolves into Pikachu by leveling it up with max Friendship.',
    pikachuTitle: 'Pikachu:',
    pikachuText: 'Designed by Atsuko Nishida and Ken Sugimori, ' +
        'Pikachu first appeared in the 1996 Japanese video games ' +
        'Pokémon Red and Green created by Game Freak and Nintendo, ' +
        'which were released outside of Japan in 1998 as Pokémon Red and Blue. ' +
        'Pikachu is a yellow, mouse-like creature with electrical abilities.',
    raichuTitle: 'Raichu:',
    raichuText: 'Raichu is the evolved form of Pikachu, and the final evolutionary form of Pichu. ' +
        'Pikachu can evolve into either form of Raichu by the use of a ' +
        'Thunder Stone, but will only evolve into Alolan Raichu in Sun and Moon',
    angryPikachuTitle: '',
    angryPikachuText: 'Hmm.. seems like Pikachu doesn’t like something',
}

const timers = [];

function typeText(text, element, index) {
    element.textContent = '';
    let i = timers[index]?.i || 0;
    clearTimeout(timers[index]?.timer);
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
    timers[index] = {timer, i};
}

function typeTitle(title, element, index) {
    element.textContent = '';
    let i = timers[index]?.i || 0;
    clearTimeout(timers[index]?.timer);
    const secondTimer = setInterval(() => {
        if (i < title.length) {
            element.textContent += title[i];
            i++;
        } else {
            clearInterval(secondTimer);
        }
    }, 100);
    timers[index] = {secondTimer, i};
}


itemsContainer.addEventListener('click', function (e) {
    const clickedImg = e.target;
    firstText.style.display = 'none';
    if (clickedImg.classList.contains('list-image__angryPikachu')) {
        raichuImg.classList.add('hidden-image')
        raichuImg.style.display = 'block'
        angryPikachu.style.display = 'none'
        const angryText = document.querySelector('.desc-angryPikachu')
        angryText.textContent = ''
        const angryTitle = document.querySelector('.desc-title__angryPikachu')
        angryTitle.textContent = ''
        if (angryText.classList.contains('desc-angryPikachu')) {
            typeTitle(textAndTitle.raichuText, angryText, currentIndex);
        }
        if (angryTitle.classList.contains('desc-title__angryPikachu')) {
            typeTitle(textAndTitle.raichuTitle, angryTitle, currentIndex);
        }
    }
    if (clickedImg.classList.contains('list-image')) {
        raichuImg.classList.remove('hidden-image')
        raichuImg.style.display = 'none'
        angryPikachu.style.display = 'block'
        currentIndex = Array.from(images).indexOf(clickedImg);
        showImageAndDescription(currentIndex);
        addHiddenClass('.pikachu-images', `.list-image__${clickedImg.dataset.img}`, 'hidden-image');
        addHiddenClass('.description-list', `.description-${clickedImg.dataset.img}`, 'hidden-image');
        const textContent = document.querySelector(`.desc-${clickedImg.dataset.img}`);
        textContent.textContent = '';

        const titleContent = document.querySelector(`.desc-title__${clickedImg.dataset.img}`);
        titleContent.textContent = '';

        if (titleContent.classList.contains('desc-title__pichu')) {
            typeTitle(textAndTitle.pichuTitle, titleContent, currentIndex);
        }
        if (titleContent.classList.contains('desc-title__pikachu')) {
            typeTitle(textAndTitle.pikachuTitle, titleContent, currentIndex);
        }
        if (titleContent.classList.contains('desc-title__angryPikachu')) {
            typeTitle(textAndTitle.angryPikachuTitle, titleContent, currentIndex);
        }

        if (textContent.classList.contains('desc-pichu')) {
            typeText(textAndTitle.pichuText, textContent, currentIndex);
        }
        if (textContent.classList.contains('desc-pikachu')) {
            typeText(textAndTitle.pikachuText, textContent, currentIndex);
        }
        if (textContent.classList.contains('desc-angryPikachu')) {
            typeText(textAndTitle.angryPikachuText, textContent, currentIndex);
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
    } else if (e.code === 'Enter') {
        const selectedImage = images[currentIndex];
        selectedImage.click();
        raichuImg.classList.add('hidden-image')
        raichuImg.style.display = 'block'
        angryPikachu.style.display = 'none'
        const angryText = document.querySelector('.desc-angryPikachu')
        angryText.textContent = ''
        const angryTitle = document.querySelector('.desc-title__angryPikachu')
        angryTitle.textContent = ''
        if (angryText.classList.contains('desc-angryPikachu')) {
            typeTitle(textAndTitle.raichuText, angryText, currentIndex);
        }
        if (angryTitle.classList.contains('desc-title__angryPikachu')) {
            typeTitle(textAndTitle.raichuTitle, angryTitle, currentIndex);
        }
    }
});

