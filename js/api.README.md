# Api.js

Utilitários de navegador para ler parâmetros da URL, coletar dados de formulários e fazer chamadas à API. Expõe `apiGet`, `apiPost`, `apiPut`, `apiDelete` e `apiGetAsync` em `window`.

## Arquivos necessários no projeto

- `api.js`: esta biblioteca.
- `jquery-1.11.1.min.js` ou outra versão compatível do jQuery, carregada antes de `api.js`. As funções síncronas usam `$.ajax`.
- Um arquivo JavaScript de inicialização ou código das páginas (criado pelo projeto) que chame as funções expostas.
- Opcionalmente, um arquivo de configuração que defina `ENV.API_URL` antes do uso. Sem esse valor, as chamadas usam o host atual e acrescentam `/api` ao caminho.
- Para autenticação opcional, o projeto pode definir `window.atnApiToken` antes da chamada; a biblioteca o envia como token Bearer.

Exemplo de uso:

```html
<script src="/js/jquery-1.11.1.min.js"></script>
<script src="/js/api.js"></script>
<script>
    const users = apiGet('/users');
    const user = await apiGetAsync('/users/1');
</script>
```

`getFormData(form)` retorna os campos como objeto; campos com nome terminado em `[]` são agrupados em arrays. `apiRequest` também aceita `FormData` para envio de arquivos.
