var keystone = require("keystone");
var Types = keystone.Field.Types;
// var _ = require("underscore");
// var lodash = require("lodash");
const { dump } = require("dumper.js");
var { cloudinaryImageToURL } = require("../functions");
var ObjectId = require("mongoose").Types.ObjectId;

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

/**
 * Return permalink for an area.
 *
 * Example:
 * /stockholm/soedermalm/sofo
 *
 * @return string Permalink URL
 */
Area.schema.methods.getPermalink = function() {
	let parentAreas = this.getParentAreas();
	parentAreas = parentAreas.reverse();

	const parentsPath = parentAreas.reduce((acc, curr) => {
		return `${acc}/${curr.slug}`;
	}, "");

	return `${parentsPath}/${this.slug}`;
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

	// Make parent areas more simple.
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

/**
 * Recursive get all children to area.
 */
async function getChildAreas(area) {
	// console.log('getChildAreas() for area', area);
	// console.log('getChildAreas() has childAreas', childAreas);
	let childAreas = [];

	let areaChildAreas = await Area.model.find({
		parentAreas: {
			$in: [ObjectId(area._id)]
		}
	});

	// Base case.
	if (!areaChildAreas.length) {
		return childAreas;
	}

	// Works, we get Södermalm, Kungsholmen, Norrmalm
	// console.log(`found ${areaChildAreas.length} areaChildAreas`, areaChildAreas);
	childAreas = areaChildAreas;

	//return childAreas;
	// return childAreas;

	// Child(s) to area found, loop through and get childs to that areas.
	// console.log(`found ${areaChildAreas.length} child areas`);
	// console.log('awaited areaChildAreas', areaChildAreas);
	let areaChildAreasPromises = await Promise.all(
		childAreas.map(async childArea => {
			let subAreaChildAreas = await getChildAreas(childArea);
			childArea = childArea.toJSON();
			childArea.childAreas = subAreaChildAreas;
			return childArea;
		})
	);

	console.log("childAreas after map", childAreas);
	console.log("areaChildAreasPromises after map", areaChildAreasPromises);
	childAreas = areaChildAreasPromises;

	//areaChildAreas = areaChildAreas.concat8

	// if (areaChildAreasPromises.length) {
	//console.log('areaChildAreasPromises', areaChildAreasPromises);
	// childAreas = childAreas.concat(areaChildAreasPromises);
	//console.log('childAreas', childAreas);
	// }

	// console.log('areaChildAreasPromises', areaChildAreasPromises);
	// console.log('after forEach');

	return childAreas;
}

Area.schema.methods.getChildAreas = async function() {
	console.log("==============================");
	console.log("Area.schema.methods.getChildAreas this", this);
	let childAreas = await getChildAreas(this);
	//	childAreas.then(childAreasFound => {
	console.log("method.getChildAreas childAreas found", childAreas);
	//	});
	return childAreas;
};

Area.register();
