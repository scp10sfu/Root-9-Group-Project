import React, { Component } from "react";
import {Router,Switch,Route} from "react-dom";

import About from "./About/About"; //Imports About as the filepath to the folder
import history from './history'; //Gets the history of browser hopefully
//Need the rest of pages below

export default class Routes extends Component{
    //something along the lines of depending on the pressed page, go to the folder and open that js file.
    render(){
        return(
            <Router history= {history}> 
                <Switch>
                    <Route path="/About" component={About} /> 
                </Switch>
                

            </Router>
        )
    }
}