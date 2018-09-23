const scores = (state = [], action) => {
    if (action.type === 'START_PLAYING') {
        const initialData = [];
        for(let i = 1; i <= action.payload.hole_quantity; i++) {
            initialData.push({hole: i, score: 0})
        }
        return initialData;
    }
    else if (action.type === 'INCREMENT_P2_HOLE') {
        // filter the array and increment the value for the hole in the payload
        action.payload.filter(score => score.score ++);
        return state;
    }
    else if (action.type === 'DECREMENT_P2_HOLE') {
        // filter the array and decrement the value for the hole in the payload
        action.payload.filter(score => score.score --);
        return state - 1;
    }
    else {
        return state;
    }
}

export default scores;