import React, {Fragment} from "react";
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import RawMaterial from "./RawMaterials";
import Market from "./Market";
import Account from "./Account";
import './Header.css';
import logout from '../data/logout.svg';
import recycling from '../data/recycling.svg';
import settings from '../data/settings.svg';
const Header = () => {


    return (
        <Fragment>
      <Router>
        <div className="Header">
          <ul>
            <li>
              <Link to='/home'>
                <figure className="logo">
                  <figcaption> standart-recycling-company</figcaption>
                <img src={recycling} alt="Recycling Logo"></img>

                </figure>
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
              <Link to='/account'>
                <figure className="logo">
                <img src={settings} alt="Account Settings"/>
                </figure>
              </Link>
            </li>
            <li>
              <Link to='/logout'>
                <figure className="logo">
                <img src={logout} alt="Log Out Icon"/>
                </figure>
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
        <Route path="/account">
            <Account />
        </Route>
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