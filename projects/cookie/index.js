/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';
import * as CookWork from './cookwork';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function (e) {
  CookWork.filterCookie(e.target.value);
});

addButton.addEventListener('click', handlerAddClick);

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const key = button.dataset.key;
    CookWork.deleteCookie(key);
  }
});
homeworkContainer.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    switch (e.target.tagName) {
      case 'INPUT': {
        if (
          CookWork.elmentValidateById(e, 'add-name-input') ||
          CookWork.elmentValidateById(e, 'add-value-input')
        ) {
          handlerAddClick();
        } else if (CookWork.elmentValidateById(e, 'filter-name-input')) {
          CookWork.filterCookie(e.target.value);
        }
      }
    }
  }
});
/*-----------------------------------------------------------*/
function handlerAddClick() {
  if (
    CookWork.inputValidator(addNameInput.value) &&
    CookWork.inputValidator(addValueInput.value)
  ) {
    const name = addNameInput.value.trim();
    const value = addValueInput.value.trim();
    const filter = filterNameInput.value.trim();

    if (filter !== '' && (name.includes(filter) || value.includes(filter))) {
      CookWork.createCookie(name, value);
    } else if (filter !== '' && !(name.includes(filter) || value.includes(filter))) {
      CookWork.createCookie(name, value, false);
    } else {
      CookWork.createCookie(name, value);
    }
    addNameInput.value = '';
    addValueInput.value = '';
  }
}
CookWork.readCookie();
