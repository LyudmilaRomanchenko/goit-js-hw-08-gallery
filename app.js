const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallerryContainer = document.querySelector('.js-gallery');
//console.log(gallerryContainer);

gallerryContainer.insertAdjacentHTML('afterbegin', createGalleryCardMarkup(galleryItems));

gallerryContainer.addEventListener('click', onGalleryLightboxClick);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }).join('');
};


function onGalleryLightboxClick(event) {
  const isLinkElement = event.target.classList.contains('gallery__image');
  if (!isLinkElement) {
    return;
  }

  //запретить браузеру переходить по ссылке картинки
  event.preventDefault();

  //получение url большого изображения
  let imageElement = event.target;
  //console.log(imageElement);
  const originalImage = imageElement.getAttribute('data-source');
  
  //Подмена значения атрибута src элемента img.lightbox__image.
  const imageInModalWindow = document.querySelector('.lightbox__image');
  imageInModalWindow.setAttribute('src', `${originalImage}`);

  //открытие модального окна
  onModalOpen();

  // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
  onArrowRight();
  onArrowLeft();

  // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
  // вправо
  function onArrowRight() {
    window.addEventListener('keydown', onArrowRightKeyPress);

    function onArrowRightKeyPress(event) {
      const ARROWRIGHT_KEY_CODE = 'ArrowRight';
      //console.log(event.code);
      const isArrowRightKey = event.code === ARROWRIGHT_KEY_CODE;
      //console.log(imageInModalWindow);
      if (isArrowRightKey) {
        //console.log(imageElement);
        const imageElementNextSibling = imageElement.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild;
        //console.log(imageElementNextSibling);
        const originalImageElementNextSibling = imageElementNextSibling.getAttribute('data-source');
        //console.log(originalImageElementNextSibling);
        imageInModalWindow.setAttribute('src', `${originalImageElementNextSibling}`);
        //console.log(imageInModalWindow);
        imageElement = imageElementNextSibling;
      };
    };
  };

  //влево
  function onArrowLeft() {
    window.addEventListener('keydown', onArrowLeftKeyPress);

    function onArrowLeftKeyPress(event) {
      const ARROWLEFT_KEY_CODE = 'ArrowLeft';
      //console.log(event.code);
      const isArrowLeftKey = event.code === ARROWLEFT_KEY_CODE;
      //console.log(imageInModalWindow);
      if (isArrowLeftKey) {
        //console.log(imageElement);
        const imageElementPreviousSibling = imageElement.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild;
        //console.log(imageElementPreviousSibling);
        const originalImageElementPreviousSibling = imageElementPreviousSibling.getAttribute('data-source');
        //console.log(originalImageElementPreviousSibling);
        imageInModalWindow.setAttribute('src', `${originalImageElementPreviousSibling}`);
        //console.log(imageInModalWindow);
        imageElement = imageElementPreviousSibling;
      };
    };
  };
};

// Открытие модального окна
function onModalOpen() {
  const modalContainer = document.querySelector('.js-lightbox');
  modalContainer.classList.add('is-open');
  //console.log(modalContainer);
};

// Закрытие модального окна
onModalCloveButton();
onModalCloveOverlay();
onModalCloveEsc();

// Закрытие модального окна - реализация
function onCloseModal(event) {
  const modalContainerOpen = document.querySelector('.lightbox.is-open');
  modalContainerOpen.classList.remove('is-open');

  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  const imageInModalWindow = document.querySelector('.lightbox__image');
  imageInModalWindow.setAttribute('src', '');
};
  
// * Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
function onModalCloveButton() {
  const buttonModalClose = document.querySelector('button[data-action="close-lightbox"]');
  console.log(buttonModalClose);
  buttonModalClose.addEventListener('click', onCloseModal);
};

// * Закрытие модального окна по клику на div.lightbox__overlay.
function onModalCloveOverlay() {
  const overlayElement = document.querySelector('.lightbox__overlay');
  //console.log(overlayElement);
  overlayElement.addEventListener('click', onCloseModal);
};

// * Закрытие модального окна по нажатию клавиши ESC
function onModalCloveEsc() {
  window.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    //console.log(event.code);
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
      onCloseModal();
    }
  }
};

