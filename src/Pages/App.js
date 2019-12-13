import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Primary from "../Components/Primary";
import Dashboard from "./Dashboard";
import Posts from "./Posts";
import Music from "./Music";
import TermManager from "./TermManager";
import ImageManager from "./ImageManager";
class App extends Component {
    render() {
        return (
            <Primary>
            <Route path="/" component={Dashboard}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/new_music" component={Music}/>
            <Route path="/edit_music/:id/:title" component={Music}/>
            <Route path="/term/" component={TermManager}/>
            <Route path="/image/" component={ImageManager}/>
            </Primary>
        );
    }
}

export default App;