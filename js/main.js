import {renderPhotos} from './photos-thumbnails.mjs';
import {addPictureClickHandler} from './show-big-picture.mjs';
import {addPhotoUploadListener} from './upload-form.mjs';
import {initializeEffects} from './effects.mjs';
import {getData} from './api.mjs';
import {showAlert} from './show-alert-message.mjs';

getData()
  .then((photosData) => {
    renderPhotos(photosData);
    addPictureClickHandler(photosData);
    addPhotoUploadListener();
    initializeEffects();
  }).catch((err) => {
    showAlert(err.message);
  });
