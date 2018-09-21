
const course = (state = [], action) => {
    if (action.type === 'DISPLAY_COURSES') {
        return action.payload;
    }
    else if (action.type === 'CREATE_COURSE') {
        return [...state, action.payload];
    }
    else {
        return state;
    }
}

export default course;