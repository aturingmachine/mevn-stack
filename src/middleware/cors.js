function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'X-requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization'
  )
  res.header('Access-Control-Max-Age', '10000')

  next()
}

module.exports = { cors }
