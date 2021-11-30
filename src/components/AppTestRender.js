import React from 'react';
import ReactDOM from 'react-dom';

import Count from './Count'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      obj: {
        text: 'text2',
        value: 'value',
      },
      mode: 1,
      input: 'adfasdfsdf',
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App update');
  }

  onChange = () => {
    const {obj} = this.state;
    obj.text = obj.text + '1';
    this.setState({
      obj,
    });
  }

  onInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  }


  render() {
    return (
      <div>
        <Child obj={this.state.obj}/>
        <button onClick={this.onChange}>Click</button>
        <input value={this.state.input} onChange={this.onInput} />
        <Count />
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.obj.text}</p>
        <p>{this.props.obj.value}</p>
      </div>
    )
  }
}

export default App;