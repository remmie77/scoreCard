import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    course: state.course, //this.props.course
});

const myInfoFromCourse = {
    stuff: [],
}

class MyInfoOnCoursePage extends Component {
    constructor() {
        super();

        this.state = myInfoFromCourse;
    }




    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.getMyCourses();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

      goBackToCourse = () => {
        console.log('get back');
        this.props.history.push('/course');
      }

    startPlaying = (course) => (event) => {
        console.log(course);
        const action = { type: 'START_PLAYING', payload: course };
        this.props.dispatch(action);
        this.props.history.push('/score');
    }

    getMyCourseInfo = () => {
        console.log('in getMyCourseInfo');
        Axios({
            method: 'GET',
            url: '/api/score/myInfoOnScore'
        }).then((response) => {
            this.setState({
                stuff: response.data
            })
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
                        Welcome, {this.props.user.userName}!
            {/* Here is the summery of your play on {course name}. */}
                    </h1>
                    {/* <p>Your ID is: {this.props.user.id}</p> */}
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
                <h1>{this.props.match.params.id}</h1>
                {/* below is my course id that I will be pulling info on */}
                {/* <li><button className="BTN" onClick={this.startPlaying(this.props.course)}>Play</button></li> */}
                <button className="BTN" onClick={this.goBackToCourse}>Back</button>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyInfoOnCoursePage);

