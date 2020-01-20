import React from "react";
import Home from './Home';
import '../styles.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export const NavBar = () => {
    return (
        <Router>
            <div>
                <nav>
                    <div><Link to="/">FoodSpace</Link></div>
                    <div><Link to="/about">About</Link></div>
                    <div><Link to="/something">Something</Link></div>
                </nav>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/something">
                        <Something />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

const About = () => <h1>About</h1>;

const Something = () => <h1>Something</h1>;

