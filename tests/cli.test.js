import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const cli = (...args) => spawnSync(process.execPath, ['src/cli.js', ...args], { encoding: 'utf8' });

test('imprime uma linha por tópico, do maior para o menor percentual de erro', () => {
  const { stdout, status } = cli('exemplos/respostas.json');
  assert.equal(status, 0);
  assert.equal(
    stdout,
    'fracoes: 2/3 erros (67%) -> Revisar: frações equivalentes; Praticar: soma de frações\n' +
      'geometria: 1/2 erros (50%) -> Revisar: área e perímetro\n',
  );
});

test('sem argumento ou com arquivo inexistente falha com mensagem clara', () => {
  const a = cli();
  assert.equal(a.status, 1);
  assert.match(a.stderr, /uso:/);
  const b = cli('nao-existe.json');
  assert.equal(b.status, 1);
  assert.match(b.stderr, /não foi possível ler/);
});
