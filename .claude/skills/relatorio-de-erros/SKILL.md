---
name: relatorio-de-erros
description: Gera um relatório de padrões de erro de um estudante a partir de um arquivo JSON de respostas (questaoId, topico, correta), dizendo em quais tópicos ele mais erra e o que revisar primeiro. Use quando pedirem para analisar respostas, provas ou listas de um estudante, diagnosticar onde ele erra, ou invocarem /relatorio-de-erros.
allowed-tools: Read, Bash(node src/cli.js:*)
---

# Relatório de erros

## Entrada

`$ARGUMENTS` é o caminho de um JSON de respostas (ex.: `exemplos/respostas.json`). Se vier vazio, pergunte qual arquivo usar.

## Passos

1. Rode exatamente `node src/cli.js <arquivo>`. Não leia o código nem monte outro comando: a CLI já faz a análise. Se ela sair com erro, mostre a mensagem e pare.
2. Leia `.claude/skills/relatorio-de-erros/reference.md` e escreva o relatório com as faixas de prioridade, o tom e o formato de lá.
3. Não edite arquivos. Sugestões de revisão vêm só da saída da CLI; nunca invente materiais.
