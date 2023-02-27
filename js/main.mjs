import {createObjectsOfPhoto} from './functions.mjs';
import {OBJECTS_COUNT} from './const.mjs';

function createPhoto() {
  Array.from({length: OBJECTS_COUNT}, createObjectsOfPhoto);
}

createPhoto();

