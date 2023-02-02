import SimpleCookieDB from './models';

function updateDOM(target, template) {
  target.innerHTML = template;
}

const renderDOM = () => {
  if (!SimpleCookieDB.state) {
    updateDOM(document.querySelector('#list-table tbody'), SimpleCookieDB.getTemplate());
    SimpleCookieDB.setState();
  }

  window.requestAnimationFrame(renderDOM);
};
window.requestAnimationFrame(renderDOM);
