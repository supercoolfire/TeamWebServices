import { createEmbedModule } from './module-embed-page.js';

const swaggleCheckbox = document.getElementById('swaggle');
const swaggyContainer = document.getElementById('swaggy');

swaggleCheckbox.addEventListener('change', () => {
  if (swaggleCheckbox.checked) {
    const swaggyIframe = document.createElement('iframe');
    swaggyIframe.src = '/api-docs';
    swaggyIframe.style.width = '100%';
    swaggyIframe.style.border = 'none'; // Optional: Remove iframe border
    swaggyIframe.onload = () => {
      adjustIframeHeight(swaggyIframe);
    };
    swaggyContainer.appendChild(swaggyIframe);
  } else {
    const swaggyIframe = swaggyContainer.querySelector('iframe');
    swaggyContainer.removeChild(swaggyIframe);
  }
});

function adjustIframeHeight(iframe) {
  const body = iframe.contentWindow.document.body;
  iframe.style.height = body.scrollHeight + 'px';
}

createEmbedModule('embeddedHtmlId', 'toggle', 'TeamProjectProposal');
