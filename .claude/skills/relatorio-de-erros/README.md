# Skill: relatorio-de-erros

Transforma o histórico de respostas de um estudante num relatório curto: em quais tópicos ele mais erra,
o que revisar primeiro e uma linha de resumo para o professor.

## Como usar

No Claude Code, dentro deste projeto:

```
/relatorio-de-erros exemplos/respostas.json
```

Ou peça em linguagem natural: "analisa as respostas em exemplos/respostas.json e me diz onde o estudante erra".

## Como copiar para o seu projeto

1. Copie a pasta `.claude/skills/relatorio-de-erros/` para o mesmo caminho no seu repositório.
2. A skill chama `node src/cli.js <arquivo>`, que imprime uma linha por tópico no formato
   `<topico>: <erros>/<total> erros (<pct>%) -> <sugestões>`. Se o seu projeto tiver outro comando,
   troque-o no `SKILL.md` e no `allowed-tools`.
3. Ajuste as faixas de prioridade e o tom em `reference.md` para a sua turma.

## Sobre o `allowed-tools`

`allowed-tools` **pré-aprova** as ferramentas listadas (o agente usa sem pedir permissão enquanto a skill
está ativa); ele não proíbe as outras. Quem impede a skill de editar arquivos é a instrução "Não edite
arquivos" do `SKILL.md`, e o que fica fora da lista continua pedindo a sua aprovação.

## Arquivos

- `SKILL.md`: quando a skill dispara e os passos (curto, entra no contexto ao ser acionada).
- `reference.md`: faixas de prioridade, tom e formato do relatório (lido só durante a execução).
