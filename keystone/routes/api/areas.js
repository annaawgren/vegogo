var async = require("async");
var keystone = require("keystone");
var Area = keystone.list("Area");
var { cloudinaryImageToURL } = require("../../functions");
const { dump } = require("dumper.js");
var ObjectId = require("mongoose").Types.ObjectId;

/**
 * Based on code found here:
 * https://gist.github.com/JedWatson/9741171
 */

/**
 * List Areas
 */
exports.list = async function(req, res) {
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

	let findArgs = {};

	Area.model
		.find(findArgs)
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
 * List cities, i.e. areas that currently have no parent areas.
 */
exports.listCities = async function(req, res) {
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

	let findArgs = {};

	// Only include top level, i.e. areas with no parents
	// Will probably/hopfefully be cities like Stockholm, Berlin
	Object.assign(findArgs, {
		$or: [{ parentAreas: [] }, { parentAreas: { $exists: false } }]
	});

	Area.model
		.find(findArgs)
		.sort(sort)
		.exec(function(err, items) {
			if (err) return res.apiError("database error", err);

			// For each area customize format.
			itemsPromises = items.map(async area => {
				// Get child areas to this area.
				//console.log('get child areas');
				let childAreas = await area.getChildAreas();
				console.log("childAreas found", childAreas);

				area = area.toJSON();

				area.childAreas = childAreas;

				// Single image.
				area.imageThumb = cloudinaryImageToURL(area.image);

				delete area.image;

				return area;
			});

			Promise.all(itemsPromises).then(items => {
				console.log("after map in api");
				// console.log('itemsPromises', itemsPromises);

				res.apiResponse({
					areas: items
				});
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
