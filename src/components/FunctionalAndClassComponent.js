import React from 'react';

const a = [1,2,3,4,5];

const Child = () => {

  React.useEffect(() => {
    console.log('useEffect');
  }, [])

  React.useEffect(() => {
    console.log('useEffect update');
  })

  console.log('kk')
  return (
    <div>Item
      {
        a.map(() => {
          console.log('child')
          return <p>1</p>;
        })
      }
    </div>
  )
}

class Child1 extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor Child')
  }

  componentDidMount() {
    console.log('componentDidMount Child', )
  }

  componentDidUpdate() {
    console.log('componetDidUpdate Child', )
  }

  render() {
    return (
      <div>Item
        {
          a.map(() => {
            console.log('child')
            return <p>1</p>;
          })
        }
      </div>
    )
  }
}

// TODO: Functional Component và Class Component có điểm khác biệt giữa Effect và vòng đời
//  Với Class Component thì sẽ componentDidMount của child sẽ chạy trước rồi mới tới componentDidMount của  parent
//  Với Class Component thì useEffect của child với [] sẽ chạy sau componentDidMount của component cha.
//  Tương tự với lúc update cũng vậy, useEffect của update sẽ chạy sau componentDidUpdate
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1,2,3,4,5,6,7,8,9,10],
    }
  }

  componentDidMount() {
    // downloadFile();
    console.log('componentDidMount', )

    setTimeout(() => {
      this.setState({
        x: [6,7,8,9]
      })
      console.log('start Update')
    },  2000)
  }

  componentDidUpdate() {
    console.log('componetDidUpdate', )
  }

  render() {
    console.log('start')
    return (
      <div>
        {this.state.items.map((item) => {
          console.log(item)
          return <Child />
        })}
      </div>
    )
  }
}

export default App;
