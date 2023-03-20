import {createPhotos} from './mocks/generate-post-data.mjs';
import {renderPhotos} from './photos-thumbnails.mjs';
import {OBJECTS_COUNT} from './mocks/const.mjs';
import './showBigPicture.mjs';
const photos = createPhotos(OBJECTS_COUNT);
renderPhotos(photos);

export {photos};
