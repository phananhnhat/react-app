import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      mode: 1,
    };
  }

  removeDigit = (cards) => {
    debugger;
    let ans = -1;
    const lastseen = {};

    for(let i = 0; i < cards.length; i++){
      const c = cards[i];
      if(lastseen[c] === undefined){
        lastseen[c] = i;
      } else {
        let tempans = i - lastseen[c] + 1;
        if(ans === -1 || tempans < ans){
          ans = tempans;
        }
        lastseen[c] = i;
      }
    }
    return ans;
  };

  handleClick = () => {
    console.log(this.removeDigit([3,4,2,3,4,7]))
  };

  render() {
    return (
      <div>
        <label>{this.state.mode}</label>
        <input placeholder="Enter your email address" onChange={(e) => this.setState({text: e.target.value})}/>
        <button onClick={this.handleClick}>Button</button>
      </div>
    );
  }
}

function Header() {
  return <header className="App-header">
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <Component />
    <header>Đây là header</header>
  </header>;
}

export default Header;
