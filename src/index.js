import React, { Component } from 'react';
import Gridcomponent from './components/gridcomponent/gridcomponent';
import Itemcomponent from './components/itemcomponent/itemcomponent';
import deepcopy from './helper/deepcopy';

import './index.css';

class Taskmanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.gridKeys = [];
    this.itemKeys = [];
    this.gridPositionMap = {};
    this.itemPositionMap = {};
  }

  generateKey = (name, ref) => {
    let key = name + +new Date();
    while (ref.includes(key)) {
      key = name + +new Date();
    }

    ref.push(key);

    return key;
  };

  renderItemTemplate = item => {
    return this.props.itemTemplate ? this.props.itemTemplate(item) : null;
  };

  handleGridInit = (positionInfo, ref) => {
    this.gridPositionMap[positionInfo.index] = {
      start: positionInfo.offsetLeft,
      end: positionInfo.offsetLeft + positionInfo.offsetWidth,
      ref: ref
    };
    // console.log(this.gridPositionMap);
  };

  handleGridUpdate = (positionInfo, ref) => {
    this.gridPositionMap[positionInfo.index] = {
      start: positionInfo.offsetLeft,
      end: positionInfo.offsetLeft + positionInfo.offsetWidth,
      ref: ref
    };
  };

  handleItemInit = (positionInfo, ref) => {
    let { offsetTop, offsetHeight, index, parentIndex } = positionInfo;
    if (this.itemPositionMap[parentIndex] === undefined) {
      this.itemPositionMap[parentIndex] = {};
    }
    this.itemPositionMap[parentIndex][index] = {
      start: offsetTop,
      end: offsetTop + offsetHeight,
      ref
    };
    console.log(this.itemPositionMap);
  };

  handleItemUpdate = positionInfo => {
    // console.log(positionInfo);
    for (let i in this.gridPositionMap) {
      this.gridPositionMap[i].ref.toggleDropReady(false);
      if (
        positionInfo.x > this.gridPositionMap[i].start &&
        positionInfo.x < this.gridPositionMap[i].end
      ) {
        this.gridPositionMap[i].ref.toggleDropReady(true);
      }
    }
  };
  handleItemMoveEnd = positionInfo => {
    console.log(positionInfo.translateY);
    for (let i in this.gridPositionMap) {
      this.gridPositionMap[i].ref.toggleDropReady(false);
      if (
        positionInfo.x > this.gridPositionMap[i].start &&
        positionInfo.x < this.gridPositionMap[i].end &&
        i !== positionInfo.parentIndex.toString()
      ) {
        let tempData = deepcopy(this.state.data);
        let tempItem = tempData[positionInfo.parentIndex].data.splice(
          positionInfo.index,
          1
        )[0];
        // console.log(tempItem)
        tempData[i].data.push(tempItem);
        this.setState(
          {
            data: tempData
          },
          () => {
            //save data to database
            try {
              this.props.onUpdate(this.state.data);
            } catch (error) {
              console.error(error);
            }
          }
        );
      }
    }
    let itemGroup = this.itemPositionMap[positionInfo.parentIndex];
    for (let i in itemGroup) {
      if (
        i !== positionInfo.index.toString() &&
        positionInfo.translateY > 0 &&
        positionInfo.y > itemGroup[i].start &&
        positionInfo.y < itemGroup[i].end
      ) {
        let tempData = deepcopy(this.state.data);
        let tempItem = tempData[positionInfo.parentIndex].data.splice(
          positionInfo.index,
          1
        )[0];
        tempData[positionInfo.parentIndex].data.splice(i, 0, tempItem);
        this.setState(
          {
            data: tempData
          },
          () => {
            //save data to database
            try {
              this.props.onUpdate(this.state.data);
            } catch (error) {
              console.error(error);
            }
          }
        );
      } else if (
        i !== positionInfo.index.toString() &&
        positionInfo.translateY < 0 &&
        positionInfo.bottomY > itemGroup[i].start &&
        positionInfo.bottomY < itemGroup[i].end
      ) {
        let tempData = deepcopy(this.state.data);
        let tempItem = tempData[positionInfo.parentIndex].data.splice(
          positionInfo.index,
          1
        )[0];
        tempData[positionInfo.parentIndex].data.splice(i, 0, tempItem);
        this.setState(
          {
            data: tempData
          },
          () => {
            //save data to database
            try {
              this.props.onUpdate(this.state.data);
            } catch (error) {
              console.error(error);
            }
          }
        );
      }
    }
  };
  componentDidMount() {
    if (!this.props.data) {
      return;
    }
    let data = deepcopy(this.props.data);
    data.forEach(item => {
      item.dropReadyState = false;
    });
    this.setState({
      data: this.props.data
    });
  }
  render() {
    return (
      <div className="table-wrapper" style={this.props.wrapperStyle}>
        <div className="table-grid">
          {this.state.data.length > 0
            ? this.state.data.map((grid, gridIndex) => {
                return (
                  <Gridcomponent
                    init={(positionInfo, ref) => {
                      this.handleGridInit(positionInfo, ref);
                    }}
                    update={(positionInfo, ref) => {
                      this.handleGridUpdate(positionInfo, ref);
                    }}
                    index={gridIndex}
                    key={(() => {
                      return this.generateKey('grid', this.gridKeys);
                    })()}
                  >
                    <div className="title">{grid.title}</div>
                    {grid.data.length > 0
                      ? grid.data.map((item, index) => {
                          return (
                            <Itemcomponent
                              index={index}
                              parentIndex={gridIndex}
                              key={(() => {
                                return this.generateKey('item', this.itemKeys);
                              })()}
                              init={(positionInfo, ref) => {
                                this.handleItemInit(positionInfo, ref);
                              }}
                              update={positionInfo => {
                                this.handleItemUpdate(positionInfo);
                              }}
                              itemMoveEnd={positionInfo => {
                                return new Promise((resolve, reject) => {
                                  this.handleItemMoveEnd(positionInfo);
                                  resolve();
                                });
                              }}
                              itemStyle={this.props.itemStyle}
                            >
                              {this.renderItemTemplate(item)}
                            </Itemcomponent>
                          );
                        })
                      : null}
                  </Gridcomponent>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Taskmanager;
