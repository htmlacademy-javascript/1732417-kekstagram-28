const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;

/**
 * Создание элемента фотографии на странице.
 * @param {object} photo - Объект фотографии.
 * @returns {HTMLElement} - Элемент фотографии.
 */
function createPhotoElement(photo) {
  const photoComponent = photoTemplate.cloneNode(true);

  photoComponent.querySelector('a').dataset.id = photo.id;
  photoComponent.querySelector('.picture__img').src = photo.url;
  photoComponent.querySelector('.picture__img').alt = photo.descriptions;
  photoComponent.querySelector('.picture__comments').textContent = photo.comments.length;
  photoComponent.querySelector('.picture__likes').textContent = photo.likes;

  return photoComponent;
}

/**
 * Отрисовка фотографий на странице.
 * @param {Object} photos - массив объектов с информацией о фотографиях.
 */
function renderPhotos(photos) {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    photosFragment.append(photoElement);
  });
  return picturesContainer.append(photosFragment);
}
export {renderPhotos, picturesContainer};
