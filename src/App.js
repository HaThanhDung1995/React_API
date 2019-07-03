import "./App.css";
import Menu from "./components/Menu/Menu";
import routes from "./routes";
import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {
  showCotentMenus = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            component={item.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <div className="container">
            <div className="row">{this.showCotentMenus(routes)}</div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
