const jsSHA = require("jssha")
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

function makeHash(content) {
  const shaObj = new jsSHA("SHA-512", "TEXT")

  shaObj.update(content)

  return shaObj.getHash("HEX")
}

exports.getCookieValue = getCookieValue
exports.getFromBody = getFromBody
exports.log = log
exports.makeHash = makeHash
