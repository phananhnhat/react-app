import React from 'react';
import ReactDOM from 'react-dom';

import downloadFile from '../utils/download';

const a = [1,2,3,4,5];

const Child = () => {

  React.useEffect(() => {
  }, [])

  console.log('kk')
  return (
    <div>Item
      {
        a.map(() => {
          console.log('child')
          return <p></p>;
        })
      }
    </div>
  )
}

class Child1 extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructor Child')
  }

  componentDidMount() {
    console.log('componentDidMount Child', )
  }

  render() {
    return (
      <div>Item
        {
          a.map(() => {
            console.log('child')
            return <p></p>;
          })
        }
      </div>
    )
  }
}

class Download extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1,2,3,4,5,6,7,8,9,10],
    }
  }

  componentDidMount() {
    // downloadFile();
    console.log('componentDidMount', )
  }

  componetDidUpdate() {
    console.log('componetDidUpdate', )
  }

  render() {
    console.log('start')
    return (
      <div>
        {this.state.items.map((item) => {
          console.log(item)
          return <Child1 />
        })}
      </div>
    )
  }
}

export default Download;
