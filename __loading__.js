pc.script.createLoadingScreen(function (app) {
    var LOGO_URL = "https://liepajasras.lv/wp-content/uploads/2020/11/logo2x.png";

    var showSplash = function () {
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);

        var logo = document.createElement('img');
        logo.id = 'splash-logo';
        logo.src = LOGO_URL;
        splash.appendChild(logo);

        var loadingText = document.createElement('div');
        loadingText.id = 'loading-text';
        loadingText.textContent = 'Ielādējas...';
        splash.appendChild(loadingText);

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        var percent = document.createElement('div');
        percent.id = 'progress-percent';
        percent.textContent = '0%';
        splash.appendChild(percent);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        if (splash) {
            splash.classList.add('fade-out');
            setTimeout(() => splash.remove(), 350);
        }
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        var percent = document.getElementById('progress-percent');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = (value * 100) + '%';
            if (percent) percent.textContent = Math.round(value * 100) + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    margin: 0;',
            '    background: #ffffff;',
            '    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;',
            '    overflow: hidden;',
            '}',

            '#application-splash-wrapper {',
            '    position: fixed;',
            '    inset: 0;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    background: #ffffff;',
            '    z-index: 9999;',
            '    opacity: 1;',
            '    transition: opacity 0.35s ease;',
            '}',

            '#application-splash-wrapper.fade-out {',
            '    opacity: 0;',
            '}',

            '#application-splash {',
            '    text-align: center;',
            '    padding: 36px 42px;',
            '    border-radius: 16px;',
            '    background: #ffffff;',
            '    border: 2px solid #e5e5e5;',
            '    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);',
            '    animation: popIn 0.35s ease-out;',
            '}',

            '#splash-logo {',
            '    width: 260px;',
            '    max-width: 80vw;',
            '    margin-bottom: 18px;',
            '    animation: gentlePulse 1.8s ease-in-out infinite;',
            '}',

            '#loading-text {',
            '    font-size: 15px;',
            '    color: #333;',
            '    margin-bottom: 14px;',
            '    letter-spacing: 0.08em;',
            '    text-transform: uppercase;',
            '}',

            '#progress-bar-container {',
            '    width: 260px;',
            '    height: 6px;',
            '    background: #ebebeb;',
            '    border-radius: 999px;',
            '    margin: 0 auto;',
            '    overflow: hidden;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background: linear-gradient(90deg, #52b788, #40916c);',
            '    background-size: 200% 100%;',
            '    animation: shimmer 1.2s linear infinite;',
            '    border-radius: inherit;',
            '}',

            '#progress-percent {',
            '    margin-top: 10px;',
            '    font-size: 13px;',
            '    color: #555;',
            '}',

            '@keyframes shimmer {',
            '    0% { background-position: 0% 0; }',
            '    100% { background-position: 200% 0; }',
            '}',

            '@keyframes gentlePulse {',
            '    0% { transform: scale(1); opacity: 0.92; }',
            '    50% { transform: scale(1.03); opacity: 1; }',
            '    100% { transform: scale(1); opacity: 0.92; }',
            '}',

            '@keyframes popIn {',
            '    0% { transform: translateY(14px) scale(0.95); opacity: 0; }',
            '    100% { transform: translateY(0) scale(1); opacity: 1; }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:progress', setProgress);
    app.on('preload:end', () => app.off('preload:progress', setProgress));
    app.on('start', hideSplash);
});
