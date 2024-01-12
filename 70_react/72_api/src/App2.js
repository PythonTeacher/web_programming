import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import MusicList2 from './MusicList2';

// Link : 화면 리로딩되지 않음 (a href로 하면 리로드됨)
function App2() {
  return (
    <>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/music" component={MusicList2} />
        <Route path="/about" component={About} />
        <Route path="/"><h1>Not found</h1></Route>
      </Switch>
    </>
  );
}

export default App2;
