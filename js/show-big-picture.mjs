import {picturesContainer} from './photos-thumbnails.mjs';
import {onLoaderClick, bigPictureOverlay, renderComments} from './render-comments.mjs';
import {renderBigPictureData} from './big-picture-data .mjs';
const VISIBLE_COMMENTS_LIMIT = 5;
const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Обработчик клика на картинку в галерее. Открывает большую картинку.
 * @param {Object} evt - объект события клика(ссылка с картинкой).
 */
function showBigPictureOnClick(photos) {
  picturesContainer.addEventListener('click', (evt) => {

    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      evt.preventDefault();

      bigPictureOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeydown);
      document.querySelector('body').classList.add('modal-open');

      const idPhoto = +pictureElement.dataset.id;
      const pictureData = photos.find((photo) => photo.id === idPhoto);

      renderBigPictureData(pictureData);
      const pictureComments = pictureData.comments;
      renderComments(pictureComments);

      const commentContainer = bigPictureOverlay.querySelector('.social__comments');
      bigPictureOverlay.querySelector('.comments-count').textContent = commentContainer.children.length;
      const commentsCount = commentContainer.children.length;
      const commentsDownloadButton = bigPictureOverlay.querySelector('.comments-loader');
      commentsDownloadButton.classList.toggle('hidden', commentsCount <= VISIBLE_COMMENTS_LIMIT);
      bigPictureOverlay.querySelector('.visible-comments-count').textContent = (commentsCount > VISIBLE_COMMENTS_LIMIT) ? VISIBLE_COMMENTS_LIMIT : commentsCount;
      commentsDownloadButton.addEventListener('click', onLoaderClick);

    }
  });
}

function onClosePicture() {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureOverlay.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
  buttonClose.removeEventListener('click', onLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', onClosePicture);

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    onClosePicture();
  }
}

export {showBigPictureOnClick, VISIBLE_COMMENTS_LIMIT};
