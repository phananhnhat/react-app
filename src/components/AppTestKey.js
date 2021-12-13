import React from 'react';

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.a = React.createRef();
  }

  componentDidMount() {
    console.log('mount', this.props.data);
    this.a.current.classList.add('class' + this.props.data.name)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update', this.props.data);
  }

  render () {
    console.log(1);
    return (
      <div ref={this.a}> {this.props.data.name} </div>
    )
  }
}


class ListApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {id: '1', name: 'A'},
        {id: '2', name: 'B'},
        {id: '3', name: 'C'},
        // {id: '4', name: 'D'},
        // {id: '5', name: 'E'},
      ]
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update ListApp', );
  }

  onClick = () => {
    const newAray = [this.state.items[0], this.state.items[2], {id: '4', name: 'D'}]
    this.setState({items: newAray});
  }

  render () {
    // Test trên cả 2 t/h: key= id, index, và ko có key để thấy sự khác biệt
    return (
      <div>
        {
          this.state.items.map((item, index) => <Item key={item.id} data={item} />)
        }
        <button onClick={this.onClick}>BTN</button>
      </div>
    )
  }
}

export default ListApp;
