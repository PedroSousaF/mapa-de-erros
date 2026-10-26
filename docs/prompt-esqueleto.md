# Prompt usado para gerar o esqueleto

Você é um dev Node sênior. Crie o esqueleto de um projeto que analisa padrões de erro de estudantes.

Contexto: estudantes não sabem por que erram certos tipos de questão; professores não veem o padrão.

Entrada (exemplo):
```js
[{ questaoId: 'q1', topico: 'fracoes', correta: false },
 { questaoId: 'q2', topico: 'fracoes', correta: false },
 { questaoId: 'q3', topico: 'geometria', correta: true }]
```

Saída (formato exato): array ordenado do maior para o menor `taxaErro`:
```js
[{ topico: 'fracoes', total: 2, erros: 2, taxaErro: 1, sugestoes: ['Revisar: frações equivalentes'] }]
```

Restrições: ESM, sem dependências, funções puras, entrada inválida lança Error em português.
Entregue `src/analisaErros.js`, `src/catalogo.js` e um teste com `node --test`. Siga o `CLAUDE.md`.
