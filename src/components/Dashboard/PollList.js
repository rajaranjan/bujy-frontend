import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../basic/InputField';
import { Selector } from '../../basic/Selector';
import { Validate } from  '../../config';
import {bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import {PieChart} from 'react-chartkick';
import Chart from 'chart.js';
import { LoadPoll, LoadPollFailure, LoadPollSuccess, LoadPollsRequest, LoadPollsSuccess, LoadPollsFailure, RemovePollFailure, RemovePollSuccess,RemovePollRequest } from '../../actions/CreatePoll';

class PollList extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {};
        this.handleInitialize = this.handleInitialize.bind(this);
        this.loadList = this.loadList.bind(this);
        this.removePoll = this.removePoll.bind(this);
        this.showPollDetails = this.showPollDetails.bind(this);
        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        //this.handleInitialize();
        this.props.LoadPollsRequest();
    }
    handleInitialize() {
        // const poll = {
        //     "title": "",
        //     "options": [],
        // };
        var pollData = {};
        pollData.polls = [];
        pollData.showModal = false;
        this.setState({
            pollData
        })

    }

    //load poll list
    loadList(polls) {
        var pollRows = [];
        if( polls.length > 0) {
            polls.map((poll, index) => {
                pollRows.push(
                    <div className="row pollList-table-content" key={index}>
                        <div className="col-md-12 pollList-table-border">
                            <div className="col-md-6">
                                <span className="pollList-table-text">{poll.title}</span>
                            </div>
                            <div className="col-md-3">  
                                <span className="pollList-table-show-text" id={poll._id} onClick={this.showPollDetails}>Show</span>   
                            </div>
                            <div className="col-md-3">
                                <span className="pollList-table-remove-text">Remove</span>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            pollRows.push(
                <div className="row pollNotFound" key="0">
                    <span className="">No poll found</span>
                </div>
            )
        }
        
        return pollRows;
    }

    //show poll details
    showPollDetails(e)
    {
        // var showModal = true;
        // var pollData = this.props.pollData;
        // pollData.showModal = showModal;
        // this.setState({
        //     pollData
        // })
        console.log(e.target.id);
        this.props.LoadPoll(e.target.id, this.props.pollData);
    }

    //modal close
    close(){
        var pollData = this.state.pollData
        pollData.showModal = false;
        this.setState({ 
            pollData
        });
    }

    //remove a poll
    removePoll() {
        this.props.LoginRequest(this.state.poll);
    }

    //submitting the option
    submitPoll() {

    }

    //onchange of option
    onChange(){
        
    }
    render() {
        const { handleSubmit, submitting, error } = this.props;
        return (
            
            <section className="pollList-section">
                <div className="row">
                    <div className="col-md-12">
                        <span className="pollList-title">POLL LIST</span>
                    </div>
                </div>
                <div className="row pollList-table">
                        <div className="col-md-6">
                            <span className="pollList-table-title">POLL TITLE</span>
                        </div>
                        <div className="col-md-3">  
                            <span className="pollList-table-title">VIEW</span>
                        </div>
                        <div className="col-md-3">
                            <span className="pollList-table-title">REMOVE</span>
                        </div>
                </div>
                {console.log("sss",this.props)}
                {this.props.pollData &&
                    <div>
                    {this.loadList(this.props.pollData.polls)}
                    <Modal show={this.props.pollData.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-6 modal-content-section">
                                        <form onSubmit={handleSubmit(this.submitPoll.bind(this))} className="newPoll">
                                            <div className="row">
                                                <span className="modal-content-title">I would like to vote for:</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <Field
                                                        component={Selector}
                                                        name="option"
                                                        id="option"
                                                        label="Select Options"
                                                        className="option-selctor"
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn btn-primary btn-md submit-btn" type="submit">SUBMIT</button>
                                                </div>                                 
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <PieChart data={[["Blueberry", 50], ["Strawberry", 5],["banana", 25],["acrot", 15],["papita", 5]]} />
                                </div>
                            </div>

                        </Modal.Body>
                    </Modal>
                    </div>
                }
            </section>
        );
    }
}

const validate = (values) => {
    const errors = {};

	if (!Validate.text(values.option)) {
	  errors.option = 'Option is required'
    }
	return errors;
};

let pollList =  reduxForm({
    form: 'pollList', 
    validate
})(PollList);

//accessing state from reducer 
function mapStateToProps(state, ownProps) { 
    console.log("state",state);
    return {
        pollData: state.pollReducer.pollData
    };
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        LoadPoll, LoadPollFailure, LoadPollSuccess, 
        LoadPollsRequest, LoadPollsSuccess, LoadPollsFailure,
        RemovePollFailure, RemovePollSuccess,RemovePollRequest
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(pollList);