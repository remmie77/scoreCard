import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class TipsPage extends Component {
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
            Some Tips:
          </h1>
          <h2>
            Wind:
          </h2>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <h3>
          Before You Throw
        </h3>
        <p>
          <b>First, assess the hole.</b> Be observant and run down a mental checklist, then ask yourself about the hole. What does the lay of the land look like? Is it an uphill or downhill shot? Are there any obstacles or gaps that might alter wind currents? Look further into the hole for variations or tendencies in the wind. Pick the disc you want for the hole and imagine the complete flight and then factor in wind effects. Pick a spot where you anticipate your disc landing and consider what it will do after hitting the ground. Does it need to land short? Find the aiming point.
        </p>
        <p>
          <b>Throw with control.</b> The throw is the only part of the flight you can control. Be smooth; throw it as perfectly as you can. If you get the opportunity to watch a previous throw, watch the release angle and the flight path. See if it does what you expected. ADJUST your drive accordingly. I don't know how many times I have seen a whole card make the same bad read with no corrections . after THREE throws.
        </p>
        <p>
          <b>Remember to throw each hole individually.</b> Although it may look like the same shot, take the time to evaluate every hole. A good read will be the difference between a 2 and a 5. Watch for waves or gusts. Often you will be able to see a wave coming at you and have time to wait it out. Don't try to rush a shot. If necessary, throw during the wave, but reassess the new conditions. Even experts will still get fooled, but the really great ones limit how much a mistake will hurt them.
        </p>
        <p>
          <b>Disc Selection:</b> When most people think of throwing in the wind they think of grabbing the most overstable disc in their bag and using it exclusively. This is not always a good idea, in fact at least 50% of the time it's dead wrong.
        </p>
        <p>
          <b>As you play,</b> typically you will start and finish your round at approximately the same place. To do that, you will throw into, away from, and across the wind. The greater variety of angles you are forced to play, the more discs with different flight characteristics you will need. OK, you don't need them, but if you can tailor the normal flight of your disc to each shot, you will be much more effective.
        </p>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TipsPage);

