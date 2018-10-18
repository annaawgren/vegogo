var async = require("async");
var keystone = require("keystone");
var Place = keystone.list("Place");
var Area = keystone.list("Area");
var apiConfig = require("../../api-config");
var { cloudinaryImageToURL } = require("../../functions");
var ObjectId = require("mongoose").Types.ObjectId;

/**
 * List Places
 * http://localhost:3131/api/area/list
 */
exports.list = function(req, res) {
	let sortParam = req.query.sort || "name";
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
		.populate("foodTimes foodTypes placeAreas")
		.exec(function(err, items) {
			if (err) return res.apiError("database error", err);

			items = items.map(place => makePlaceItemOurFormat(place));

			res.apiResponse({
				places: items
			});
		});
};

/**
 * Get places in a specific area
 * http://localhost:3131/api/place/list/area/sofo
 */
exports.listArea = function(req, res) {
	let sortParam = req.query.sort || "published";
	let areaSlug = req.params.slug;
	let sort;

	switch (sortParam) {
		case "name":
			sort = { name: 1 };
			break;
		case "published":
		default:
			sort = { publishedDate: -1 };
	}

	Area.model
		.findOne({
			slug: areaSlug
		})
		.exec(function(err, item) {
			if (err || item === null) return res.apiError("database error", err);

			// Get places that have our area id.
			Place.model
				.find({
					placeAreas: {
						$in: [ObjectId(item._id)]
					}
				})
				.populate("foodTypes foodTimes")
				.exec((err, items) => {
					if (err || items === null) return res.apiError("database error", err);

					// Make items our format.
					items = items.map(item => makePlaceItemOurFormat(item));

					res.apiResponse({
						places: items
					});
				});
		});
};

function makePlaceItemOurFormat(place) {
	// Aggregate functions does not return model but plain json it seems.
	if (place.toJSON !== undefined) {
		place = place.toJSON();
	}

	// Single image.
	place.imageThumb = cloudinaryImageToURL(place.image);

	if (place.image) {
		place.image.thumb = cloudinaryImageToURL(place.image);
	}
	// delete place.image;

	// Multiple images.
	place.imagesThumbs = [];
	place.images.forEach(image => {
		image.thumb = cloudinaryImageToURL(image);
		place.imagesThumbs.push(cloudinaryImageToURL(image));
	});

	// delete place.images;

	return place;
}

/**
 * Get Place by ID
 * http://localhost:3131/api/place/id/5b158f4b16474ee5772d1113
 */
exports.getId = function(req, res) {
	Place.model
		.findById(req.params.id)
		.populate("foodTimes foodTypes placeAreas")
		.exec(function(err, place) {
			if (err) return res.apiError("database error", err);
			if (!place) return res.apiError("not found");

			place = makePlaceItemOurFormat(place);

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
		.populate("foodTimes foodTypes placeAreas")
		.exec(function(err, place) {
			if (err) return res.apiError("database error", err);
			if (!place) return res.apiError("not found");

			place = makePlaceItemOurFormat(place);

			res.apiResponse({
				place
			});
		});
};

/**
 * Get place by geolocation, i.e. lat and lng
 * http://localhost:3131/api/place/list/geo/?lat=59.316&lng=18.084
 */
exports.listGeo = function(req, res) {
	let { sortParam = "published", lat = undefined, lng = undefined } = req.query;
	let sort;

	lat = parseFloat(lat);
	lng = parseFloat(lng);

	switch (sortParam) {
		case "name":
			sort = { name: 1 };
			break;
		case "published":
		default:
			sort = { publishedDate: -1 };
	}

	// location.geo
	// https://mongoosejs.com/docs/api.html#query_Query-near

	Place.model
		.aggregate([
			{
				$geoNear: {
					near: {
						type: "Point",
						coordinates: [lng, lat]
					},
					spherical: true,
					includeLocs: "location.geo",
					maxDistance: 1000,
					distanceField: "location.distance"
				}
			}
		])
		.then(function(items) {
			items = items.map(place => makePlaceItemOurFormat(place));

			res.apiResponse({
				places: items
			});
		})
		.catch(function(err) {
			console.log("listGeo catch err", err);
		});
};
