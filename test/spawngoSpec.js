'use strict'

const test = require('ava')
const cp = require('child_process')
const sinon = require('sinon')

sinon.stub(cp, 'spawn', function (action, opts) {
  return [action, opts]
})
const Spawngo = require('../index')
let s = new Spawngo({
  user: 'user',
  pwd: 'password',
  db: 'database',
  collection: 'collection'
})

test('import() should spawn a new mongoimport process', function (t) {
  let stubReturn = s.import('foo.json')
  t.is(stubReturn[0], 'mongoimport')
})

test('export() should spawn a new mongoexport process using passed collection', function (t) {
  let stubReturn = s.export('foo')
  t.is(stubReturn[0], 'mongoexport')
  t.is(stubReturn[1].lastIndexOf('collection'), -1)
  t.is(stubReturn[1].lastIndexOf('foo') > -1, true)
})

test('export() should use config.collection if no collection is passed', function (t) {
  let stubReturn = s.export()
  t.is(stubReturn[1].lastIndexOf('collection') > -1, true)
})

test('export() should not update config if passsed a collection', function (t) {
  t.not(s.config.collection, 'foo')
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
