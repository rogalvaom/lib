# Utils

Utilitários de calendário em português. A propriedade `meses` mapeia códigos de mês (`01` a `12`) para nomes; `dias_semana` mapeia códigos (`1` a `7`) para nomes em português e inglês.

## Arquivos necessários no projeto

- `Utils.php`: esta biblioteca.
- Um ponto de entrada ou arquivo de uso (criado pelo projeto) que carregue `Utils.php` antes de instanciar `Utils`.

Não há dependências de outros arquivos desta biblioteca.

```php
require_once 'Utils.php';

$utils = new Utils();
$nomeMes = $utils->getMes('03');                 // Março
$codigoDiaAtual = $utils->getCodDiaSemanaAtual();
$nomeDia = $utils->getNomeDiaSemana('2');       // Segunda-feira
```
