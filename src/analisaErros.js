import { catalogo as catalogoPadrao } from './catalogo.js';

// Faixas de .claude/skills/relatorio-de-erros/reference.md.
const MINIMO_DE_QUESTOES = 3;

export function prioridade(taxaErro) {
  if (typeof taxaErro !== 'number' || !(taxaErro >= 0 && taxaErro <= 1)) {
    throw new Error('taxa de erro inválida: esperado número entre 0 e 1');
  }
  if (taxaErro >= 0.6) return 'Revisar agora';
  if (taxaErro >= 0.3) return 'Reforçar';
  return 'Manter';
}

// Agrupa respostas por tópico e ordena do maior para o menor percentual de erro.
export function analisaErros(respostas, catalogo = catalogoPadrao) {
  if (!Array.isArray(respostas)) throw new Error('respostas deve ser um array');

  const porTopico = new Map();
  for (const r of respostas) {
    if (!r || typeof r.topico !== 'string' || r.topico === '' || typeof r.correta !== 'boolean') {
      throw new Error('resposta inválida: esperado { topico: string, correta: boolean }');
    }
    const t = porTopico.get(r.topico) ?? { topico: r.topico, total: 0, erros: 0 };
    t.total += 1;
    if (!r.correta) t.erros += 1;
    porTopico.set(r.topico, t);
  }

  return [...porTopico.values()]
    .map((t) => {
      const taxaErro = t.erros / t.total;
      return {
        ...t,
        taxaErro,
        prioridade: prioridade(taxaErro),
        poucosDados: t.total < MINIMO_DE_QUESTOES,
        sugestoes: t.erros > 0 ? (catalogo[t.topico] ?? []) : [],
      };
    })
    .sort((a, b) => b.taxaErro - a.taxaErro || b.erros - a.erros);
}
