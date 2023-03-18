const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;


function createPhotoElement(photo) {
  const photoComponent = photoTemplate.cloneNode(true);

  photoComponent.querySelector('.picture__img').src = photo.url;
  photoComponent.querySelector('.picture__img').alt = photo.description;
  photoComponent.querySelector('.picture__comments').textContent = photo.comments.length;
  photoComponent.querySelector('.picture__likes').textContent = photo.likes;

  return photoComponent;
}

function renderPhotos(photos) {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    photosFragment.append(photoElement);
  });
  return picturesContainer.append(photosFragment);
}
export {renderPhotos};
