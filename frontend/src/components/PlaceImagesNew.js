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

  // https://github.com/akiran/react-slick
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    variableWidth: true,
    adaptiveHeight: true
  };

  return (
    <React.Fragment>
      <hr />
      <div className="ImageScroller">
        {ImageGalleryImages.map(image => {
          return (
            <div className="ImageScroller-image" key={image.public_id}>
              <img
                className="ImageScroller-image-img"
                src={image.thumb}
                width={image.width}
                height={image.height}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <hr />
    </React.Fragment>
  );
}

export default PlaceImages;
