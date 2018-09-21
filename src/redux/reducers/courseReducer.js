
const course = (state=[], action) => {
    if (action.type === 'DISPLAY_COURSES') {
        return action.payload;
    }
    return state
}

export default course;