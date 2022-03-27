import React from 'react';
import ReactDOM from 'react-dom';

import Count from './Count'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    const items = [];
    let i = 0;
    while(i < 100000) {
      i++;
      items.push({
        id: 'id' + i,
        name: 'Item ' + i,
      })
    }
    this.state = {
      items,
      selectId: null,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.timeEnd('update');
  }

  onSelect = (data) => {
    console.time('update');
    this.setState({
      selectId: data.id,
    })
  }

  render() {
    // Gay render cho item => render se bi cham
    // const onSelect1 = (data) => this.onSelect(data);
    return (
      <div>
        {this.state.items.map((item) => <Item onSelect={this.onSelect} key={item.id} data={item} selected={item.id === this.state.selectId} />)}
      </div>
    )
  }
}

const Item1 = React.memo(({data, selected, onSelect}) => {
  const onSelect1 = () => {
    onSelect(data);
  }

  return <div onClick={onSelect1} className={selected ? 'selected' : ''}>{data.name}</div>
});

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onSelect = () => {
    this.props.onSelect(this.props.data);
  }

  render() {
    return (
      <div onClick={this.onSelect} className={this.props.selected ? 'selected' : ''}>{this.props.data.name}</div>
    )
  }
}

export default App;
