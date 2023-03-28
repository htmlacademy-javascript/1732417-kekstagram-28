const MAX_VALUE = 100;
const MIN_VALUE = 25;
const STEP_VALUE = 25;
const DEFAULT_VALUE = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

/**
 * Функция для изменения масштаба картинки
 * @param {*} value значение процента масштаба
 */
function scaleImage(value) {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}`;
}

/**
 * Функция для уменьшения масштаба картинки при клике
 */
function onSmallerButtonClick() {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(currentValue - STEP_VALUE, MIN_VALUE);
  scaleImage(newValue);
}

/**
 * Функция для увеличения масштаба картинки при клике
 */
function onBiggerButtonClick() {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(currentValue + STEP_VALUE, MAX_VALUE);
  scaleImage(newValue);
}

/**
 * Функция для сбрасывания масштаба на значение по умолчанию
 */
function resetScale() {
  return scaleImage(DEFAULT_VALUE);
}

export {resetScale, onBiggerButtonClick, onSmallerButtonClick};
