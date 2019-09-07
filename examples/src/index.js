import React, { Component, Fragment } from 'react';
import Taskmanager from '../../src/index';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [
        {
          title: 'In Progress',
          data: [
            {
              id: 1,
              name: 'item 1',
              des: 'item 1 description'
            },
            {
              id: 2,
              name: 'item 2',
              des: 'item 2 description'
            },
            {
              id: 3,
              name: 'item 3',
              des: 'item 3 description'
            },
            {
              id: 4,
              name: 'item 4',
              des: 'item 4 description'
            }
          ]
        },
        {
          title: 'Done',
          data: []
        }
      ]
    };
  }
  render() {
    return (
      <Taskmanager
        data={this.state.mockData}
        onUpdate={data => {
          console.log('update', data);
        }}
        itemTemplate={item => {
          return (
            <Fragment>
              <div className="title">{item.name}</div>
              <div className="des">{item.des}</div>
            </Fragment>
          );
        }}
        itemStyle={{
          display: 'flex',
          flexDirection: 'column'
        }}
        wrapperStyle={{
          width: '400px'
        }}
      ></Taskmanager>
    );
  }
}

export default Demo;
