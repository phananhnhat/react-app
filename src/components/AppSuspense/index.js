import React, { Suspense, useState } from 'react';

import { fetchProfileData } from "./fakeApi";

const ComponentA = React.lazy(() => import('./components/ComponentA'));
const ComponentB = React.lazy(() => import('./components/ComponentB'));
const ComponentC = React.lazy(() => import('./components/ComponentC'));

// TODO
// console.log(ComponentA); // => 1 Component
// console.log(import('./components/ComponentA')); // => 1 Promise

// import ComponentA from './components/ComponentA';
// import ComponentB from './components/ComponentB';
// import ComponentC from './components/ComponentC';

// TODO by NhatPA: Cách dùng Suspense cho xứ lý fetch data
// TODO by NhatPA: Các component con của Suspense có thể return về 1 throw (ví dụ: ProfileDetails) Lưu ý: có thể return về 1 throw chứ không phải bản thân Component đó là 1 promise
// TODO by NhatPA: Suspense có thể dựa vào throw được trả về để xem các trạng thái của các component con đã sẵn sàng để render chưa
// TODO by NhatPA: Nếu throw là 1 promise thì khi promise được relve tức là component đã sẵn sàng để render
// TODO by NhatPA: Trường hợp throw về cái khác thì coi như đó là lỗi, component sẽ không được render ra
// TODO by NhatPA: Bản react 17 trở lên, khi throw Error('abc') thì lại ko đc, chưa rõ nguyên nhân, Các ví dụ tìm trên mạng cũng thế
// TODO by NhatPA: Phải dùng throw Promise.reject('123') thì mới ko báo lỗi
// TODO by NhatPA: Nhưng khi throw Promise.reject('123') thì Suspense lại làm cho component con bị render lại liên tục ? CHưa rõ tại sao ? Các ví dụ tìm trên mạng cũng thế ?
// TODO by NhatPA: => Chốt, chỉ nên dùng Suspense với React.lazy (Ex: <App />), ko nên dùng cho trường hợp fetch data hoặc các error lỗi khác. Chờ bản React 18 thì mới có cụ thể.
// Ví dụ App1 và App2

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <ComponentA />
          <ComponentB />
          <ComponentC />
        </Suspense>
      </div>
    )
  }
}

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileData(0);

function App1() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button
        onClick={() => {
          const nextUserId = getNextId(resource.userId);
          setResource(fetchProfileData(nextUserId));
        }}
      >
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  console.log('render ProfilePage');
  console.log(resource.user.read);
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <ProfileDetails resource={resource} />
          {/*<Suspense fallback={<h1>Loading posts...</h1>}>*/}
          {/*  <ProfileTimeline resource={resource} />*/}
          {/*</Suspense>*/}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function ProfileDetails({ resource }) {
  console.log('render ProfileDetails');
  throw Promise.reject(1)
  // const user = resource.user.read();
  // return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

class ErrorBoundary1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    console.log('render')
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw Promise.reject('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App2() {
  return (
    <div>
      <ErrorBoundary1>
        <Suspense fallback={<div>Loading</div>}>
          <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
          <BuggyCounter />
        </Suspense>
      </ErrorBoundary1>
      <hr />
    </div>
  );
}

export default App;
