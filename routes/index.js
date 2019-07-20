const express = require('express')
const router = express.Router()
const {
  findOne,
  insertOne
} = require('../db')
const {
  getFromBody,
  log,
  makeHash
} = require('../utils')
const {
  __,
  concat,
  isNil,
  path
} = require('ramda')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { errors: [] })
})

/* POST new user. */
router.post('/signup', function(req, res, next) {
  const body = getFromBody(req)
  // Generate hash for the email address
  const hashEmail = makeHash(body('email'))
  // Find corresponding user with this email
  const existingEmail = findOne('users', { hashEmail })
  // If email does not exist, we will create a new user
  if (isNil(existingEmail)) {
    // Generate hash for the email address and password
    const hash = makeHash(concat(body('email'), body('password')))
    // Create user with both hashes
    insertOne('users', { hash, hashEmail })
    // Set cookie for later use
    res.cookie('mangatek', hash)
    // Redirect to the user new collection
    return res.redirect('/my-collection')
    // Else the email already exist and we reject the user creation
  } else {
    // Return to home page with an error message
    return res.render('index', { errors: [{ element: 'signup', message: 'The email addresss already exists.' }] })
  }
})

router.post('/login', function(req, res, next) {
  const body = getFromBody(req)
  // Generate hash for the email address and password
  const hash = makeHash(concat(body('email'), body('password')))
  // Find corresponding user with this email and password
  const existingUser = findOne('users', { hash })
  // If credentials do not link us to a user
  if (isNil(existingUser)) {
    // Return to home page with an error message
    return res.render('index', { errors: [{ element: 'login', message: 'Credentials invalid.' }] })
    // Else the credentials are legit
  } else {
    // Set cookie for later use
    res.cookie('mangatek', hash)
    // Redirect to her collection
    return res.redirect('/my-collection')
  }
})

module.exports = router
