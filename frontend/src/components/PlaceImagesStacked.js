import React from "react";
import posed from "react-pose";
import "./PlaceImagesStacked.scss";

const Box = posed.div({
  visible: {
    opacity: 1,
    translateX: "-50%",
    translateY: "-50%",
    scale: 1
  },
  hidden: {
    opacity: 0,
    scale: 1.2
  }
});

class StackImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePoseComplete = this.handlePoseComplete.bind(this);
  }

  handlePoseComplete() {
    console.log("handlePoseComplete()");
  }

  handleClick(e) {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  render() {
    const { image, imageNewHeight } = this.props;

    let imageWrapStyles = {
      ...image.styles
    };

    // Landscape or portrait.
    const landscape = image.width / image.height > 1;

    let imageScrollerStyles = {};

    if (landscape) {
      imageScrollerStyles.width = imageNewHeight;
    } else {
      imageScrollerStyles.height = imageNewHeight;
    }

    return (
      <Box
        className="ImageStack-image"
        pose={this.state.isVisible ? "visible" : "hidden"}
        key={image.public_id}
        style={imageWrapStyles}
        data-landscape={landscape}
        onClick={this.handleClick}
        onPoseComplete={this.handlePoseComplete}
      >
        <img
          className="ImageStack-image-img"
          style={imageScrollerStyles}
          src={image.thumb}
          width={image.width}
          height={image.height}
          alt=""
        />
      </Box>
    );
  }
}

/**
 * Images for a place.
 */
class PlaceImagesStacked extends React.Component {
  constructor(props) {
    super(props);

    this.defaultImageHeight = 300;

    this.state = {
      galleryImages: this.getImages(),
      imageNewHeight: this.defaultImageHeight,
      isBoxVisible: true
    };

    // this.handleResize = this.handleResize.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleImageStackClick = this.handleImageStackClick.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   imageNewHeight: this.calculateImageHeight()
    // });
    // window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.handleResize);
  }

  // handleResize(e) {
  //   let imageNewHeight = this.calculateImageHeight();
  //   this.setState({
  //     imageNewHeight
  //   });
  // }

  handleImageClick(image, e) {
    // console.log("handleImageClick");
  }

  /**
   * When a user clicks the image stack,
   * we move away the topmost image (image with highest zIndex)
   * to show the image that previosly had the next-highest index
   * and now has the highest.
   */
  handleImageStackClick(e) {
    console.log("handleImageStackClick", e);
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

    // Add styles (z-indexes and transforms).
    let zIndex = ImageGalleryImages.length;
    ImageGalleryImages = ImageGalleryImages.map(image => {
      // https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
      var randomRotateDeg = Math.floor(Math.random() * 10) + 1; // this will get a number between 1 and 99;
      randomRotateDeg *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% of cases

      image.styles = {
        zIndex: zIndex--,
        transform: `translateX(-50%) translateY(-50%) scale(1) rotate(${randomRotateDeg}deg)`
      };

      return image;
    });

    return ImageGalleryImages;
  }

  getDummyImages() {
    // List of images avilable:
    // https://picsum.photos/images

    const imageIds = [
      835,
      437,
      // 429,
      // 425,
      // 946,
      1047,
      1059,
      // 1080,
      30,
      42
      // 48,
      // 63,
      // 75,
      // 163,
      // 292
    ];

    let images = imageIds.map(imageId => {
      return {
        width: 450,
        height: 600,
        thumb: `https://picsum.photos/450/600/?image=${imageId}&xblur`
      };
    });

    images.push({
      width: 600,
      height: 450,
      thumb: `https://picsum.photos/600/450/?image=429&xblur`
    });

    images.push({
      width: 450,
      height: 600,
      thumb: `https://picsum.photos/450/600/?image=1047&xblur`
    });

    return images;
  }

  render() {
    let { images, image } = this.props;
    let { imageNewHeight } = this.state;

    if (!images && !image) {
      return null;
    }

    let ImageGalleryImages = this.state.galleryImages;

    return (
      <React.Fragment>
        <div className="ImageStack" onClick={this.handleImageStackClick}>
          <div className="ImageStack-wrap">
            {ImageGalleryImages.map(image => {
              return (
                <StackImage
                  // onClick={this.handleImageClick.bind(this, image)}
                  key={image.thumb}
                  image={image}
                  imageNewHeight={imageNewHeight}
                />
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PlaceImagesStacked;
