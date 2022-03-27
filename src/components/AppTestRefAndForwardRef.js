import React from 'react';

class Child1 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  cal = () => {
    console.log(123);
  }

  render() {
    // console.log(this.props.ref) // Ref ko được pass qua props (giống như key), phải thay bằng 1 tên khác console.log(props.refC)
    return (
      <p ref={this.props.refC}>
      Child1
      </p>
    )
  }
}

const Child2 = (props) => {
  // console.log(props.ref) // => Ref ko được pass qua props (giống như key), phải thay bằng 1 tên khác console.log(props.refC)
  return <p>Child2</p>
}

// Muốn lấy được ref thì cần để trong React.forwardRef, ref sẽ là param thứ 2
const Child3 = React.forwardRef((props, ref) => {
  return <p ref={ref}>Child3</p>
});

// Với HOC thì dùng cách này, thì sẽ thống nhất được cách dùng giữ HOC và dùng bình thường
// Thay vì sẽ: Nếu bạn thêm một ref vào HOC, ref sẽ tham chiếu đến thành phần vùng chứa ngoài cùng, không phải thành phần được bao bọc.
// TODO: https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    calX = () => {
      console.log(3456)
    }

    render() {
      const {forwardedRef, ...rest} = this.props;
      // Assign the custom prop "forwardedRef" as a ref
      return <Component forwardedRef={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} ref={props.wrapperRef} forwardedRef={ref} />;
  });
}

const Child4 = logProps((props) => {
  return <p ref={props.forwardedRef}>Child4</p>
})

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.myRef chỉ đơn giản là {current: null}
    this.myRef = React.createRef();
    this.myRefCustom = {
      current: null,
    };
    this.refCallbackEl = null;
    this.myRefChild1 = React.createRef();
    this.myRefCChild1 = React.createRef();
    this.myRefChild2 = React.createRef();
    this.myRefChild3 = React.createRef();
    this.myRefChild4 = React.createRef();
  }

  componentDidMount() {
    // console.log(this.myRef.current);
    // console.log(this.myRefCustom.current);
    // console.log(this.refCallbackEl);
    console.log(this.myRefChild1);
    // console.log(this.myRefCChild1);
    // console.log(this.myRefChild2);
    // console.log(this.myRefChild3);
    console.log(this.myRefChild4);
  }

  refCallback = (element) => {
    this.refCallbackEl = element;
  }

  render() {

    return (
      <div  >
        <p ref={this.myRef}>Ref DOM with React.createRef</p>
        <p ref={this.myRefCustom}>Ref DOM with React.createRef</p>
        <p ref={this.refCallback}>Ref DOM with React.createRef</p>
        {/*'ref' sẽ ko thể dùng qua props (cả class Component và funtional component), phải thay bằng tên khác => refC, hoặc dùng forwardedRef */}
        <Child1 ref={this.myRefChild1} refC={this.myRefCChild1} />
        {/*'ref' sẽ ko thể dùng qua props, phải thay bằng tên khác*/}
        <Child2 refC={this.myRefChild2} />
        {/*Muốn lấy được ref thì cần dùng với React.forwardRef, ví dụ: Child3*/}
        <Child3 ref={this.myRefChild3} />
        <Child4 ref={this.myRefChild4} x={1} />
      </div>
    )
  }
}


export default App;
