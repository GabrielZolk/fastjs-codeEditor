let htmlCode, cssCode, jsCode;

function run() {
  htmlCode = document.getElementById('html-code').value;
  cssCode = document.getElementById('css-code').value;
  jsCode = document.getElementById('js-code').value;
  let output = document.getElementById('output');

  output.contentDocument.body.innerHTML = htmlCode + '<style>' + cssCode + '</style>';
  output.contentWindow.eval(jsCode);
}

function saveCode() {
  localStorage.setItem('htmlCode', htmlCode.trim());
  localStorage.setItem('cssCode', cssCode.trim());
  localStorage.setItem('jsCode', jsCode.trim());
}

function loadCode() {
  let loadedHtmlCode = localStorage.getItem('htmlCode');
  let loadedCssCode = localStorage.getItem('cssCode');
  let loadedJsCode = localStorage.getItem('jsCode');

  document.getElementById('html-code').value = loadedHtmlCode;
  document.getElementById('css-code').value = loadedCssCode;
  document.getElementById('js-code').value = loadedJsCode;

  let output = document.getElementById('output');
  output.contentDocument.body.innerHTML = loadedHtmlCode + '<style>' + loadedCssCode + '</style>';
  output.contentWindow.eval(loadedJsCode);
}

function exportCode() {
  let fullHtmlCode = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./styles.css">
                <title>My awesome Code made with FastJS!</title>
            </head>
            <body>
                ${htmlCode}
                <script src='./script.js'></script>
            </body>
            </html>`;

  let htmlFile = new Blob([fullHtmlCode], { type: 'text/html' });
  let cssFile = new Blob([cssCode], { type: 'text/css' });
  let jsFile = new Blob([jsCode], { type: 'text/javascript' });

  let htmlLink = document.createElement('a');
  htmlLink.href = URL.createObjectURL(htmlFile);
  htmlLink.download = 'index.html';
  htmlLink.click();


  let cssLink = document.createElement('a');
  cssLink.href = URL.createObjectURL(cssFile);
  cssLink.download = 'styles.css';
  cssLink.click();

  let jsLink = document.createElement('a');
  jsLink.href = URL.createObjectURL(jsFile);
  jsLink.download = 'script.js';
  jsLink.click();
}

loadCode();

function clearPlayground() {

  document.getElementById('html-code').value = '';
  document.getElementById('css-code').value = '';
  document.getElementById('js-code').value = '';

  let output = document.getElementById('output');
  output.contentDocument.body.innerHTML = '';

  localStorage.removeItem('htmlCode');
  localStorage.removeItem('cssCode');
  localStorage.removeItem('jsCode');
}

function changeTheme() {
  const bodyElement = document.body;
  const output = document.getElementById('output')
  const codeareas = document.querySelectorAll('textarea')

  const isDarkTheme = bodyElement.classList.contains('dark-theme');

  if (!isDarkTheme) {
    bodyElement.classList.add('dark-theme');
    output.classList.add('dark-theme');
    codeareas.forEach((codearea) => {
      codearea.classList.add('dark-theme');
    });
  } else {
    bodyElement.classList.remove('dark-theme');
    output.classList.remove('dark-theme');
    codeareas.forEach((codearea) => {
      codearea.classList.remove('dark-theme');
    });
  }

  localStorage.setItem('darkThemeEnabled', !isDarkTheme);
}

document.addEventListener('DOMContentLoaded', function () {
  const darkThemeEnabled = localStorage.getItem('darkThemeEnabled') === 'true';
  if (darkThemeEnabled) {
    document.body.classList.add('dark-theme');
  }
});

function shareCode() {

  const htmlCode = document.getElementById('html-code').value;
  const cssCode = document.getElementById('css-code').value;
  const jsCode = document.getElementById('js-code').value;

  const objectCode = {
    htmlCode: htmlCode,
    cssCode: cssCode,
    jsCode: jsCode
  };

  const JSONCode = JSON.stringify(objectCode);

  const base64 = btoa(JSONCode);

  const generatedLink = window.location.href.split('?')[0] + '?code=' + base64;

  const tempInput = document.createElement('input');
  tempInput.setAttribute('type', 'text');
  tempInput.setAttribute('value', generatedLink);
  document.body.appendChild(tempInput);

  tempInput.select();

  document.execCommand('copy');

  document.body.removeChild(tempInput);

  alert('Link de compartilhamento copiado para área de transferência. (Você deve ter salvo seu código antes de criar o link)\n' + generatedLink);
}

let fullscreen = false;
const outputIframe = document.getElementById('output');

function toggleFullScreen() {
  if (!fullscreen) {
    if (outputIframe.requestFullscreen) {
      outputIframe.requestFullscreen();
    } else if (outputIframe.mozRequestFullScreen) {
      outputIframe.mozRequestFullScreen();
    } else if (outputIframe.webkitRequestFullscreen) {
      outputIframe.webkitRequestFullscreen();
    } else if (outputIframe.msRequestFullscreen) {
      outputIframe.msRequestFullscreen();
    }

    fullscreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    fullscreen = false;
  }
}











