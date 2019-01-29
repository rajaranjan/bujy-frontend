import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../basic/InputField';
import { Toast } from '../../basic/Toast';
import { Selector } from '../../basic/Selector';
import { Validate } from  '../../config';
import {bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import {PieChart} from 'react-chartkick';
import Chart from 'chart.js';
import { LoadPoll, LoadPollFailure, LoadPollSuccess, LoadPollsRequest, LoadPollsSuccess, LoadPollsFailure, RemovePollFailure, RemovePollSuccess, RemovePollRequest, CloseModal, SubmitVote, SubmitVoteSuccess, SubmitVoteFailure } from '../../actions/CreatePoll';

class PollList extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.handleInitialize = this.handleInitialize.bind(this);
        this.loadList = this.loadList.bind(this);
        this.removePoll = this.removePoll.bind(this);
        this.showPollDetails = this.showPollDetails.bind(this);
        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitVote = this.submitVote.bind(this);
    }

    componentWillMount() {
        //this.handleInitialize();
        this.props.LoadPollsRequest();
    }
    componentWillReceiveProps(nextProps) {
    }
    handleInitialize() {
        // const poll = {
        //     "title": "",
        //     "options": [],
        // };
        // var pollData = {};
        // pollData.polls = [];
        // pollData.showModal = false;
        // this.setState({
        //     pollData
        // })

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
                                <span className="pollList-table-remove-text" id={poll._id} onClick={this.removePoll}>Remove</span>
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
        this.props.LoadPoll(e.target.id, this.props.pollData);
    }

    //modal close
    close(){    
        this.props.CloseModal();
    }   

    //remove a poll
    removePoll(e) {
        this.props.RemovePollRequest(e.target.id, this.props.pollData);
    }

    //submitting the option
    submitVote(e) {
        this.props.SubmitVote(e.option, this.props.pollData);
    }

    //onchange of option
    onChange(){
        
    }
    render() {
        const { handleSubmit, submitting, error, showModal, selectedPoll } = this.props;
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
                {this.props.pollReducer.deleted && 
                     <Toast 
                        text="Deleted poll"
                        classname = "show"
                    />
                }
                {this.props.pollData && this.props.pollData.polls &&
                    <div>
                    {this.loadList(this.props.pollData.polls)}
                    {showModal && 
                        <Modal show={showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedPoll.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-6 modal-content-section">
                                            <form onSubmit={handleSubmit(this.submitVote.bind(this))} className="pollList">
                                                <div className="row">
                                                    <span className="modal-content-title">I would like to vote for:</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8 selector-section">
                                                        <Field
                                                            component={Selector}
                                                            name="option"
                                                            id="option"
                                                            label="Select Options"
                                                            className="option-selctor"
                                                            values={ selectedPoll.options }
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
                                        {console.log("Sss",selectedPoll)}
                                        <PieChart data={selectedPoll.votes} />
                                    </div>
                                </div>

                            </Modal.Body>
                        </Modal>
                    }
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
    
    if(state.pollReducer.pollData) {
        return {
            pollReducer: state.pollReducer,
            pollData: state.pollReducer.pollData,
            showModal: state.pollReducer.pollData.showModal,
            selectedPoll: state.pollReducer.pollData.selectedPoll    
        };
    }
    
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        LoadPollsRequest, LoadPollsSuccess, LoadPollsFailure,
        LoadPoll, LoadPollFailure, LoadPollSuccess,         
        RemovePollFailure, RemovePollSuccess,RemovePollRequest,
        CloseModal, SubmitVote, SubmitVoteSuccess, SubmitVoteFailure
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(pollList);