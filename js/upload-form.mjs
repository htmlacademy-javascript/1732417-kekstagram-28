import {isEscapeKey} from './show-big-picture.mjs';
import {onEditImageFormSubmit, onHashtagInputChange } from './validation-form.mjs';
import {resetScale, onBiggerButtonClick, onSmallerButtonClick} from './scale-image.mjs';
import {hideSlider, resetEffectsSettings} from './effects.mjs';

const modalFormOverlay = document.querySelector('.img-upload__overlay'); // модалка с hidden
const imageUploadInput = document.querySelector('#upload-file'); //инпут с загрузкой
const cancelButton = modalFormOverlay.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const radioDefaultChecked = document.querySelector('#effect-none');
const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');

/**
 * Функция для открытия модального окна
 */
function openUploadForm() {
  modalFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  radioDefaultChecked.checked = true;
  resetScale();
  hideSlider();
  cancelButton.addEventListener('click', onCloseUploadForm);
  buttonControlSmaller.addEventListener('click', onSmallerButtonClick);
  buttonControlBigger.addEventListener('click', onBiggerButtonClick);
  document.addEventListener('keydown', onCancelButtonEscKeydown);
  imgUploadForm.addEventListener('submit', onEditImageFormSubmit);
  hashtagInput.addEventListener('input', onHashtagInputChange);
}

/**
 * Функция для закрытия модального окна
 */
function onCloseUploadForm() {
  imageUploadInput.value = '';
  hashtagInput.value = '';
  commentField.value = '';
  modalFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetEffectsSettings();
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
  onCloseUploadForm();
}

/**
 * Функция выполняет закрытие окна по кнопке ESC с условием
 */
function onCancelButtonEscKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    onCloseUploadForm();
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
function addPhotoUploadListener() {
  imageUploadInput.addEventListener('change', handlePhotoUploadEvent);
}

export{imageUploadInput, addPhotoUploadListener};
