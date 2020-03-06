// eslint-disable-next-line
import React, { Component } from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.titlesize = 9;
    this.state = {
      titlesize: 9,
      randomColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16)
    };
    this.randcolor = "blue";
    setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  increasebutton = () => {
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return {
        titlesize: state.titlesize + 10,
        randomColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16)
      };
    });
  };
  tick() {
    this.increasebutton();
  }

  render() {
    const mystyle = {
      padding: "10px",
      fontFamily: "Arial",
      color: this.state.randomColor
    };

    return (
      <div>
        <h1 style={mystyle}>Mattiwos Website</h1>
        <p>By Mattiwos B.</p>
      </div>
    );
  }
}

export default Home;
