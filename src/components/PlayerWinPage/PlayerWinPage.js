import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Axios from 'axios';


const mapStateToProps = state => ({
    user: state.user,
    scoreTallyReducer: state.scoreTallyReducer
});

//this.props.scoreTallyReducer.player1finalscore will be my score

class PlayerWinPage extends Component {

    
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getP1Scores();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    handlePlayAgain = () => {
        console.log('in handlePlayAgain');
        /////////clear all arrays in stores///////////
        this.props.history.push('/course');
    }

    getP1Scores = () => {
    Axios({
        method: 'GET',
        url: '/api/score/p1score',
      }).then((response) => {
        console.log('back from server with: ', response.data);
        this.setState({
            state: response.data,
        })
      }).catch((error) => {
        console.log('error: ', error);
        alert('there was an error getting the p1Score');
      })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1
                        id="welcome"
                    >
                        Hey, {this.props.user.userName}!
                    </h1>
                    <h2>
                        YOU WIN!!!
                    </h2>
                    {/* <p>Your ID is: {this.props.user.id}</p> */}
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
                <div>
                    <p>
                        {this.props.scoreTallyReducer.player1finalscore}
                    </p>
                    <button onClick={this.handlePlayAgain}>
                        PLAY AGAIN?
                    </button>
                    <button>
                        DONE FOR TODAY
                    </button>
                </div>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerWinPage);