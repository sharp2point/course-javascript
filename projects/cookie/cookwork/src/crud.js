import SimpleCookieDB, { SimpleCookie } from './models';
import { inputValidator } from './utility';

export function createCookie(key, value, state = true) {
  if (inputValidator(key) && inputValidator(value)) {
    key = key.trim();
    value = value.trim();
    if (SimpleCookieDB.getCookieByKey(key)) {
      updateCookie(key, value);
    } else {
      const newCookie = new SimpleCookie(key, value);
      SimpleCookieDB.addCookie(newCookie, state);
      SimpleCookieDB.clearState();
      document.cookie = `${key}=${value}`;
    }
  }
}

export function readCookie() {
  document.cookie
    .split('; ')
    .map((cookie) => cookie.split('='))
    .forEach((item) => {
      const [key, value] = item;
      const cookie = new SimpleCookie(key.trim(), value.trim());
      SimpleCookieDB.addCookie(cookie);
      SimpleCookieDB.clearState();
    });
  return SimpleCookieDB;
}

export function updateCookie(key, value) {
  const cookie = SimpleCookieDB.getCookieByKey(key);
  deleteCookie(key);
  setTimeout(() => {
    createCookie(cookie.key, value);
  }, 100);
}

export function deleteCookie(key) {
  SimpleCookieDB.deleteCookieByKey(key);
  SimpleCookieDB.clearState();
  document.cookie = `${key}=; Max-Age=0`;
}

export function filterCookie(value) {
  if (inputValidator(value)) {
    value = value.trim();
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
