export class SimpleCookie {
  /* Класс описывает cookie и её представление в шаблоне template */
  constructor(key, value) {
    this.key = key?.trim();
    this.value = value?.trim();
    this.template = `<tr data-keyrow='${this.key}'><td>${this.key}</td><td>${this.value}</td><td><button data-key='${this.key}'>удалить</button></td></tr>`;
    this.state = true; // видимость
  }
}
class SimpleCookieDB {
  constructor() {
    this.state = false; // перерисовка
    this.cookieMap = new Map();
  }
  getTemplate() {
    return Array.from(this.cookieMap.values()).reduce((tmpl, cookie) => {
      if (cookie.state) tmpl += cookie.template;
      return tmpl;
    }, ``);
  }
  setState() {
    this.state = true;
  }
  clearState() {
    this.state = false;
  }
  addCookie(cookie, state = true) {
    cookie.state = state;
    this.cookieMap.set(cookie.key, cookie);
  }
  setCookieStateAll() {
    this.cookieMap.forEach((item) => {
      item.state = true;
    });
  }
  clearCookieStateAll() {
    this.cookieMap.forEach((item) => {
      item.state = false;
    });
  }
  setCookieStateByKey(key) {
    key = key?.trim();
    this.cookieMap.forEach((cookie) => {
      if (cookie.key.includes(key)) {
        cookie.state = true;
      }
    });
  }
  setCookieStateByValue(value) {
    value = value?.trim();
    Array.from(this.cookieMap.values())
      .filter((cookie) => cookie.value.includes(value))
      .forEach((cookie) => (cookie.state = true));
  }
  clearCookieStateByKey(key) {
    key = key?.trim();
    this.cookieMap.has(key) ? (this.cookieMap.get(key).state = false) : null;
  }
  getCookieByKey(key) {
    key = key?.trim();
    return this.cookieMap.has(key) ? this.cookieMap.get(key) : null;
  }
  getCookieByValue(value) {
    value = value?.trim();
    return Array.from(this.cookieMap.values()).filter((cookie) =>
      cookie.value.includes(value)
    );
  }
  deleteCookieByKey(key) {
    key = key?.trim();
    this.cookieMap.delete(key);
  }
}
export default new SimpleCookieDB();
