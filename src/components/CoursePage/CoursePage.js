import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  coursesArray: state.course, //this.props.coursesArray
});

class CoursePage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getMyCourses();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  goToCreateCourse = () => {
    this.props.history.push('createCourse')
  }

  

  getMyCourses = () => {
    console.log('in getMyCourses');
    Axios({
        method: 'GET',
        url: '/api/score',
    }).then((response) => {
        console.log('back from server with: ', response.data);
        this.props.dispatch({
            payload: response.data,
            type: 'DISPLAY_COURSES',
        });
    }).catch((error) => {
        console.log('error: ', error);
        alert('there was an error getting the courses');
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
            Welcome, { this.props.user.userName }!
          </h1>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <ul>
          {this.props.coursesArray.map((course, i) => {
            return(
              <li key={i}>{course.name} {course.hole_quantity}</li>
            )
          }) }
          <li><button
            onClick={this.goToCreateCourse}
          >
            CREATE A COURSE
          </button></li>
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CoursePage);

