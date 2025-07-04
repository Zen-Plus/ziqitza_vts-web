import { prepareSuccessMessage } from './notification';

export function copyToClipboard(id, pushNotification) {
  const str = document.getElementById(id).innerText;
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  pushNotification(prepareSuccessMessage({ code: 'COPIED_TO_CLIPBOARD' }));
}

export default {
  copyToClipboard,
};
