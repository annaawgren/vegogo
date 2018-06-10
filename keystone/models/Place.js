var keystone = require("keystone");
var Types = keystone.Field.Types;
let moment = require("moment");

var s3Storage = new keystone.Storage({
	adapter: require("keystone-storage-adapter-s3"),
	s3: {
		path: "/places",
		region: "eu-west-1",
		headers: {
			"x-amz-acl": "public-read"
		},
		generateFilename: function(file) {
			let filename = moment().format("YYYYMMDD-HHmm") + "-" + file.originalname;
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
		dependsOn: { state: "published" }
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
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	image: {
		type: Types.File,
		storage: s3Storage
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

Place.defaultColumns =
	"name, state, content.brief, publishedDate, budget, foodTimes, foodTypes";
Place.register();
