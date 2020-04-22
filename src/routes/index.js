import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Post from '../pages/Post/index';
import CreatePost from '../pages/CreatePost/index';
import CreateCategory from '../pages/CreateCategory/index';
import ChangePost from '../pages/ChangePost/index';

export default function Routes() {
    function refreshPage(){
        window.location.reload();
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Post}/>
                <Route path="/post/new" component={CreatePost} />
                <Route path="/post/change" component={ChangePost} />
                <Route path="/category/new" component={CreateCategory} />
            </Switch>
        </BrowserRouter>
    );
}