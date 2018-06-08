'use strict'

function SemVerStore () {
  if (!(this instanceof SemVerStore)) {
    return new SemVerStore()
  }
  this.tree = new Node()
}

SemVerStore.prototype.set = function (semverString, store) {
  var currentNode = this.tree
  semverString = semverString.split('.')
  while (semverString.length) {
    const node = new Node(semverString.shift())
    currentNode = currentNode.addChild(node)
    continue
  }
  currentNode.setStore(store)
}

SemVerStore.prototype.get = function (semverString) {
  var node = this.tree
  var firstDot = semverString.indexOf('.')
  var secondDot = semverString.indexOf('.', firstDot + 1)
  var major = semverString.slice(0, firstDot)
  var minor = secondDot === -1
    ? semverString.slice(firstDot + 1)
    : semverString.slice(firstDot + 1, secondDot + 1)
  var patch = secondDot === -1
    ? 'x'
    : semverString.slice(secondDot + 1)

  node = node.getChild(major)
  if (node === null) return null
  node = node.getChild(minor)
  if (node === null) return null
  node = node.getChild(patch)
  if (node === null) return null
  return node.store
}

function Node (prefix, children, store) {
  this.prefix = Number(prefix) || 0
  this.children = children || null
  this.childrenPrefixes = children ? Object.keys(children) : []
  this.store = store || null
}

Node.prototype.getChild = function (prefix) {
  if (this.children === null) return null
  if (prefix === 'x') {
    const max = Math.max.apply(Math, this.childrenPrefixes)
    return this.children[max]
  }
  return this.children[Number(prefix)] || null
}

Node.prototype.addChild = function (node) {
  this.children = this.children || {}
  const child = this.getChild(node.prefix)
  if (child === null) {
    this.children[node.prefix] = node
    this.childrenPrefixes.push(node.prefix)
  }
  return child || node
}

Node.prototype.setStore = function (store) {
  this.store = store
}

module.exports = SemVerStore
