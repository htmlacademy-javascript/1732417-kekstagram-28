import {VISIBLE_COMMENTS_LIMIT} from './show-big-picture.mjs';
const bigPictureOverlay = document.querySelector('.big-picture');
const commentsFragment = document.createDocumentFragment();
const commentsContainer = bigPictureOverlay.querySelector('.social__comments');
const commentPostTemplate = bigPictureOverlay.querySelector('.social__comment');

/**
 * Отображает один комментарий на странице.
 * @param {Object} commentData - объект, содержащий данные для одного комментария.
 */
const renderComment = (commentData) => {
  const commentPost = commentPostTemplate.cloneNode(true);
  commentPost.dataset.id = commentData.id;
  const commentAvatar = commentPost.querySelector('img');
  const commentText = commentPost.querySelector('p');
  commentText.textContent = commentData.message;
  commentAvatar.src = commentData.avatar;
  commentAvatar.alt = commentData.name;
  commentPost.append(commentAvatar);
  commentPost.append(commentText);
  if(commentsFragment.children.length >= VISIBLE_COMMENTS_LIMIT) {
    commentPost.classList.add('hidden');
  }
  commentsFragment.append(commentPost);
};

/**
 * Создает комментарии к выбранной фотографии.
 * @param {Array} pictureComments данные комментария фотографии на которую кликнули
 */
function renderComments(pictureComments) {

  pictureComments.forEach((commentData) => {
    renderComment(commentData);
  });
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

  if (commentsHiddenLength > VISIBLE_COMMENTS_LIMIT) {
    for (let i = 0; i <= commentsLength - commentsHiddenLength - 1 + VISIBLE_COMMENTS_LIMIT; i++) {
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
