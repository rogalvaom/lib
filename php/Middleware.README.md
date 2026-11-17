# Middleware

Fornece a classe base `Middleware`, com o método `handle($data, $token)` usado pelo `Router` antes da ação de uma rota.

## Arquivos necessários no projeto

- `Middleware.php`: esta biblioteca.
- Um arquivo de middleware, por exemplo `src/middleware/AuthMiddleware.php` (criado pelo projeto), que carrega ou estende `Middleware`.
- Um ponto de entrada ou autoloader (criado pelo projeto) que carregue a classe antes de `Router::runApi()`.

O método atual retorna `true` sem validar os dados. Para adicionar uma verificação, crie uma subclasse e sobrescreva `handle`:

```php
class AuthMiddleware extends Middleware
{
    public function handle($data, $token)
    {
        return !empty($token);
    }
}
```

As rotas podem listar a classe do middleware como quinto item. O `Router` chama o método, mas atualmente não usa o valor retornado para bloquear a requisição.
