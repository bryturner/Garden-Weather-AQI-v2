import { parseToHtml } from '../helpers.js';

export const addStyles = function () {
  const weatherContainer = document.querySelector('.weather-container');
  const body = document.body;

  weatherContainer.style.backgroundColor = '#5cad5ce6';

  body.style.backgroundImage = `url(./img/flowers.jpg)`;
};

export const displayFooter = function () {
  const footer = document.querySelector('.footer-select');
  footer.innerHTML = '';
  const html = `
	<div class="footer-container">
	 <ul class="footer-list">
		 <li class="footer-list-item footer-github">
			My
			<a
			  href="https://github.com/bryturner/Garden-Weather-AQI-v2"
			  class="footer-link"
			  target="_blank"
			  >GitHub Repo</a
			>
		 </li>
		 <li class="footer-list-item footer-portfolio">
			My
			<a
			  href="https://github.com/bryturner"
			  class="footer-link"
			  target="_blank"
			  >Github Profile</a
			>
		 </li>
		 <li class="footer-list-item footer-attribute">
			Icons by
			<a
			  href="https://www.flaticon.com/authors/iconixar"
			  title="iconixar"
			  class="footer-link"
			  target="_blank"
			  >iconixar</a
			>
		 </li>
	  </ul>
	  <p class="footer-text">Website created by Bryan Turner</p>
	</div>
	`;

  const htmlCurrentDoc = parseToHtml(html);
  footer.insertAdjacentElement('afterbegin', htmlCurrentDoc.body.firstChild);
};
