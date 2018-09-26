const initialState = {
    player1finalscore: 0,
    player2finalscore: 0,
    player3finalscore: 0,
    player4finalscore: 0,
}

const scoreTallyReducer = (state = initialState, action) => {
    if (action.type === 'P1_SCORE_TALLY') {
        return { ...state, player1finalscore: action.payload };
    }
    else if (action.type === 'P2_SCORE_TALLY') {
        return { ...state, player2finalscore: action.payload };
    }
    else if (action.type === 'P3_SCORE_TALLY') {
        return { ...state, player3finalscore: action.payload };
    }
    else if (action.type === 'P4_SCORE_TALLY') {
        return { ...state, player4finalscore: action.payload };
    }
    else {
        return state;
    }
}

export default scoreTallyReducer;