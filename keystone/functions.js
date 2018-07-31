var cloudinary = require("cloudinary");

function cloudinaryImageToURL(image) {
	if (!image || !image.public_id) {
		return null;
	}

	return cloudinary.url(image.public_id, {
		secure: true,
		width: 640
	});
}

function cloudinaryImageToImage(image) {
	if (!image || !image.public_id) {
		return null;
	}

	return cloudinary.image(image.public_id, {
		secure: true,
		width: 640
	});
}

module.exports = {
	cloudinaryImageToURL: cloudinaryImageToURL,
	cloudinaryImageToImage: cloudinaryImageToImage
};
