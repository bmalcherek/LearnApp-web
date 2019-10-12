import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './helpers/PrivateRoute';

import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/forms/NewCollectionForm';
import CollectionDetail from './components/CollectionDetail';
import QuestionForm from './components/forms/QuestionForm';
import LoginForm from './components/forms/LoginForm';
import MyCollectionsList from './components/MyCollectionsList';

const BaseRouter = () => (
  <div id="router" className="content">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <PrivateRoute exact path="/" component={CollectionList} />
      <PrivateRoute exact path="/collections" component={CollectionList} />
      <PrivateRoute
        exact
        path="/collections/:collectionID"
        component={CollectionDetail}
      />
      <PrivateRoute
        exact
        path="/create-new-collection"
        component={NewCollectionForm}
      />
      <PrivateRoute
        exact
        path="/collections/:collectionID/add-question"
        component={QuestionForm}
      />
      <PrivateRoute
        exact
        path="/my-collections"
        component={MyCollectionsList}
      />
    </Switch>
  </div>
);

export default BaseRouter;
