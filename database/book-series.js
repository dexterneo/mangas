const {
  __,
  addIndex,
  compose,
  inc,
  map,
  merge,
  prop,
  repeat
} = require('ramda')
const shortid = require('shortid')
const {
  insertMany,
  insertOne
} = require('./db')

const mapIndexed = addIndex(map)

function createBookSerie(content) {
  const p = prop(__, content)

  const bookSerieSchema = {
    name: p('name'),
    id: shortid.generate()
  }

  const booksSchema = compose(
    mapIndexed((cur, index) => merge(cur, { id: shortid.generate(), tomeNumber: inc(index) })),
    c => repeat({ isPartOf: prop('id', bookSerieSchema) }, p('nbTomes'))
  )(content)

  insertOne('bookSeries', bookSerieSchema)
  insertMany('books', booksSchema)

  return [bookSerieSchema, booksSchema]
}

exports.createBookSerie = createBookSerie
