var async = require("async");
var keystone = require("keystone");
var cloudinary = require("cloudinary");
var Place = keystone.list("Place");
var apiConfig = require("../../api-config");

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
				place = place.toJSON();

				// Single image.
				place.imageThumb = cloudinaryImageToURL(place.image);
				delete place.image;

				// Multiple images.
				place.imagesThumbs = [];
				place.images.forEach(image => {
					place.imagesThumbs.push(cloudinaryImageToURL(image));
				});
				delete place.images;

				return place;
			});

			res.apiResponse({
				places: items
			});
		});
};

function cloudinaryImageToURL(image) {
	if (!image || !image.public_id) {
		return null;
	}

	return cloudinary.url(image.public_id, {
		secure: true,
		width: 640
	});
}

/**
 * Get Place by ID
 * http://localhost:3131/api/place/id/5b158f4b16474ee5772d1113
 */
exports.getId = function(req, res) {
	Place.model
		.findById(req.params.id)
		.populate("foodTimes foodTypes")
		.exec(function(err, place) {
			if (err) return res.apiError("database error", err);
			if (!place) return res.apiError("not found");

			place = place.toJSON();

			place.imageThumb = cloudinaryImageToURL(place.image);
			delete place.image;

			place.imagesThumbs = [];
			place.images.forEach(image => {
				place.imagesThumbs.push(cloudinaryImageToURL(image));
			});
			delete place.images;

			res.apiResponse({
				place
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
		.exec(function(err, place) {
			if (err) return res.apiError("database error", err);
			if (!place) return res.apiError("not found");

			place = place.toJSON();

			place.imageThumb = cloudinaryImageToURL(place.image);
			delete place.image;

			place.imagesThumbs = [];
			place.images.forEach(image => {
				place.imagesThumbs.push(cloudinaryImageToURL(image));
			});
			delete place.images;

			res.apiResponse({
				place
			});
		});
};
