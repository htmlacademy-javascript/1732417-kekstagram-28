const MAX_VALUE = 100;
const effectList = {
  chrome: {name: 'grayscale', measurements: ''},
  sepia: {name: 'sepia', measurements: ''},
  marvin: {name: 'invert', measurements: '%'},
  phobos: {name: 'blur', measurements: 'px'},
  heat: {name: 'brightness', measurements: ''},
  none: {name: '', measurements: ''}
};

const effectInputs = document.querySelectorAll('.effects__radio');
let effectNameRadio = effectInputs[0].value; //записываем название эффекта, чтобы не "дёргать" дом при изменении значений слайдера
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

function hideSlider() {
  sliderContainer.classList.add('hidden');
}

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

/**
 * Функция для обновления параметров слайдера min max для эффекта 'heat'
 */
function updateSliderForHeatEffect() {
  slider.noUiSlider.updateOptions({
    range: {
      min: 33,
      max: 100
    }
  });
}

/**
 * Функция сбрасывания параметров слайдера min max на значения по умолчанию
 */
function updateSliderDefault() {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    }
  });
}

/**
 * Функция для обработки событий при выборе эффектов и применения эффектов на фотографии
 */
function initializeEffects() {
  /**
   * Функция для применения эффекта на фотографию
   * @param {string} effect название эффекта
   */
  function applyEffect(effect) {
    const effectData = effectList[effect];
    const effectName = effectData.name;
    const effectValue = effectData.measurements;

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

    if (effect === 'heat') {
      updateSliderForHeatEffect();
    } else {
      updateSliderDefault();
    }

    applyEffect('none');
    applyEffect(effect);
    slider.noUiSlider.set(MAX_VALUE);

    if (effect === 'none') {
      hideSlider();
    } else {
      showSlider();
    }
  }

  effectInputs.forEach((effectInput) => {
    effectInput.addEventListener('change', handleEffectChange);
  });

  /**
   * обработчик при изменении значения слайдера для изменения интенсивности эффекта
   */
  slider.noUiSlider.on('update', () => {
    effectNameRadio = Array.from(effectInputs).find((radio) => radio.checked).value;
    const sliderLevel = slider.noUiSlider.get();
    if (effectNameRadio === 'marvin') {
      sliderValue.value = Math.round((sliderLevel / 1));
    } else if (effectNameRadio === 'phobos') {
      sliderValue.value = parseFloat((sliderLevel / 3.3).toFixed(1));
    } else if (effectNameRadio === 'heat') {
      sliderValue.value = parseFloat((sliderLevel / 3.3).toFixed(1));
    } else {
      sliderValue.value = parseFloat((sliderLevel / 10).toFixed(1));
    }
    applyEffect(effectNameRadio);
  });
}

export {initializeEffects, hideSlider};
