import Header from "./components/Header";
import { Switch, Route } from "react-router";
import HomePage from "./components/HomePage";
import "./styles/style.css";
import MyNominations from "./components/MyNominations";
import setNominatedMovies from "./actions/setNominatedMovies";
import store from "./store";
import React from "react";

if (localStorage.movies) {
  store.dispatch(setNominatedMovies(JSON.parse(localStorage.movies)));
}

function App() {
  return (
    <div>
      <Header></Header>
      <div style={{ marginTop: 64 }}>
        <Switch>
          <Route path="/my-nominations">
            <MyNominations />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
