export const toggleLoader = function () {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('hide-load');
};

export const removeLoader = function () {
  const loader = document.querySelector('.loader');
  loader.classList.add('hide-load');
};
