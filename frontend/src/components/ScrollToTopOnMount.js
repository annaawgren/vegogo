import { Component } from "react";

class ScrollToTopOnMount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log("component did mount");
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMount;
