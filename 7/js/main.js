import {createPhotos} from './mocks/generate-post-data.mjs';
import {renderPhotos} from './photos-thumbnails.mjs';
import {OBJECTS_COUNT} from './mocks/const.mjs';
import {showBigPictureOnClick} from './show-big-picture.mjs';
import {handlePhotoUpload} from './upload-form.mjs';
const photos = createPhotos(OBJECTS_COUNT);
renderPhotos(photos);
showBigPictureOnClick(photos);
handlePhotoUpload();
