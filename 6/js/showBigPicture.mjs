import {isEscapeKey} from './mocks/utils.mjs';
import {picturesContainer} from './photos-thumbnails.mjs';
import {onLoaderClick, bigPictureOverlay, renderComments} from './render-comments.mjs';
import {renderBigPictureData} from './bigPicture-Data .mjs';
const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');

/**
 * Обработчик клика на картинку в галерее. Открывает большую картинку.
 * @param {Object} evt - объект события клика(ссылка с картинкой).
 */
function openBigPictureClick(evt) {
  const pictureElement = evt.target.closest('.picture');
  if(pictureElement) {
    evt.preventDefault();
    bigPictureOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    const idPhoto = pictureElement.dataset.id;
    renderBigPictureData(pictureElement);
    renderComments(idPhoto);
    const commentContainer = bigPictureOverlay.querySelector('.social__comments');
    bigPictureOverlay.querySelector('.comments-count').textContent = commentContainer.children.length;
    const commentsCount = commentContainer.children.length;
    const commentsDownloadButton = bigPictureOverlay.querySelector('.comments-loader');
    commentsDownloadButton.classList.toggle('hidden', commentsCount <= 5);
    bigPictureOverlay.querySelector('.visible-comments-count').textContent = (commentsCount > 5) ? 5 : commentsCount;
    commentsDownloadButton.addEventListener('click', onLoaderClick);

  }
}

picturesContainer.addEventListener('click', openBigPictureClick);

function onClosePicture() {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureOverlay.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
}

buttonClose.addEventListener('click', onClosePicture);

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    bigPictureOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    buttonClose.removeEventListener('click', onLoaderClick);
    bigPictureOverlay.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
  }
});


