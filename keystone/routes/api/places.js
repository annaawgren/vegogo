var async = require("async");
var keystone = require("keystone");
var Place = keystone.list("Place");
var Area = keystone.list("Area");
var apiConfig = require("../../api-config");
var { cloudinaryImageToURL } = require("../../functions");
var ObjectId = require("mongoose").Types.ObjectId;
var faker = require("faker");

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

/**
 * Format a place to suit our needs.
 
 * It does for example:
 * - Make it json.
 * - Add cloudinary urls to images
 * - Add default dummy data if missing
 *
 * @param place
 * @returns place
 */
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
	if (!place.tagline) {
		// place.tagline = faker.lorem.words(3);
		place.tagline = faker.lorem.sentence();
	}

	if (!place.content.brief) {
		place.content.brief = "<p>" + faker.lorem.paragraphs(1) + "</p>";
	}

	if (!place.content.extended) {
		place.content.extended =
			"<p>" +
			faker.lorem
				.paragraphs(5)
				.split("\n")
				.join("</p><p>") +
			"</p>";
	}

	if (!place.homepage) {
		place.homepage = faker.internet.url();
	}

	if (!place.phone) {
		place.phone = faker.phone.phoneNumber();
	}

	if (!place.phone) {
		place.phone = faker.phone.phoneNumber();
	}

	if (!place.images || !place.images.length) {
		place.images = getDummyImages();
	}

	if (!place.foodTypes || !place.foodTypes.length) {
		place.foodTypes = [
			{
				key: "healthy",
				name: "Healthy"
			},
			{
				key: "bowls",
				name: "Bowls"
			},
			{
				key: "asian",
				name: "Asian"
			}
		];
	}

	if (!place.foodTimes || !place.foodTimes.length) {
		place.foodTimes = [
			{
				key: "coffee",
				name: "Coffee"
			},
			{
				key: "dinner",
				name: "Dinner"
			},
			{
				key: "lunch",
				name: "Lunch"
			}
		];
	}

	if (!place.budget) {
		place.budget = "midrange";
	}

	return place;
}

function getDummyImages() {
	// List of images avilable:
	// https://picsum.photos/images

	const imageIds = [
		835,
		437,
		// 429,
		// 425,
		946,
		// 1047,
		1059,
		// 1080,
		30,
		42
		// 48,
		// 63,
		// 75,
		// 163,
		// 292
	];

	let images = imageIds.map(imageId => {
		return {
			width: 450,
			height: 600,
			thumb: `https://picsum.photos/450/600/?image=${imageId}&xblur`,
			public_id: `dummy_img_${imageId}`
		};
	});

	images.push({
		width: 600,
		height: 450,
		thumb: `https://picsum.photos/600/450/?image=429&xblur`,
		public_id: `dummy_img_429`
	});

	images.push({
		width: 450,
		height: 600,
		thumb: `https://picsum.photos/450/600/?image=1047&xblur`,
		public_id: `dummy_img_1047`
	});

	return images;
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
				ver: 1,
				places: items
			});
		})
		.catch(function(err) {
			console.log("listGeo catch err", err);
		});
};
