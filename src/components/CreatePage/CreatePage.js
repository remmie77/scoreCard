import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    course: state.course, //this.props.course
});

class CreatePage extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            hole_quantity: ''

        };
    }

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

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        const action = { type: 'CREATE_COURSE', payload: this.state }
        this.props.dispatch(action);
        //CALL SUB TO DB HERE
        this.submitCourseToDB();
    }


    submitCourseToDB = (event) => {
        console.log();
        axios({
            method: 'POST',
            url: '/api/score',
            data: this.state
        }).then((response) => {
            console.log('Back from POST: ', response.data);
            // const action = { type: 'EMPTY_CART' }
            this.setState({});
            this.props.history.push('course');
        }).catch((error) => {
            console.log(error);
            alert('Unable to POST to db.')
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
                    </h1>
                    {/* <p>Your ID is: {this.props.user.id}</p> */}
                </div>
            );
        }

        return (
            <div>
                <div>
                    <Nav />
                    {JSON.stringify(this.state)}
                    {content}
                </div>
                <div>
                    <h4>
                        CREATE A COURSE.<br />
                    </h4>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="formSection">
                            <label htmlFor="#courseNameInput">Name of course:</label>
                            {/* name is to link the form to onChange*/}
                            <input onChange={this.handleChange} placeholder="course name" id="courseNameInput" name="name" required /><br />
                            <label htmlFor="#courseQuantityHoles">Number of holes:</label>
                            <input onChange={this.handleChange} placeholder="number of holes" id="courseQuantityHoles" name="hole_quantity" required />
                        </div>
                        <div>
                            <button type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreatePage);

