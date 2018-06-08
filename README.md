# semver-store

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://travis-ci.org/delvedor/semver-store.svg?branch=master)](https://travis-ci.org/delvedor/semver-store)

An extremely fast semver based store.

## Install
```
npm i semver-store
```
## Usage
Use it is very easy, you just need to require the library and start adding values.
```js
const store = require('semver-store')()

store.set('1.2.0', { value: 42 })

console.log(store.get('1.2.0')) // { value: 42 }
```

### Why is fast?
Internally uses a prefix tree, which allows the search to be extremely performant.

## License

Licensed under [MIT](./LICENSE).
