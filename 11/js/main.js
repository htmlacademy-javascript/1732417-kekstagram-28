import {renderPhotos} from './photos-thumbnails.mjs';
import {addPictureClickHandler} from './show-big-picture.mjs';
import {addPhotoUploadListener} from './upload-form.mjs';
import {initializeEffects} from './effects.mjs';
import {getData} from './api.mjs';
import {activateFilter, onClickPhotosFilter, getSortedPhotos} from './sort.mjs';
import {RERENDER_DELAY, showAlert, debounce} from './utils.mjs';

getData()
  .then((photosData) => {
    renderPhotos(photosData);
    addPictureClickHandler(photosData);
    addPhotoUploadListener();
    activateFilter(photosData);
    onClickPhotosFilter(debounce(() => renderPhotos(getSortedPhotos()), RERENDER_DELAY));
    initializeEffects();
  }).catch((err) => {
    showAlert(err.message);
  });
