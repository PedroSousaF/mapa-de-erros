# mapa-de-erros

Ajuda estudantes a entender *por que* erram um tipo de questão: recebe o histórico de respostas,
acha os tópicos com mais erros e sugere conteúdos para revisão. Usuários: estudantes e professores.

## Stack

- Node 18+, ESM (`"type": "module"`), imports com extensão `.js`
- Testes com `node --test` + `node:assert/strict`; sem dependências externas

## Comandos

- `npm test` — roda os testes
- `npm run test:watch` — testes em watch

## Convenções

- Uma resposta é `{ questaoId, topico, correta }` (`correta` é boolean). Veja `docs/prompt-esqueleto.md`.
- Funções puras em `src/`, sem I/O; um arquivo de teste por módulo em `tests/`.
- Nomes e mensagens de erro em português; `const` e `===` sempre.
- Entrada inválida lança `Error` com mensagem clara; nunca devolva resultado silenciosamente errado.

## Regras

- Rode `npm test` antes de dizer que terminou e cole o resultado.
- Não edite testes só para fazê-los passar.
- Mudanças pequenas; não crie arquivos fora do que foi pedido.
- Conteúdos sugeridos vêm de `src/catalogo.js`; nunca invente links ou materiais.
