import en from './en';
import as from './as';
import gu from './gu';
import hi from './hi';
import kn from './kn';
import ml from './ml';
import or from './or';
import ta from './ta';
import te from './te';
import pb from './pb';

const translations = {
  en,
  as,
  gu,
  hi,
  kn,
  ml,
  or,
  ta,
  te,
  pb,
};

export default function (locale) {
  return translations[locale] || en;
}
