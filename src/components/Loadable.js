import React, {Suspense} from 'react';
import loadable from '@loadable/component'

// const ComponentA = React.lazy(() => import('./Suspense/components/ComponentA'));
// const ComponentB = React.lazy(() => import('./Suspense/components/ComponentB'));
// const ComponentC = React.lazy(() => import('./Suspense/components/ComponentC'));

const ComponentA = loadable(() => import('./Suspense/components/ComponentA'));
const ComponentB = loadable(() => import('./Suspense/components/ComponentB'));
const ComponentC = loadable(() => import('./Suspense/components/ComponentC'), {
  fallback: <div>Loading...</div>,
});
// Có thể dùng Suspense trong react hoặc fallback option của loadable

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {/*<Suspense fallback={<div>Loading</div>}>*/}
          <ComponentA />
          <ComponentB />
          <ComponentC />
        {/*</Suspense>*/}
      </div>
    )
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('123', error)
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