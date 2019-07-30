import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home'
import Filtered from '../Filtered'
import RecentlyAdded from '../RecentlyAdded'
import Profile from '../Profile'
import Dapps from '../Dapps'
import Vote from '../Vote'
import Submit from '../Submit'
import Terms from '../Terms/Terms'
import TransactionStatus from '../TransactionStatus'
import Alert from '../Alert'
import HowToSubmit from '../HowToSubmit'
import Withdraw from '../Withdraw'

class Router extends React.Component {
  componentDidMount() {
    const { fetchAllDapps } = this.props
    fetchAllDapps()
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/categories/:id" component={Filtered} />
          <Route path="/all" component={Dapps} />
          <Route path="/recently-added" component={RecentlyAdded} />
          <Route path="/terms" component={Terms} />
          <Route path="/:dapp_name" component={Home} />
        </Switch>
        <Vote />
        <Submit />
        <HowToSubmit />
        <TransactionStatus />
        <Alert />
        <Route path="/:dapp_name" component={Profile} />
        <Withdraw />
      </Fragment>
    )
  }
}

Router.propTypes = {
  fetchAllDapps: PropTypes.func.isRequired,
}

export default Router
