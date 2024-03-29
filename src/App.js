import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";

import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import rootReducer from './reducers'

// Components
import Home from './screens/Home';
import Header from './components/Header'
import {Counter} from "./components/Counter";
import ListApp from "./components/ListApp";
import AppTestKey from "./components/AppTestKey";
import AppTestMount from "./components/AppTestMount";
import AppTestKeyFunctionComponent from "./components/AppTestKeyFunctionComponent";
import AppTestRender from "./components/AppTestRender";
import Download from "./components/Download";
import AppTestRenderListSuperLong from "./components/AppTestRenderListSuperLong";
import ReactHook from "./components/ReactHook";
import PromiseTest from "./components/PromiseTest";
import Suspense from "./components/Suspense";
import Loadable from "./components/Loadable";
import AppTestRefAndForwardRef from "./components/AppTestRefAndForwardRef";
import CheckBox from "./components/CheckBox";
import FunctionalAndClassComponent from "./components/FunctionalAndClassComponent";
import UseDeferredValue from "./components/UseDeferredValue";
import UseTransition from "./components/UseTransition";
import ReduxSelector from "./components/ReduxSelector";
import ZustandComponent from "./components/ZustandComponent";
import CustomHook from "./components/CustomHook";
import ChainDemo from "./components/ChainDemo";

function Test() {
  return <Redirect to="/about" />;
}

function Topics() {
  let match = useRouteMatch();
alert(match.path)
  return (
    <div>
      <h2>Topics1</h2>
      <Switch>
        <Route path={`/topics/aaa`}>
          <Topic />
        </Route>
        <Route path={'/'}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // let { topicId } = useParams();
  return <h3>Requested topic ID: 123</h3>;
}

const Item = ({item}) => {return <p>Render by children props: {item.text}</p>};

function App() {
  return (
    <Router>
      <Header />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/app1">List App</Link>
            </li>
            <li>
              <Link to="/apptest1">App test render with Pure Component</Link>
            </li>
            <li>
              <Link to="/download">Test Download</Link>
            </li>
            <li>
              <Link to="/apptestkey">Test App key</Link>
            </li>
            <li>
              <Link to="/apptestmount">Test Component Mount</Link>
            </li>
            <li>
              <Link to="/apptestkeyfunctioncomponent">Test App key Function Component</Link>
            </li>
            <li>
              <Link to="/apptestlistsuperlong">Test App List Super Long</Link>
            </li>
            <li>
              <Link to="/react-hook">React Hook</Link>
            </li>
            <li>
              <Link to="/custom-hook">React Custom Hook</Link>
            </li>
            <li>
              <Link to="/promise">Test Promise</Link>
            </li>
            <li>
              <Link to="/suspense">App Suspense</Link>
            </li>
            <li>
              <Link to="/loadable">App use Loadable Library</Link>
            </li>
            <li>
              <Link to="/ref-and-forward-ref">App test ref and React.forwardRef</Link>
            </li>
            <li>
              <Link to="/function-and-class-component">Functional And Class Component</Link>
            </li>
            <li>
              <Link to="/checkbox">Check Box</Link>
            </li>
            <li>
              <Link to="/use-deferred-value">useDeferredValue Example</Link>
            </li>
            <li>
              <Link to="/use-transition">useTransition Example</Link>
            </li>
            <li>
              <Link to="/redux-selector">Redux Selector</Link>
            </li>
            <li>
              <Link to="/zustand-example">Zustamd Example</Link>
            </li>
            <li>
              <Link to="/chain-demo">Chain</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/topics">
            <div>
              <h2>Topics1</h2>
              <Switch>
                <Route path={`/topics/aaa`}>
                  <Topic />
                </Route>
                <Route path={'/'}>
                  <h3>Please select a topic.</h3>
                </Route>
              </Switch>
            </div>
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/counter">
            <Counter test={1} />
          </Route>
          <Route path="/app1">
            <ListApp
              items={
                [
                  {text: 'text2'}, {text: 'text1'}, {text: 'text3'}, {text: 'text4'}
                ]
              }
              itemComponent={({item}) => {return <p>Render by ItemComponent props: {item.text}</p>}}
            >
              <Item />
              {/*<p>This is children of ListApp</p>*/}
            </ListApp>
          </Route>
          <Route path="/apptest1">
            <AppTestRender />
          </Route>
          <Route path="/download">
            <Download />
          </Route>
          <Route path="/apptestkey">
            <AppTestKey />
          </Route>
          <Route path="/apptestmount">
            <AppTestMount />
          </Route>
          <Route path="/apptestkeyfunctioncomponent">
            <AppTestKeyFunctionComponent />
          </Route>
          <Route path="/apptestlistsuperlong">
            <AppTestRenderListSuperLong />
          </Route>
          <Route path="/react-hook">
            <ReactHook />
          </Route>
          <Route path="/custom-hook">
            <CustomHook />
          </Route>
          <Route path="/promise">
            <PromiseTest />
          </Route>
          <Route path="/suspense">
            <Suspense />
          </Route>
          <Route path="/loadable">
            <Loadable />
          </Route>
          <Route path="/ref-and-forward-ref">
            <AppTestRefAndForwardRef />
          </Route>
          <Route path="/checkbox">
            <CheckBox />
          </Route>
          <Route path="/function-and-class-component">
            <FunctionalAndClassComponent />
          </Route>
          <Route path="/use-deferred-value">
            <UseDeferredValue />
          </Route>
          <Route path="/use-transition">
            <UseTransition />
          </Route>
          <Route path="/redux-selector">
            <ReduxSelector />
          </Route>
          <Route path="/zustand-example">
            <ZustandComponent />
          </Route>
          <Route path="/chain-demo">
            <ChainDemo />
          </Route>
        </Switch>
      </div>
      {/*<Counter test={1} />*/}
    </Router>
  );
}

export default App;
