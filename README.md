# diagnostico-erros

## O problema

Muitos estudantes erram o mesmo tipo de questão várias vezes e não sabem por quê. Eles só veem a nota,
não o padrão por trás dela. Os professores também não têm tempo de olhar prova por prova para descobrir
onde a turma trava. Este projeto olha o histórico de respostas, mostra em quais assuntos cada estudante
mais erra e indica o que revisar primeiro. Assim, o estudo deixa de ser tentativa e erro e o professor
sabe onde ajudar.

## Uso

```js
import { analisaErros } from './src/analisaErros.js';
analisaErros([{ questaoId: 'q1', topico: 'fracoes', correta: false }]);
```

`npm test` roda os testes. O prompt usado para gerar o esqueleto está em `docs/prompt-esqueleto.md`.
