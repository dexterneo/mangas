const express = require('express')
const router = express.Router()
const { getUserId } = require('../database/db')
const { getUserCollection } = require('../database/user-book-series')
const { createBookSerie } = require('../database/book-series')
const { compose } = require('ramda')
const {
  getCookieValue,
  getFromBody
} = require('./utils')

router.get('/', function(req, res, next) {
  const userCollection = compose(
    getUserCollection,
    getUserId,
    getCookieValue
  )(req)

  return res.render('my-collection', { userCollection, errors: [] })
})

router.post('/book-series/create', function(req, res, next) {
  const body = getFromBody(req)

  const bookSerie = {
    name: body('name'),
    nbTomes: body('nb-tomes')
  }

  createBookSerie(bookSerie)

  return res.redirect('/my-collection')
})

module.exports = router
