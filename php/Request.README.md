# Request

Classe destinada a concentrar validações de requisição. Atualmente, `validate($data)` é apenas um esqueleto e sempre retorna `true`.

## Arquivos necessários no projeto

- `Request.php`: esta biblioteca.
- Um ponto de entrada ou arquivo que use validação (criado pelo projeto) e carregue `Request.php` antes de instanciar a classe.

Não há dependências de outros arquivos desta biblioteca.

```php
require_once 'Request.php';

$request = new Request();
$isValid = $request->validate($data);
```

Implemente as regras de validação necessárias antes de confiar no resultado.
