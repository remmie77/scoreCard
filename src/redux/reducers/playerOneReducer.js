
const scores = (state = [], action) => {
    if (action.type === 'START_PLAYING') {
        const initialData = [];
        for(let i = 1; i <= action.payload.hole_quantity; i++) {
            initialData.push({hole: i, score: 0})
        }
        return initialData;
    }
    else if (action.type === 'INCREMENT_P1_HOLE') {
        // filter the array and increment the value for the hole in the payload
        return state;
    }
    else if (action.type === 'DECREMENT_P1_HOLE') {
        // filter the array and decrement the value for the hole in the payload
        return state;
    }
    else {
        return state;
    }
}

export default scores;