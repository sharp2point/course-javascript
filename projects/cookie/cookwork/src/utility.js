export function inputValidator(textValue) {
  return textValue?.trim().length !== 0 ? true : false;
}
export function elmentValidateById(e, id) {
  return e.target.getAttribute('id') === id;
}
