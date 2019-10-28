import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './helpers/PrivateRoute';

import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/forms/NewCollectionForm';
import CollectionDetail from './components/CollectionDetail';
import QuestionForm from './components/forms/QuestionForm';
import LoginForm from './components/forms/LoginForm';
import MyCollectionsList from './components/MyCollectionsList';
import RegistrationForm from './components/forms/RegistrationForm';
import LearnView from './components/LearnView';
import Skeleton from './components/loading/Skeleton';

const BaseRouter = () => (
  <div id="router" className="content">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/registration" component={RegistrationForm} />
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
      <PrivateRoute
        exact
        path="/my-collections/:collectionID/learn"
        component={LearnView}
      />
      <Route
        exact
        path="/collections/:collectionID/:questionID/edit"
        // eslint-disable-next-line react/jsx-props-no-spreading
        component={props => <QuestionForm {...props} edit />}
      />
      <Route exact path="/test" component={Skeleton} />
    </Switch>
  </div>
);

export default BaseRouter;
