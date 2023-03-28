import {bigPictureOverlay} from './render-comments.mjs';

/**
 * Функция которая наполняет большую картинку данными из картинки на которую кликнули
 * @param {object} pictureData - Объект с данными комментария.
 */
function renderBigPictureData(pictureData) {
  const bigPictureImg = bigPictureOverlay.querySelector('.big-picture__img').querySelector('img');

  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.descriptions;
  bigPictureOverlay.querySelector('.social__caption').textContent = pictureData.descriptions;
  bigPictureOverlay.querySelector('.likes-count').textContent = pictureData.likes;
}

export {renderBigPictureData};
