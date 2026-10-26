import { readFileSync } from 'node:fs';
import { analisaErros } from './analisaErros.js';

try {
  const caminho = process.argv[2];
  if (!caminho) throw new Error('uso: node src/cli.js <arquivo-de-respostas.json>');
  let respostas;
  try {
    respostas = JSON.parse(readFileSync(caminho, 'utf8'));
  } catch (e) {
    throw new Error(`não foi possível ler o JSON de "${caminho}": ${e.message}`);
  }
  for (const t of analisaErros(respostas)) {
    const sugestoes = t.sugestoes.length > 0 ? t.sugestoes.join('; ') : 'sem sugestões';
    console.log(`${t.topico}: ${t.erros}/${t.total} erros (${Math.round(t.taxaErro * 100)}%) -> ${sugestoes}`);
  }
} catch (e) {
  console.error(`Erro: ${e.message}`);
  process.exitCode = 1;
}
