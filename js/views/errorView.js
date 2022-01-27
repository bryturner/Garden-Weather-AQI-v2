export const displayError = function () {
  const documentBody = document.body;

  documentBody.innerHTML = `
	<div class="error-container">
      <h2 class="error-header">Oh No!</h2>
      <p class="error-text">Something went wrong!</p>
   </div>
	`;
};
