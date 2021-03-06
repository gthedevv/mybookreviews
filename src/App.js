import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './componenets/Home';
import BookView from './containers/BookView';
import Layout from './hoc/layout';
import RegistrationPage from './componenets/Registration';
import LoginPage from './componenets/Login';
import AddReveiw from './componenets/AddReview';
import UserProfile from './componenets/UserProfile';
import UserReviews from './componenets/UserReviews/';
import EditReview from './componenets/EditReview';
import NotFound from './componenets/NotFound';
import { refreshAuthToken } from './actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/books/:id' component={BookView} />
          <Route exact path='/register' component={RegistrationPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/user' component={UserProfile} />
          <Route exact path='/add-review' component={AddReveiw} />
          <Route exact path='/user-reviews' component={UserReviews} />
          <Route exact path='/edit-review/:id' component={EditReview} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
