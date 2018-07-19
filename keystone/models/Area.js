var keystone = require("keystone");
var Types = keystone.Field.Types;
let moment = require("moment");
var slugify = require("underscore.string/slugify");
var cloudinary = require("cloudinary");
var apiConfig = require("../api-config");

var s3Storage = new keystone.Storage({
	adapter: require("keystone-storage-adapter-s3"),
	schema: {
		url: true
	},
	s3: {
		path: "/areas",
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
 * Area Model
 * ==========
 */

var Area = new keystone.List("Area", {
	map: { name: "name" },
	autokey: { path: "slug", from: "name", unique: true }
});

Area.add({
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	tagline: {
		type: Types.Textarea
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	image: {
		type: Types.CloudinaryImages
	}
});

Area.relationship({
	path: "places",
	ref: "Place",
	refPath: "placeAreas"
});

Area.defaultColumns = "name, content.brief";

Area.register();
