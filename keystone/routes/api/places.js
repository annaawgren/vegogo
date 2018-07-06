var async = require("async");
var keystone = require("keystone");
var cloudinary = require("cloudinary");
var Place = keystone.list("Place");
var apiConfig = require("../../api-config");

/**
 * Based on code found here:
 * https://gist.github.com/JedWatson/9741171
 */

function getPlaceImage(place) {
	let imageUrl = `${apiConfig.IMAGES_URL}/places/${place.image.filename}`;
	let image = cloudinary.url(imageUrl, {
		type: "fetch",
		secure: true,
		width: 150,
		height: 150,
		crop: "thumb",
		gravity: "face",
		radius: 20
	});

	return image;
}

/**
 * List Places
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

			items = items.map(place => {
				let imageThumb = place.vImageThumb;
				place = place.toJSON();
				place.imageThumb = imageThumb;
				return place;
			});

			res.apiResponse({
				places: items
			});
		});
};

/**
 * Get Place by ID
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
 * Get Place by slug
 * http://localhost:3131/api/place/slug/minh-mat
 */
exports.getSlug = function(req, res) {
	Place.model
		.findOne({ slug: req.params.slug })
		.populate("foodTimes foodTypes")
		.exec(function(err, item) {
			if (err) return res.apiError("database error", err);
			if (!item) return res.apiError("not found");

			console.log("imageThumb", item.imageThumb);

			res.apiResponse({
				place: item
			});
		});
};
