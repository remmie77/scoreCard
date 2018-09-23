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
          BEFORE YOU THROW
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
        <h3>
          HEADWINDS AND TAILWINDS
        </h3>
        <p>
          <b>Try to plan each shot to minimize the chances of unwanted air.</b> This works differently, and is dependent upon, which of the four main directions the wind is coming from (keep in mind that these tips are written by a right-hander, so you lefties will need to switch the right to left and left to right instructions.) Let's start with the easier directions; tailwinds and headwinds. A tailwind will help carry a disc forward. It will also make a disc behave as if it were more overstable. This is because the stability of a disc is directly related to the speed of the air passing across it. In other words, the disc thinks it's going slower in a tailwind than it really is. The only drawback to a tailwind is the loss of lift (not to be confused with forward progress). With a little higher release point, exceptionally long throws are possible.
        </p>
        <p>
          <b>A headwind plays exactly the opposite.</b> A headwind will make a disc less stable, and will create less carry by pushing against your disc. A headwind also tends to lift the disc, so a lower point of release is necessary.
        </p>
        <h3>
          CROSSWINDS   
        </h3>
        <p>
          <b>Right to left crosswinds:</b> Anhyzers drop hard and can catch an edge and roll. Hyzers lift and carry more than expected. Use the flight pattern of your disc to counteract the unwanted effects while watching out for the changes that occur as your throw nears completion. For example, throw an overstable disc with an anhyzer that turns right and stays low, then ends up with a hard left turn, which will rise. An understable disc thrown with a hyzer turns left and rises until it turns over (if it turns over), then drops and tails right. The disc will want to go left with the wind and spin unless forced to go otherwise. For distance, try a slightly less stable disc with a slight hyzer.
        </p>
        <p>
          <b>Left to right crosswinds:</b> Hyzers drop while anhyzers lift. Because of the spin a righty generates, it becomes easier to skip as the front edge will be rising into the wind after being driven into the ground by the wind moving across the top of the disc.
        </p>
        <p>
          <b>An unstable disc with an anhyzer release</b> will be lifted up and carried right. Find the correct combination of stability and release angle for good distance drives.
        </p>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TipsPage);

