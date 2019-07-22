const {
  path,
  prop
} = require('ramda')

function getCookieValue(req) {
  return path(['cookies', 'mangatek'], req)
}

function getFromBody(req) {
  const body = prop('body', req)

  return function(property) {
    return prop(property, body)
  }
}

function log(content) {
  console.log(...arguments)

  return content
}

exports.getCookieValue = getCookieValue
exports.getFromBody = getFromBody
exports.log = log
