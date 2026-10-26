import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { analisaErros } from '../src/analisaErros.js';

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
});
