import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../basic/InputField';
import { Toast } from '../../basic/Toast';
import { Validate } from  '../../config';
import {bindActionCreators } from 'redux';
import { LoginRequestFailure, LoginRequestSuccess, LoginRequest } from '../../actions/LoginAction';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {};
        this.handleInitialize = this.handleInitialize.bind(this);
        this.onChange = this.onChange.bind(this);
        this.redirectToDev = this.redirectToDev.bind(this);
    }
    componentWillMount() {
        //console.log("this.props",this.props);
        this.handleInitialize();
    }
    handleInitialize() {
        const user = {
            "email": "",
            "password": ""
        };
        this.setState({
            user
        })
        // console.log("this.state",this.state);
    }
    onChange(event) {
        // console.log("state",this.state);
        // console.log("event",event.target.name);
        let elemName = event.target.name;
        let user = this.state.user;
        if( elemName == "email" ) {
            user[elemName] = event.target.value;
        }
        if ( elemName == "password" ) {
            user[elemName] = event.target.value;
        }
        console.log("user",user);
        this.setState({
            user
        })
    }
    submitForm() {
        //console.log("submitForm",this.props);
        this.props.LoginRequest(this.state.user);
    }
    redirectToDev() {
        //console.log("redirect",this.props);
        this.props.history.push('/dashboard');
    }
    render() {
        const { handleSubmit, submitting, error } = this.props;
        return (
            <div>
                {console.log("popp",this.props)}
                {this.props.user.error && 
                    <Toast 
                        text="Username/password is wrong"
                        classname = "show"
                    />
                }
                {this.props.user.success && 
                    this.redirectToDev()
                }
                <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="loginForm">
                    <div className="container">
                        <div className="row login-section">
                            <div className="col-md-12">
                                <div className="row">
                                    <Field 
                                        type="text"
                                        className = "form-control input-class input-id" 
                                        component = { InputField }
                                        name = "email"
                                        id = "email"
                                        label = "Enter Email Id" 
                                        onChange = { this.onChange }
                                    />
                                </div>
                                <div className="row">
                                    <Field 
                                        type = "password" 
                                        className = "form-control input-class input-password" 
                                        component = { InputField }
                                        name = "password"
                                        id = "password"
                                        label = "Enter password" 
                                        onChange = { this.onChange }
                                    />
                                </div>
                                <div className="row">
                                    <button className="btn btn-lg login-btn" type="submit" disabled={this.props.user.requesting}>Login</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

	if (!Validate.text(values.email)) {
	  errors.email = 'Email is required'
    }
    if (!Validate.email(values.email)) {
        errors.email = 'Please enter valid email'
      }
    if (!Validate.text(values.password)) {
        errors.password = 'Password is required'
      }
	return errors;
};

let loginForm =  reduxForm({
    form: 'loginForm', 
    validate
})(LoginForm);

//accessing state from reducer 
function mapStateToProps(state, ownProps) { 
    return {
        user: state.user
    };
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        LoginRequestFailure, LoginRequestSuccess, LoginRequest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);