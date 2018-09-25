const initialState = {
    course_id: 0,
    scores: []
}

const scores = (state = initialState, action) => {
    if (action.type === 'START_PLAYING') {
        const initialData = [];
        for(let i = 1; i <= action.payload.hole_quantity; i++) {
            initialData.push({hole: i, score: 0})
        }
        let newState = {
            course_id: action.payload.id,
            scores: initialData
        }
        return newState;
    }
    else if (action.type === 'INCREMENT_P1_HOLE') {
        // map the array and increment the value for the hole in the payload
        const result = state.scores.map(currentHole => {
            if(currentHole.hole === action.payload.hole) {
                return {...currentHole, score: currentHole.score + 1};
            }
            else {
                return currentHole;
            }
        });
        return {...state, scores: result};
    }
    else if (action.type === 'DECREMENT_P1_HOLE') {
        // map the array and decrement the value for the hole in the payload
        const result = state.scores.map(currentHole => {
            if(currentHole.hole === action.payload.hole) {
                return {...currentHole, score: currentHole.score - 1};
            }
            else {
                return currentHole;
            }
        });
        return {...state, scores: result};
    } else {
        return state;
    }
}

export default scores;