var async = require("async");
var keystone = require("keystone");
var Area = keystone.list("Area");
var { cloudinaryImageToURL } = require("../../functions");

/**
 * Based on code found here:
 * https://gist.github.com/JedWatson/9741171
 */

/**
 * List Areas
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

	Area.model
		.find()
		.sort(sort)
		.exec(function(err, items) {
			if (err) return res.apiError("database error", err);

			items = items.map(area => {
				area = area.toJSON();

				// Single image.
				area.imageThumb = cloudinaryImageToURL(area.image);

				delete area.image;

				return area;
			});

			res.apiResponse({
				areas: items
			});
		});
};

/**
 * Get Place by ID
 * http://localhost:3131/api/place/id/5b158f4b16474ee5772d1113
 */
exports.getId = function(req, res) {
	Area.model
		.findById(req.params.id)
		// .populate("foodTimes foodTypes")
		.exec(function(err, item) {
			if (err) return res.apiError("database error", err);
			if (!item) return res.apiError("not found");

			item = item.toJSON();

			item.imageThumb = cloudinaryImageToURL(item.image);
			delete item.image;

			res.apiResponse({
				area: item
			});
		});
};

/**
 * Get Place by slug
 * http://localhost:3131/api/place/slug/minh-mat
 */
exports.getSlug = function(req, res) {
	Area.model
		.findOne({ slug: req.params.slug })
		// .populate("foodTimes foodTypes")
		.populate({
			path: "parentAreas",
			populate: { path: "parentAreas" }
		})
		//.populate("parentAreas")
		.exec(function(err, item) {
			if (err) return res.apiError("database error", err);
			if (!item) return res.apiError("not found");

			const permalink = item.getPermalink();
			const parentAreasFlat = item.getParentAreas();

			item = item.toJSON();

			item.permalink = permalink;
			item.parentAreasFlat = parentAreasFlat;

			item.imageThumb = cloudinaryImageToURL(item.image);
			delete item.image;
			// delete item.parentAreas;

			res.apiResponse({
				area: item
			});
		});
};
