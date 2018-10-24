import React from "react";
import posed from "react-pose";
import "./PlaceImagesStacked.scss";
import Swipeable from "react-swipeable";

const Box = posed.div({
  draggable: false,
  visible: {
    opacity: 1,
    translateX: "-50%",
    translateY: "-50%",
    rotate: props => {
      return `${props.style.randomRotateDeg}deg` || "2deg";
    }
  },
  // drag: {
  //   opacity: 1,
  //   rotate: props => {
  //     return `${props.style.randomRotateDeg}deg` || "2deg";
  //   }
  // },
  isMovingOutRight: {
    opacity: 0.2,
    // scale: 1,
    translateX: "40%",
    translateY: "-50%",
    rotate: props => {
      return `${props.style.randomRotateDeg + 8}deg` || "2deg";
    }
  },
  isMovingOutLeft: {
    opacity: 0.2,
    // scale: 1,
    translateX: "-100%",
    translateY: "-50%",
    rotate: props => {
      return `${props.style.randomRotateDeg - 8}deg` || "2deg";
    }
  }
});

class StackImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePoseComplete = this.props.handleMovedOutComplete;
  }

  handleClick(e) {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  render() {
    const { image, imageNewHeight } = this.props;
    const { isMovingOut, movingOutDirection } = image;

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

    let movingOutPose;

    switch (movingOutDirection) {
      case "left":
        movingOutPose = "isMovingOutLeft";
        break;
      case "right":
      default:
        movingOutPose = "isMovingOutRight";
    }

    return (
      <Box
        className="ImageStack-image"
        pose={isMovingOut ? movingOutPose : "visible"}
        key={image.public_id}
        style={imageWrapStyles}
        data-landscape={landscape}
        // onClick={this.handleClick}
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

    this.handleImageStackClick = this.handleImageStackClick.bind(this);
    this.handleMovedOutComplete = this.handleMovedOutComplete.bind(this);

    this.handleSwipedLeft = this.handleSwipedLeft.bind(this);
    this.handleSwipedRight = this.handleSwipedRight.bind(this);
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

  handleSwipedLeft(e) {
    this.handleImageStackClick(e, {
      direction: "left"
    });
  }

  handleSwipedRight(e) {
    this.handleImageStackClick(e, {
      direction: "right"
    });
  }

  handleMovedOutComplete(image, pose) {
    // Image is moved out of stack.
    // Add it to the bottom = set to lowest z index and make visible again.
    let { galleryImages } = this.state;

    let galleryImagesNew = [...galleryImages];
    let movedImageIndex = galleryImages.findIndex(
      img => img.public_id === image.public_id
    );

    // Find image at bottom = image with lowest zIndex.
    let bottomImage = galleryImages.reduce(
      (prev, current) =>
        prev.styles.zIndex < current.styles.zIndex ? prev : current
    );

    // Move moved image to bottom of stack and make visible again.
    galleryImagesNew[movedImageIndex].styles.zIndex =
      bottomImage.styles.zIndex - 1;
    galleryImagesNew[movedImageIndex].isMovingOut = false;

    this.setState({ galleryImages: galleryImagesNew });
  }

  /**
   * When a user clicks the image stack,
   * we move away the topmost image (image with highest zIndex)
   * to show the image that previosly had the next-highest index
   * and now has the highest.
   */
  handleImageStackClick(e, args = {}) {
    // Move out topmost image.
    let { galleryImages } = this.state;
    let { direction = "right" } = args;

    // Bail if only one image.
    if (galleryImages.length <= 1) {
      return;
    }

    // Topmost image = image with highest zIndex.
    let topmostImage = galleryImages.reduce(
      (prev, current) =>
        prev.styles.zIndex > current.styles.zIndex ? prev : current
    );

    //let topmostImage = galleryImages.filter
    // console.log('topmostImage', topmostImage);
    topmostImage.isMovingOut = true;
    topmostImage.movingOutDirection = direction;

    this.setState({
      galleryImages
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
    // if (!ImageGalleryImages.length) {
    // ImageGalleryImages = [...ImageGalleryImages, ...this.getDummyImages()];
    // console.warn('No place ImageGalleryImages found');
    // }

    // Add styles (z-indexes and transforms).
    let zIndex = ImageGalleryImages.length;
    ImageGalleryImages = ImageGalleryImages.map(image => {
      // https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
      var randomRotateDeg = Math.floor(Math.random() * 6) + 1; // this will get a number between 1 and 99;
      randomRotateDeg *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% of cases

      image.isMovingOut = false;

      image.styles = {
        zIndex: zIndex--,
        randomRotateDeg,
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
      946,
      // 1047,
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
        thumb: `https://picsum.photos/450/600/?image=${imageId}&xblur`,
        public_id: `dummy_img_${imageId}`
      };
    });

    images.push({
      width: 600,
      height: 450,
      thumb: `https://picsum.photos/600/450/?image=429&xblur`,
      public_id: `dummy_img_429`
    });

    images.push({
      width: 450,
      height: 600,
      thumb: `https://picsum.photos/450/600/?image=1047&xblur`,
      public_id: `dummy_img_1047`
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
        <Swipeable
          onSwipedLeft={this.handleSwipedLeft}
          onSwipedRight={this.handleSwipedRight}
          onClick={this.handleImageStackClick}
          className="ImageStack"
        >
          <div className="ImageStack-wrap">
            {ImageGalleryImages.map(image => {
              return (
                <StackImage
                  handleMovedOutComplete={this.handleMovedOutComplete.bind(
                    this,
                    image
                  )}
                  key={image.thumb}
                  image={image}
                  imageNewHeight={imageNewHeight}
                />
              );
            })}
          </div>
        </Swipeable>
      </React.Fragment>
    );
  }
}

export default PlaceImagesStacked;
