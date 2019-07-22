const { db } = require('./db')

const newState = {
  "users": [],
  "bookSeries": [],
  "books": [],
  "userBookSeries": [],
  "userBooks": []
}

db.setState(newState).write()
