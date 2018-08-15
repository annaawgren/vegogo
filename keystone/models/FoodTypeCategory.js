var keystone = require("keystone");

/**
 * FoodTypeCategory Model
 * ==================
 */

var FoodTypeCategory = new keystone.List("FoodTypeCategory", {
	autokey: { from: "name", path: "key", unique: true }
});

FoodTypeCategory.add({
	name: {
		type: String,
		required: true
	}
});

FoodTypeCategory.relationship({
	path: "places",
	ref: "Place",
	refPath: "foodTypes"
});

FoodTypeCategory.register();
