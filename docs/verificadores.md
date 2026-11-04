# Verificadores (semana 8)

## Os 4 sensores (`package.json`)

| script | o que roda | quando falha |
|---|---|---|
| `lint` | `eslint .` (regras recomendadas do ESLint) | variável não usada, erro sem `cause` etc. |
| `typecheck` | `tsc --noEmit`: TypeScript checando o JS (`checkJs`) | tipo errado, propriedade inexistente |
| `build` | `tsc -p tsconfig.build.json` gera `dist/` | `src/` não compila |
| `test` | `node --test` | algum teste cai |

`npm run verify` roda os 4 em sequência; é o que rodo antes de dar push.

## CI

`.github/workflows/ci.yml` (copiado do starter da aula 15) roda em todo push e PR para `main`:
`Lint`, `Type check`, `Build`, `Test` e `Dependency check: vulnerabilidade conhecida (npm audit)`.
O `dependency-review` só roda em PR.

## Branch protection

O repositório é público, então a proteção não depende de plano pago. Ruleset `proteger-main`
(Settings → Rules → Rulesets), ativo na branch padrão:

- exige Pull Request antes do merge (0 aprovações: projeto de uma pessoa só);
- exige os 5 status checks acima verdes;
- bloqueia force-push e exclusão da `main`.

Teste: um `git push` direto na `main` foi recusado pelo GitHub
(`GH013: Repository rule violations`), e esta mudança entrou pelo PR.
