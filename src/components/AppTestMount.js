import React from 'react';

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.a = React.createRef();
  }

  componentDidMount() {
    console.log('mount', this.props.name);
    this.a.current.classList.add('class' + this.props.name)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update', this.props.name);
  }

  render () {
    return (
      <div ref={this.a}> {this.props.name} </div>
    )
  }
}


class ListApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update ListApp', );
  }

  onClick = () => {
    this.setState({check: !this.state.check});
  }

  render () {
    // TODO by NhatPA: Với 1 children là 1 instance của component thì React vẫn tự hiểu đấy là component cũ mà ko bị mount lại
    // TODO by NhatPA: Với 1 children là 1 array thì thứ tự component cũ React sẽ tính toán theo index nếu như trong props không có key.
    // TODO by NhatPA: Hãy thử với các cách phía dưới để rõ

    // Instance
    const item2 = this.state.check ?  <Item name={'item2'} /> : null;
    const item1 = <Item name={'item1'} />;

    // Array
    const list = this.state.check ? [2, 1] : [1];

    // Array
    const list1 = [];
    this.state.check && list1.push(<Item name={'item2'} />);
    list1.push(<Item name={'item1'} />)

    // Instance
    const list2 = (
      <div>
        {
          this.state.check && (
            <Item name={'item2'} />
          )
        }
        <Item name={'item1'} />
      </div>
    )

    return (
      <div>
        {/*{*/}
        {/*  this.state.check && (*/}
        {/*    <Item name={'item2'} />*/}
        {/*  )*/}
        {/*}*/}
        {/*<Item name={'item1'} />*/}

        {/*{*/}
        {/*  list.map((number) => {*/}
        {/*    return <Item name={'item' + number} />*/}
        {/*  })*/}
        {/*}*/}

        {/*{item2}*/}
        {/*{item1}*/}

        {list1}

        {/*{list2}*/}
        <button onClick={this.onClick}>BTN</button>
      </div>
    )
  }
}

export default ListApp;
