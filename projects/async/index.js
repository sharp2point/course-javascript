/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './styles/main.css';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/*--------------------------------------------------------*/

retryButton.addEventListener('click', () => {
  requestTownsAPI();
});

filterInput.addEventListener('focus', (e) => {
  e.preventDefault();
});
filterInput.addEventListener('input', function (e) {
  filterResult.textContent = '';
  const value = e.target.value;
  if (value !== '') {
    const result = TOWNS_RESULT.filter((itm) => {
      return itm.includes(e.target.value.toLowerCase());
    });
    let template = ``;
    result.forEach((itm) => {
      // const el = document.createElement('span');
      // el.classList.add('list-item');
      // el.textContent = itm;
      //filterResult.appendChild(el);

      const arr = itm.split(value);
      const out_arr = [];
      for (let i = 0; i < arr.length; i++) {
        out_arr.push(arr[i]);
        if (i < arr.length - 1) out_arr.push(`<span class='mark'>${value}</span>`);
      }

      template += `<span class='list-item'>${out_arr.join('')}</span>`;
    });
    filterResult.innerHTML = template;
  }
});

/* ------------------------------------------ */
const TOWNS_API_PATH =
  'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

let TOWNS_RESULT = [];

async function loadTowns() {
  let resp = await fetch(TOWNS_API_PATH);
  resp = await resp.json();
  return resp.map((item) => item.name).sort();
}

const app_states = {
  loading: () => {
    console.log('Loading...');
    loadingBlock.classList.remove('hidden');
    loadingFailedBlock.classList.add('hidden');
    filterBlock.classList.add('hidden');
  },
  fail: () => {
    console.log('Fail !');
    loadingBlock.classList.add('hidden');
    loadingFailedBlock.classList.remove('hidden');
    filterBlock.classList.add('hidden');
  },
  full: () => {
    console.log('Loading Full !');
    loadingBlock.classList.add('hidden');
    loadingFailedBlock.classList.add('hidden');
    filterBlock.classList.remove('hidden');
  },
};

function requestTownsAPI() {
  app_states.loading();
  loadTowns()
    .then((t) => {
      app_states.full();
      TOWNS_RESULT = Array.from(t).map((itm) => itm.toLowerCase());
    })
    .catch(() => {
      app_states.fail();
    });
}

requestTownsAPI();
export { loadTowns, isMatching };
