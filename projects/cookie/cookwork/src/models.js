export class SimpleCookie {
  /* Класс описывает cookie и её представление в шаблоне template */
  constructor(key, value) {
    this.key = key;
    this.value = value;
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
    this.cookieMap.forEach((cookie) => {
      if (cookie.key.includes(key)) {
        cookie.state = true;
      }
    });
  }
  setCookieStateByValue(value) {
    Array.from(this.cookieMap.values())
      .filter((cookie) => cookie.value.includes(value))
      .forEach((cookie) => (cookie.state = true));
  }
  clearCookieStateByKey(key) {
    this.cookieMap.has(key) ? (this.cookieMap.get(key).state = false) : null;
  }
  getCookieByKey(key) {
    return this.cookieMap.has(key) ? this.cookieMap.get(key) : null;
  }
  getCookieByValue(value) {
    return Array.from(this.cookieMap.values()).filter((cookie) =>
      cookie.value.includes(value)
    );
  }
  deleteCookieByKey(key) {
    this.cookieMap.delete(key);
  }
}
export default new SimpleCookieDB();
