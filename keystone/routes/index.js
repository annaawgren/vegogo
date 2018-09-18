/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require("keystone");
var middleware = require("./middleware");
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes("./views"),
	api: importRoutes("./api")
};

// Setup Route Bindings
exports = module.exports = function(app) {
	// Views
	app.get("/", routes.views.index);
	// app.get("/blog/:category?", routes.views.blog);
	// app.get("/blog/post/:post", routes.views.post);
	// app.all("/contact", routes.views.contact);

	app.get(
		"/api/place/list",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.places.list
	);

	app.get(
		"/api/place/list/area/:slug",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.places.listArea
	);

	app.get(
		"/api/place/list/geo/",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.places.listGeo
	);

	app.get(
		"/api/place/id/:id",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.places.getId
	);

	app.get(
		"/api/place/slug/:slug",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.places.getSlug
	);

	app.get(
		"/api/area/list",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.areas.list
	);

	app.get(
		"/api/area/listCities",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.areas.listCities
	);

	app.get(
		"/api/area/id/:id",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.areas.getId
	);

	app.get(
		"/api/area/slug/:slug",
		keystone.middleware.cors,
		keystone.middleware.api,
		routes.api.areas.getSlug
	);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	// app.get(
	// 	'/api/:list/:format(export.csv|export.json)',
	// 	middleware.initList,
	// 	require('keystone/admin/server/api/list/download')
	// );
};
