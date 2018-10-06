import React from "react";
import "../components/ImageWithRatio.scss";

function ImageWithRatio(props) {
  const { className, alt, ...propsWithoutClassName } = props;
  const { width, height } = props;

  if (!width || !height) {
    console.warn("ImageWithRatio() requires props width and height");
    return null;
  }

  const ratio = (height / width) * 100;

  const styles = {
    paddingBottom: `${ratio}%`
  };

  return (
    <span className={className}>
      <span
        style={styles}
        className={"ImageWithRatio"}
        width={`${width}px`}
        height={`${height}px`}
      >
        <img {...propsWithoutClassName} alt={alt} />
      </span>
    </span>
  );
}

export default ImageWithRatio;
