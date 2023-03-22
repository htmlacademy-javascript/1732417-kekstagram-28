import {bigPictureOverlay} from './render-comments.mjs';

/**
 * Функция которая наполняет большую картинку данными из картинки на которую кликнули
 * @param {HTMLElement} pictureElement - элемент с картинкой, на который был клик.
 */
function renderBigPictureData(pictureElement) {
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureCommentsCount = pictureElement.querySelector('.picture__likes');
  const bigPictureImg = bigPictureOverlay.querySelector('.big-picture__img').querySelector('img');

  bigPictureImg.src = pictureImg.src;
  bigPictureImg.alt = pictureImg.alt;
  bigPictureOverlay.querySelector('.social__caption').textContent = pictureImg.alt;
  bigPictureOverlay.querySelector('.likes-count').textContent = pictureCommentsCount.textContent;
}

export {renderBigPictureData};
