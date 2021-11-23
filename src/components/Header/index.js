import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      mode: 1,
    }
  }

  handleClick = () => {
    this.setState((prevStat) => (
      {
        mode: prevStat.mode === 1 ? 2 : 1,
      }
    ))
  }

  render() {
    return (
      <div>
        <label>{this.state.mode}</label>
        {
          this.state.mode === 1 ? (
            <input placeholder="Enter your email address" />
          ) : (
            <input placeholder="Enter your email address" />
          )
        }
        <button onClick={this.handleClick}>Button</button>
      </div>
    )
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