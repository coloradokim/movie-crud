var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/movieRatings'),
    movies = db.get('movies'),
    qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');

routes.addRoute('/movie/new', function (req, res, url) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    var file = fs.readFileSync('templates/movies/new.html')
    var template = view.render(file.toString(), {})
    res.end(template)
  }
  if (req.method === 'POST') {
    var data = ''
    req.on('data', function (chunk) {
      data += chunk
    })
    req.on('end', function() {
      var movie = qs.parse(data)
      movie.insert(movie, function (err, doc) {
        if (err) throw err
        res.writeHead(302, {'Location': '/movies'})
        res.end()
      })
    })
  }
})

routes.addRoute('/movies', function (req, res, url) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    movies.find({}, function (err, docs) {
      var file = fs.readFileSync('templates/movies/index.html')
      var template = view.render(file.toString(), {movies: docs})
      res.end(template)
    })
  }
})
