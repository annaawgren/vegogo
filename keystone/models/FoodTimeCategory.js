var keystone = require("keystone");

/**
 * FoodTimeCategory Model
 * ==================
 */

var FoodTimeCategory = new keystone.List("FoodTimeCategory", {
	autokey: { from: "name", path: "key", unique: true }
});

FoodTimeCategory.add({
	name: {
		type: String,
		required: true
	}
});

FoodTimeCategory.relationship({
	ref: "Place",
	path: "places",
	refPath: "foodTimes"
});

FoodTimeCategory.register();
