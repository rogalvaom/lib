# Controller

Define a classe base `Controller` para controladores da aplicação.

## Arquivos necessários no projeto

- `Controller.php`: esta biblioteca.
- Um arquivo de controlador, por exemplo `src/controllers/UserController.php` (criado pelo projeto), que carrega ou estende `Controller`.
- Um ponto de entrada ou autoloader (criado pelo projeto) que inclua esses arquivos antes de despachar as rotas.

Atualmente, a classe está vazia e não fornece métodos próprios. Pode ser usada como ponto de partida para classes que agrupam ações chamadas pelo `Router`.

```php
require_once 'Controller.php';

class UserController extends Controller
{
    public function index($data, $token)
    {
        return ['users' => []];
    }
}
```
