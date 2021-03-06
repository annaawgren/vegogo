import React from "react";
import "./PlaceImagesNew.scss";

/**
 * Images for a place.
 */
class PlaceImages extends React.Component {
  constructor(props) {
    super(props);

    this.defaultImageHeight = 300;

    this.state = {
      galleryImages: this.getImages(),
      imageNewHeight: this.defaultImageHeight
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.setState({
      imageNewHeight: this.calculateImageHeight()
    });

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize(e) {
    let imageNewHeight = this.calculateImageHeight();
    this.setState({
      imageNewHeight
    });
  }

  calculateImageHeight() {
    let { galleryImages } = this.state;

    if (!galleryImages.length) {
      return this.defaultImageHeight;
    }

    // Base image size on first image, so we see part of first image and second image.
    const firstImage = galleryImages[0];
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    // New image width = on smaller screen make it almost full width,
    // but keep a bit space so we will see a bit of the next image.
    // On larger screens don't let it grow to big, like half of the screen height.
    let newImageWidth = clientWidth - 80;

    if (newImageWidth > clientHeight / 2.75) {
      newImageWidth = clientHeight / 2.75;
    }

    const imageNewWidth = newImageWidth;
    const imageNewHeight =
      (firstImage.height / firstImage.width) * imageNewWidth;

    return imageNewHeight;
  }

  getImages() {
    let { images, image } = this.props;

    let galleryImages = [];

    // Add main image as first image.
    image && galleryImages.push(image);

    // Add the other images.
    images && galleryImages.push(...images);

    // Keep only images with thumbs (some old api responses can return without thumb)
    galleryImages = galleryImages.filter(image => image.thumb);

    // Make thumb our wanted size.
    let ImageGalleryImages = galleryImages.map(image => {
      // Image is like https://res.cloudinary.com/vegogo/image/upload/w_640/lrzhnjazq7h9t2k7gzn8".
      // Replace so becomes like https://res.cloudinary.com/vegogo/image/upload/w_640,h_300,c_fit/ufwvkpfrt0ep9i9wfq9g
      image.thumb = image.thumb.replace("/w_640/", "/w_1280,h_600,c_fit/");
      return image;
    });

    // If no images found lets fake some, beacuse we really want to test with some images.
    if (!ImageGalleryImages.length) {
      ImageGalleryImages = [...ImageGalleryImages, ...this.getDummyImages()];
    }

    return ImageGalleryImages;
  }

  getDummyImages() {
    // List of images avilable:
    // https://picsum.photos/images

    const images = [
      835,
      437,
      429,
      425,
      946,
      1047,
      1059,
      1080,
      30,
      42,
      48,
      63,
      75,
      163,
      292
    ];

    return images.map(imageId => {
      return {
        width: 450,
        height: 600,
        thumb: `https://picsum.photos/450/600/?blur&image=${imageId}`
      };
    });
  }

  render() {
    let { images, image } = this.props;
    let { imageNewHeight } = this.state;

    if (!images && !image) {
      return null;
    }

    let ImageGalleryImages = this.state.galleryImages;

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
}

export default PlaceImages;
