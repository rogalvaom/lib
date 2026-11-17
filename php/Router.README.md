# Router

Classe que lê a requisição HTTP e oferece despacho de rotas para API e páginas web. A construção inicia a sessão, coleta método, URI, dados, token Bearer e `$_ENV['BASE_URL']`.

## Arquivos necessários no projeto

- `Router.php`: esta biblioteca.
- `public/index.php` ou outro ponto de entrada (criado pelo projeto): carrega as configurações, classes e rotas e chama `runApi()` ou `runWeb()`.
- Um arquivo de configuração carregado antes de criar o router que defina `$_ENV['BASE_URL']`.
- Arquivos das classes de controlador referenciadas nas rotas; carregue também cada middleware listado nelas.
- Para `runWeb()`, defina `$_SERVER['PROJECT_ROOT']` e crie as views mapeadas em `public/view/`. Os arquivos estáticos devem estar dentro da raiz do projeto.
- Se as páginas usarem os scripts injetados pelo router, disponibilize `public/js/jquery-1.11.1.min.js` e `public/js/api.js`.

## Rotas de API

Passe cada rota como um array com método HTTP, caminho, classe, método da classe e, opcionalmente, classes de middleware:

```php
$routes = [
    ['GET', '/users', UserController::class, 'index', [AuthMiddleware::class]],
];

$router = new Router();
$router->runApi($routes);
```

O caminho é extraído da URI após `/api`; parâmetros de query são mesclados aos dados da requisição. Dados JSON, `application/x-www-form-urlencoded` e `multipart/form-data` são lidos por `getData()`. A ação recebe `$data` e `$token`.

## Rotas web

`pathWeb($url, $routes)` procura arquivos e páginas mapeadas; `runWeb($routes)` serve o arquivo encontrado ou inclui a view. As rotas web usam arrays no formato `[caminho, caminhoDaView]`.

Para uso, configure `$_ENV['BASE_URL']` e `$_SERVER['PROJECT_ROOT']` e carregue as classes de rota e middleware necessárias.
