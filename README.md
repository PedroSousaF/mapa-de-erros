# mapa-de-erros

[![CI](https://github.com/PedroSousaF/mapa-de-erros/actions/workflows/ci.yml/badge.svg)](https://github.com/PedroSousaF/mapa-de-erros/actions/workflows/ci.yml)

Ferramenta de linha de comando em Node.js que lê o histórico de respostas de um estudante e mostra em quais assuntos ele mais erra e o que revisar primeiro.

## O problema

Muitos estudantes erram o mesmo tipo de questão várias vezes e não sabem por quê. Eles só veem a nota,
não o padrão por trás dela. Os professores também não têm tempo de olhar prova por prova para descobrir
onde a turma trava. Este projeto olha o histórico de respostas, mostra em quais assuntos cada estudante
mais erra e indica o que revisar primeiro. Assim, o estudo deixa de ser tentativa e erro e o professor
sabe onde ajudar.

## Como funciona

1. `src/cli.js` lê o arquivo JSON passado na linha de comando e entrega a lista de respostas para `analisaErros`.
2. `analisaErros` (`src/analisaErros.js`) confere cada resposta: tem que ter `topico` (texto) e `correta` (verdadeiro ou falso). Se alguma estiver errada, ela lança um erro em vez de devolver um resultado errado.
3. Em seguida, agrupa as respostas por tópico, conta o total e os erros e calcula a taxa de erro de cada tópico.
4. Para tópicos com pelo menos um erro, busca sugestões de revisão em `src/catalogo.js`. Tópico que não está no catálogo fica sem sugestão: nada é inventado.
5. Dá a cada tópico uma prioridade pela taxa de erro (função `prioridade`): **Revisar agora** a partir de 60%, **Reforçar** a partir de 30% e **Manter** abaixo disso. Tópicos com menos de 3 questões são marcados com **poucos dados**, porque a taxa ainda é pouco confiável.
6. Ordena os tópicos da maior para a menor taxa de erro, e a CLI imprime uma linha por tópico.

## Tecnologias

- **Node.js** com módulos ES (`import`/`export`), sem dependências em tempo de execução
- **node:test** e **node:assert** (o executor de testes que já vem no Node)
- **ESLint**, para análise estática
- **TypeScript**, usado só para checar os tipos do código JavaScript e gerar o build (`dist/`)
- **GitHub Actions**, para integração contínua

## Como rodar

Pré-requisito: Node.js 18 ou mais novo para rodar a CLI e os testes. O `npm run verify` usa o ESLint 10, que pede Node.js 20.19 ou mais novo; o CI roda no Node.js 22.

```bash
git clone https://github.com/PedroSousaF/mapa-de-erros.git
cd mapa-de-erros
npm install
npm test
node src/cli.js exemplos/respostas.json
```

## Uso

```js
import { analisaErros } from './src/analisaErros.js';
analisaErros([{ questaoId: 'q1', topico: 'fracoes', correta: false }]);
```

`npm test` roda os testes. O prompt usado para gerar o esqueleto está em `docs/prompt-esqueleto.md`.

Pela linha de comando: `node src/cli.js exemplos/respostas.json`.

## Exemplo

Entrada (`exemplos/respostas.json`):

```json
[
  { "questaoId": "q1", "topico": "fracoes", "correta": false },
  { "questaoId": "q2", "topico": "fracoes", "correta": false },
  { "questaoId": "q3", "topico": "fracoes", "correta": true },
  { "questaoId": "q4", "topico": "geometria", "correta": true },
  { "questaoId": "q5", "topico": "geometria", "correta": false }
]
```

Saída de `node src/cli.js exemplos/respostas.json`:

```text
fracoes: 2/3 erros (67%) [Revisar agora] -> Revisar: frações equivalentes; Praticar: soma de frações
geometria: 1/2 erros (50%) [Reforçar, poucos dados] -> Revisar: área e perímetro
```

## Testes e qualidade

`npm run verify` roda, em sequência:

| etapa | comando | o que checa |
|---|---|---|
| lint | `eslint .` | erros comuns e más práticas no código |
| typecheck | `tsc --noEmit` | tipos do JavaScript, checados pelo TypeScript |
| build | `tsc -p tsconfig.build.json` | se `src/` compila para `dist/` |
| test | `node --test` | testes de `analisaErros` e da CLI |

O GitHub Actions (`.github/workflows/ci.yml`) roda lint, typecheck, build e testes em todo push e pull request para a `main`. Ele também roda o `npm audit`, que procura vulnerabilidades conhecidas nas dependências, e, nos pull requests, a revisão de dependências. A branch `main` é protegida: só recebe mudanças por pull request, e só com esses checks verdes. Detalhes em [`docs/verificadores.md`](docs/verificadores.md).

## Como foi feito

Desenvolvido na especialização em Inteligência Artificial da Programadores do Amanhã, usando o Claude Code. O prompt usado para gerar o esqueleto do projeto está em [`docs/prompt-esqueleto.md`](docs/prompt-esqueleto.md).

Meu papel: eu pensei o problema, as regras e o prompt; o Claude Code escreveu o código e eu revisei e aprovei cada PR. Defini o problema (a seção "O problema"), escrevi o prompt do esqueleto e as regras do `CLAUDE.md`, e decidi as faixas de prioridade (60% e 30%) e o aviso de poucos dados.

## Autor

Pedro de Sousa Freitas — [linkedin.com/in/pedrosousafdev](https://linkedin.com/in/pedrosousafdev)
