import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../store';
import { User } from '../config';

export default function (ComposedComponent) {
  class Authentication extends Component {

    constructor(props){
      super(props);
      this.props = props;

      this.isAuthenticated = User.isLoggedIn();
    }

    componentWillMount() {
      if (!this.isAuthenticated) {
        history.push('/login', { continue: this.props.location.pathname });
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.isAuthenticated) {
        history.push('/login', { continue: this.props.location.pathname });
      }
    }

    PropTypes = {
      router: PropTypes.object
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {};
  }

  function mapDispatchToProps (dispatch) {
  return {};
}

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}