/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

/* --------------------------------------------------------- */
function configRandomDiv(id, size, position, color) {
  const div = document.createElement('div');
  div.classList.add('draggable-div');
  div.setAttribute('draggable', 'true');
  div.setAttribute('data-id', `${id}`);
  div.style.position = 'absolute';
  div.style.top = `${position.y}px`;
  div.style.left = `${position.x}px`;
  div.style.background = `rgba(${color.r},${color.g},${color.b},${color.a})`;
  div.style.width = `${size.width}px`;
  div.style.height = `${size.height}px`;
  return div;
}
function fabricRandomDiv() {
  const id = Math.round(Math.random() * 10e3);
  const size = {
    width: Math.round(Math.random() * 200) + 10,
    height: Math.round(Math.random() * 200) + 10,
  };
  const position = {
    x: Math.round(Math.random() * 600),
    y: Math.round(Math.random() * 300),
  };
  const color = {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
    a: Math.random(),
  };

  return configRandomDiv(id, size, position, color);
}

function moveRandomDiv(e) {
  const targetDiv = e.target;
  targetDiv.style.left = e.pageX - targetDiv.offsetWidth / 2 + 'px';
  targetDiv.style.top = e.pageY - targetDiv.offsetHeight / 2 + 'px';
}

// document.addEventListener('mousemove', moveRandomDiv);
document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const div = e.target;
  if (div.tagName === 'DIV' && div.classList.contains('draggable-div')) {
    document.addEventListener('mousemove', moveRandomDiv);
    div.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveRandomDiv);
    });
  }
});

/* ---------------------------------------------- */

export function createDiv() {
  return fabricRandomDiv();
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
