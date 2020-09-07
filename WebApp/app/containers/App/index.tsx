/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import AppWrapper from '../../components/AppWrapper';
import routes from 'routes';
import { RootState } from 'domain/App/types';
import appReducer from 'domain/App/reducer';
import rootDaemonSaga from 'domain/App/saga';
import { RouteComponentProps } from 'react-router';
import { makeSelectLoading } from 'domain/App/selectors';
import { makeSelectIsConnected } from 'domain/Wallet/selectors';
import ToastWrapper from 'containers/modules/ToastWrapper';

function PrivateRoute({ component: Component, isConnected, ...rest }) {
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        return isConnected ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

function PublicRoute({ component: Component, isConnected, ...rest }) {
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

interface StateProps {
  isConnected: boolean;
  loading: boolean;
}

interface DispatchProps {}

interface RouteParams {}

interface OwnProps
  extends RouteComponentProps<RouteParams>,
    React.Props<RouteParams> {}

type Props = StateProps & DispatchProps & OwnProps;

function App({ isConnected, loading, location }: Props) {
  // The PublicRoute and PrivateRoute components below should only be used for top level components
  // that will be connected to the store, as no props can be passed down to the child components from here.

  return (
    <AppWrapper
      isConnected={isConnected}
      currentlySending={loading}
      navLinks={routes.filter((r) => r.isNavRequired)}
    >
      <ToastWrapper />
      <Switch>
        {routes.map((r) => {
          const route = r.isProtected ? (
            <PrivateRoute
              path={r.path}
              exact
              component={r.component}
              isConnected={isConnected}
              key={r.path}
              modalComponent={r.modalComponent}
            />
          ) : (
            <PublicRoute
              path={r.path}
              exact
              component={r.component}
              isConnected={isConnected}
              key={r.path}
              modalComponent={r.modalComponent}
            />
          );
          return route;
        })}
      </Switch>
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  loading: makeSelectLoading,
  isConnected: makeSelectIsConnected,
});

const mapDispatchToProps = (dispatch) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer<OwnProps>({
  key: 'global',
  reducer: appReducer,
});
const withSaga = injectSaga<OwnProps>({
  key: 'global',
  saga: rootDaemonSaga,
  mode: DAEMON,
});

export default compose(withRouter, withReducer, withSaga, withConnect)(App);
