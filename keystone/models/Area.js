var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * Area Model
 * ==========
 */

var Area = new keystone.List("Area", {
	map: { name: "name" },
	autokey: { path: "slug", from: "name", unique: true }
});

Area.add({
	name: { type: String, required: true },
	parentAreas: {
		type: Types.Relationship,
		ref: "Area",
		many: true
	},
	createdAt: { type: Date, default: Date.now },
	tagline: {
		type: Types.Textarea
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	image: {
		type: Types.CloudinaryImage
	}
});

Area.relationship({
	path: "areas",
	ref: "Area",
	refPath: "parentAreas"
});

Area.relationship({
	path: "places",
	ref: "Place",
	refPath: "placeAreas"
});

Area.defaultColumns = "name, content.brief";

Area.register();
