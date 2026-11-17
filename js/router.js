// develop by @rogalvaom
function getUrl() {
    return {
        url: window.location.pathname,
        baseUrl: (typeof ENV !== 'undefined' && ENV.BASE_URL) || window.basePath || '',
        apiUrl: (typeof ENV !== 'undefined' && ENV.API_URL) || window.apiUrl || ''
    };
}

function routerPathWeb(requestUrl, routes) {
    let url = requestUrl.split('?')[0];

    if (url.endsWith('index.html') || url === '/' || url === '') {
        url = '/';
    } else {
        url = '/' + url.replace(/^\/+/, '');
    }

    for (const route of routes) {
        const routePath = route[0];
        const routeWeb = '/view' + route[1];

        if (url === routePath || (routePath === '/' && (url === '/' || url === ''))) {
            return routeWeb;
        }
    }

    return '/view/404.html';
}

async function routerRunWeb(routes) {
    const { url } = getUrl();

    // Aguarda a validação da sessão antes de buscar uma rota protegida.
    if (window.atnAuthReady) {
        await window.atnAuthReady;
    }

    const filePath = routerPathWeb(url, routes);

    console.log("Roteando para:", filePath);

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Página não encontrada');
        const html = await response.text();

        // Escreve o documento HTML completo da view diretamente no documento atual
        document.open();
        document.write(html);
        document.close();

    } catch (err) {
        console.error("Erro no router:", err);
        try {
            const errResponse = await fetch('/view/404.html');
            const errHtml = await errResponse.text();
            document.open();
            document.write(errHtml);
            document.close();
        } catch {
            document.body.innerHTML = '<h1>404 - Página não encontrada</h1>';
        }
    }
}
