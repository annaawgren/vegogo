var async = require("async"),
	keystone = require("keystone");

var Place = keystone.list("Place");

/**
 * Based on code found here:
 * https://gist.github.com/JedWatson/9741171
 */

/**
 * List Posts
 */
exports.list = function(req, res) {
	let sortParam = req.query.sort || "published";

	let sort;
	switch (sortParam) {
		case "name":
			sort = { name: 1 };
			break;
		case "published":
		default:
			sort = { publishedDate: -1 };
	}

	Place.model
		.find()
		.sort(sort)
		.populate("foodTimes foodTypes")
		.exec(function(err, items) {
			if (err) return res.apiError("database error", err);

			res.apiResponse({
				places: items
			});
		});
};

/**
 * Get Post by ID
 * http://localhost:3131/api/place/id/5b158f4b16474ee5772d1113
 */
exports.getId = function(req, res) {
	Place.model
		.findById(req.params.id)
		.populate("foodTimes foodTypes")
		.exec(function(err, item) {
			if (err) return res.apiError("database error", err);
			if (!item) return res.apiError("not found");

			res.apiResponse({
				place: item
			});
		});
};

/**
 * Get Post by slug
 * http://localhost:3131/api/place/slug/minh-mat
 */
exports.getSlug = function(req, res) {
	Place.model
		.findOne({ slug: req.params.slug })
		.populate("foodTimes foodTypes")
		.exec(function(err, item) {
			if (err) return res.apiError("database error", err);
			if (!item) return res.apiError("not found");

			res.apiResponse({
				place: item
			});
		});
};
