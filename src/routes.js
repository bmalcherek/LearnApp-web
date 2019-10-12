import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/forms/NewCollectionForm';
import CollectionDetail from './components/CollectionDetail';
import QuestionForm from './components/forms/QuestionForm';
import LoginForm from './components/forms/LoginForm';

const BaseRouter = () => (
  <div id="router" className="content">
    <Switch>
      <Route exact path="/" component={CollectionList} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/collections" component={CollectionList} />
      <Route
        exact
        path="/collections/:collectionID"
        component={CollectionDetail}
      />
      <Route
        exact
        path="/create-new-collection"
        component={NewCollectionForm}
      />
      <Route
        exact
        path="/collections/:collectionID/add-question"
        component={QuestionForm}
      />
    </Switch>
  </div>
);

export default BaseRouter;
