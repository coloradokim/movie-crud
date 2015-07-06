var routes = require('routes') (),
    movieRoutes = require('./routes/movie'),
    siteRoutes = require('./routes/site');

//  movieRoutes
routes.addRoute('/movies/new', movieRoutes.new)
routes.addRoute('/movies', movieRoutes.index)
routes.addRoute('/movies/:id', movieRoutes.show)
routes.addRoute('/movies/:id/edit', movieRoutes.edit)
routes.addRoute('/movies/:id/update', movieRoutes.update)
routes.addRoute('/movies/:id/delete', movieRoutes.destroy)

//  siteRoutes
routes.addRoute('/', siteRoutes.home)
routes.addRoute('/public/*', siteRoutes.splat)

module.exports = routes
