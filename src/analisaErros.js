import { catalogo as catalogoPadrao } from './catalogo.js';

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
    .map((t) => ({ ...t, taxaErro: t.erros / t.total, sugestoes: t.erros > 0 ? (catalogo[t.topico] ?? []) : [] }))
    .sort((a, b) => b.taxaErro - a.taxaErro || b.erros - a.erros);
}
