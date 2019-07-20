const express = require('express')
const router = express.Router()
const { find } = require('../db')
const {
  compose
} = require('ramda')
const {
  getCookieValue,
  log
} = require('../utils')

router.get('/', function(req, res, next) {
  const userCollection = compose(
    hash => find('bookSeries', { query: hash }),
    getCookieValue
  )(req)
  return res.render('my-collection', { errors: [] })
})

module.exports = router
