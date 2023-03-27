const EFFECTS_LIST = {
  chrome: {name: 'grayscale', value: ''},
  sepia: {name: 'sepia', value: ''},
  marvin: {name: 'invert', value: '%'},
  phobos: {name: 'blur', value: 'px'},
  heat: {name: 'brightness', value: ''},
  none: {name: '', value: ''}
};

const effectInputs = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

/**
 * Функция для обработки событий при выборе эффектов и применения эффектов на фотографии
 */
function applyEffects() {
  /**
   * Функция для применения эффекта на фотографию
   * @param {string} effect название эффекта
   */
  function applyEffect(effect) {
    const effectData = EFFECTS_LIST[effect];
    const effectName = effectData.name;
    const effectValue = effectData.value;

    previewImage.className = '';

    if (effectName) {
      previewImage.classList.add(`effects__preview--${effect}`);
      if (effect === 'marvin') {
        previewImage.style.filter = `${effectName}(${sliderValue.value}${effectValue})`;
      } else {
        previewImage.style.filter = `${effectName}(${(sliderValue.value / 10).toFixed(1)}${effectValue})`;
      }
    } else {
      previewImage.style.filter = null;
    }
  }

  /**
   * применяем эффект "Оригинал" по умолчанию
   */
  applyEffect('none');

  /**
   * Обработчик при клике на эффект
   */
  function handleEffectChange() {
    const effect = this.value;

    if (effect === 'none') {
      hideSlider();
      applyEffect('none');
      slider.noUiSlider.set(100);
    } else {
      showSlider();
      applyEffect('none'); // убираем предыдущий эффект
      applyEffect(effect); // применяем новый эффект
      slider.noUiSlider.set(100); // сбрасываем слайдер
    }
  }

  effectInputs.forEach((effectInput) => {
    effectInput.addEventListener('change', handleEffectChange);
  });

  /**
   * обработчик при изменении значения слайдера для изменения интенсивности эффекта
   * @param {Array} массив значений, соответствующих положению бегунка на слайдере
   * @param {number} индекс бегунка, соответствующего изменению значения
   */
  slider.noUiSlider.on('update', (values, handle) => {
    const effect = document.querySelector('.effects__radio:checked').value;

    if (effect === 'marvin') {
      sliderValue.value = Math.round((values[handle] / 1));
    } else if (effect === 'phobos') {
      sliderValue.value = parseFloat((values[handle] / 5).toFixed(1));
    } else {
      sliderValue.value = parseFloat((values[handle] / 10).toFixed(1));
    }
    applyEffect(effect);
  });
}

export {applyEffects, hideSlider}; // вызов функции для применения эффектов
