const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
const {
  __,
  assoc,
  compose,
  curry,
  head,
  identity,
  ifElse,
  is,
  isNil,
  merge,
  prop
} = require('ramda')

const adapter = new FileSync('mangatek.json')
const db = low(adapter)

db.defaults({ users: [], bookSeries: [], books: [] }).write()

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

function insertOne(collection, content) {
  const contentWithId = assoc('id', shortid.generate(), content)

  return db.get(collection)
    .push(contentWithId)
    .write()
}

exports.db = db
exports.findOne = curry(findOne)
exports.insertOne = curry(insertOne)
