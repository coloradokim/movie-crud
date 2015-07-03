var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/movieRatings'),
    movies = db.get('movieRatings'),
    qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');

//  CREATE
routes.addRoute('/movies/new', function (req, res, url) {
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
      movies.insert(movie, function (err, doc) {
        if (err) throw err
        res.writeHead(302, {'Location': '/movies'})
        res.end()
      })
    })
  }
})

//  READ
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

routes.addRoute('/movies/:id', function (req, res, url) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    movies.findOne({_id: url.params.id}, function (err, movie) {
      var file = fs.readFilySync('templates/movies/show.html')
      var template = view.render(file.toString(), {movies: movie})
      if (err) throw err
      res.end(template)
    })
  }
})

//  UPDATE
routes.addRoute('/movies/:id/edit', function (req, res, url) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    bands.findOne({_id: url.params.id}, function(err, doc){
    var file = fs.readFileSync('templates/movies/edit.html')
    var template = view.render(file.toString(), doc)
      res.end(template)
    })
  }
})

routes.addRoute('/movies/:id/update', function(req, res, url) {
  if (req.method === 'POST') {
  var data = '' ///query string coming in from the form
  req.on('data', function (chunk) {
    data += chunk
  })

  req.on('end', function () {
    var band = qs.parse(data)
    bands.update({_id: url.params.id}, band, function(err,doc) {
      if (err) throw err
      res.writeHead(302, {'Location': '/bands'})
      res.end()
      })
    })
  }
})

routes.addRoute('/public/*', function (req, res, url) {
  res.setHeader('Content-Type', mime.lookup(req.url))
  fs.readFile('.' + req.url, function (err, file) {
    if (err) {
      res.setHeader('Content-Type', 'text/html')
      res.end('404')
    }
    res.end(file)
  })
})
// DESTROY
routes.addRoute('/movies/:id/delete', function(req, res, url) {
  if (req.method === 'POST') {
    movies.remove({_id: url.params.id}, function (err, doc) {
      if (err) throw err
      res.writeHead(302, {'Location': '/movies'})
      res.end()
    })
  }
})

module.exports = routes
