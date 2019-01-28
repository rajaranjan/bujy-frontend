import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../store';
import { User } from '../config';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    constructor(props){
      super(props);
      this.props = props;

      this.isAuthenticated = User.isLoggedIn();
    }
    componentWillMount() {
      if (this.isAuthenticated) {
        history.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (this.isAuthenticated) {
        history.push('/dashboard');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {};
  }

  return connect(mapStateToProps)(NotAuthentication);

}
