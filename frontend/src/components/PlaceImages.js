import React from "react";
import Slider from "react-slick";

/**
 * Images for a place.
 */
function PlaceImages(props) {
  let { imageThumb, imagesThumbs } = props;

  if (!imageThumb || !imagesThumbs) {
    return null;
  }

  let galleryImagesThumbs = [];

  // Add main image as first image.
  imageThumb && galleryImagesThumbs.push(imageThumb);

  // Add the other images.
  imagesThumbs && galleryImagesThumbs.push(...imagesThumbs);

  let ImageGalleryImages = galleryImagesThumbs.map(image => {
    // Image is like https://res.cloudinary.com/vegogo/image/upload/w_640/lrzhnjazq7h9t2k7gzn8".
    // Replace so becomes like https://res.cloudinary.com/vegogo/image/upload/w_640,h_300,c_fit/ufwvkpfrt0ep9i9wfq9g
    image = image.replace("/w_640/", "/w_640,h_300,c_fit/");

    return {
      original: image
    };
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
    <div className="Place-slickSlider">
      <Slider {...settings}>
        {ImageGalleryImages.map(image => {
          return (
            <div className="Place-slickSliderImage" key={image.original}>
              <img
                className="Place-slickSliderImage-img"
                src={image.original}
                alt=""
              />
            </div>
          );
        })}
      </Slider>
      {/* <div className="PlaceItem-photos">
          <ImageGallery
            items={ImageGalleryImages}
            lazyLoad={true}
            showNav={true}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={false}
          />
        </div> */}
    </div>
  );
}

export default PlaceImages;
