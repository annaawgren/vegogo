var keystone = require("keystone");
var Types = keystone.Field.Types;
var _ = require("underscore");
var lodash = require("lodash");
var { cloudinaryImageToURL } = require("../functions");

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

Area.schema.methods.getPermalink = function() {
	// console.log(this);
	// console.log(_.flatten(this));
	return `/${this.slug}/`;
};

function getParentAreas(area, returnArr = []) {
	var parentAreas = area && area.parentAreas ? area.parentAreas : false;

	if (!parentAreas) {
		return returnArr;
	}

	parentAreas.forEach(oneParentArea => {
		returnArr.push(oneParentArea);
		returnArr = returnArr.concat(getParentAreas(oneParentArea));
	});

	return returnArr;
}

Area.schema.methods.getParentAreas = function() {
	var parentAreas = getParentAreas(this);

	// Make parent areas more simple
	parentAreas = parentAreas.map(area => {
		area = {
			name: area.name,
			slug: area.slug,
			tagline: area.tagline,
			createdAt: area.createdAt,
			imageThumb: cloudinaryImageToURL(area.image)
		};

		return area;
	});

	return parentAreas;
};

Area.register();
