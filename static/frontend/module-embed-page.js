/*
 * Created by: Jayser Pilapil
 * Copyright 2023 Jayser Pilapil. All rights reserved.
 * When using This do not use kebab-case-style for naming variables,
 * classes, and ids because it's not a quickest way to select name.
 *
 *  @param embeddedHtmlId output id
 *  @param toggleId checkbox or radio button id
 *  @param embeddedHtmlUrl the page to be embed e.g.: embeded.html
 *
 *  parents selector must have same amount because the function will
 *  match the index of parents array and children array
 *  
 *  * HTML Usage:
 <script type="module">
    import { createEmbedModule } from './modules/module-embed-page.js';
    createEmbedModule('embeddedHtmlId', 'toggleId', 'embeddedHtmlUrl');
 </script>
 * 
 *
 *  * Node Method 1:
 <script type="module">
    import { createEmbedModule } from '/module-embed-page';
    createEmbedModule('embeddedHtmlId', 'toggle', 'TeamProjectProposal');
 </script>
 *
 *
 *  * Node Method 1:
 <script type="module">
    import { createEmbedModule } from '/module-embed-page';
    createEmbedModule('embeddedHtmlId', 'toggle', 'TeamProjectProposal');
 </script>
 // Method 1
router.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/index.html')); });
router.get('/TeamProjectProposal', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/TeamProjectProposal.html')); });
router.get('/module-embed-page', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/module-embed-page.js')); });
*
*
*  * Node Method 2:
 <script type="module">
    import { createEmbedModule } from '/module-embed-page.js';
    createEmbedModule('embeddedHtmlId', 'toggle', 'TeamProjectProposal');
    // createEmbedModule('swaggy', 'swaggle', '/api-docs');
 </script>
// Method 2
router.use('/', express.static(path.join(__dirname, '../frontend')));
 * 
 */
export function createEmbedModule(embeddedHtmlId, toggleId, embeddedHtmlUrl) {
    const toggle = document.getElementById(toggleId);
    const embeddedHtml = document.getElementById(embeddedHtmlId);
  
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        // Load the embedded HTML file using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('GET', embeddedHtmlUrl);
        xhr.onload = () => {
          if (xhr.status === 200) {
            embeddedHtml.innerHTML = xhr.responseText;
            embeddedHtml.style.display = 'block';
          }
        };
        xhr.send();
      } else {
        embeddedHtml.style.display = 'none';
        embeddedHtml.innerHTML = '';
      }
    });
  }