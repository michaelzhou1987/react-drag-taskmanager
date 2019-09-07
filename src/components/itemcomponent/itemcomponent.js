import React, { Component } from 'react';
import './itemcomponent.css';

class Itemcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frameStyle: {},
      translateX: 0,
      translateY: 0
    };
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
    this.t = null;
    this.index = null;
    this.parentIndex = null;
    this.middleX = null;
    this.middleY = null;
  }

  componentDidMount() {
    try {
      this.middleX =
        this.refs['component-wrapper'].offsetLeft +
        this.refs['component-wrapper'].offsetWidth / 2;
      this.middleY =
        this.refs['component-wrapper'].offsetTop +
        this.refs['component-wrapper'].offsetHeight / 2;
      this.index = this.props.index;
      this.parentIndex = this.props.parentIndex;

    } catch (error) {
      console.error(error);
    }
    try {
      this.props.init(
        {
          offsetTop: this.refs['component-wrapper'].offsetTop,
          offsetHeight: this.refs['component-wrapper'].offsetHeight,
          index: this.index,
          parentIndex: this.parentIndex
        },
        this
      );
    } catch (error) {
      console.error(error);
    }
  }
  componentDidUpdate() {
    try {
      this.index = this.props.index;
      this.parentIndex = this.props.parentIndex;
    } catch (error) {
      console.error(error);
    }
  }

  handleMouseDown(e) {
    e.stopPropagation();
    if (e.button !== 0) {
      return;
    }
    this.moving = true;
    this.t = +new Date();
    this.lastX = e.clientX;
    this.lastY = e.clientY;

    const mouseDownStyle = {
      cursor: 'move',
      userSelect: 'none',
      background: '#ccc',
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
      boxSizing: 'borderbox',
      border: '1px dashed #000',
      opacity: '0.2'
    };
    this.setState({
      frameStyle: mouseDownStyle
    });

    const handleMouseMove = e => {
      let t = +new Date();
      if (t - this.t < 16) {
        return;
      }
      this.t = t;
      let dx = e.clientX - this.lastX;
      let dy = e.clientY - this.lastY;
      let newX = this.state.translateX + dx;
      let newY = this.state.translateY + dy;
      let newMiddleX = dx + this.middleX;
      let newMiddleY = dy + this.middleY;

      this.setState(
        {
          translateX: newX,
          translateY: newY,
          frameStyle: {
            cursor: 'move',
            transform: `translate(${newX}px, ${newY}px)`,
            background: '#ccc',
            boxSizing: 'borderbox',
            border: '1px dashed #000',
            opacity: '0.2'
          }
        },
        () => {
          this.lastX = e.clientX;
          this.lastY = e.clientY;
          this.middleX = newMiddleX;
          this.middleY = newMiddleY;
          this.props.update({
            x: newMiddleX,
            y: newMiddleY
          });
        }
      );
    };

    const handleMouseUp = () => {
      this.lastX = null;
      this.lastY = null;

      const mouseUpStyle = {
        // transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
      };

      // try {
      //   this.props.updatePosition({
      //     offsetTop: this.refs['component-wrapper'].offsetTop,
      //     offsetHeight: this.refs['component-wrapper'].offsetHeight,
      //     translateY: this.state.translateY,
      //     index: this.index
      //   });
      // } catch (error) {
      //   console.error(error);
      // }

      let topY =
        this.refs['component-wrapper'].offsetTop + this.state.translateY;
      let tempTranslateY = this.state.translateY;
      let bottomY =
        this.refs['component-wrapper'].offsetTop +
        this.refs['component-wrapper'].offsetHeight +
        this.state.translateY;
      this.setState(
        {
          frameStyle: mouseUpStyle,
          translateX: 0,
          translateY: 0
        }
      );

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      try {
        this.props.itemMoveEnd({
          x: this.middleX,
          y: topY,
          bottomY: bottomY,
          translateY: tempTranslateY,
          index: this.index,
          parentIndex: this.parentIndex
        });
      } catch (error) {
        console.error(error);
      }

    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  render() {
    return (
      <div
        ref="component-wrapper"
        className="dragable-component"
        style={this.state.frameStyle}
        onMouseDown={e => {
          this.handleMouseDown(e);
        }}
      >
        <div className="item-component" style={this.props.itemStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}



export default Itemcomponent;
