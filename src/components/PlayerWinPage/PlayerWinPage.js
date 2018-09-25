import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
});

class PlayerWinPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
                    <button>
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