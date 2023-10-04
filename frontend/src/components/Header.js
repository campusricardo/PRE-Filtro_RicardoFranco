import React, {Fragment} from "react";
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import RawMaterial from "./RawMaterials";
import Market from "./Market";
import './Header.css';
import logout from '../data/logout.svg';
import recycling from '../data/recycling.svg';
const Header = () => {


    return (
        <Fragment>
      <Router>
        <div className="Header">
          <ul>
            <li>
              <Link to='/home'>
              <img src={recycling} alt="Recycling Logo"></img>
              </Link>
            </li>
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
            <li>
              <Link to='/buy'>
              Buy
              </Link>
            </li>
            <li>
              <Link to='/logout'>
                <img src={logout} alt="Log Out Icon"/>
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
        <Route path="/buy">
            <Market />
          </Route>
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