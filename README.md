# react-drag-taskmanager

## description

A drag & drop taskmanager component for React.js inspired by Jira kanban

## demo

[link to demo](https://michaelzhou1987.github.io/react-drag-taskmanager/)

## npm link

[react-drag-taskmanager on npm](https://www.npmjs.com/package/react-drag-taskmanager)

## github repo

[react-drag-taskmanager on github](https://github.com/michaelzhou1987/react-drag-taskmanager)

## usage

```js
<Taskmanager
        data={[
          {
            title: '',//title of the column
            data:[] //data of the column
          }
        ]}
        onUpdate={(data)=>{
          // new data when drop the item
          // this is where you save the new data to the database
        }}
        // template for the item
        itemTemplate={item => {
          return (
            <Fragment>
              <div className="title">{item.name}</div>
              <div className="des">{item.des}</div>
            </Fragment>
          );
        }}
        // style for the item
        itemStyle={{
          display: 'flex',
          flexDirection: 'column'
        }}
        // style of the wrapper, width will be devided evenly thru the columns
        wrapperStyle={{
          width: '400px'
        }}
      ></Taskmanager>
```
