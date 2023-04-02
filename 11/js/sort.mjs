import {getSortRandomly, getSortByComments} from './utils.mjs';

const RANDOM_PHOTOS_COUNT = 10;
const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = FilterType.DEFAULT;
let photos = [];
const photosFilter = document.querySelector('.img-filters');

/**
 * Функция сортирующая фото-посты в зависимости от выбранного фильтра
 * @returns отсортированный массив фото-постов
 */
function getSortedPhotos() {
  switch(currentFilter) {
    case FilterType.RANDOM:
      return [...photos].sort(getSortRandomly).slice(0, RANDOM_PHOTOS_COUNT);
    case FilterType.DISCUSSED:
      return [...photos].sort(getSortByComments);
    default:
      return [...photos];
  }
}

/**
 * Функция обрабатывает клики по фильтрам, затем вызывает коллбэк с отсортированными фото-постами (getSortedPhotos)
 */
function onClickPhotosFilter(callback) {
  photosFilter.addEventListener('click', ({target}) => {
    if (!target.classList.contains('img-filters__button')) {
      return;
    }

    const {id} = target;
    if (id === currentFilter) {
      return;
    }

    const activeButton = photosFilter.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    currentFilter = id;
    callback();
  });
}

/**
 * Функция показывает фильтры, когда загрузились фото-посты и копирует их в новый массив
 */
function activateFilter(photosData){
  photosFilter.classList.remove('img-filters--inactive');
  photos = [...photosData];
}

export {getSortedPhotos, onClickPhotosFilter, activateFilter};
