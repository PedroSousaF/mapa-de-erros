# Evidência — skill `relatorio-de-erros` (Semana 3)

## Comando

Pedido em linguagem natural, sem `/`, para testar se a `description` aciona a skill:

```bash
claude -p "analisa as respostas do estudante em exemplos/respostas.json e me diz onde ele está errando mais" \
  --allowedTools "Skill" "Read" "Bash(node src/cli.js:*)"
```

`--allowedTools` faz o papel das aprovações que, numa sessão interativa, você dá na hora.

## Ferramentas chamadas pelo agente

1. `Skill relatorio-de-erros` (a skill disparou pela `description`)
2. `Bash node src/cli.js exemplos/respostas.json`
3. `Read .claude/skills/relatorio-de-erros/reference.md`

## Resultado

> ## Seu mapa de erros
>
> **Comece por:** frações
>
> | tópico | acertos | prioridade | o que revisar |
> |---|---|---|---|
> | frações | 1 de 3 | Revisar agora | frações equivalentes; praticar soma de frações |
> | geometria | 1 de 2 | Reforçar (poucos dados) | área e perímetro |
>
> **Para o professor:** frações é o tópico mais crítico (67% de erro), mas só 3 questões sustentam essa conclusão.

## O que deu errado antes e como foi corrigido

| tentativa | problema | correção |
|---|---|---|
| 1 | O agente escolheu a skill, mas ela não carregou: a permissão para `Skill` foi negada (não havia quem aprovasse em `-p`). Sem as instruções, ele leu o código e montou um `node -e` próprio. | Na tentativa 4, liberar `Skill` em `--allowedTools`. |
| 2 | Mesmo problema de permissão; o agente leu o `SKILL.md` à mão. Também apontou uma contradição no exemplo do `reference.md` ("poucos dados" em um tópico com 3 questões). | `SKILL.md` passou a dar o comando exato e o caminho completo do `reference.md`. O exemplo foi corrigido. |
| 3 | A CLI rodou, mas a skill ainda não carregava, então o formato do `reference.md` foi ignorado. | Achei no log que o resultado de `Skill` era `is_error: true` (permissão). |
| 4 | Funcionou: skill, CLI e formato. | — |

Erro que sobrou na tentativa 4: o agente disse que tópicos sem erro não aparecem na CLI. É falso: `analisaErros` inclui esses tópicos e a CLI imprime "sem sugestões" para eles.
