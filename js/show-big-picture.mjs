import {picturesContainer} from './photos-thumbnails.mjs';
import {onClickLoader, bigPictureOverlay, renderComments} from './render-comments.mjs';
import {renderBigPictureData} from './big-picture-data .mjs';
const VISIBLE_COMMENTS_LIMIT = 5;
const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Инициализирует события при клике на фото
 * @param {Object} photos - объект c фото-постами для навешивания события клика(ссылка с картинкой).
 */
function addPictureClickHandler(photos) {
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
      commentsDownloadButton.addEventListener('click', onClickLoader);

    }
  });
}

function onClosePicture() {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureOverlay.querySelector('.comments-loader').removeEventListener('click', onClickLoader);
  buttonClose.removeEventListener('click', onClickLoader);
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', onClosePicture);

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    onClosePicture();
  }
}

export {addPictureClickHandler, VISIBLE_COMMENTS_LIMIT, isEscapeKey};
