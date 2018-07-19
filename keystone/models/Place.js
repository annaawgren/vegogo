var keystone = require("keystone");
var Types = keystone.Field.Types;
let moment = require("moment");
var slugify = require("underscore.string/slugify");
var cloudinary = require("cloudinary");
var apiConfig = require("../api-config");

function getPlaceImage(place) {
	let imageUrl = `${apiConfig.IMAGES_URL}/places/${place.image.filename}`;
	let image = cloudinary.url(imageUrl, {
		type: "fetch",
		secure: true,
		width: 320
	});

	return image;
}

var s3Storage = new keystone.Storage({
	adapter: require("keystone-storage-adapter-s3"),
	schema: {
		url: true
	},
	s3: {
		path: "/places",
		region: "eu-west-1",
		headers: {
			"x-amz-acl": "public-read"
		},
		generateFilename: function(file) {
			let filename = moment().format("YYYYMMDD-HHmm") + "-" + file.originalname;
			filename = slugify(filename);

			// Sluggify transforms '.jpg' to '-jpg' so we undo that.
			filename = filename.replace(/-jpg$/, ".jpg");
			filename = filename.replace(/-jpeg$/, ".jpeg");
			filename = filename.replace(/-png$/, ".png");
			filename = filename.replace(/-gif$/, ".gif");

			return filename;
		}
	}
});

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
