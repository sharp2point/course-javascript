export function addCookie(key, value) {
  if ((key.trim().length !== 0) & (value.trim().length !== 0))
    document.cookie = `${key}=${value}`;
}
export function removeCookie(key) {
  document.cookie = `${key}=; Max-Age=0`;
}
export function getAllCookie() {
  return document.cookie.split(';');
}

/*--------------------- DOM API ------------------------------*/
export function appendDataCookieToDOM(target, key, value) {
  target.innerHTML += `<tr data-keyrow='${key}'><td>${key}</td><td>${value}</td><td><button data-key='${key}'>удалить</button></td></tr>`;
}
export function removeDataCookieFromDOM(target, key) {
  target.removeChild(document.querySelector(`[data-keyrow=${key}]`));
}
