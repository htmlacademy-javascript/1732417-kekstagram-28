import {isEscapeKey} from './show-big-picture.mjs';
import {onEditImageFormSubmit} from './validation-form.mjs';
const modalFormOverlay = document.querySelector('.img-upload__overlay'); // модалка с hidden
const imageUploadInput = document.querySelector('#upload-file'); //инпут с загрузкой
const cancelButton = modalFormOverlay.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

/**
 * Функция для открытия модального окна
 */
function openUploadForm() {
  modalFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  cancelButton.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onCancelButtonEscKeydown);
  imgUploadForm.addEventListener('submit', onEditImageFormSubmit); //Возможно поменять логику
}

/**
 * Функция для закрытия модального окна
 */
function closeUploadForm() {
  imageUploadInput.value = '';
  hashtagInput.value = '';
  commentField.value = '';
  modalFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onCancelButtonEscKeydown);
}

/**
 * Функция выполняет закрытие окна по клику на кнопку закрытия
 */
function onCancelButtonClick(evt) {
  evt.preventDefault();
  closeUploadForm();
}

/**
 * Функция выполняет закрытие окна по кнопке ESC с условием
 */
function onCancelButtonEscKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

/**
 * Функция которая выполняет открытие модалки при событии change
 * @param {evt} evt событие change
 */
function handlePhotoUploadEvent (evt) {
  evt.preventDefault();
  openUploadForm();
}


function handlePhotoUpload() {
  imageUploadInput.addEventListener('change', handlePhotoUploadEvent);

}

export{imageUploadInput, handlePhotoUpload};
