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
  if (commentsFragment.children.length >= VISIBLE_COMMENTS_LIMIT) {
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
 * При клике на кнопку загрузки комментариев функция показывает скрытые комментарии
 */
function onClickLoader() {
  const comments = Array.from(commentsContainer.children);
  const hiddenComments = comments.filter((comment) => comment.classList.contains('hidden'));
  const visibleCommentsCount = document.querySelector('.visible-comments-count');
  const commentsLoader = document.querySelector('.comments-loader');

  if (hiddenComments.length > VISIBLE_COMMENTS_LIMIT) {
    hiddenComments.slice(0, VISIBLE_COMMENTS_LIMIT).forEach((comment) => comment.classList.remove('hidden'));
    visibleCommentsCount.textContent = comments.length - hiddenComments.length + VISIBLE_COMMENTS_LIMIT;
  } else {
    hiddenComments.forEach((comment) => comment.classList.remove('hidden'));
    commentsLoader.classList.add('hidden');
    visibleCommentsCount.textContent = comments.length;
  }
}
export {onClickLoader, bigPictureOverlay, renderComments};
