import {isEscapeKey} from './show-big-picture.mjs';
import {onCloseUploadForm} from './upload-form.mjs';
import {onCancelButtonEscKeydown} from './upload-form.mjs';

const SubmitButtonText = {
  DEFALUT: 'Опубликовать',
  SAVE: 'Сохранить',
  SAVING: 'Сохраняю...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButtonClose = errorPopup.querySelector('.error__button');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButtonClose = successPopup.querySelector('.success__button');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const body = document.querySelector('body');


/**
 * Обработчик клика на поле вокруг поп-апа success на закрытие
 * @param {HTMLElement} evt событие клика
 */
function onAreaSuccessButtonClick(evt) {
  if (!(evt.target.closest('.success__inner'))) {
    onCloseSuccessModal();
  }
}

/**
 * Обработчик клика на поле вокруг поп-апа error на закрытие
 * @param {HTMLElement} evt событие клика
 */
function onAreaErrorButtonClick(evt) {
  if (!(evt.target.closest('.error__inner'))) {
    onCloseErrorModal();
  }
}

/**
 * Обработчик клика на ESC для закрытия поп-апа success
 */
function onEscapeSuccessButtonKeydown(evt) {
  if (isEscapeKey(evt)) {
    onCloseSuccessModal();
  }
}

/**
 * Обработчик клика на ESC для закрытия поп-апа error
 */
function onEscapeErrorButtonKeydown(evt) {
  if (isEscapeKey(evt)) {
    onCloseErrorModal();
  }
}

/**
 * Открывает окно неуспешной загрузки
 */
function showErrorPopup() {
  document.removeEventListener('keydown', onCancelButtonEscKeydown);
  body.classList.add('modal-open');
  body.append(errorPopup);
  document.addEventListener('keydown', onEscapeErrorButtonKeydown);
  document.addEventListener('click', onAreaErrorButtonClick);
  errorButtonClose.addEventListener('click', onCloseErrorModal);
}

/**
 * Открывает окно успешной загрузки
 */
function showSuccessPopup() {
  body.classList.add('modal-open');
  body.append(successPopup);
  document.addEventListener('keydown', onEscapeSuccessButtonKeydown);
  document.addEventListener('click', onAreaSuccessButtonClick);
  successButtonClose.addEventListener('click', onCloseSuccessModal);
}

/**
 * Закрывает success модальное окно и удаляет обработчики событий
 */
function onCloseSuccessModal() {
  body.classList.remove('modal-open');
  body.removeChild(successPopup);
  document.removeEventListener('keydown', onEscapeSuccessButtonKeydown);
  document.removeEventListener('click', onAreaSuccessButtonClick);
  successButtonClose.removeEventListener('click', onCloseSuccessModal);
  submitButton.textContent = SubmitButtonText.DEFALUT;
}

/**
 * Закрывает error модальное окно и удаляет обработчики событий
 */
function onCloseErrorModal() {
  document.addEventListener('keydown', onCancelButtonEscKeydown);
  body.removeChild(errorPopup);
  document.removeEventListener('keydown', onEscapeErrorButtonKeydown);
  document.removeEventListener('click', onAreaErrorButtonClick);
  errorButtonClose.removeEventListener('click', onCloseErrorModal);
  submitButton.textContent = SubmitButtonText.DEFALUT;
}

/**
 * Функция которая закрывает форму и открывает модалку success при успешной отправки на сервер
 */
function handleSuccessSubmit() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SAVING;
  onCloseUploadForm();
  showSuccessPopup();
}

/**
 * Функция которая открывает модалку c ошибкой при неуспешной отправки на сервер
 */
function handleErrorSubmit() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SAVE;
  showErrorPopup();
}

export {handleSuccessSubmit, handleErrorSubmit};
