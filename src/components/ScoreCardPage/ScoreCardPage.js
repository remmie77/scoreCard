import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  playerOne: state.playerOne,
});

class ScoreCardPage extends Component {
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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Score Card
          </h1>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
          {JSON.stringify(this.props.playerOne)}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <ul className="courseList">
          {this.props.playerOne.map((hole, i) => {
            return (
              <li key={i}>HOLE: {hole.hole}<br />
                P1 SCORE:<br />
                <button className="decrementBTN">-</button>
                {hole.score}
                <button className="incrementBTN">+</button><br />
                <button className="submitBTN">ADD SCORE(S)</button></li>

            )
          })}
        </ul>
      </div>
    );
  }
}
// onClick={this.incrementScore(course)}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ScoreCardPage);

