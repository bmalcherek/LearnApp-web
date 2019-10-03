import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import CollectionList from './components/CollectionList';
import CollectionDetail from './components/CollectionDetail';
import QuestionDetail from './components/QuestionDetail';
import QuestionEditForm from './components/QuestionEditForm';
import CollectionEditForm from './components/CollectionEditForm';
import LearnView from './components/LearnView';
import LoginForm from './containers/LoginForm';
import RegisterForm from './containers/RegisterForm';
import MyCollectionDetail from './components/MyCollectionDetail';

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" render={() => (<Redirect to="/collections" />)} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/collections" component={CollectionList} />
            <Route exact path="/collections/create-new-collection" component={CollectionEditForm} />
            <Route exact path="/collections/:collectionID" component={CollectionDetail} />
            <Route exact path="/collections/:collectionID/learn" component={LearnView} />
            <Route
                exact
                path="/collections/:collectionID/edit-collection"
                component={
                    props => <CollectionEditForm {...props} edit />
            } />
            <Route exact path="/collections/:collectionID/create-new-question/" component={QuestionEditForm} />
            <Route exact path="/collections/:collectionID/:questionID/" component={QuestionDetail} />
            <Route
                exact
                path="/collections/:collectionID/:questionID/edit-question"
                component={
                    props => <QuestionEditForm {...props} edit />
            } />
            <Route
                exact
                path="/my-collections"
                component={
                    props => <CollectionList {...props} myCollections />
            } />
            <Route exact path="/my-collections/:collectionID" component={MyCollectionDetail} />
        </Switch>
    </div>
);

export default BaseRouter;
