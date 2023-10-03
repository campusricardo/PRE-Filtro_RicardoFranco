import React, {Fragment, useEffect} from "react";
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import RawMaterial from "./RawMaterials";
import './Header.css';

const Header = () => {

    useEffect(()=> {

    }, []);
    return (
        <Fragment>
      <Router>
        <div className="Header">
          <ul>
            <li>
              <Link to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                Register
              </Link>
            </li>
            <li>
              <Link to='/home'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/contribute'>
              Contribute
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/contribute">
            <RawMaterial />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          </Switch>
      </Router>
    </Fragment>
    );
};

export default Header;