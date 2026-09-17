import test from 'node:test';
import assert from 'node:assert/strict';

import { canAccessRoute } from './routeAccess.js';

test('authenticated users can access protected dashboard routes', () => {
  assert.equal(canAccessRoute({ isAuthenticated: true, path: '/dashboard' }), true);
  assert.equal(canAccessRoute({ isAuthenticated: true, path: '/projects' }), true);
});

test('unauthenticated users are blocked from protected routes', () => {
  assert.equal(canAccessRoute({ isAuthenticated: false, path: '/dashboard' }), false);
  assert.equal(canAccessRoute({ isAuthenticated: false, path: '/projects' }), false);
});

test('public auth pages remain accessible to guests', () => {
  assert.equal(canAccessRoute({ isAuthenticated: false, path: '/login' }), true);
  assert.equal(canAccessRoute({ isAuthenticated: true, path: '/login' }), false);
  assert.equal(canAccessRoute({ isAuthenticated: false, path: '/register' }), true);
});
