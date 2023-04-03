const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Удаляем фото посты
 * @param {DOM Elements} photos
 */
function clearPhotoElements(photos) {
  photos.forEach((photo) => {
    photo.remove();
  });
}

/**
 * Создание элемента фотографии на странице.
 * @param {object} photo - Объект фотографии.
 * @returns {HTMLElement} - Элемент фотографии.
 */
function createPhotoElement(photo) {
  const photoComponent = photoTemplate.cloneNode(true);
  photoComponent.dataset.id = photo.id;
  photoComponent.querySelector('.picture__img').src = photo.url;
  photoComponent.querySelector('.picture__img').alt = photo.description;
  photoComponent.querySelector('.picture__comments').textContent = photo.comments.length;
  photoComponent.querySelector('.picture__likes').textContent = photo.likes;

  return photoComponent;
}

/**
 * Отрисовка фотографий на странице.
 * @param {Object} photosData - массив объектов с информацией о фотографиях.
 */
function renderPhotos(photosData) {
  const photos = document.querySelectorAll('.picture');
  const photosFragment = document.createDocumentFragment();

  clearPhotoElements(photos);

  photosData.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    photosFragment.append(photoElement);
  });
  return picturesContainer.append(photosFragment);
}

export {renderPhotos, picturesContainer};
