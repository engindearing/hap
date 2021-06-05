import 'antd/dist/antd.less';
import React, { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './components/pages/Admin';
import Apply from './components/pages/Apply';
import { HomePage } from './components/pages/Home';
import LandingPage from './components/pages/Landing';
import LoginPage from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';

import { NotFoundPage } from './components/pages/NotFound';
import ProgramManager from './components/pages/ProgramManager';

import Programs from './components/pages/Programs';

import Requests from './components/pages/Requests';
import { store, persistor } from './redux/store';
import './styles/global.css';
import PrivateRoute from './utils/auth/PrivateRoute';

import socket from './config/socket';

import { Button, notification } from 'antd';
import { fetchNotifications } from './redux/notifications/notificationActions';

const TRACKING_ID = 'G-ZDW3ENHWE7'; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RAP />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function RAP() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.

  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, currentUser } = useSelector(state => state.user);

  const userRef = useRef(currentUser);

  const showNotification = options => {
    const redirectToRequest = requestId =>
      history.push(`/requests/${requestId}`);

    const btn = (
      <Button onClick={() => redirectToRequest(options.requestId)}>
        View Request
      </Button>
    );

    notification.info({ message: options.message, btn });
  };

  useEffect(() => {
    socket.on('requestChange', options => {
      // Only show notifications made by other users

      if (options.senderId !== userRef.current.id) {
        showNotification(options);
      }

      dispatch(fetchNotifications());
    });
  }, []);

  useEffect(() => {
    userRef.current = currentUser;
  }, [currentUser]);

  return (
    <Layout>
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgot" exact component={ForgotPassword} />

        <Route path="/reset/:resetToken" exact component={ResetPassword} />

        <Route path="/apply" exact component={Apply} />

        {/* Any routes you need secured by role should be registered as PrivateRoutes */}
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/requests/:id" component={Requests} />
        <PrivateRoute
          path="/admin"
          roles={['admin', 'orgAdmin']}
          component={Admin}
        />
        <PrivateRoute
          path="/program_manager"
          roles={['programManager']}
          component={ProgramManager}
        />
        <PrivateRoute path="/organizations/:id/programs" component={Programs} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
