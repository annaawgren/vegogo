var async = require("async"),
	keystone = require("keystone");

var Place = keystone.list("Place");

/**
 * List Posts
 */
exports.list = function(req, res) {
	Place.model
		.find()
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
 */
exports.get = function(req, res) {
	Place.model.findById(req.params.id).exec(function(err, item) {
		if (err) return res.apiError("database error", err);
		if (!item) return res.apiError("not found");

		res.apiResponse({
			place: item
		});
	});
};
