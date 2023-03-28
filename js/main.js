import {createPhotos} from './mocks/generate-post-data.mjs';
import {renderPhotos} from './photos-thumbnails.mjs';
import {OBJECTS_COUNT} from './mocks/const.mjs';
import {addPictureClickHandler} from './show-big-picture.mjs';
import {addPhotoUploadListener} from './upload-form.mjs';
import {initializeEffects} from './effects.mjs';
import {validateForm} from './validation-form.mjs';
const photos = createPhotos(OBJECTS_COUNT);
renderPhotos(photos);
addPictureClickHandler(photos);
addPhotoUploadListener();
validateForm();
initializeEffects();

