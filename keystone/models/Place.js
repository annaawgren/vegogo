var keystone = require("keystone");
var Types = keystone.Field.Types;

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
	location: {
		type: Types.Location,
		country: "Sweden"
	},
	budget: {
		type: Types.Select,
		options: "budget, midrange, luxury",
		default: "midrange",
		index: true
	},
	foodTime: {
		type: Types.Select,
		options: "breakfast, brunch, dinner",
		default: "midrange",
		index: true
	},
	foodType: {
		type: Types.Select,
		options: "indian, pizza, burger",
		default: "midrange",
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: { state: "published" }
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	categories: { type: Types.Relationship, ref: "PostCategory", many: true },
	image: { type: Types.CloudinaryImage }
	/*
	Area:
		Stockholm
		Södermalm
				Sofo
			Hornstull
			Medis
	*/
});

Place.schema.virtual("content.full").get(function() {
	return this.content.extended || this.content.brief;
});

Place.defaultColumns = "name, state|20%, author|20%, publishedDate|20%";
Place.register();
