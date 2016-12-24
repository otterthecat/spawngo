'use strict'

const test = require('ava')
const cp = require('child_process')
const sinon = require('sinon')

sinon.stub(cp, 'spawn', function (action, opts) {
  return [action, opts]
})
const Spawngo = require('../index')
let s = new Spawngo()

test('import() should spawn a new mongoimport process', function (t) {
  let stubReturn = s.import('foo.json')
  t.is(stubReturn[0], 'mongoimport')
})

test('export() should spawn a new mongoexport process', function (t) {
  let stubReturn = s.export('foo')
  t.is(stubReturn[0], 'mongoexport')
})

test('set() should update config when passed an object ', function (t) {
  s.set({user: 'foo', pwd: 'bar'})

  t.is(s.config.user, 'foo')
  t.is(s.config.pwd, 'bar')
})

test('set() should update config when passed key/value strings', function (t) {
  s.set('collection', 'meh')

  t.is(s.config.collection, 'meh')
})

test('set() should return an error if passed invalid data', function (t) {
  var returnValue = s.set()
  t.is(returnValue instanceof Error, true)
})
