import React from "react";
import ImageWithRatio from "../components/ImageWithRatio";
import "./PlaceImagesNew.css";

/**
 * Images for a place.
 */
function PlaceImages(props) {
  let { imageThumbs, imagesThumbs, images, image } = props;

  if (!images || !image) {
    return null;
  }

  let galleryImages = [];

  // Add main image as first image.
  image && galleryImages.push(image);

  // Add the other images.
  images && galleryImages.push(...images);

  // Make thumb our wanted size.
  let ImageGalleryImages = galleryImages.map(image => {
    // Image is like https://res.cloudinary.com/vegogo/image/upload/w_640/lrzhnjazq7h9t2k7gzn8".
    // Replace so becomes like https://res.cloudinary.com/vegogo/image/upload/w_640,h_300,c_fit/ufwvkpfrt0ep9i9wfq9g
    image.thumb = image.thumb.replace("/w_640/", "/w_640,h_300,c_fit/");
    return image;
  });

  // Base image size on first image, so we see part of first image and second image.
  const firstImage = galleryImages[0];
  const clientWidth = document.body.clientWidth;
  const clientHeight = document.body.clientHeight;
  console.log("firstImage", firstImage);
  console.log("firstImage Width, height", firstImage.width, firstImage.height);
  console.log("clientWidth, clientHeight", clientWidth, clientHeight);

  // New image width = on smaller screen make it almost full width,
  // but on larger don't let it grow to big, like half of the screen height
  let newImageWidth = clientWidth - 50;

  if (newImageWidth > clientHeight / 2) {
    newImageWidth = clientHeight / 2;
  }

  const imageNewWidth = newImageWidth;
  const imageNewHeight = (firstImage.height / firstImage.width) * imageNewWidth;
  console.log("imageNewWidth", imageNewWidth);
  console.log("imageNewHeight", imageNewHeight);

  let imageScrollerStyles = {
    height: imageNewHeight
  };

  return (
    <React.Fragment>
      <div className="ImageScroller">
        {ImageGalleryImages.map(image => {
          return (
            <div className="ImageScroller-image" key={image.public_id}>
              <img
                className="ImageScroller-image-img"
                style={imageScrollerStyles}
                src={image.thumb}
                width={image.width}
                height={image.height}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default PlaceImages;
