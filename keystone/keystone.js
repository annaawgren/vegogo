// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	name: "Vegogo",
	brand: "Vegogo",

	less: "public",
	static: "public",
	favicon: "public/favicon.ico",
	views: "templates/views",
	"view engine": "pug",

	"auto update": true,
	session: true,
	auth: true,
	"user model": "User",
	"wysiwyg override toolbar": true,
	"wysiwyg additional options": {
		xskin: "lightgray",
		xmenubar: "file edit format view insert",
		xrelative_urls: false,
		xcontent_css: "/assets/css/styles.min.css",
		xvisualblocks_default_state: true,
		block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
		style_formats: [
			{ title: "Header 2", format: "h2" },
			{
				title: "Headers",
				items: [
					{ title: "Header 1", format: "h1" },
					{ title: "Header 2", format: "h2" },
					{ title: "Header 3", format: "h3" },
					{ title: "Header 4", format: "h4" },
					{ title: "Header 5", format: "h5" },
					{ title: "Header 6", format: "h6" }
				]
			},
			{
				title: "Inline",
				items: [
					{ title: "Bold", icon: "bold", format: "bold" },
					{ title: "Italic", icon: "italic", format: "italic" },
					{
						title: "Strikethrough",
						icon: "strikethrough",
						format: "strikethrough"
					},
					{ title: "Code", icon: "code", format: "code" }
				]
			},
			{
				title: "Blocks",
				items: [
					{ title: "Paragraph", format: "p" },
					{ title: "Blockquote", format: "blockquote" },
					{ title: "Pre", format: "pre" }
				]
			}
		]
	}
});

keystone.set(
	"wysiwyg additional buttons",
	"styleselect, bold, italic, bullist, numlist, undo, redo, link, code, cleanup, blockquote"
);
//block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3'

// Load your project's Models
keystone.import("models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set("cors allow origin", true);

// Load your project's Routes
keystone.set("routes", require("./routes"));

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
	places: ["places", "food-type-categories", "food-time-categories"],
	areas: ["areas"],
	posts: ["posts", "post-categories"],
	// enquiries: "enquiries",
	users: "users"
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
