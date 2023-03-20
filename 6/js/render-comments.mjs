import {photos} from './main.js';

const bigPictureOverlay = document.querySelector('.big-picture');
/**
 * Создает комментарии к выбранной фотографии.
 * @param {number} idPhoto - Идентификатор который мы будем исползовать на массиве с фото-постами для вывода комментов
 */
function renderComments(idPhoto) {
  const commentsFragment = document.createDocumentFragment();
  const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
  for(let i = 0; i < photos[idPhoto].comments.length; i++) {

    const commentPost = document.createElement('li');
    commentPost.classList.add('social__comment');
    commentPost.dataset.id = photos[idPhoto].comments[i].id;
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = photos[idPhoto].comments[i].message;
    commentAvatar.src = photos[idPhoto].comments[i].avatar;
    commentAvatar.alt = photos[idPhoto].comments[i].name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';

    commentPost.append(commentAvatar);
    commentPost.append(commentText);
    if(commentsFragment.children.length >= 5) {
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
  const SHOW_COMMENTS = 5;
  const commentsContainer = document.querySelector('.social__comments');
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
