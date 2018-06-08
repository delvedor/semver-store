'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

const semver = require('semver')
const store = require('./index')()
store.set('1.2.3', null)

suite
  .add('semver-store - full', function () {
    store.get('1.2.3')
  })
  .add('semver - full', function () {
    semver.satisfies('1.2.3', '1.2.3')
  })

  .add('semver-store - wildcard', function () {
    store.get('1.x')
  })
  .add('semver - wildcard', function () {
    semver.satisfies('1.2.3', '1.x')
  })

  .add('semver-store - no patch', function () {
    store.get('1.2')
  })
  .add('semver - no patch', function () {
    semver.satisfies('1.2.3', '1.2')
  })

  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()
