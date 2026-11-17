# Router.js

Roteador de páginas no navegador. `routerPathWeb(requestUrl, routes)` resolve o caminho da view para uma URL e `routerRunWeb(routes)` busca o HTML e o escreve no documento atual. Se não encontrar a view, tenta carregar `/view/404.html`.

## Arquivos necessários no projeto

- `router.js`: esta biblioteca.
- Um arquivo JavaScript de inicialização (criado pelo projeto) que carregue `router.js` e chame `routerRunWeb(routes)`.
- As páginas HTML em `view/`, incluindo uma página de erro em `view/404.html`.
- Os arquivos JavaScript e CSS usados pelas views, incluídos pelas próprias páginas.
- Opcionalmente, um arquivo de configuração que defina `ENV.BASE_URL` ou `window.basePath` antes de carregar o roteador. O valor é disponibilizado por `getUrl()`.
- Opcionalmente, o projeto pode definir `window.atnAuthReady` como uma Promise; o roteador aguardará sua conclusão antes de buscar a página.

As rotas são arrays no formato `[caminho, caminhoDaView]`, por exemplo:

```js
const routes = [
    ['/', '/home.html'],
    ['/users', '/users.html']
];

routerRunWeb(routes);
```
