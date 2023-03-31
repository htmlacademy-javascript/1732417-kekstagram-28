import {renderPhotos} from './photos-thumbnails.mjs';
// import {addPictureClickHandler} from './show-big-picture.mjs';
import {addPhotoUploadListener} from './upload-form.mjs';
import {initializeEffects} from './effects.mjs';
import {validateForm} from './validation-form.mjs';
import {getData} from './api.mjs';
// const photos = createPhotos(OBJECTS_COUNT);

// addPictureClickHandler(photos);
addPhotoUploadListener();
validateForm();
initializeEffects();
getData()
  .then((photosData) => {
    renderPhotos(photosData);
  });
