import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});



class Header extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let logoutBTN = null;

    if (this.props.user.userName) {
      logoutBTN = (
        <button
          className="logoutBTN"
          onClick={this.logout}
        > Log Out
      </button>);
    }
    return (
      <div className="instructions">
        <h1 className="lead">SCORE CARD</h1>
          {logoutBTN}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
