var keystone = require("keystone");
var Types = keystone.Field.Types;
var slugify = require("underscore.string/slugify");
var cloudinary = require("cloudinary");

function getPlaceImage(place) {
	let image = cloudinary.url(place.image.public_id, {
		secure: true,
		width: 640
	});

	return image;
}

/**
 * Place Model
 * ==========
 */

var Place = new keystone.List("Place", {
	map: { name: "name" },
	autokey: { path: "slug", from: "name", unique: true }
});

Place.add({
	name: { type: String, required: true },
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: { state: "published" },
		default: Date.now
	},
	createdAt: { type: Date, default: Date.now },
	location: {
		type: Types.Location,
		country: "Sweden"
	},
	googlePlaceId: {
		type: String
	},
	homepage: {
		type: Types.Url
	},
	phone: {
		type: String
	},
	budget: {
		type: Types.Select,
		options: "budget, midrange, luxury",
		default: "midrange",
		index: true
	},
	foodTimes: {
		type: Types.Relationship,
		ref: "FoodTimeCategory",
		many: true,
		index: true
	},
	foodTypes: {
		type: Types.Relationship,
		ref: "FoodTypeCategory",
		many: true,
		index: true
	},
	placeAreas: {
		type: Types.Relationship,
		ref: "Area",
		many: true,
		index: true
	},
	tagline: {
		type: Types.Textarea
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	/**
	 * Some notes regarding files and thumbnails:
	 * - https://github.com/keystonejs/keystone/pull/3397
	 * - https://github.com/keystonejs/keystone/pull/4509
	 */
	image: {
		type: Types.CloudinaryImage,
		thumb: true
	},
	images: {
		// http://keystonejs.netlify.com/api/field/cloudinaryimages
		type: Types.CloudinaryImages
	}
});

/*
Area:
	Stockholm
	Södermalm
			Sofo
		Hornstull
		Medis
*/

Place.schema.virtual("content.full").get(function() {
	return this.content.extended || this.content.brief;
});

Place.schema.virtual("vImageThumb").get(function() {
	return getPlaceImage(this);
});

Place.defaultColumns =
	"name, state, content.brief, publishedDate, budget, foodTimes, foodTypes, placeAreas";

// Place.schema.set('toJSON', {
//     virtuals: true
// });

Place.register();
