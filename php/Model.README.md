# Model

Classe base para modelos que acessam uma tabela por meio de PDO. Ao ser criada, instancia `Connection` e guarda a conexão.

## Arquivos necessários no projeto

- `Model.php` e `Connection.php`: arquivos desta biblioteca. `Connection.php` precisa estar carregado antes de instanciar um modelo.
- Um arquivo de configuração de banco, por exemplo `config/database.php` (criado pelo projeto), que defina as variáveis `DATABASE_*` exigidas por `Connection`.
- Um arquivo de modelo, por exemplo `src/models/User.php` (criado pelo projeto), que estenda `Model` e defina `$table`.
- Uma tabela correspondente no banco de dados (criada pelo projeto).
- Um ponto de entrada ou autoloader que carregue configuração e classes antes do uso.

Defina `$table` na subclasse e carregue `Connection.php` antes de usar:

```php
require_once 'Connection.php';
require_once 'Model.php';

class User extends Model
{
    protected $table = 'users';
}

$user = new User();
$id = $user->create(['name' => 'Ana']);
$one = $user->search(['id' => $id]);
$all = $user->searchAll();
$updated = $user->update(['name' => 'Bia'], ['id' => $id]);
$deleted = $user->delete(['id' => $id]);
```

Os métodos `create`, `search`, `searchAll`, `update` e `delete` retornam, respectivamente, o ID criado, uma linha, uma lista de linhas e a quantidade de linhas afetadas nas operações de atualização e remoção.
