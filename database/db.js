const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
const {
  __,
  assoc,
  compose,
  curry,
  identity,
  ifElse,
  isNil,
  map,
  merge,
  prop
} = require('ramda')

const adapter = new FileSync('mangatek.json')
const db = low(adapter)

db.defaults({ users: [], bookSeries: [], books: [], userBookSeries: [], userBooks: [] }).write()

function find(collection, config) {
  const p = compose(
    prop(__),
    merge({
      query: '',
      sort: 'name',
      limit: 20
    })
  )(config)

  return db.get(collection)
    .filter(p('query'))
    .sortBy(p('sort'))
    .take(p('limit'))
    .value()
}

function findOne(collection, query) {
  return db.get(collection)
    .find(query)
    .value()
}

function getUserId(hash) {
  return prop('id', findOne('users', { hash }))
}

function contentWithId(content) {
  return ifElse(
    c => isNil(prop('id', c)),
    c => assoc('id', shortid.generate(), c),
    identity
  )(content)
}

function insertOne(collection, content) {
  return db.get(collection)
    .push(contentWithId(content))
    .write()
    .id
}

function insertMany(collection, list) {
  return db.get(collection)
    .push(map(contentWithId, list))
    .write()
}

exports.db = db
exports.find = curry(find)
exports.findOne = curry(findOne)
exports.getUserId = getUserId
exports.insertMany = curry(insertMany)
exports.insertOne = curry(insertOne)
