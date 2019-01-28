import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../basic/InputField';
import { Validate } from  '../../config';
import {bindActionCreators } from 'redux';
import { CreatePollFailure, CreatePollSuccess,CreatePollRequest } from '../../actions/CreatePoll';
// import { bindActionCreators } from 'redux';

class NewPoll extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {};
        this.handleInitialize = this.handleInitialize.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addOption = this.addOption.bind(this);
        this.pasteTag = this.pasteTag.bind(this);
    }
    componentWillMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const poll = {
            "title": "",
            "options": [],
            "option": ""
        };
        this.setState({
            poll
        })
    }
    onChange(event) {
        console.log("state",this.state);
        console.log("event",event.target.name);
        let elemName = event.target.name;
        let poll = this.state.poll;
        if( elemName == "title" ) {
            poll[elemName] = event.target.value;
        }
        if(elemName == "option") {
            poll[elemName] = event.target.value
        }
       
        console.log("poll",poll);
        this.setState({
            poll
        })
    }
    addOption(e) {
        var options = this.state.poll.options;
        console.log(options);
        var toAdd = true;
        options.map((item, index) => {
            if(item === this.state.poll.option) {
                console.log("false");
                toAdd = false;
            } 
        });
        if(toAdd == true) {
            options.push(this.state.poll.option);
            var poll = this.state;
            poll.options = options;
            this.setState({
                poll
            })
        }
        e.preventDefault();
    }
    pasteTag() {
        console.log(this.state);
        var options = this.state.poll.options;
        var tags = [];
        for(var i=0; i<options.length; i++){
            console.log(options[i]);
            tags.push(<div key={i} className="tag">{options[i]}</div>)
        }
        return tags;
    }
    submitForm() {
        this.props.CreatePollRequest(this.state.poll);
	}
    
    render() {
        const { handleSubmit, submitting, error } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="newPoll">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="newPoll-title">MAKE A NEW POLL</span>
                        </div>
                    </div>
                    <div className="newPoll-section">
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="newPoll-content-title"></span>
                                </div>
                            </div>
                            <div className="row newPole-content-title">
                                <div className="col-md-12">
                                    <span className="">TITLE</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Field 
                                        type="text"
                                        className = "form-control input-class input-id" 
                                        component = { InputField }
                                        name = "title"
                                        id = "title"
                                        label = "Enter Title" 
                                        onChange = { this.onChange }
                                    />
                                </div>
                            </div>
                            <div className="row newPole-content-title">
                                <div className="col-md-12">
                                    <span className="">ADD OPTION</span>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-7">
                                    <Field 
                                        type = "text" 
                                        className = "form-control input-class input-id" 
                                        component = { InputField }
                                        name = "option"
                                        id = "option"
                                        label = "Add option" 
                                        onChange = { this.onChange }
                                    />
                                </div>
                                <div className="col-md-5">
                                    <button className="btn btn-md btn-option"  onClick={this.addOption}>ADD OPTION</button>
                                </div>
                            </div>
                            {this.state.poll.options.length > 0 && 
                                <div className="row tagCloud">
                                    <div className="col-md-6">
                                        {this.pasteTag()}
                                    </div>
                                </div>
                            }
                            <div className="row btn-create-section">
                                <button className="btn btn-lg btn-create" type="submit" disabled={submitting}>CREATE</button>
                            </div>
                    </div>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

	if (!Validate.text(values.title)) {
	  errors.title = 'Title is required'
    }
    if (!Validate.text(values.option)) {
        errors.option = 'Option is required'
    }
	return errors;
};

let newPoll =  reduxForm({
    form: 'newPoll', 
    validate
})(NewPoll);

//accessing state from reducer 
function mapStateToProps(state, ownProps) { 
    return {
        poll: state.poll
    };
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        CreatePollFailure,CreatePollSuccess,CreatePollRequest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(newPoll);