import {isEscapeKey} from './show-big-picture.mjs';
import {onEditImageFormSubmit} from './validation-form.mjs';
import {resetScale, onBiggerButtonClick, onSmallerButtonClick} from './scale-image.mjs';
import {hideSlider} from './effects.mjs';

const modalFormOverlay = document.querySelector('.img-upload__overlay'); // модалка с hidden
const imageUploadInput = document.querySelector('#upload-file'); //инпут с загрузкой
const cancelButton = modalFormOverlay.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');

/**
 * Функция для открытия модального окна
 */
function openUploadForm() {
  modalFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  resetScale();
  hideSlider();

  cancelButton.addEventListener('click', closeUploadForm);
  buttonControlSmaller.addEventListener('click', onSmallerButtonClick);
  buttonControlBigger.addEventListener('click', onBiggerButtonClick);
  document.addEventListener('keydown', onCancelButtonEscKeydown);
  imgUploadForm.addEventListener('submit', onEditImageFormSubmit);
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
  buttonControlSmaller.removeEventListener('click', onSmallerButtonClick);
  buttonControlBigger.removeEventListener('click', onBiggerButtonClick);
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

/**
 * Функция которая ставит слушатель на загрузку картинки
 */
function handlePhotoUpload() {
  imageUploadInput.addEventListener('change', handlePhotoUploadEvent);
}

export{imageUploadInput, handlePhotoUpload};
