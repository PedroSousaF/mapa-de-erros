# Referência — relatorio-de-erros

## Faixas de prioridade (pela taxa de erro do tópico)

| taxa de erro | prioridade | o que dizer |
|---|---|---|
| ≥ 60% | Revisar agora | o tópico é a maior dificuldade; comece por ele |
| 30%–59% | Reforçar | entende a base, mas erra com frequência |
| < 30% | Manter | domina; só revisar se sobrar tempo |

Tópico com menos de 3 questões: marque "poucos dados" ao lado da prioridade, porque 1 erro em 2 questões não é padrão.

## Tom

- Português simples, sem jargão; fale com o estudante na segunda pessoa ("você").
- Nada de culpa ("você é ruim em…"); descreva o padrão ("você errou 2 de 3 questões de frações").
- Se a CLI disser "sem sugestões", escreva "peça ao professor um material de revisão" em vez de inventar.

## Formato de saída

```markdown
## Seu mapa de erros

**Comece por:** <tópico de maior prioridade>

| tópico | acertos | prioridade | o que revisar |
|---|---|---|---|
| frações | 1 de 3 | Revisar agora | frações equivalentes; soma de frações |
| geometria | 1 de 2 | Reforçar (poucos dados) | área e perímetro |

**Para o professor:** <1 frase com o tópico mais crítico e quantas questões sustentam essa conclusão>
```
