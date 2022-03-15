import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
    this.test = 5;
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
  }

  tang = () => {
    console.log('tang');
    this.setState({
      count: this.state.count + 1,
    })
  }

  giam = () => {
    console.log('giam');
    this.setState({
      count: this.state.count - 1,
    })
  }

  render() {
    // TODO: setState 1 lần nhưng vào render 2 lần
    // TODO: https://mariosfakiolas.com/blog/my-react-components-render-twice-and-drive-me-crazy/
    // TODO: DO sử dụng StrictMode
    // Your app is using StrictMode. See your index.js file - your app is wrapped between a <React.StrictMode> element.
    // Using StrictMode will cause your app to render twice, but only in development mode. Creating an app with create-react-app will enable strict mode by default.
    // https://reactjs.org/docs/strict-mode.html

    // console.log giữa 2 lần chạy render đã bị React ghi đè
    console.log('1111 render' + this.test, this.test + 'a');
    this.test = this.test +  3
    console.log('2222 render' + this.test, this.test + 'b');
    return (
      <div>
        <button onClick={this.tang}>+</button>
        <h3>{this.state.count}</h3>
        <button onClick={this.giam}>-</button>
      </div>
    )
  }
}
