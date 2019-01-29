import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../basic/InputField';
import { Toast } from '../../basic/Toast';
import { Validate } from  '../../config';
import {bindActionCreators } from 'redux';
import { AddPollsToUi, AddPollsToUiSuccess, AddPollsToUiFailure, CreatePollFailure, CreatePollSuccess,CreatePollRequest } from '../../actions/CreatePoll';
// import { bindActionCreators } from 'redux';

class NewPoll extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        //this.state.poll = {};
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
        let elemName = event.target.name;
        let poll = this.props.poll.pollData.poll;
        if( elemName == "title" ) {
            poll[elemName] = event.target.value;
            this.props.poll.pollData.poll.title = poll[elemName]
        }
        if(elemName == "option") {
            poll[elemName] = event.target.value
            this.props.poll.pollData.poll.option = poll[elemName];
        }
    }
    addOption(e) {
        
        var options = this.props.poll.pollData.poll.options;
        var toAdd = true;
        let poll; 
        if(options.length > 0) {
            options.map((item, index) => {
                if(item === this.props.poll.pollData.poll.option) {
                    toAdd = false;
                } 
            });
            if(toAdd == true) {
                options.push(this.props.poll.pollData.poll.option);
                let poll = this.props.poll.poll;
                poll.options = options;
            }
        } else {
            // console.log("beforeAdd", this.props.poll);
            // this.props.pull.options.push(this.props.poll.option);
            // //this.props.poll.options = options;
            options.push(this.props.poll.pollData.poll.option);
            poll = this.props.poll.poll;
            poll.options = options;
        }
        // console.log("beforeAdd", poll);
        //this.props.AddPollsToUi(poll);
        poll = this.props.poll.poll;
        this.setState({
            poll
        })
        e.preventDefault();
    }
    pasteTag() {
        // console.log('xxds', this.props.poll);
        var options = this.props.poll.pollData.poll.options;
        var tags = [];
        for(var i=0; i<options.length; i++){
            tags.push(<div key={i} className="tag">{options[i]}</div>)
        }
        return tags;
    }
    submitForm(e) {
        this.props.CreatePollRequest(this.props.poll.pollData.poll);
	}
    
    render() {
        const { handleSubmit, submitting, error,poll } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="newPoll">
                {console.log("xxx",this.props)}
                
                {poll.pollData.poll &&     
                <div>
                    {poll.error && 
                        <Toast 
                            text="Couldn't add poll"
                            classname = "show"
                        />
                    }
                    {poll.success && 
                        <Toast 
                            text="Poll is added"
                            classname = "show"
                        />
                    }
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
                            {poll.pollData.poll.options.length > 0 && 
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
                </div>
                }
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
    console.log("ds", state);
    if(state.pollReducer.pollData.poll) {
        return {
            poll: state.pollReducer
        };
    }
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        AddPollsToUi, AddPollsToUiSuccess, AddPollsToUiFailure, CreatePollRequest,CreatePollFailure,CreatePollSuccess
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(newPoll);