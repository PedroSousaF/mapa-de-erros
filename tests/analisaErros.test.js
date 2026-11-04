import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { analisaErros, prioridade } from '../src/analisaErros.js';

const r = (topico, correta) => ({ questaoId: `${topico}${correta}`, topico, correta });

describe('analisaErros', () => {
  test('ordena tópicos do maior para o menor percentual de erro e sugere conteúdo', () => {
    const res = analisaErros([r('geometria', true), r('fracoes', false), r('fracoes', false)]);
    assert.equal(res[0].topico, 'fracoes');
    assert.equal(res[0].taxaErro, 1);
    assert.deepEqual(res[0].sugestoes, ['Revisar: frações equivalentes', 'Praticar: soma de frações']);
    assert.deepEqual(res[1].sugestoes, []);
  });

  test('tópico fora do catálogo não gera sugestão inventada', () => {
    assert.deepEqual(analisaErros([r('logaritmos', false)])[0].sugestoes, []);
  });

  test('lista vazia devolve lista vazia', () => {
    assert.deepEqual(analisaErros([]), []);
  });

  test('rejeita entrada inválida', () => {
    assert.throws(() => analisaErros('x'), /array/);
    assert.throws(() => analisaErros([{ topico: 'a' }]), /inválida/);
  });

  test('marca poucos dados só abaixo de 3 questões no tópico', () => {
    const res = analisaErros([r('a', false), r('a', true), r('b', false), r('b', true), r('b', true)]);
    assert.equal(res.find((t) => t.topico === 'a').poucosDados, true);
    assert.equal(res.find((t) => t.topico === 'b').poucosDados, false);
  });

  test('devolve a prioridade do tópico pela taxa de erro', () => {
    assert.equal(analisaErros([r('a', false), r('a', false), r('a', true)])[0].prioridade, 'Revisar agora');
  });
});

describe('prioridade', () => {
  test('aplica as faixas exatamente nos limites de 30% e 60%', () => {
    assert.equal(prioridade(1), 'Revisar agora');
    assert.equal(prioridade(0.6), 'Revisar agora');
    assert.equal(prioridade(0.59), 'Reforçar');
    assert.equal(prioridade(0.3), 'Reforçar');
    assert.equal(prioridade(0.29), 'Manter');
    assert.equal(prioridade(0), 'Manter');
  });
});
