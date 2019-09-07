import React, { Component } from 'react';
import './gridcomponent.css'

class Gridcomponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropRead: false
    }
    this.index = null;
  }

  toggleDropReady = rdyState => {
    this.setState({
      dropRead: rdyState
    });
  }

  componentDidMount() {
    this.index = this.props.index
    let positionInfo = {
      offsetLeft: this.refs['grid-component'].offsetLeft,
      offsetWidth: this.refs['grid-component'].offsetWidth,
      index: this.index
    };
    try {
      this.props.init(positionInfo, this);
      // console.log(this)
    } catch (error) {
      console.error(error)
    }
  }
  
  componentDidUpdate() {
    this.index = this.props.index;
    let positionInfo = {
      offsetLeft: this.refs['grid-component'].offsetLeft,
      offsetWidth: this.refs['grid-component'].offsetWidth,
      index: this.index
    };
    try {
      this.props.update(positionInfo, this);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className={'grid-component' + `${this.state.dropRead? ' drop-ready-state': ''}`} ref="grid-component">
        {this.props.children}
      </div>
    );
  }
}


export default Gridcomponent;