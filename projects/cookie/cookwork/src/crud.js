import SimpleCookieDB, { SimpleCookie } from './models';
import { inputValidator } from './utility';

export function createCookie(key, value, state = true) {
  const cookie = SimpleCookieDB.getCookieByKey(key);
  if (cookie) {
    updateCookie(cookie, value);
  } else {
    SimpleCookieDB.addCookie(new SimpleCookie(key, value), state);
    SimpleCookieDB.clearState();
    document.cookie = `${key}=${value}`;
  }
}

export function readCookie() {
  document.cookie
    .split('; ')
    .map((cookie) => cookie.split('='))
    .forEach((item) => {
      const [key, value] = item;
      if (key && value) {
        const cookie = new SimpleCookie(key, value);
        SimpleCookieDB.addCookie(cookie);
        SimpleCookieDB.clearState();
      }
    });
  return SimpleCookieDB;
}

export function updateCookie(cookie, value) {
  deleteCookie(cookie.key);
  createCookie(cookie.key, value);
}

export function deleteCookie(key) {
  SimpleCookieDB.deleteCookieByKey(key);
  SimpleCookieDB.clearState();
  document.cookie = `${key}=; Max-Age=0`;
}

export function filterCookie(value) {
  if (inputValidator(value)) {
    SimpleCookieDB.clearCookieStateAll();
    SimpleCookieDB.setCookieStateByKey(value);
    SimpleCookieDB.setCookieStateByValue(value);
    SimpleCookieDB.clearState();
  } else {
    SimpleCookieDB.setCookieStateAll();
    SimpleCookieDB.clearState();
  }
  return null;
}
