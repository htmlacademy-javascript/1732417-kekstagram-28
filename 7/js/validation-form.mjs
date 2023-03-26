const HASHTAG_VALID_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const imgUploadFormPristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__text'
}, false);

/**
 * Функция для проверки количества хэштегов
 * @param {value} hashtags значение инпута
 */
function checkHashtagLength(hashtags) {
  const hashtagArray = hashtags.trim().split(' ');
  return hashtagArray.length <= MAX_HASHTAG;
}

/**
 * Функция для проверки недопустимых символов хэштегов, должен начинаться с # поле инпут необязательно
 * @param {value} hashtags значение инпута
 */
function checkHashtagRegex(hashtags) {
  if (!hashtags.trim()) { // если input пустой, то возвращаем true
    return true;
  }
  const hashtagArray = hashtags.trim().split(' ');
  const isValid = hashtagArray.every((hashtag) => HASHTAG_VALID_REGEX.test(hashtag) && hashtag.startsWith('#'));
  return isValid;
}

/**
 * Функция для проверки дубликатов хэштегов
 * @param {value} hashtags значение инпута
 */
function checkHashtagDuplicate(hashtags) {
  const hashtagArray = hashtags.trim().toLowerCase().split(' ');
  return new Set(hashtagArray).size === hashtagArray.length;
}

/**
 * Функция для проверки длины комментария
 * @param {value} hashtags значение инпута
 */
function checkLengthComment(text) {
  return text.length <= 140;
}

//Возмонжо стоит добавить проверки в цикле чтобы возвращать разные сообщения?
imgUploadFormPristine.addValidator(hashtagInput, checkHashtagLength, `нельзя указать больше ${MAX_HASHTAG} хэш-тэгов`);
imgUploadFormPristine.addValidator(hashtagInput, checkHashtagRegex, 'неверный хэш-тег, хэш-теги не должны содержать недопустимых символов');
imgUploadFormPristine.addValidator(hashtagInput, checkHashtagDuplicate, 'хэш-тэги не должны повторяться');
imgUploadFormPristine.addValidator(commentField, checkLengthComment, 'Комментарий не должен превышать 140 символов');


function onEditImageFormSubmit(evt) { //Возможно поменять логику
  evt.preventDefault();
  if(imgUploadFormPristine.validate()) {
    imgUploadForm.submit();
  }
}

export {onEditImageFormSubmit};
