import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


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
    console.log('YOU KNOW IT', this.state);
    event.preventDefault();
    const action = { type: 'INCREMENT_P1_HOLE', payload: hole }
    this.props.dispatch(action);
  }

  handleDecrementScoreP1 = (hole) => (event) => {
    console.log('YOU DON\'T KNOW IT', hole );
    // event.preventDefault();
    const action = { type: 'DECREMENT_P1_HOLE', payload: hole }
    this.props.dispatch(action);
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
          {/* {JSON.stringify(this.props.playerOne)} */}
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
                <button type="submit"
                  className="submitBTN"
                  onClick={this.handleSubmit}>
                  ADD SCORE(S)
                        </button>
              </li>
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

