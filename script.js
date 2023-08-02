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
            // Cria o conteúdo completo do HTML com o código do usuário
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