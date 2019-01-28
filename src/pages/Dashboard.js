import React from 'react';
import {connect} from 'react-redux';
import Header from './common/header';
import NewPoll from '../components/Dashboard/NewPoll';
import './Dashboard.css';
import PollList from '../components/Dashboard/PollList';
  
class Dashboard extends React.Component {
    
    constructor(props, context) {
		super(props, context);
        this.props = props;
    }
    
    componentWillMount() {
        console.log("comp-Dash");
    }

    render() {
        const { } = this.props;

        return (
            <section>
                {/* <Header /> */}
                <div className="container">
                    <section className="dashboard-section">
                        <NewPoll  onSubmit={this.submitHandler} { ...this.props} />
                        <PollList onSubmit={this.submitHandler} { ...this.props} />
                    </section>
                </div> 
            </section>
        );
    }
}

//accessing state from reducer 
function mapStateToProps(state, ownProps) {
	return {

	}
}

//determines what action available in a component
function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
