const JsSHA = require('jssha')

function makeHash(content) {
  const shaObj = new JsSHA('SHA-512', 'TEXT')

  shaObj.update(content)

  return shaObj.getHash('HEX')
}

exports.makeHash = makeHash
