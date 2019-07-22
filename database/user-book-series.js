const {
  assoc,
  compose,
  identity,
  ifElse,
  isEmpty,
  map,
  prop
} = require('ramda')
const { find } = require('./db')

function getUserCollection(userId) {
  return compose(
    ifElse(
      isEmpty,
      identity,
      map(cur => assoc(
        'hasPart',
        find('userBooks', {
          query: {
            isPartOf: prop('id', cur),
            userId: prop('userId', cur)
          },
          limit: 1000
        }),
        cur
      ))
    ),
    userId => find('userBookSeries', { query: { userId } })
  )(userId)
}

exports.getUserCollection = getUserCollection
