var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/movieRatings'),
    movies = db.get('movieRatings'),
    // qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');

module.exports = {
  home: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      movies.find({}, function (err, docs) {
        var file = fs.readFileSync('templates/movies/landing.html')
        var template = view.render(file.toString(), {movies: docs})
        res.end(template)
      })
    }
  },
  splat: function (req, res, url) {
    res.setHeader('Content-Type', mime.lookup(req.url))
    fs.readFile('.' + req.url, function (err, file) {
      if (err) {
        res.setHeader('Content-Type', 'text/html')
        res.end('404')
      }
      res.end(file)
    })
  }
}// final curly brace
