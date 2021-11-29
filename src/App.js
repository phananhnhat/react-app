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
import AppTestRender from "./components/AppTestRender";


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function Test() {
  return <Redirect to="/about" />;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics1</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

function App() {
  return (
    <Router>
      <Header />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/counter">
            <Counter />
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
        </Switch>
      </div>
    </Router>
  );
}

const Item = ({item}) => {return <p>Render by children props: {item.text}</p>};

export default App;
