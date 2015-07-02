var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/movieRatings'),
    movies = db.get('movies'),
    qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');
