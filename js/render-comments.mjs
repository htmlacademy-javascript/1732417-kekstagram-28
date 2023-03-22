import {SHOW_COMMENTS} from './show-big-picture.mjs';
const bigPictureOverlay = document.querySelector('.big-picture');
const commentsFragment = document.createDocumentFragment();
const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
const commentPostTemplate = bigPictureOverlay.querySelector('.social__comment');

/**
 * Создает комментарии к выбранной фотографии.
 * @param {Array} photos массив с фото-постами
 * @param {number} idPhoto - Идентификатор который мы будем исползовать на массиве с фото-постами для вывода комментов
 */
function renderComments(photos, idPhoto) {
  const photoElement = photos.find((photo) => photo.id === +idPhoto);
  for (const i in photoElement.comments) {
    const commentPost = commentPostTemplate.cloneNode(true);
    commentPost.dataset.id = photoElement.comments[i].id;
    const commentAvatar = commentPost.querySelector('img');
    const commentText = commentPost.querySelector('p');
    commentText.textContent = photoElement.comments[i].message;
    commentAvatar.src = photoElement.comments[i].avatar;
    commentAvatar.alt = photoElement.comments[i].name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';
    commentPost.append(commentAvatar);
    commentPost.append(commentText);
    if(commentsFragment.children.length >= SHOW_COMMENTS) {
      commentPost.classList.add('hidden');
    }
    commentsFragment.append(commentPost);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
}
/**
 * Обработчик клика на кнопке загрузки комментариев.
 */
function onLoaderClick () {
  const commentsLength = commentsContainer.children.length;
  const commentsLoader = document.querySelector('.comments-loader');
  const visibleCommentsCount = document.querySelector('.visible-comments-count');
  let commentsHiddenLength = commentsContainer.querySelectorAll('.hidden').length;

  if (commentsHiddenLength > SHOW_COMMENTS) {
    for (let i = 0; i <= commentsLength - commentsHiddenLength - 1 + SHOW_COMMENTS; i++) {
      commentsContainer.children[i].classList.remove('hidden');
    }
    commentsHiddenLength = commentsContainer.querySelectorAll('.hidden').length;
    visibleCommentsCount.textContent = commentsLength - commentsHiddenLength;
  } else {
    for (let i = 0; i <= commentsLength - 1; i++) {
      commentsContainer.children[i].classList.remove('hidden');
    }
    commentsLoader.classList.add('hidden');
    commentsHiddenLength = commentsContainer.querySelectorAll('.hidden').length;
    visibleCommentsCount.textContent = commentsLength - commentsHiddenLength;
  }
}
export {onLoaderClick, bigPictureOverlay, renderComments};
