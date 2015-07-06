var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/movieRatings'),
    movies = db.get('movieRatings'),
    qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');

module.exports = {
  new:  function (req, res, url) {
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
  },

  index: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      movies.find({}, function (err, docs) {
        var file = fs.readFileSync('templates/movies/index.html')
        var template = view.render(file.toString(), {movies: docs})
        res.end(template)
      })
    }
  },

  show: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      movies.findOne({_id: url.params.id}, function (err, movie) {
        var file = fs.readFileSync('templates/movies/show.html')
        var template = view.render(file.toString(), {movies: movie})
        if (err) throw err
        res.end(template)
      })
    }
  },

  edit: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      movies.findOne({_id: url.params.id}, function(err, movie){
        if (err) throw err
          var file = fs.readFileSync('templates/movies/edit.html')
          var template = view.render(file.toString(), {movies: movie})
          res.end(template)
      })
    }
  },

  update: function(req, res, url) {
    if (req.method === 'POST') {
    var data = ''
    req.on('data', function (chunk) {
      data += chunk
    })
    req.on('end', function () {
      var movie = qs.parse(data)
      movies.update({_id: url.params.id}, movie, function(err, movie) {
        if (err) throw err
        res.writeHead(302, {'Location': '/movies'})
        res.end()
        })
      })
    }
  },

  destroy: function(req, res, url) {
   if (req.method === 'POST') {
     movies.remove({_id: url.params.id}, function (err, doc) {
       if (err) throw err
       res.writeHead(302, {'Location': '/movies'})
       res.end()
     })
   }
 }

}// final curly brace
