const initialState = {
    player1finalscore: 0,
    player2finalscore: 0,
    player3finalscore: 0,
    player4finalscore: 0,
}

const scoreTallyReducer = (state = initialState, action) => {
    if (action.type === 'P1_SCORE_TALLY') {
        return {...state, player1finalscore: action.payload};
    } else {
        return state;
    }
}

export default scoreTallyReducer;