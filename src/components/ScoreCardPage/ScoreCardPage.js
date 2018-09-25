import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Axios from 'axios';


const mapStateToProps = state => ({
  user: state.user,
  playerOne: state.playerOne,
  playerTwo: state.playerTwo,
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

  handleIncrementScoreP1 = (hole) => (event) => {
    console.log('YOU KNOW IT', hole);
    const action = { type: 'INCREMENT_P1_HOLE', payload: hole }
    this.props.dispatch(action);
  }

  handleDecrementScoreP1 = (hole) => (event) => {
    console.log('YOU DON\'T KNOW IT', hole);
    const action = { type: 'DECREMENT_P1_HOLE', payload: hole }
    this.props.dispatch(action);
  }

  handleIncrementScoreP2 = (hole) => (event) => {
    console.log('WOW', hole);
    const action = { type: 'INCREMENT_P2_HOLE', payload: hole }
    this.props.dispatch(action);
  }

  handleDecrementScoreP2 = (hole) => (event) => {
    console.log('YOU KNOW IT', hole);
    const action = { type: 'INCREMENT_P2_HOLE', payload: hole }
    this.props.dispatch(action);
  }

  handleFinalMatchScoreSubmit = () => {
    console.log('in send my scores');
    let totalScore = 0;
    this.props.playerOne.scores.map((hole) => {
      totalScore += hole.score;
    })
    let roundPlayed = {my_score: totalScore, course_id: this.props.playerOne.course_id }
    console.log(roundPlayed);
    Axios({
      method: 'POST',
      url: '/api/score/p1Score',
      data: roundPlayed
    }).then((response) => {
      console.log(response.data);
      this.props.history.push('/tally');
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
            Score Card
          </h1>
          {JSON.stringify(this.props.playerOne)}
          {JSON.stringify(this.props.playerOne.name)}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <div className="scoreInputsContainer">
          <ul className="courseList">
            {this.props.playerOne.scores.map((hole, i) => {
              return (
                <li key={i}>HOLE: {hole.hole}<br />
                  P1 SCORE:<br />
                  <button className="decrementBTN"
                    onClick={this.handleDecrementScoreP1(hole)}
                  >
                    -
                </button>
                  {hole.score}
                  <button className="incrementBTN"
                    onClick={this.handleIncrementScoreP1(hole)}
                  >
                    +
                </button><br />
                </li>
              )
            })}
          </ul>
          <div>
            <button type="submit"
              className="submitScoresBTN"
              onClick={this.handleFinalMatchScoreSubmit}>
              ADD SCORE(S)
          </button>
          </div>
        </div>
      </div>
    );
  }
}
// onClick={this.incrementScore(course)}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ScoreCardPage);

