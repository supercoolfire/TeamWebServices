document.addEventListener('DOMContentLoaded', function () {
  const checkboxApiDocs = document.getElementById('toggleSwaggy');
  const contentContainerApiDocs = document.getElementById('contentSwaggy');
  const spinnerApiDocs = document.getElementById('spinnerApiDocs');

  const checkbox = document.getElementById('toggleProject');
  const contentContainer = document.getElementById('contentProject');

  const checkRubric = document.getElementById('toggleRubric');
  const contentContainerRubric = document.getElementById('contentRubric');

  checkboxApiDocs.addEventListener('change', function () {
    if (checkboxApiDocs.checked) {
      // Show spinner while loading
      spinnerApiDocs.style.display = 'block';

      // Create an iframe and set its source to /api-docs
      const iframe = document.createElement('iframe');
      iframe.src = '/api-docs';
      iframe.classList.add('api-docs-iframe');

      // Hide spinner once iframe is loaded
      iframe.onload = function () {
        spinnerApiDocs.style.display = 'none';
      };

      // Append the iframe to the content container
      contentContainerApiDocs.appendChild(iframe);
    } else {
      // Clear the content and hide spinner when checkbox is unchecked
      contentContainerApiDocs.innerHTML = '';
      spinnerApiDocs.style.display = 'none';
    }
  });

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // Load content from extrapage1.html when checkbox is checked
      fetch('/pages/TeamProjectProposal.html')
        .then(response => response.text())
        .then(html => {
          contentContainer.innerHTML = html;
        });
    } else {
      // Clear the content when checkbox is unchecked
      contentContainer.innerHTML = '';
    }
  });

  checkRubric.addEventListener('change', function () {
    if (checkRubric.checked) {
      // Load content from extrapage1.html when checkbox is checked
      fetch('/pages/criterea.html')
        .then(response => response.text())
        .then(html => {
          contentContainerRubric.innerHTML = html;
        });
    } else {
      // Clear the content when checkbox is unchecked
      contentContainerRubric.innerHTML = '';
    }
  });
});
