import test from 'node:test';
import assert from 'node:assert/strict';
import { projects, filterProjects, selectPublicRepositories } from '../src/data/projects.js';

test('a seleção funciona offline e cada projeto tem um estudo verificável', () => {
  assert.ok(projects.length >= 3);
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const project of projects) {
    assert.match(project.repo, /^https:\/\/github.com\/ViniciusMarchan\//);
    assert.ok(project.stack.length && project.context && project.decisions && project.role);
  }
});
test('filtra por categoria e permite voltar à seleção completa', () => {
  assert.equal(filterProjects(projects, 'Todos').length, projects.length);
  assert.ok(filterProjects(projects, 'Backend').every(p => p.category === 'Backend'));
  assert.deepEqual(filterProjects(projects, 'inexistente'), []);
});
test('repositórios extras excluem privados, forks, arquivados e selecionados', () => {
  const repo = { name: 'extra', html_url: 'https://github.com/ViniciusMarchan/extra', private: false, fork: false };
  assert.deepEqual(selectPublicRepositories([repo, {...repo, private: true}, {...repo, fork: true}, {...repo, archived: true}, {...repo, name: 'API-Payment'}]), [repo]);
  assert.deepEqual(selectPublicRepositories(null), []);
});
