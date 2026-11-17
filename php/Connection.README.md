# Connection

Classe responsável por abrir e disponibilizar uma conexão PDO com MySQL.

## Arquivos necessários no projeto

- `Connection.php`: esta biblioteca.
- `config/database.php` (criado pelo projeto): carrega as credenciais abaixo em `$_ENV` antes de instanciar `Connection`.
- `public/index.php` ou outro ponto de entrada (criado pelo projeto): carrega `config/database.php` e `Connection.php`.

Exemplo de `config/database.php`:

```php
<?php
$_ENV['DATABASE_USERNAME'] = 'usuario';
$_ENV['DATABASE_PASSWORD'] = 'senha';
$_ENV['DATABASE_HOST'] = 'localhost';
$_ENV['DATABASE_PORT'] = '3306';
$_ENV['DATABASE_NAME'] = 'minha_base';
```

O PHP precisa ter a extensão PDO MySQL habilitada.

## Configuração

Antes de instanciar a classe, configure estas variáveis em `$_ENV`:

- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`

## Uso

```php
require_once 'Connection.php';

$connection = new Connection();
$pdo = $connection->getConnection();
```

`getConnection()` retorna o objeto `PDO`. Em caso de falha, a classe imprime uma resposta JSON e encerra a execução.
