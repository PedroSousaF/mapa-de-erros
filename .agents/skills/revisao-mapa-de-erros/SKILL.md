---
name: revisao-mapa-de-erros
description: Checklist de code review do mapa-de-erros — o que olhar num diff que lint, typecheck e testes não pegam (fronteira src/ sem I/O, sugestões só do catálogo, entrada inválida que lança Error, teste que confere o cenário de verdade, termos do domínio) e o formato dos achados. Use ao revisar uma PR ou um diff deste repositório.
---

# Revisão do mapa-de-erros

O CI já roda lint, typecheck, build e testes. Não repita o que eles pegam (estilo,
tipo, teste vermelho). Olhe só o que está abaixo, e só nas linhas que o diff muda
ou que dependem delas.

## O que olhar

1. **Fronteira de I/O.** `src/cli.js` é o único arquivo que lê disco, `process.argv`
   ou escreve no console. Qualquer outro arquivo de `src/` tem que ser função pura:
   recebe dados, devolve dados.
2. **Sugestão inventada.** Todo conteúdo de revisão sugerido vem de `src/catalogo.js`.
   Texto de material, link ou nome de conteúdo escrito fora do catálogo é bloqueio.
3. **Resultado silenciosamente errado.** Entrada inválida (não array, resposta sem
   `topico` string ou sem `correta` boolean, valor fora da faixa) tem que lançar `Error`
   com mensagem em português. Devolver lista vazia, `NaN`, `undefined` ou um padrão
   "para não quebrar" é bloqueio.
4. **Teste que não confere o cenário.** Para cada comportamento novo ou alterado no
   diff, existe teste em `tests/` que falharia se a regra estivesse errada? Desconfie
   de `assert.ok(x)`, de teste que só confere o tamanho da lista e de faixa de valores
   testada só no meio (limites como 30% e 60% precisam de caso exatamente no limite).
5. **Termos do domínio.** Use os nomes que o projeto já usa: resposta, tópico,
   taxa de erro, sugestões, catálogo; e as prioridades de
   `.claude/skills/relatorio-de-erros/reference.md` ("Revisar agora", "Reforçar",
   "Manter", "poucos dados"). Sinônimo novo para algo que já tem nome é sugestão.

## Como classificar cada achado

- **bloqueia**: quebra um dos itens 1–3, ou comportamento novo sem teste que o prove.
- **sugestão**: melhora, mas a PR pode entrar sem ela.
- **dúvida**: você não tem como decidir lendo o código; diga o que precisaria saber.

Só aponte o que você consegue mostrar numa linha do diff ou do código que ele toca.
Se não achou nada num item, diga "nada encontrado"; não invente achado para preencher.

## Formato da saída

Markdown, pronto para virar comentário na PR:

```markdown
## Revisão do agente `revisor`

**PR:** #<número> — <título>
**Resumo:** <1 frase sobre o que a PR faz> · <n> achados (<b> bloqueia, <s> sugestão, <d> dúvida)

| # | classe | arquivo:linha | problema | por que importa |
|---|---|---|---|---|
| 1 | bloqueia | src/x.js:12 | ... | ... |

**Itens do checklist sem achado:** <lista>
```

A linha é a do arquivo **depois** da mudança (lado direito do diff).
