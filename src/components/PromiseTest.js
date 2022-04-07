import React from 'react';
import ReactDOM from 'react-dom';

import downloadFile from '../utils/download';

class Download extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
    };
    this.k = 0;
  }

  componentDidMount() {
    // downloadFile();
  }

  onClick = async () => {
    // this.test(2);
    this.test(2);

    console.log('this.k', this.k);
    // await this.test(3);

  }


  createPromiseTest = () => {
    const myPromise1 = new Promise((resolve, reject) => {
      // this.k = 1;
      resolve('foo');
    });
    myPromise1.then(() => {
      console.log('then test');
    });
    console.log(7);
  }

  createPromise = () => {
    console.log(2);
    const myPromise = new Promise((resolve, reject) => {
      this.k = 1;
      console.log(5);
      // setTimeout(() => {
      //   resolve('foo');
      // })
      resolve('foo');
      this.createPromiseTest();

      console.log(6);
    }).then(() => {
      console.log('then');
    });
    console.log(3);
    // myPromise.then(() => {
    //   console.log('then');
    // });
    console.log(4);
    return null;
  }

  createPromise1 = () => {
    return this.createPromise();

  }


  test = (x) => {
    console.log(1);
    this.createPromise1();
    // const a = this.setState({
    //   x,
    // } , () => {
    //   console.log('xong')
    // })
  }

  onClick1 = async () => {
    const a = this.promise();
    // console.log(a);
    await this.promise();
    console.log(1);
  }

  promise = async () => {
    const myPromise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo1');
      }, 1000);
    });

    const myPromise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo2');
      }, 300);
    });

    myPromise2.then((a) => {
      console.log(a);
    });

    return myPromise1.then((a) => {
      console.log(a);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>AAA</button>
      </div>
    )
  }
}

export default Download;
